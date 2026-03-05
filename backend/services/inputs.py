# Input Function
def inputs():
  speed = {"walking": 5, "train": 33.5, "driving":58}   # mode of transport speeds (in km/hr)
  time = float(input("Enter amount of time available(in hr): "))
  mode_of_transport = str(input("Enter mode of transport: "))
  distance = speed[mode_of_transport] * time
  location = str(input("Enter your location(station): "))
  rating = float(input("Enter rating: "))
  users_budget = int(input("Enter your budget: "))
  cuisine_type = eval(input("Enter a list of preferred cuisine: "))
  return time, mode_of_transport, distance, location, rating, users_budget, cuisine_type