
import json
import os
import requests

from supabase import create_client, Client
from dotenv import load_dotenv
from custom_logger import logger

load_dotenv()

NEWSDATA_API_KEY = os.environ.get("NEWSDATA_API_KEY")
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_SERVICE_ROLE = os.environ.get("SUPABASE_SERVICE_ROLE")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE)


def insert_articles(country: str, category: str):
    try:
        result = supabase.table("sources").select("domain,id").eq("region", country).eq("category", category).execute()
    except Exception as error:
        raise SystemExit(error)

    if (len(result.data) <= 0):
        logger.warning(f"No sources found for {country} and {category} category")
        return

    domains = ",".join([source["domain"] for source in result.data])
    domains_ids = {source['domain']: source['id'] for source in result.data}

    # TODO: Retry on an error
    # TODO: Handle non 2XX responses
    try:
        articles = []
        next_page_id = None
        total_results_count = 0

        while True:
            params = [
                ["apikey", NEWSDATA_API_KEY],
                ["country", country],
                ["domain", domains],
                ["category", category],
            ]

            if (next_page_id is not None):
                params.append(["page", next_page_id])

            response = requests.get("https://newsdata.io/api/1/news", params)

            data = json.loads(response.text)

            next_page_id = data["nextPage"]
            articles.extend(data["results"])

            if next_page_id is None:
                total_results_count = data["totalResults"]
                break

        def transform_data(article_data):
            return {
                "title": article_data["title"],
                "content": article_data["content"],
                "published_at": article_data["pubDate"],
                "region": country,
                "category": category,
                "original_url": article_data["link"],
                "source_id": domains_ids[article_data["source_id"]]
            }

        supabase.table("articles").upsert([transform_data(article) for article in articles]).execute()
        logger.info(f"Inserted ({len(articles)}/{total_results_count}) articles for {country} and {category} category")
    except Exception as error:
        raise SystemExit(error)


def main():
    result = supabase.table("categories").select("name").execute()

    for category in [category["name"] for category in result.data]:
        insert_articles("cz", category)


main()
