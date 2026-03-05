from app import usersinterest_collection, UsersInterests

initial_recommend = {}
further_recommend = {}
user_profile = {}


def initialize_profile(users, df):
    user_profiles = {user: [] for user in users}
    for user, interests_list in users.items():
        all_interests = [interest.strip() for sublist in interests_list for interest in sublist.split(',')]
        user_profiles[user].extend(all_interests)
    result = usersinterest_collection.insert_one(user_profiles)
    print(result)
    return user_profiles