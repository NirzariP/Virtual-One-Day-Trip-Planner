import pandas as pd
import json
from sklearn.metrics.pairwise import cosine_similarity

users = {
    'User1': ['Buffet', 'Chinese'],
    'User2': ['Indian', 'Punjabi'],
    'User3': ['Italian', 'Chinese'],
    'User4': ['Fast Food', 'Sandwich'],
    'User5': ['Restaurant', 'Organic'],
    'User6': ['Hamburger', 'Restaurant', 'Indian']
}

user_likes = {
    'User1': ['Ratnagiri Coastal Bar', 'Aditi Fast Food & Restaurant'],
    'User2': ['Jumbo king'],
    'User3': [],
    'User4': [],
    'User5': [],
    'User6': []
}
initial_recommend = {}
further_recommend = {}
user_profile = {}

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
    return initial_recommendations

def update_profiles(user_likes, user_profiles, df):
    for user, liked_restaurants in user_likes.items():
        liked_types = []
        liked_budgets = []
        liked_ratings = []
        for liked_restaurant in liked_restaurants:
            restaurant = df[df['Name'] == liked_restaurant]
            if len(restaurant) > 0:
                liked_types.extend(restaurant['Type'].values[0].split(','))
                liked_budgets.append(restaurant['Budget'].values[0])
                liked_ratings.append(restaurant['Rating'].values[0])

        mean_budget = sum(liked_budgets) / len(liked_budgets) if liked_budgets else df['Budget'].mean()
        mean_rating = sum(liked_ratings) / len(liked_ratings) if liked_ratings else df['Rating'].mean()
        user_profiles[user].extend(liked_types)
        user_profiles[user].append(f"Mean Budget: {mean_budget}")
        user_profiles[user].append(f"Mean Rating: {mean_rating}")
    return user_profiles

def recommend_further(users, user_profiles, df):
    further_recommendations = {}
    for user, profile in user_profiles.items():
        user_profile_vec = vectorize_profile(profile, df)
        similar_users = find_similar_users(user_profile_vec, user_profiles, df)
        recommendations = recommend_restaurants_for_similar_users(similar_users, df, user_profiles)  # Pass user_profiles here
        further_recommendations[user] = recommendations.to_json(orient="records")
    return further_recommendations

def recommend_restaurants(interests, df):
    interests = [interest.strip() for interest in interests]
    recommended_restaurants = df[df['Type'].apply(lambda x: any(item.lower() in x.lower() for item in interests))]
    return recommended_restaurants.head(5)

def vectorize_profile(profile, df):
    vector = [0] * len(df)
    for i, row in df.iterrows():
        for interest in profile:
            if interest in row['Type']:
                vector[i] += 1
    return vector

def find_similar_users(user_profile_vec, user_profiles, df):
    similarities = {}
    for user, profile in user_profiles.items():
        profile_vec = vectorize_profile(profile, df)
        similarity = cosine_similarity([user_profile_vec], [profile_vec])[0][0]
        similarities[user] = similarity
    similar_users = sorted(similarities, key=similarities.get, reverse=True)[1:]  # Exclude the user itself
    return similar_users

def recommend_restaurants_for_similar_users(similar_users, df, user_profiles):
    recommended_restaurants = pd.DataFrame(columns=df.columns)
    for user in similar_users:
        recommendations = recommend_restaurants(user_profiles[user], df)
        recommended_restaurants = pd.concat([recommend_restaurants(user_profiles[user], df) for user in similar_users])
    recommended_restaurants = recommended_restaurants.drop_duplicates().head(5)
    return recommended_restaurants

def main(users, user_likes, df):
    user_profiles = initialize_profiles(users, df)
    initial_recommendations = recommend_initial(users, user_profiles, df)
    user_profiles = update_profiles(user_likes, user_profiles, df)
    further_recommendations = recommend_further(users, user_profiles, df)

    for user, recommendations in initial_recommendations.items():
        initial_recommend[user] = recommendations

    for user, recommendations in further_recommendations.items():
        further_recommend[user] = recommendations

    for user, profile in user_profiles.items():
        user_profile[user] = json.dumps(profile)

    return initial_recommend, further_recommend, user_profile

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

# # User profile
# for user, recommendations in user_profile.items():
#     print(f"Profile for {user}:")
#     print(recommendations)
#     print()