import hashlib
import requests

class BreachChecker:
    """
    Checks if a password has been compromised in known data breaches
    using the HaveIBeenPwned API with k-Anonymity model.
    """

    API_URL = "https://api.pwnedpasswords.com/range/"

    def __init__(self, password: str):
        self.password = password

    def check_pwned_status(self) -> dict:
        """
        Hashes password locally, queries HIBP API with 5-char SHA-1 prefix,
        and parses local match counts.
        """
        # Step 1: Hash password locally (SHA-1)
        sha1_password = hashlib.sha1(self.password.encode("utf-8")).hexdigest().upper()
        prefix = sha1_password[:5]
        suffix = sha1_password[5:]

        try:
            # Step 2: Query API with prefix only (k-Anonymity)
            response = requests.get(f"{self.API_URL}{prefix}", timeout=5)
            
            if response.status_code != 200:
                return {
                    "is_breached": False,
                    "breach_count": 0,
                    "error": f"API error: {response.status_code}"
                }

            # Step 3: Search for matching suffix in returned hashes
            hashes = (line.split(":") for line in response.text.splitlines())
            for h, count in hashes:
                if h == suffix:
                    return {
                        "is_breached": True,
                        "breach_count": int(count),
                        "error": None
                    }

            return {
                "is_breached": False,
                "breach_count": 0,
                "error": None
            }

        except requests.RequestException as e:
            return {
                "is_breached": False,
                "breach_count": 0,
                "error": f"Network error: {str(e)}"
            }