import os
from services.distance_cal import distance_calculation
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
df_res = pd.read_csv(os.path.join(BASE_DIR, 'data/original/nature_station.csv'))

def nature_calculation(location , distance, rating):
  sorted_nearest_locations = distance_calculation(location , distance)

  nature = pd.DataFrame()
  for i in range(0, df_res.shape[0]):
    if(df_res['Rating'][i] > rating and (df_res['Station'][i] in sorted_nearest_locations)):
      nature = pd.concat([nature, df_res.iloc[[i]]], axis=0)

  nature['Station'] = pd.Categorical(nature['Station'], categories=sorted_nearest_locations, ordered=True)
  # Sort the DataFrame based on the 'stations' column
  nature = nature.sort_values(by=['Station', 'Rating'], ascending=[True, False])
  nature.to_csv('nature_sorted.csv', index=False)
  return nature