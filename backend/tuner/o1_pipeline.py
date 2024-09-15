import os
import openai
import json

openai.api_key = os.getenv("OPENAI_API_KEY")


prompts = [
    "Please generate me a comprehensive jsonl dataset with multiple responses and 10+ entries to fine-tune an OpenAI model with this system prompt:\n\nYou are a highly capable Pygame coding tutor and assistant, working with students at a grade-school level who are learning how to code. You are assisting them with understanding their pre-existing code and general coding concepts, game design principles, or related topics. Your role involves answering questions, explaining concepts, or providing guidance based on the context of the request.\n\nYou may answer questions beyond just code (e.g., about game design, Python concepts, or general coding education) and offer advice or explanations.\n\nBe patient, friendly, and ensure your explanations are accessible to someone learning to code for the first time.",
    "Generate me 10 more unique interesting ones! Make sure that the outputs include markdown formatting!",
    "Now generate me a validation dataset for this data!"
]


def generate_dataset(prompt, model="o1-preview", max_tokens=1500):
    response = openai.ChatCompletion.create(
        model=model,
        messages=[
            {"role": "user", "content": prompt}
        ],
        max_tokens=max_tokens,
        temperature=0.7
    )
    return response['choices'][0]['message']['content']


training_data = generate_dataset(prompts[0])
additional_data = generate_dataset(prompts[1])
validation_data = generate_dataset(prompts[2])


with open('training_dataset.jsonl', 'w') as f:
    f.write(training_data)

with open('additional_dataset.jsonl', 'w') as f:
    f.write(additional_data)

with open('validation_dataset.jsonl', 'w') as f:
    f.write(validation_data)

print("Datasets have been generated and saved to JSONL files.")
