import pandas as pd
import json
from pymongo import MongoClient
from bson.objectid import ObjectId

initial_recommend = {}
further_recommend = {}
user_profile = {}

client = MongoClient('mongodb://mongodb:27017/')
db = client['test']
users_collection = db['users']


def initialize_profiles(users, df):
    user_profiles = {user: [] for user in users}
    for user, interests_list in users.items():
        all_interests = [interest.strip() for sublist in interests_list for interest in sublist.split(',')]
        user_profiles[user].extend(all_interests)
    return user_profiles

def recommend_initial(users, user_profiles, df):
    initial_recommendations = {}
    for user, interests in user_profiles.items():
        recommendations = recommend_restaurants(interests, df)
        initial_recommendations[user] = recommendations.to_json(orient="records")
    return recommendations

def update_profiles(user_likes, user_profiles, df, id):
    print("user_likes", user_likes)
    for user, liked_restaurants in user_likes.items():
        liked_types = []
        liked_budgets = []
        liked_ratings = []
        for liked_restaurant in liked_restaurants:
            restaurant = df[df['Name'] == liked_restaurant]
            if len(restaurant) > 0:
                liked_types.extend(restaurant['Type'].values[0].split(','))
                # liked_budgets.append(restaurant['Budget'].values[0])
                # liked_ratings.append(restaurant['Rating'].values[0])

        # mean_budget = sum(liked_budgets) / len(liked_budgets) if liked_budgets else df['Budget'].mean()
        # mean_rating = sum(liked_ratings) / len(liked_ratings) if liked_ratings else df['Rating'].mean()
        user_profiles[user].extend(liked_types)
        # user_profiles[user].append(f"Mean Budget: {mean_budget}")
        # user_profiles[user].append(f"Mean Rating: {mean_rating}")
        for user, cuisines in user_profiles.items():
            unique_cuisines = list(set(cuisines))
            user_profiles[user] = unique_cuisines
        users_collection.update_one({"_id": ObjectId(id)}, {'$set': {'userInterest': user_profiles}})
        print("user_profile", user_profiles)
    return user_profiles

def recommend_further(users, user_profiles, df):
    further_recommendations = {}
    for user, profile in user_profiles.items():
        recommendations = recommend_restaurants(profile, df)
        further_recommendations[user] = recommendations.to_json(orient="records")
    return recommendations

def recommend_restaurants(interests, df):
    interests = [interest.strip() for interest in interests]
    recommended_restaurants = df[df['Type'].apply(lambda x: any(item.lower() in x.lower() for item in interests))]
    return recommended_restaurants.head(10)

def recommend2(users, user_likes, df, id):
    user_profiles = initialize_profiles(users, df)
    initial_recommendations = recommend_initial(users, user_profiles, df)
    user_profiles = update_profiles(user_likes, user_profiles, df, id)
    further_recommendations = recommend_further(users, user_profiles, df)

    # for user, recommendations in initial_recommendations.items():
    #     initial_recommend[user] = recommendations

    # for user, recommendations in further_recommendations.items():
    #     further_recommend[user] = recommendations

    # for user, profile in user_profiles.items():
    #     user_profile[user] = json.dumps(profile)
    
    # print(type(initial_recommend))
    # print(type(further_recommend))
    # print(type(user_profile))

    # initial_recommend_json = json.loads(initial_recommend.values().replace('\\', ''))
    # further_recommend_json = json.loads(further_recommend.values().replace('\\', ''))
    # user_profile_json = json.loads(user_profile.values().replace('\\', ''))
        
    # Removing backslashes
    # for item in initial_recommend:
    #     for key, value in item.items():
    #         item[key] = value.replace("\\", "")
    #         json.loads(item[key])
    # Printing the modified data
    # for item in initial_recommend:
        # print(json.loads(item["User1"]))
    return initial_recommendations, further_recommendations
    # return initial_recommend_json, further_recommend_json, user_profile_json

# initial_recommend, further_recommend, user_profile = main(users, user_likes, df_res)

# Print Statements
# Initial recommendation
# for user, recommendations in initial_recommend.items():
#     print(f"{user}:")
#     for recommendation in json.loads(recommendations):
#         print(recommendation)
#     print()
# # Further recommendation
# for user, recommendations in further_recommend.items():
#     print(f"{user}:")
#     for recommendation in json.loads(recommendations):
#         print(recommendation)
#     print()
# User profile
# for user, recommendations in user_profile.items():
#     print(f"Profile for {user}:")
#     print(recommendations)
#     print()