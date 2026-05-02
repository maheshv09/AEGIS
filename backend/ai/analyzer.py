import os
import json
from dotenv import load_dotenv
from groq import Groq

# Explicitly load .env from the root project directory, not the backend folder
dotenv_path = os.path.join(os.path.dirname(__file__), '../../.env')
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)
else:
    load_dotenv() # Fallback to system env vars in production

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def analyze_post(post_text: str) -> dict:
    """
    Analyzes a social media post using the Groq Llama-3 model.
    Extracts adverse drug events, confidence, sentiment, PII/PHI, and reasoning.
    """
    # Fallback to mock analysis if key is not properly set
    if not GROQ_API_KEY or GROQ_API_KEY == "your_groq_api_key_here":
        return _mock_analyze_post(post_text)
        
    client = Groq(api_key=GROQ_API_KEY)
    
    prompt = f"""
    Analyze the following social media post for potential adverse drug events.
    You must extract the following:
    1. The drug name.
    2. The symptom/condition.
    3. Is this an adverse event? (true/false)
    4. Confidence score (0.0 to 1.0).
    5. Sentiment (Positive, Negative, Neutral).
    6. Does the text contain PII (Personally Identifiable Information) or PHI (Protected Health Information) like phone numbers, names, or addresses? (true/false)
    7. A short explanation of your reasoning (explainability/traceability).
    
    Return ONLY valid JSON in the exact following format, no markdown formatting:
    {{
        "drug": "drug name or null",
        "symptom": "symptom or null",
        "is_adverse_event": true/false,
        "confidence": 0.95,
        "sentiment": "Negative",
        "has_phi": false,
        "explanation": "Short reasoning here"
    }}
    
    Post: "{post_text}"
    """
    
    try:
        completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are AEGIS, a medical safety monitoring AI. You prioritize detecting adverse events and masking PII/PHI for HIPAA compliance."
                },
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama-3.1-8b-instant",
            temperature=0.1,
            max_tokens=300,
        )
        
        response_text = completion.choices[0].message.content.strip()
        if response_text.startswith("```json"):
            response_text = response_text[7:-3]
        elif response_text.startswith("```"):
            response_text = response_text[3:-3]
            
        result = json.loads(response_text)
        return result
    except Exception as e:
        print(f"Error calling Groq API: {e}")
        return _mock_analyze_post(post_text)

def analyze_posts_batch(posts: list) -> list:
    """
    Analyzes multiple social media posts in a single LLM call.
    This drastically reduces API requests and saves token usage (TPM).
    """
    if not GROQ_API_KEY or GROQ_API_KEY == "your_groq_api_key_here":
        return [_mock_analyze_post(p["text"]) for p in posts]

    client = Groq(api_key=GROQ_API_KEY)
    
    # Prepare a combined prompt for all posts
    posts_input = ""
    for i, p in enumerate(posts):
        posts_input += f"ID: {i}\nPost: {p['text']}\n---\n"

    prompt = f"""
    Analyze the following social media posts for potential adverse drug events.
    For each post, you MUST extract:
    1. Drug name
    2. Symptom/condition
    3. Is it an adverse event? (true/false)
    4. Confidence (0.0-1.0)
    5. Sentiment (Positive, Negative, Neutral)
    6. Does it contain PII/PHI? (true/false)
    7. Reasoning explanation

    Return a JSON array of objects, one for each ID provided, in the exact same order.
    Format:
    [
      {{
        "id": 0,
        "drug": "...",
        "symptom": "...",
        "is_adverse_event": ...,
        "confidence": ...,
        "sentiment": "...",
        "has_phi": ...,
        "explanation": "..."
      }},
      ...
    ]

    Posts to analyze:
    {posts_input}
    """

    try:
        completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are AEGIS, a medical safety monitoring AI. Return only valid JSON arrays."
                },
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama-3.1-8b-instant",
            temperature=0.1,
            max_tokens=1500,
        )
        
        response_text = completion.choices[0].message.content.strip()
        if "```json" in response_text:
            response_text = response_text.split("```json")[1].split("```")[0]
        elif "```" in response_text:
            response_text = response_text.split("```")[1].split("```")[0]
            
        results = json.loads(response_text)
        # Ensure the output is a list and return it
        if isinstance(results, list):
            return results
        return [_mock_analyze_post(p["text"]) for p in posts]
    except Exception as e:
        print(f"Batch Analysis Error: {e}")
        return [_mock_analyze_post(p["text"]) for p in posts]

def _mock_analyze_post(post_text: str) -> dict:
    """Fallback method if API key is missing or call fails."""
    post_lower = post_text.lower()
    
    is_adverse_event = False
    drug = None
    symptom = None
    confidence = 0.0
    sentiment = "Neutral"
    has_phi = False
    explanation = "No API key configured. This is a fallback mock analysis."
    
    if "555-" in post_lower or "call me" in post_lower:
        has_phi = True
    
    if "aspirin" in post_lower:
        drug = "Aspirin"
        symptom = "Bleeding"
        is_adverse_event = True
        confidence = 0.92
        sentiment = "Negative"
    elif "lisinopril" in post_lower:
        drug = "Lisinopril"
        symptom = "Cough"
        is_adverse_event = True
        confidence = 0.88
        sentiment = "Negative"
    elif "ibuprofen" in post_lower:
        drug = "Ibuprofen"
        symptom = "Dizziness/Nausea"
        is_adverse_event = True
        confidence = 0.85
        sentiment = "Negative"
    elif "amoxicillin" in post_lower:
        drug = "Amoxicillin"
        symptom = "Hives"
        is_adverse_event = True
        confidence = 0.95
        sentiment = "Negative"
        
    return {
        "drug": drug,
        "symptom": symptom,
        "is_adverse_event": is_adverse_event,
        "confidence": confidence,
        "sentiment": sentiment,
        "has_phi": has_phi,
        "explanation": explanation
    }
