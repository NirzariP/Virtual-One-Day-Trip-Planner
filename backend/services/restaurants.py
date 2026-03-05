import os
import pandas as pd
from services.distance_cal import distance_calculation


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
df_res = pd.read_csv(os.path.join(BASE_DIR, 'data/original/restaurants_new.csv'))


def restaurants_calculation(location , distance, rating, users_budget, cuisine_type):
  sorted_nearest_locations = distance_calculation(location , distance)
  df_res['Budget'] = 0
  for i in range(0, df_res.shape[0]):
      if df_res['Rating'][i] >= 4.5:
          if df_res['Station'][i] == "bandra":
              df_res['Budget'][i] = 1200
          elif df_res['Station'][i] == "andheri":
              df_res['Budget'][i] = 900
          elif df_res['Station'][i] == "vileparle":
              df_res['Budget'][i] = 900
          else:
              df_res['Budget'][i] = 800
      elif 4 <= df_res['Rating'][i] < 4.5:
          if df_res['Station'][i] == "bandra":
              df_res['Budget'][i] = 1000
          elif df_res['Station'][i] == "andheri":
              df_res['Budget'][i] = 800
          elif df_res['Station'][i] == "vileparle":
              df_res['Budget'][i] = 800
          else:
              df_res['Budget'][i] = 700
      else:
          if df_res['Station'][i] == "bandra":
              df_res['Budget'][i] = 900
          elif df_res['Station'][i] == "andheri":
              df_res['Budget'][i] = 700
          elif df_res['Station'][i] == "vileparle":
              df_res['Budget'][i] = 700
          else:
              df_res['Budget'][i] = 600

  cuisine_type = pd.DataFrame(cuisine_type, columns=['Cuisine_Type'])

  restaurants = pd.DataFrame()
  restaurants_cuisine = pd.DataFrame()

  print("hi")
  for i in range(0, df_res.shape[0]):
    for j in range(0,cuisine_type.shape[0]):
      if(df_res['Type'][i] == cuisine_type['Cuisine_Type'][j]):
        restaurants_cuisine = pd.concat([restaurants_cuisine, df_res.iloc[[i]]], axis=0)

  for i in range(0, restaurants_cuisine.shape[0]):
    if((restaurants_cuisine['Rating'].iloc[i] >= rating) and (restaurants_cuisine['Station'].iloc[i] in sorted_nearest_locations) and (restaurants_cuisine['Budget'].iloc[i] <= users_budget)):
      restaurants = pd.concat([restaurants, restaurants_cuisine.iloc[[i]]], axis=0)
  print("no")
  restaurants['Station'] = pd.Categorical(restaurants['Station'], categories=sorted_nearest_locations, ordered=True)
  # Sort the DataFrame based on the 'stations' column
  restaurants = restaurants.sort_values(by=['Station', 'Rating'], ascending=[True, False])
  print("yes")
  restaurants.to_csv('restaurants_sorted.csv', index=False)
  return restaurants

# restaurants = restaurants_calculation()