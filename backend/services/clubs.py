import os
from services.distance_cal import distance_calculation
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
df_res = pd.read_csv(os.path.join(BASE_DIR, 'data/original/clubs_final.csv'))

def clubs_calculation(location , distance, rating):
  sorted_nearest_locations = distance_calculation(location , distance)

  clubs = pd.DataFrame()
  for i in range(0, df_res.shape[0]):
    if(df_res['Rating'][i] > rating and (df_res['Station'][i] in sorted_nearest_locations)):
      clubs = pd.concat([clubs, df_res.iloc[[i]]], axis=0)

  clubs['Station'] = pd.Categorical(clubs['Station'], categories=sorted_nearest_locations, ordered=True)
  # Sort the DataFrame based on the 'stations' column
  clubs = clubs.sort_values(by=['Station', 'Rating'], ascending=[True, False])
  clubs.to_csv('clubs_sorted.csv', index=False)
  return clubs