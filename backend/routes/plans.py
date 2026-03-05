import pandas as pd
import itertools
from services.distance_cal import haversine
import json


def get_key_from_value(dictionary, value):
    for key, val in dictionary.items():
        if val == value:
            return key
    # If value not found, return None or raise an error
    return None

def plans(user_preference2, distance):
    df_res = pd.read_csv('restaurants_sorted.csv')
    df_malls = pd.read_csv('malls_sorted.csv')
    df_clubs = pd.read_csv('clubs_sorted.csv')
    df_nature = pd.read_csv('nature_sorted.csv')
    df_adventure = pd.read_csv('adventure_sorted.csv')


    # user_preference2 = {
    #     1: "df_res",
    #     2: "df_malls",
    #     3: "df_nature",
    #     4: "df_adventure",
    #     5: "df_clubs"
    # }

    user_preference = {}

    # user_preference2 = {
    #     1: "df_res",
    #     2: "df_malls",
    #     3: "df_clubs",
    #     4: "df_nature",
    #     5: "df_adventure"
    # }

 

    for value in user_preference2.values():
        if value == "df_res":
            key_found = get_key_from_value(user_preference2, value)
            user_preference[key_found] = df_res
        if value == "df_malls":
            key_found = get_key_from_value(user_preference2, value)
            user_preference[key_found] = df_malls
        if value == "df_nature":
            key_found = get_key_from_value(user_preference2, value)
            user_preference[key_found] = df_nature
        if value == "df_adventure":
            key_found = get_key_from_value(user_preference2, value)
            user_preference[key_found] = df_adventure
        if value == "df_clubs":
            key_found = get_key_from_value(user_preference2, value)
            user_preference[key_found] = df_clubs
    

    # Take user input
    num_vars = len(user_preference)
        # Generate variables dynamically
    for i in range(1, num_vars + 1):
        globals()[f"indices_df{i}"] = list(range(len(user_preference[i].head())))
        # print(indices_df3)


        # Call the add function with the dynamically generated variables
        # permutations = itertools.product(*args)
    permutations = itertools.product(*[globals()[f"indices_df{i}"] for i in range(1, num_vars + 1)])


    user_distance = distance

    # Store permutations and their distances in a list
    permutations_distances = []

    # Calculate distances and store valid permutations
    for perm in permutations:
        for i in range(1, num_vars + 1):
            globals()[f"row_df{i}"] = user_preference[i].head().iloc[perm[i-1]]

        latitudes = []
        longitudes = []

        temp = []
        for i in range(1, num_vars+1):
            temp.append(eval(f"row_df{i}"))

        valid_perm = True
        for preference, row in zip(perm, temp):
            lat, lon = map(float, row['Latitude, Longitude'].split(','))
            latitudes.append(lat)
            longitudes.append(lon)

            if preference == 0:
                if "df_res" not in user_preference2.values():
                    valid_perm = False
                    break
            elif preference == 1:
                if "df_malls" not in user_preference2.values():
                    valid_perm = False
                    break
            elif preference == 2:
                if "df_nature" not in user_preference2.values():
                    valid_perm = False
                    break
            elif preference == 3:
                if "df_clubs" not in user_preference2.values():
                    valid_perm = False
                    break
            elif preference == 4:
                if "df_adventure" not in user_preference2.values():
                    valid_perm = False
                    break

        if valid_perm:
            distances = [haversine(latitudes[i], longitudes[i], latitudes[i + 1], longitudes[i + 1]) for i in
                        range(len(latitudes) - 1)]
            final_distance = sum(distances)

            if final_distance <= user_distance:
                permutations_distances.append((perm, final_distance))

    # Print the number of valid permutations found
    print(f"Number of valid permutations: {len(permutations_distances)}")

    # Sort permutations based on distances
    sorted_permutations = sorted(permutations_distances, key=lambda x: x[1])

    
    output_dict = {}
    output_data = []

    # Print or do whatever you want with the sorted permutations
    for i in range(min(6, len(sorted_permutations))):
        perm, distance = sorted_permutations[i]
        print(f"Distance: {distance}")
        for i in range(1, num_vars + 1):
            globals()[f"row_df{i}"] = user_preference[i].head().iloc[perm[i-1]]
            # print(f"df{i} row:", eval(f"row_df{i}"))
            output_dict[f"row_df{i}"] = eval(f"row_df{i}").to_dict()

        output_dict = {}
        
        # Appending the dictionary to the output data list
        output_data.append(output_dict)
    # Convert the output data to JSON
    json_output = json.dumps(output_data)

    # Return or do something with the JSON output
    # print(json_output)
    json_data = json.loads(json_output)
    return json_data
