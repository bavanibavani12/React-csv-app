from flask import Flask, request, jsonify
import pandas as pd
import openai
import os

app = Flask(__name__)

# Initialize OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/process', methods=['POST'])
def process_csv():
    file_path = request.json['filePath']
    print("File path received:", file_path)  # Verify path

    try:
        df = pd.read_csv(file_path)
        print("CSV file read successfully.")

        insights = df.describe().to_dict()

        return jsonify({
            'analysis': insights,
            'aiResponses': []
        })
    except Exception as e:
        print("Error processing CSV:", e)
        return jsonify({'error': str(e)}), 500


@app.route('/ask', methods=['POST'])
def ask():
    question = request.json['question']
    
    # Generate an answer using OpenAI API
    response = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=[{"role": "user", "content": question}]
    )
    
    answer = response['choices'][0]['message']['content']
    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(port=5000)
