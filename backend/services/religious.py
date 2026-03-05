import os
from services.distance_cal import distance_calculation
import pandas as pd


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
df_res = pd.read_csv(os.path.join(BASE_DIR, 'data/original/religious.csv'))

def religious_calculation(location , distance, rating):
  sorted_nearest_locations = distance_calculation(location , distance)
  
  religious = pd.DataFrame()
  for i in range(0, df_res.shape[0]):
    if(df_res['Ratings'][i] > rating and (df_res['station'][i] in sorted_nearest_locations)):
      religious = pd.concat([religious, df_res.iloc[[i]]], axis=0)

  religious['station'] = pd.Categorical(religious['station'], categories=sorted_nearest_locations, ordered=True)
  # Sort the DataFrame based on the 'stations' column
  religious = religious.sort_values(by=['station', 'Ratings'], ascending=[True, False])
  religious.to_csv('religious_sorted.csv', index=False)
  return religious