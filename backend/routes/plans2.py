import pandas as pd
import itertools
from services.distance_cal import haversine

def plans(input_dict):
    df_res = pd.read_csv('restaurants_sorted.csv')
    df_malls = pd.read_csv('malls_sorted.csv')
    df_clubs = pd.read_csv('clubs_sorted.csv')
    df_nature = pd.read_csv('nature_sorted.csv')
    df_adventure = pd.read_csv('adventure_sorted.csv')

    # user_preference = input_dict

    # # Get the indices of the rows for the head of all datasets
    # indices_df1 = list(range(len(df_res.head())))
    # indices_df2 = list(range(len(df_malls.head())))
    # indices_df3 = list(range(len(df_clubs.head())))
    # indices_df4 = list(range(len(df_nature.head())))
    # indices_df5 = list(range(len(df_adventure.head())))

    df_mapping = {
        1: 'df_res',
        2: 'df_malls',
        3: 'df_clubs',
        4: 'df_nature',
        5: 'df_adventure'
    }

    # Load dataframes based on input_dict
    dataframes = {}
    for key, value in input_dict.items():
        dataframe_name = df_mapping.get(key)
        if dataframe_name:
            dataframes[value] = pd.read_csv(f'{value}_sorted.csv')

    user_preference = input_dict

    # Get the indices of the rows for the head of selected datasets
    indices = {}
    for key, value in input_dict.items():
        dataframe_name = df_mapping.get(key)
        if dataframe_name and value in dataframes:
            indices[f"indices_df_{key}"] = list(range(len(dataframes[value].head())))

    print(indices)

    # Generate permutation combinations
    permutations = itertools.product(*indices.values())

    user_distance = 50

    # Store permutations and their distances in a list
    permutations_distances = []

# Calculate distances and store valid permutations
    for perm in permutations:
        rows = []
        latitudes = []
        longitudes = []

        valid_perm = True
        for key, index in zip(input_dict.keys(), perm):
            dataframe_name = df_mapping.get(key)
            if dataframe_name and dataframe_name in dataframes:
                row = dataframes[dataframe_name].head().iloc[index]
                rows.append(row)

                lat_lon_str = str(row['Latitude, Longitude'])
                lat_lon_values = lat_lon_str.split(',')
                if len(lat_lon_values) != 2:
                    print("Error: Unexpected format for Latitude, Longitude")
                    valid_perm = False
                    break

                lat, lon = map(float, lat_lon_values)
                latitudes.append(lat)
                longitudes.append(lon)

                preference = input_dict[key]
                if preference == 'restaurant' and 'restaurant' not in user_preference.values():
                    valid_perm = False
                    break
                elif preference == 'malls' and 'malls' not in user_preference.values():
                    valid_perm = False
                    break
                elif preference == 'clubs' and 'clubs' not in user_preference.values():
                    valid_perm = False
                    break
                elif preference == 'nature' and 'nature' not in user_preference.values():
                    valid_perm = False
                    break
                elif preference == 'adventure' and 'adventure' not in user_preference.values():
                    valid_perm = False
                    break

        if valid_perm:
            distances = [haversine(latitudes[i], longitudes[i], latitudes[i + 1], longitudes[i + 1]) for i in range(len(latitudes) - 1)]
            final_distance = sum(distances)

            if final_distance <= user_distance:
                permutations_distances.append((perm, final_distance))

        # Print the number of valid permutations found
        # print(f"Number of valid permutations: {len(permutations_distances)}")

        # Sort permutations based on distances
        sorted_permutations = sorted(permutations_distances, key=lambda x: x[1])

# Continue with your existing logic using sorted_permutations...


    # Print or do whatever you want with the sorted permutations
    # for i in range(min(6, len(sorted_permutations))):
    #     perm, distance = sorted_permutations[i]
    #     print(f"Distance: {distance}")
    #     row_df1 = df_res.head().iloc[perm[0]]
    #     row_df2 = df_malls.head().iloc[perm[1]]
    #     row_df3 = df_clubs.head().iloc[perm[2]]
    #     row_df4 = df_nature.head().iloc[perm[3]]
    #     row_df5 = df_adventure.head().iloc[perm[4]]
    #     print("df1 row:", row_df1.values)
    #     print("df2 row:", row_df2.values)
    #     print("df3 row:", row_df3.values)
    #     print("df4 row:", row_df4.values)
    #     print("df5 row:", row_df5.values)


    for i in range(min(6, len(sorted_permutations))):
        perm, distance = sorted_permutations[i]
        print(f"Distance: {distance}")
        rows = []
        for key, index in zip(input_dict.keys(), perm):
            dataframe_name = df_mapping.get(key)
            print(dataframe_name)
            if dataframe_name and dataframe_name in dataframes:
                row = dataframes[dataframe_name].head().iloc[index]
                rows.append(row.values)
            print("rows", rows)
        for j, row_values in enumerate(rows, start=1):
            print(f"df{j} row:", row_values)


#{1: "clubs", 2: "restaurants", 3: "malls", 4: "adventure", 5: "nature"}