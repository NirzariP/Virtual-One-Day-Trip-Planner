import os
from services.distance_cal import distance_calculation
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
df_res = pd.read_csv(os.path.join(BASE_DIR, 'data/original/theatre.csv'), encoding='ISO-8859-1')


def theatre_calculation(location , distance, rating):
  sorted_nearest_locations = distance_calculation(location , distance)

  theatre = pd.DataFrame()
  for i in range(0, df_res.shape[0]):
    if(df_res['Rating'][i] > rating and (df_res['Station'][i] in sorted_nearest_locations)):
      theatre = pd.concat([theatre, df_res.iloc[[i]]], axis=0)

  theatre['Station'] = pd.Categorical(theatre['Station'], categories=sorted_nearest_locations, ordered=True)
  # Sort the DataFrame based on the 'stations' column
  theatre = theatre.sort_values(by=['Station', 'Rating'], ascending=[True, False])
  theatre.to_csv('theatre_sorted.csv', index=False)
  return theatre