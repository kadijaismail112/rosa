import os
import json
import openai
from tools import tools

client = openai.OpenAI(
    base_url = "https://api.together.xyz/v1",
    api_key = os.environ['TOGETHER_API_KEY'],
)

def function_call(user_input):
    messages = [
        {"role": "system", "content": "You are a helpful assistant that can access external functions. The responses from these function calls will be appended to this dialogue. Please provide responses based on the information from these function calls."},
        {"role": "user", "content": "{user_input}"}
    ]
    
    response = client.chat.completions.create(
        model="mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages=messages,
        tools=tools,
        tool_choice="auto",
    )

    return response.choices[0].message.model_dump()['tool_calls']

response = function_call(user_input="What is the current weather in San Francisco, CA?")

print(json.dumps(response.choices[0].message.model_dump()['tool_calls'], indent=2))