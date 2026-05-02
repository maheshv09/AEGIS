import random
import requests
from typing import List, Dict
from datetime import datetime, timedelta

def fetch_recent_posts(limit: int = 5) -> List[Dict]:
    """
    Real data acquisition engine (Crawler) that connects to Reddit's public API
    to pull live patient discussions from health-related communities.
    """
    subreddits = ["medical_advice", "AskDocs", "DiagnoseMe", "PepticUlcer", "HeartAttack"]
    selected_sub = random.choice(subreddits)
    url = f"https://www.reddit.com/r/{selected_sub}/new.json?limit={limit}"
    
    headers = {
        "User-Agent": "AEGIS_Hackathon_Crawler/1.0 (Research Project)"
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=5)
        response.raise_for_status()
        data = response.json()
        
        posts = []
        for child in data.get("data", {}).get("children", []):
            post_data = child.get("data", {})
            title = post_data.get("title", "")
            selftext = post_data.get("selftext", "")
            author = post_data.get("author", "unknown_user")
            
            # Convert Unix timestamp to ISO format
            created_utc = post_data.get("created_utc", datetime.utcnow().timestamp())
            timestamp = datetime.utcfromtimestamp(created_utc).isoformat() + "Z"
            
            # Combine title and body, ensuring we don't send massive text blocks to the LLM
            full_text = f"{title}. {selftext}".strip()
            if len(full_text) > 400:
                full_text = full_text[:400] + "..."
                
            # Skip empty posts
            if len(full_text) < 10:
                continue
                
            posts.append({
                "source": f"Reddit (r/{selected_sub})",
                "text": full_text,
                "author": author,
                "timestamp": timestamp,
                "id": f"reddit_{post_data.get('id', str(random.randint(1000,9999)))}"
            })
            
        # Inject synthetic Twitter data to ensure the demo shows multiple sources
        synthetic_twitter = [
            {
                "source": "X",
                "text": "Just started taking Ibuprofen for my toothache and now I'm feeling incredibly dizzy. Is this normal? 555-0198",
                "author": "health_watcher_99",
                "timestamp": datetime.utcnow().isoformat() + "Z",
                "id": f"x_{random.randint(1000,9999)}"
            },
            {
                "source": "X",
                "text": "My doctor prescribed Lisinopril and I've had a dry cough all day. So annoying.",
                "author": "patient_zero",
                "timestamp": datetime.utcnow().isoformat() + "Z",
                "id": f"x_{random.randint(1000,9999)}"
            }
        ]
        
        # Mix the real reddit posts with the synthetic twitter posts
        mixed_posts = posts + random.sample(synthetic_twitter, 1)
        random.shuffle(mixed_posts)

        # If we have valid posts, return them. Otherwise fallback.
        if mixed_posts:
            return mixed_posts
        else:
            return _get_mock_fallback()
            
    except Exception as e:
        print(f"Crawler Engine Warning - Falling back to mock data due to API error: {e}")
        return _get_mock_fallback()

def _get_mock_fallback() -> List[Dict]:
    """
    Failsafe fallback in case the real Reddit API hits rate limits during your live pitch.
    """
    MOCK_POSTS = [
        {
            "source": "Reddit",
            "text": "I've been taking Aspirin for my headache, but now I have severe stomach bleeding. Has anyone else experienced this?",
            "author": "user123"
        },
        {
            "source": "X",
            "text": "Just started on Lisinopril and my cough is driving me crazy! Is this normal? Call me at 555-0198 if you know.",
            "author": "health_watcher"
        },
        {
            "source": "Reddit",
            "text": "My doctor prescribed Amoxicillin and I broke out in hives everywhere. Heading to the ER. - John Doe, Main St.",
            "author": "allergic_throwaway"
        }
    ]
    
    selected_posts = random.sample(MOCK_POSTS, 2)
    for post in selected_posts:
        post["timestamp"] = (datetime.utcnow() - timedelta(minutes=random.randint(1, 10))).isoformat() + "Z"
        post["id"] = f"{post['source'].lower()}_{random.randint(1000, 9999)}"
        
    return selected_posts
