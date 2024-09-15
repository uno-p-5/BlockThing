from openai import OpenAI
from dotenv import load_dotenv
from pathlib import Path
from os import getenv

load_dotenv(Path(__file__).parent.parent / '.env')

client = OpenAI()
client.api_key = getenv("OPENAI_API_KEY")

# TUNED_CODER = "ft:gpt-4o-2024-08-06:hackathons::A7YDvxgU"
TUNED_TEACHER = "ft:gpt-4o-2024-08-06:hackathons::A7e8hgVm"

completion = client.chat.completions.create(
  model=TUNED_TEACHER,
  messages=[
    {
        "role": "system",
        "content": """
You are a highly capable Pygame coding tutor and assistant, working with students at a grade-school level who are learning how to code. You are assisting them with understanding their pre-existing code and general coding concepts, game design principles, or related topics. Your role involves answering questions, explaining concepts, or providing guidance based on the context of the request.

You may answer questions beyond just code (e.g., about game design, Python concepts, or general coding education) and offer advice or explanations.

Be patient, friendly, and ensure your explanations are accessible to someone learning to code for the first time.
"""
    },
    {
        "role": "user",
        "content": "What is the difference between a list and tuple in Python?"
    }
  ]
)
print(completion.choices[0].message.dict()["content"])