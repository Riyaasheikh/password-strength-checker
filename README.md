# Enterprise Password Strength & Security Analyzer
**DecodeLabs Industrial Training - Project 1**

A high-performance security utility built to analyze password policy compliance, mathematical Shannon Entropy, and real-time breach exposures using privacy-preserving k-Anonymity models.

## Security Architecture & Design Principles

1. **Short-Circuit Policy Validation:**
   - Evaluates string composition in $O(n)$ linear time complexity using C-optimized Python generator expressions.
   - Eliminates redundant iteration loops to minimize CPU overhead.

2. **Shannon Entropy Engine:**
   - Measures true information density in bits using:
     $$H = -\sum_{i=1}^{n} p_i \log_2(p_i)$$
   - Dynamically calculates character pool bounds ($N$), supporting standard ASCII ranges up to extended Unicode spaces ($143,000+$ symbols).

3. **k-Anonymity Breach Intelligence:**
   - Interfaces with the HaveIBeenPwned API without exposing raw passwords or full hashes.
   - Hashes passwords locally via SHA-1, submitting only the first 5 hexadecimal prefix characters over TLS. Suffix matching is performed in-memory.

## Directory Structure

```text
password-strength-checker/
├── data/
├── src/
│   ├── core/
│   │   ├── validator.py    # Policy & pattern rules engine
│   │   └── entropy.py      # Shannon entropy calculation engine
│   ├── services/
│   │   └── pwned_service.py # HIBP API integration (k-Anonymity)
│   └── utils/
├── tests/
│   └── test_validator.py  # Pytest suite
├── main.py                # Rich CLI interface
└── requirements.txt