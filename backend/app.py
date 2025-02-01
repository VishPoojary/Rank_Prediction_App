import json
from flask import Flask, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#Function to simulate rank prediction based on quiz score
def predict_rank(quiz_scores):
    # Calculate total score and predict rank (mock logic)
    total_score = sum(quiz_scores)
    if total_score >= 80:
        return "Top 10%"
    elif total_score >= 60:
        return "Top 20%"
    elif total_score >= 40:
        return "Top 40%"
    else:
        return "Below 40%"

@app.route('/quiz-performance', methods=['GET'])
def quiz_performance():
    try:
        # Fetch quiz performance data from an external API
        response = requests.get("https://api.jsonserve.com/XgAgFJ")
        if response.status_code != 200:
            return jsonify({"error": "Failed to fetch data from external API"}), 500
        
        # Extract JSON data from response
        data = response.json()

        # Example: Assuming quiz data contains performance scores for each quiz
        quiz_scores = [quiz['score'] for quiz in data]  # Extract scores from the data
        
        # Get rank prediction
        predicted_rank = predict_rank(quiz_scores)
        
        # Return the prediction and insights
        return jsonify({
            "quiz_scores": quiz_scores,
            "predicted_rank": predicted_rank,
            "insights": f"Based on the scores, your predicted NEET rank is {predicted_rank}. Keep improving!"
        })
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
