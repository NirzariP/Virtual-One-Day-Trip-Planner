import math
import os
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
df_res = pd.read_csv(os.path.join(BASE_DIR, 'data/original/restaurants_new.csv'))

def haversine(lat1, lon1, lat2, lon2):
    # Convert latitude and longitude from degrees to radians
    lat1 = math.radians(lat1)
    lon1 = math.radians(lon1)
    lat2 = math.radians(lat2)
    lon2 = math.radians(lon2)

    # Radius of the Earth in kilometers
    radius = 6371.0

    # Haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = math.sin(dlat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = radius * c

    return distance

def distance_calculation(location , distance):
  vp_lat = 19.099265258604976
  vp_long = 72.84431162256634

  gor_lat = 19.164765683507298
  gor_long = 72.84935919918527

  bandra_lat = 19.059123193289654
  bandra_long = 72.83982606343038

  andheri_lat = 19.11987904394754
  andheri_long = 72.84654848226351

  # Calling haversine function to cal distance between stations
  vp_to_gor = haversine(vp_lat, vp_long, gor_lat, gor_long)
  vp_to_andheri = haversine(vp_lat, vp_long, andheri_lat, andheri_long)
  gor_to_bandra = haversine(gor_lat, gor_long, bandra_lat, bandra_long)
  andheri_to_gor = haversine(andheri_lat, andheri_long, gor_lat, gor_long)
  andheri_to_bandra = haversine(andheri_lat, andheri_long, bandra_lat, bandra_long)
  vp_to_bandra = haversine(vp_lat, vp_long, bandra_lat, bandra_long)

  distance_matrix = [
      [0, andheri_to_bandra, vp_to_bandra, gor_to_bandra],
      [andheri_to_bandra, 0, vp_to_andheri, andheri_to_gor],
      [vp_to_bandra, vp_to_andheri, 0, vp_to_gor],
      [gor_to_bandra, andheri_to_gor, vp_to_gor, 0]
  ]

  columns = ["bandra", "andheri", "vileparle", "goregaon"]
  rows = {0: "bandra", 1: "andheri", 2: "vileparle", 3: "goregaon"}

  df = pd.DataFrame(distance_matrix, columns=columns)

  # Printing the entire DataFrame
  # print(df)
  distances = []
  nearest_locations = []
  for i in range(0,4):
    if(df[location][i] < distance):
      nearest_locations.append(rows[i])
      distances.append(df[location][i])

  sorted_data = sorted(zip(distances, nearest_locations))
  sorted_distances, sorted_nearest_locations = zip(*sorted_data)
  # print("Sorted Nearest Locations:", sorted_nearest_locations)
  # print("Sorted Distances:", sorted_distances)
  # df.head()
  return sorted_nearest_locations