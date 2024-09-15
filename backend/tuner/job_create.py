from openai import OpenAI
from dotenv import load_dotenv
from pathlib import Path
from os import getenv

load_dotenv(Path(__file__).parent.parent / '.env')

client = OpenAI()
client.api_key = getenv("OPENAI_API_KEY")

FILE_ID = "file-1sHzzkWcZGYARc2BLuccwtmF"

print(client.fine_tuning.jobs.create(
  training_file=FILE_ID, 
  model="gpt-4o-2024-08-06",
  hyperparameters={
    "n_epochs": 2
  }
))