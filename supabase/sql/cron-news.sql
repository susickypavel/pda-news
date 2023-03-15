SELECT cron.schedule (
  'article-cleanup',
  -- Every Saturday at 3am
  '0 3 * * 6',
  $$
    DELETE FROM articles WHERE created_at < NOW() - INTERVAL '10 days';
  $$
);

CREATE OR REPLACE FUNCTION insert_articles(country text, category text) RETURNS VOID AS
$$
  DECLARE
    request_result jsonb;
    article jsonb;
    domains text;
  BEGIN
    RAISE LOG 'Fetching articles for category % in region %', category, country;

    SELECT STRING_AGG(domain, ',') INTO domains FROM sources AS S1 WHERE S1.region = $1 AND S1.category = $2;

    IF domains IS NULL OR domains = '' THEN
      RAISE LOG 'No sources found for category % in region %.', category, country;
      RETURN;
    END IF;

    SELECT content::jsonb INTO request_result FROM http_get('https://newsdata.io/api/1/news?apikey=REDACTED&country=' || $1 || '&domain=' || domains || '&category=' || $2);

    FOR article IN SELECT jsonb_array_elements(request_result::jsonb -> 'results') LOOP
      IF article->>'content' IS NULL OR article->>'content' = '' THEN
        -- Some articles contains only images, so we skip them.
        RAISE LOG 'Article has empty content, skipping.';
        CONTINUE;
      END IF;

      BEGIN
        INSERT INTO articles (id, title, content, published_at, region, category, link, source_id)
        VALUES (uuid_generate_v4(), article->>'title', article->>'content', to_timestamp(article->>'pubDate', 'YYYY-MM-DD HH24:MI:SS'), $1, $2, article->>'link', (SELECT id FROM sources AS S1 WHERE S1.region = $1 AND S1.domain = article->>'source_id' AND S1.category = $2));
      EXCEPTION WHEN unique_violation THEN
        -- Unique violation je na title, to znamená, že daný článek už v DB je, tak ho přeskočíme.
        CONTINUE;
      END;
    END LOOP;
  END
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_articles_for_each_category(country text) RETURNS VOID AS
$$
  DECLARE
   category_name text;
  BEGIN
   FOR category_name IN SELECT name FROM categories LOOP
    PERFORM insert_articles(country, category_name);
   END LOOP;
  END
$$ LANGUAGE plpgsql;

SELECT cron.schedule(
  'czech-news',
  -- Every day at 6am
  '0 6 * * *',
  $$
    SELECT insert_articles_for_each_category('cz');
  $$
);
