from openai import OpenAI
from dotenv import load_dotenv
from pathlib import Path
from os import getenv

load_dotenv(Path(__file__).parent.parent / '.env')

client = OpenAI()
client.api_key = getenv("OPENAI_API_KEY")

completion = client.chat.completions.create(
  model="ft:gpt-4o-mini:my-org:custom_suffix:id",
  messages=[
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello!"}
  ]
)
print(completion.choices[0].message)