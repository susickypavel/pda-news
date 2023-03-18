import requests
import os
import json

from supabase import create_client, Client
from dotenv import load_dotenv

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
        # TODO: Info debug?
        return

    domains = ",".join([source["domain"] for source in result.data])
    domains_ids = {source['domain']: source['id'] for source in result.data}

    try:
        # TODO: Follow pagination
        response = requests.get("https://newsdata.io/api/1/news", [
            ["apikey", NEWSDATA_API_KEY],
            ["country", country],
            ["domain", domains],
            ["category", category]
        ])

        data = json.loads(response.text)

        def transform_data(data):
            return {
                "title": data["title"],
                "content": data["content"],
                "published_at": data["pubDate"],
                "region": country,
                "category": category,
                "original_url": data["link"],
                "source_id": domains_ids[data["source_id"]]
            }

        supabase.table("articles").upsert([transform_data(item) for item in data["results"]]).execute()
    except Exception as error:
        raise SystemExit(error)


def main():
    result = supabase.table("categories").select("name").execute()

    categories = [category["name"] for category in result.data]

    for category in categories:
        insert_articles("cz", category)
        print(f"Finished fetching {category} in cz")


main()
