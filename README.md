# 🛡️ Cyber Shield: Password Strength & Security Analyzer
> **DecodeLabs Industrial Training Kit — Project 1: Defensive Logic Engine**  
> *Track: Junior Cybersecurity Analyst*

[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-blue.svg?style=flat-square)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React + Vite](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB.svg?style=flat-square&logo=react)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-38B2AC.svg?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/Animation-GSAP-88CE02.svg?style=flat-square&logo=greensock)](https://greensock.com/)
[![Pytest Passed](https://img.shields.io/badge/Tests-Pytest%20Passing-brightgreen.svg?style=flat-square)](https://pytest.org/)

---

## 📌 Strategic Overview & Objective

Weak and compromised credentials account for over **81% of hacking-related data breaches**. The goal of Project 1 is to build a robust, defensive security validation engine that eliminates reliance on superficial policy checks by combining:

1. **$O(n)$ Linear-Scan Short-Circuit Policy Validation**
2. **Mathematical Shannon Entropy Analysis**
3. **Unicode Expanded Character Pools ($143,000+$ symbols)**
4. **Privacy-Preserving Breach Intelligence via $k$-Anonymity (HIBP API)**

---

## ⚙️ Core Architecture & Engineering Principles

```text
 ┌────────────────────────────────────────────────────────┐
 │                   User Input String                    │
 └───────────────────────────┬────────────────────────────┘
                             │
            ┌────────────────┼────────────────┐
            ▼                ▼                ▼
     ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
     │ validator.py│  │  entropy.py │  │  pwned.py   │
     │  O(n) Rules │  │Shannon Bits │  │k-Anonymity  │
     └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
            │                │                │
            └────────────────┼────────────────┘
                             ▼
     ┌────────────────────────────────────────────────────┐
     │ FastAPI Gateway (server.py) ──► React + GSAP Client│


git clone [https://github.com/Riyaasheikh/password-strength-checker.git](https://github.com/Riyaasheikh/password-strength-checker.git)
cd password-strength-checker

# Initialize virtual environment
python -m venv venv

# Activate virtual environment
# Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# Linux/macOS:
source venv/bin/activate

# Install Python requirements
pip install -r requirements.txt
pip install fastapi uvicorn
Run CLI Terminal Mode:
Bash
python main.py
Run Automated Test Suite:
Bash
pytest
2. Full-Stack Web App (FastAPI + React)
Start the FastAPI Server (Port 8000):
Bash
uvicorn server:app --reload --port 8000
Start the React + GSAP Frontend (Port 5173):
Bash
cd frontend
npm install
npm run dev
Open http://localhost:5173 in your browser.

![Cyber Shield Demo](https://github.com/user-attachments/assets/724c3f1f-7757-4607-936d-2e5b2200fa18)




