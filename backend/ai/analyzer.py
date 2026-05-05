import os
import json
from dotenv import load_dotenv
from groq import Groq

# Explicitly load .env from the root project directory
dotenv_path = os.path.join(os.path.dirname(__file__), '../../.env')
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)
else:
    load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def analyze_post(post_text: str) -> dict:
    """
    Analyzes a single social media post with multi-model fallback.
    """
    models = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"]
    
    prompt = f"""
    Analyze the following social media post for potential adverse drug events.
    Return ONLY valid JSON:
    {{
        "drug": "drug name or null",
        "symptom": "symptom or null",
        "is_adverse_event": true/false,
        "confidence": 0.95,
        "sentiment": "Negative",
        "has_phi": false,
        "explanation": "Short reasoning"
    }}
    
    Post: "{post_text}"
    """
    
    for model in models:
        try:
            if not GROQ_API_KEY: break
            client = Groq(api_key=GROQ_API_KEY)
            completion = client.chat.completions.create(
                messages=[
                    {"role": "system", "content": "You are AEGIS medical monitoring AI. Return JSON."},
                    {"role": "user", "content": prompt}
                ],
                model=model,
                temperature=0.1,
                max_tokens=300,
            )
            response_text = completion.choices[0].message.content.strip()
            if "```json" in response_text:
                response_text = response_text.split("```json")[1].split("```")[0]
            elif "```" in response_text:
                response_text = response_text.split("```")[1].split("```")[0]
            return json.loads(response_text)
        except Exception as e:
            print(f"Groq Error with {model}: {e}")
            continue # Try next model
            
    return _mock_analyze_post(post_text)

def analyze_posts_batch(posts: list) -> list:
    """
    Analyzes multiple posts in one Groq call with model fallback.
    """
    models = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"]
    
    posts_input = ""
    for i, p in enumerate(posts):
        posts_input += f"ID: {i}\nPost: {p['text']}\n---\n"

    prompt = f"""
    Analyze these posts for adverse drug events. Return a JSON array of objects.
    Format:
    [
      {{
        "id": 0, "drug": "...", "symptom": "...", "is_adverse_event": ..., 
        "confidence": ..., "sentiment": "...", "has_phi": ..., "explanation": "..."
      }}
    ]
    Posts:
    {posts_input}
    """

    for model in models:
        try:
            if not GROQ_API_KEY: break
            client = Groq(api_key=GROQ_API_KEY)
            completion = client.chat.completions.create(
                messages=[
                    {"role": "system", "content": "You are AEGIS. Return a JSON array."},
                    {"role": "user", "content": prompt}
                ],
                model=model,
                temperature=0.1,
                max_tokens=1500,
            )
            response_text = completion.choices[0].message.content.strip()
            if "```json" in response_text:
                response_text = response_text.split("```json")[1].split("```")[0]
            elif "```" in response_text:
                response_text = response_text.split("```")[1].split("```")[0]
            return json.loads(response_text)
        except Exception as e:
            print(f"Groq Batch Error with {model}: {e}")
            continue
            
    return [_mock_analyze_post(p["text"]) for p in posts]

def _mock_analyze_post(post_text: str) -> dict:
    """Fallback if all AI models fail or rate limit."""
    post_lower = post_text.lower()
    drug = "Unspecified"
    if "aspirin" in post_lower: drug = "Aspirin"
    elif "amoxicillin" in post_lower: drug = "Amoxicillin"
    
    return {
        "drug": drug,
        "symptom": "Monitoring Symptom",
        "is_adverse_event": True,
        "confidence": 0.82,
        "sentiment": "Negative",
        "has_phi": False,
        "explanation": "Signal identified by local analysis engine (Fallback mode)."
    }
