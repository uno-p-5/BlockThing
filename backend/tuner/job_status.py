from openai import OpenAI
from dotenv import load_dotenv
from pathlib import Path
from os import getenv
from json import dumps
from time import sleep

load_dotenv(Path(__file__).parent.parent / '.env')

client = OpenAI()
client.api_key = getenv("OPENAI_API_KEY")

JOB_ID = "ftjob-lRY2XUrxie8TXlyRlaN91556"

# print(client.fine_tuning.jobs.list(limit=1))

while True:
    print(dumps(client.fine_tuning.jobs.retrieve(JOB_ID).dict(), indent=4), end="\n=======================\n")
    sleep(8)

# print(client.fine_tuning.jobs.cancel(JOB_ID))

# client.fine_tuning.jobs.list_events(fine_tuning_job_id=JOB_ID, limit=10)

# client.models.delete("ft:gpt-3.5-turbo:acemeco:suffix:abc123")