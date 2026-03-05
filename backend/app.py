# 1. Library imports
import os
import uvicorn ##ASGI
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MultiLabelBinarizer
import pandas as pd
from services.recommend import update_user_interests, update_user_average_values, get_recommendations
from services.restaurants import restaurants_calculation
from services.inputs import inputs
from services.malls import malls_calculation
from services.clubs import clubs_calculation
from services.nature import nature_calculation
from services.adventure import adventure_calculation
from services.religious import religious_calculation
from services.theatre import theatre_calculation
from routes.plans import plans
from services.recommend2 import recommend2
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from services.recommend2 import recommend_initial, recommend_further, update_profiles, initialize_profiles
from fastapi import HTTPException, Depends, status
from passlib.context import CryptContext
from pymongo import MongoClient
from bson.objectid import ObjectId
from fastapi.encoders import jsonable_encoder

app = FastAPI()

# Allow requests from your frontend domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


# client = MongoClient('mongodb+srv://<your mongo id>')
client = MongoClient('mongodb://mongodb:27017/')
db = client['test']
users_collection = db['users']
usersinterest_collection = db['usersInterests']

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Pydantic models for User and UserInDB
class User(BaseModel):
    name: str
    email: str
    password: str
    userInterest: Dict[str, list[str]] #cuisine-type
    user_likes: Dict[str, list[str]] # restaurant name in list and new res gets appended

class UserInDB(BaseModel):
    name: str
    email: str
    hashed_password: str
    userInterest: Dict[str, list[str]] #cuisine-type
    user_likes: Dict[str, list[str]]

class UsersInterests(BaseModel):
    id: str
    res: list[str] #name of restaurant
    budget: list[float]
    rating: list[float]

class recommend(BaseModel):
    userId: str
    initial: dict
    further: dict

class UserPreferenceInput(BaseModel):
    preferences: Dict[int, str]
    mode_of_transport: str
    time: float
    location: str
    users_budget: int
    cuisine_type: list[str]
    rating: float



BASE_DIR = os.path.dirname(os.path.abspath(__file__))
df_res = pd.read_csv(os.path.join(BASE_DIR, 'data/original/restaurants_new.csv'))


def initialize_profile(users, df):
    user_profiles = {user: [] for user in users}
    for user, interests_list in users.items():
        all_interests = [interest.strip() for sublist in interests_list for interest in sublist.split(',')]
        user_profiles[user].extend(all_interests)
    result = usersinterest_collection.insert_one(user_profiles)
    # print("Initial", result)
    return user_profiles


@app.post('/plans')
def get_plans(user_preference2: UserPreferenceInput):
    # print("Pref", user_preference2)
    speed = {"walking": 5, "train": 33.5, "driving":58}
    distance = speed[user_preference2.mode_of_transport] * user_preference2.time
    for key, value in user_preference2.preferences.items():
        if value == 'df_res':
            restaurants = restaurants_calculation(user_preference2.location , distance, user_preference2.rating, user_preference2.users_budget, user_preference2.cuisine_type)
        if value == 'df_clubs':
            clubs = clubs_calculation(user_preference2.location , distance, user_preference2.rating)
        if value == 'df_nature':
            nature = nature_calculation(user_preference2.location , distance, user_preference2.rating)
        if value == 'df_adventure':
            adventure = adventure_calculation(user_preference2.location , distance, user_preference2.rating)
        if value == 'df_malls':
            malls = malls_calculation(user_preference2.location , distance, user_preference2.rating)
        if value == 'df_theatre':
            theatre = theatre_calculation(user_preference2.location , distance, user_preference2.rating)
        if value == 'df_religious':
            religious = religious_calculation(user_preference2.location , distance, user_preference2.rating)
    final_plans = plans(user_preference2.preferences, distance)
    return final_plans


@app.post('/recommend2')
def get_recommendations(id):
    user = users_collection.find_one({"_id": ObjectId(id)}) #id of that particular user from frontend
    # print("Rec user", user)
    users=user['userInterest']
    print("Interest", users)
    user_likes=user['user_likes']
    print("likes", user_likes)
    initial_recommend, further_recommend = recommend2(users, user_likes, df_res, id)
    return initial_recommend.to_dict(),further_recommend.to_dict()

@app.post('/getUserInfo/{id}')
def get_userinfo(id: str):
    # Convert the string ID to ObjectId
    user_id = ObjectId(id)
    
    # Assuming `users_collection` is your MongoDB collection object
    user = users_collection.find_one({"_id": user_id})
    
    # Print or return the user information
    print(user)
    return user

# Hashing the password
def get_password_hash(password):
    return pwd_context.hash(password[:72])

# Saving user to the database
def save_user(user: UserInDB):
    user_dict = user.dict()
    user_dict['hashed_password'] = get_password_hash(user_dict['password'])
    del user_dict['password']
    result = users_collection.insert_one(user_dict)
    return result.inserted_id

# Getting user from the database
def get_user(email: str):
    user_data = users_collection.find_one({"email": email})
    if user_data:
        return UserInDB(**user_data), user_data["_id"]

# Authenticating user
def authenticate_user(email: str, password: str):
    user, userid = get_user(email)
    if not user:
        return False
    if not pwd_context.verify(password, user.hashed_password):
        return False
    return user, userid


# Routes
@app.post("/signup")
async def signup(user: User):
    user_data = get_user(user.email)
    if user_data is not None:
        existing_user, userid = user_data
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    
    save_user(user)
    initialize_profile(user.userInterest, df_res)
    return {"message": "User created successfully"}

@app.post("/signin")
async def signin(user_data: User):
    email = user_data.email
    password = user_data.password
    user, userid = authenticate_user(email, password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    return {"userid": str(userid)}

# Function to get the next available numerical key
def get_next_key(user_likes: Dict[str, list[str]]) -> str:
    if not user_likes:
        return "1"
    else:
        return str(len(user_likes) + 1)

# API endpoint to update user data based on user ID
@app.put("/update_user/{user_id}")
async def update_user(user_id: str, liked_plan: str):
    # Convert user_id to ObjectId
    obj_id = ObjectId(user_id)
    
    # Retrieve user data from the database
    user_data = users_collection.find_one({"_id": obj_id})
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Extract existing user_likes from user_data
    user_likes = user_data.get("user_likes", {})
    
    # Get the next available numerical key
    next_key = get_next_key(user_likes)
    
    # Append the new liked plan with the next numerical key
    user_likes[next_key] = [liked_plan]
    
    # Update the user document in the database
    result = users_collection.update_one(
        {"_id": obj_id},
        {"$set": {"user_likes": user_likes}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=500, detail="Failed to update user data")
    
    return {"message": "Liked plan added successfully"}

if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
#uvicorn app:app --reload