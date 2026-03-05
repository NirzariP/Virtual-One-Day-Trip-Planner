# 🗺️ Virtual One-Day Trip Planner

A full-stack web application that helps users plan a personalized one-day trip based on their preferences, location, budget, and interests. The app recommends restaurants — tailored to the user.

---

## 📸 Screenshots

> Replace the placeholders below with actual screenshots of your app.

<table>
  <tr>
    <td><b>Home / Landing Page</b></td>
    <td><b>Interest Selection</b></td>
  </tr>
  <tr>
    <td><img src="./ui/home_page.jpeg" width="400"/></td>
    <td><img src="./ui/interest_selection.jpeg" width="400"/></td>
  </tr>
  <tr>
    <td><b>Filters Page</b></td>
    <td><b>Trip Plans Page</b></td>
  </tr>
  <tr>
    <td><img src="./ui/trip_plans.jpeg" width="400"/></td>
    <td><img src="./ui/customizable_plan.jpeg" width="400"/></td>
  </tr>
</table>

---

## 💻 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Chakra UI, Axios |
| Backend | FastAPI, Python |
| Database | MongoDB |
| ML | scikit-learn, pandas, numpy |
| Auth | bcrypt, passlib |
| Containerization | Docker, Docker Compose |

---

## 📁 Project Structure

```
Virtual One Day Trip Planner/
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── context/            # React context (e.g. selected images)
│   │   └── pages/              # Page components
│   ├── Dockerfile
│   └── package.json
│
├── backend/                    # FastAPI backend
│   ├── app.py                  # Main entry point
│   ├── models.py               # Pydantic models
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── services/               # Business logic
│   │   ├── recommend.py
│   │   ├── recommend2.py
│   │   ├── restaurants.py
│   │   ├── clubs.py
│   │   ├── malls.py
│   │   ├── nature.py
│   │   ├── adventure.py
│   │   ├── religious.py
│   │   ├── theatre.py
│   │   ├── plans.py
│   │   ├── inputs.py
│   │   ├── profile.py
│   │   └── distance_cal.py
│   └── data/                   # CSV datasets and ML models
│       ├── restaurants_new.csv
│       ├── clubs_final.csv
│       ├── MallsDataset.csv
│       ├── AdventureDataset.csv
│       ├── nature_station.csv
│       ├── religious.csv
│       ├── theatre.csv
│       └── restaurant_recommendation_model.pkl
│
└── docker-compose.yml
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://www.python.org/) (v3.11+)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) or Docker
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (optional)

---

### 🐳 Run with Docker (Recommended)

```bash
docker-compose up --build
```

- Frontend → http://localhost:3000
- Backend → http://localhost:8000
- MongoDB → localhost:27017

---

### 🖥️ Run Locally (Without Docker)

#### 1. Start MongoDB
```powershell
net start MongoDB
```

#### 2. Start Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload
```

#### 3. Start Frontend
```bash
cd frontend
npm install
npm start
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Register a new user |
| POST | `/signin` | Login a user |
| POST | `/plans` | Get personalized trip plans |
| POST | `/recommend2` | Get place recommendations |
| PUT | `/update_user/{id}` | Update user liked plans |
| POST | `/getUserInfo/{id}` | Get user information |

---

## ⚙️ Environment

The backend connects to MongoDB at `mongodb://localhost:27017/` locally, or `mongodb://mongodb:27017/` when running with Docker.

Update this in `backend/app.py`:
```python
client = MongoClient('mongodb://localhost:27017/')  # local
# client = MongoClient('mongodb://mongodb:27017/')  # docker
```

---

## 🤖 How Recommendations Work

1. User selects interests (restaurants, clubs, nature, etc.)
2. User sets filters (budget, rating, transport, location, hours)
3. Backend calculates reachable places using distance and transport speed
4. ML model uses **cosine similarity** and **MultiLabelBinarizer** to rank recommendations based on user interest profile
5. Results are returned as a personalized one-day itinerary

---

## 📦 Key Dependencies

### Frontend
- `react` — UI framework
- `@chakra-ui/react` — component library
- `axios` — HTTP requests
- `react-router-dom` — routing

### Backend
- `fastapi` — web framework
- `uvicorn` — ASGI server
- `pymongo` — MongoDB driver
- `scikit-learn` — ML recommendations
- `passlib` + `bcrypt` — password hashing
- `pandas` + `numpy` — data processing

---

## 📄 Publication

This project is based on our research paper. If you use this work, please cite:

**DOI:** [10.61552/JSI.2024.02.003](https://jsi.aspur.rs/archive/v1/n2/3.php)

---

## 👤 Authors

Built by **Nirzari Parikh**, **Gauri Bhosle**, **Khushi Jobanputra**, **Anushka Pandit**
