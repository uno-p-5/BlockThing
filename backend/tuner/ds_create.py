from openai import OpenAI
from dotenv import load_dotenv
from pathlib import Path
from os import getenv

dataset_path = Path(__file__).parent / 'dataset4.jsonl'

load_dotenv(Path(__file__).parent.parent / '.env')

client = OpenAI()
client.api_key = getenv("OPENAI_API_KEY")

print(client.files.create(
  file=open(dataset_path, "rb"),
  purpose="fine-tune"
))