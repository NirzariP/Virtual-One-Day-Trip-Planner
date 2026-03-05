import os
from pydantic import BaseModel
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MultiLabelBinarizer

class UserInterests(BaseModel):
    Type: list[str]
    Budget: list[float]
    Rating: list[float]


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
df_res = pd.read_csv(os.path.join(BASE_DIR, 'data/original/restaurants_new.csv'))

user_interests = {
    'user1': {'Type': ['Buffet', 'Chinese'], 'Budget': [900], 'Rating': [4.0]},
    'user2': {'Type': ['Indian', 'Punjabi'], 'Budget': [700], 'Rating': [4.5]},
    'user3': {'Type': ['Fast Food', 'Sandwich'], 'Budget': [850], 'Rating': [3.5]}
}

def update_user_interests(user_interests, new_user_interests):
    for user, interests in new_user_interests.items():
        interests =dict(interests)
        if user in user_interests:
            user_interests[user]['Type'].extend(interests.get('Type', []))
            user_interests[user]['Budget'].extend(interests.get('Budget', []))
            user_interests[user]['Rating'].extend(interests.get('Rating', []))
        else:
            user_interests[user] = interests

    return user_interests

def preprocess_user_interests(interests, columns):
    user_vector = [0] * len(columns)
    for interest_type in interests['Type']:
        if interest_type in columns:
            user_vector[columns.get_loc(interest_type)] = 1
    for budget_value in interests['Budget']:
        if budget_value in columns:
            user_vector[columns.get_loc(budget_value)] = 1
    if 'Rating' in interests:
        user_vector[-1] = interests['Average_Rating']
    if 'Average_Budget' in interests:
        user_vector[-2] = interests['Average_Budget']
    return user_vector

def update_user_average_values(user_interests):
    for user, interests in user_interests.items():
        interests['Average_Budget'] = np.mean(interests['Budget'])
        interests['Average_Rating'] = np.mean(interests['Rating'])

def preprocess_data(data):
    mlb = MultiLabelBinarizer()
    restaurant_types = mlb.fit_transform(data['Type'].apply(lambda x: [x]))
    budgets = pd.get_dummies(data['Budget'])
    ratings = data['Rating'].apply(lambda x: 1 if x >= 4.0 else 0)
    X = pd.concat([pd.DataFrame(restaurant_types, columns=mlb.classes_), budgets, ratings], axis=1)
    return X

def get_recommendations(user_interests, data, n_recommendations=5):
    X = preprocess_data(data)
    recommendations = {}
    for user, interests in user_interests.items():
        user_vector = preprocess_user_interests(interests, X.columns)
        similarity_scores = cosine_similarity([user_vector], X)
        similar_restaurants = pd.DataFrame({'Name': data['Name'], 'Rating': data['Rating'], 'Similarity': similarity_scores[0]})
        similar_restaurants = similar_restaurants[similar_restaurants['Rating'] >= interests['Average_Rating']]
        similar_restaurants = similar_restaurants.sort_values(by='Similarity', ascending=False).head(n_recommendations)
        recommendations[user] = similar_restaurants['Name'].tolist()
    return recommendations