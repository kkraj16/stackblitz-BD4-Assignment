BD4 - Assignment
SPEC Document for FoodieFinds Backend
Objective
In this lesson, we will build a backend for a food discovery app called 'FoodieFinds' using raw SQL queries for reading data. This system will allow users to search for restaurants and dishes based on various filters and sorting options. By the end of this lesson, you will have learned how to:

Write raw SQL queries to read data from a database.

Implement various filtering and sorting options.

Retrieve details of specific restaurants and dishes.

Database Seeder
How to use DB Seeders
Create a folder for the exercise

Create initDB.js file in the folder.

Copy/Paste the content in the initDB.js file provided for the exercise

Update the 4th line which looks like const db = new sqlite3.Database('./BD4_Assignment1/database.sqlite', (err) =>

Replace ./BD4_Assignment1 with your folder name. You’ll use this path in the index.js file too

Open the Shell and run the command node <folder_name>/initDB.js

This will create the database file inside the exercise folder





Exercise 1: Get All Restaurants
Objective: Fetch all restaurants from the database.

Query Parameters: None

Tasks: Implement a function to fetch all restaurants.

Example Call:
http://localhost:3000/restaurants
Expected Output:
{
	'restaurants': [
	  {
	    'id': 1,
	    'name': 'Spice Kitchen',
	    'cuisine': 'Indian',
	    'isVeg': 'true',
	    'rating': 4.5,
	    'priceForTwo': 1500,
	    'location': 'MG Road',
	    'hasOutdoorSeating': 'true',
	    'isLuxury': 'false'
	  },
	  {
	    'id': 2,
	    'name': 'Olive Bistro',
	    'cuisine': 'Italian',
	    'isVeg': 'false',
	    'rating': 4.2,
	    'priceForTwo': 2000,
	    'location': 'Jubilee Hills',
	    'hasOutdoorSeating': 'false',
	    'isLuxury': 'true'
	  },
	  {
	    'id': 3,
	    'name': 'Green Leaf',
	    'cuisine': 'Chinese',
	    'isVeg': 'true',
	    'rating': 4.0,
	    'priceForTwo': 1000,
	    'location': 'Banjara Hills',
	    'hasOutdoorSeating': 'false',
	    'isLuxury': 'false'
	  }
	]
}




Exercise 2: Get Restaurant by ID
Objective: Fetch a specific restaurant by its ID.

Query Parameters:

id (integer)

Tasks: Implement a function to fetch a restaurant by its ID.

Example Call:
http://localhost:3000/restaurants/details/1
Expected Output:
{
	'restaurant': {
	  'id': 1,
	  'name': 'Spice Kitchen',
	  'cuisine': 'Indian',
	  'isVeg': 'true',
	  'rating': 4.5,
	  'priceForTwo': 1500,
	  'location': 'MG Road',
	  'hasOutdoorSeating': 'true',
	  'isLuxury': 'false'
	}
}




Exercise 3: Get Restaurants by Cuisine
Objective: Fetch restaurants based on their cuisine.

Query Parameters:

cuisine (string)

Tasks: Implement a function to fetch restaurants by cuisine.

Example Call:
http://localhost:3000/restaurants/cuisine/Indian
Expected Output:
{
	'restaurants': [
	  {
	    'id': 1,
	    'name': 'Spice Kitchen',
	    'cuisine': 'Indian',
	    'isVeg': 'true',
	    'rating': 4.5,
	    'priceForTwo': 1500,
	    'location': 'MG Road',
	    'hasOutdoorSeating': 'true',
	    'isLuxury': 'false'
	  }
	]
}




Exercise 4: Get Restaurants by Filter
Objective: Fetch restaurants based on filters such as veg/non-veg, outdoor seating, luxury, etc.

Query Parameters:

isVeg (string)

hasOutdoorSeating (string)

isLuxury (string)

Tasks: Implement a function to fetch restaurants by these filters.

Example Call:
http://localhost:3000/restaurants/filter?isVeg=true&hasOutdoorSeating=true&isLuxury=false
Expected Output:
{
	'restaurants': [
	  {
	    'id': 1,
	    'name': 'Spice Kitchen',
	    'cuisine': 'Indian',
	    'isVeg': 'true',
	    'rating': 4.5,
	    'priceForTwo': 1500,
	    'location': 'MG Road',
	    'hasOutdoorSeating': 'true',
	    'isLuxury': 'false'
	  }
	]
}





Exercise 5: Get Restaurants Sorted by Rating
Objective: Fetch restaurants sorted by their rating ( highest to lowest ).

Query Parameters: None

Tasks: Implement a function to fetch restaurants sorted by rating.

Example Call:
http://localhost:3000/restaurants/sort-by-rating
Expected Output:
{
	'restaurants': [
	  {
	    'id': 1,
	    'name': 'Spice Kitchen',
	    'cuisine': 'Indian',
	    'isVeg': 'true',
	    'rating': 4.5,
	    'priceForTwo': 1500,
	    'location': 'MG Road',
	    'hasOutdoorSeating': 'true',
	    'isLuxury': 'false'
	  },
	  {
	    'id': 2,
	    'name': 'Olive Bistro',
	    'cuisine': 'Italian',
	    'isVeg': 'false',
	    'rating': 4.2,
	    'priceForTwo': 2000,
	    'location': 'Jubilee Hills',
	    'hasOutdoorSeating': 'false',
	    'isLuxury': 'true'
	  },
	  {
	    'id': 3,
	    'name': 'Green Leaf',
	    'cuisine': 'Chinese',
	    'isVeg': 'true',
	    'rating': 4.0,
	    'priceForTwo': 1000,
	    'location': 'Banjara Hills',
	    'hasOutdoorSeating': 'false',
	    'isLuxury': 'false'
	  }
	]
}




Exercise 6: Get All Dishes
Objective: Fetch all dishes from the database.

Query Parameters: None

Tasks: Implement a function to fetch all dishes.

Example Call:
http://localhost:3000/dishes
Expected Output:
{
	'dishes': [
	  {
	    'id': 1,
	    'name': 'Paneer Butter Masala',
	    'price': 300,
	    'rating': 4.5,
	    'isVeg': 'true'
	  },
	  {
	    'id': 2,
	    'name': 'Chicken Alfredo Pasta',
	    'price': 500,
	    'rating': 4.7,
	    'isVeg': 'false'
	  },
	  {
	    'id': 3,
	    'name': 'Veg Hakka Noodles',
	    'price': 250,
	    'rating': 4.3,
	    'isVeg': 'true'
	  }
	]
}




Exercise 7: Get Dish by ID
Objective: Fetch a specific dish by its ID.

Query Parameters:

id (integer)

Tasks: Implement a function to fetch a dish by its ID.

Example Call:
http://localhost:3000/dishes/details/1
Expected Output:
{
	'dish': {
	  'id': 1,
	  'name': 'Paneer Butter Masala',
	  'price': 300,
		'rating': 4.5,
		'isVeg': 'true'
	}
}




Exercise 8: Get Dishes by Filter
Objective: Fetch dishes based on filters such as veg/non-veg.

Query Parameters:

isVeg (boolean)

Tasks: Implement a function to fetch dishes by these filters.

Example Call:
http://localhost:3000/dishes/filter?isVeg=true
Expected Output:
{
	'dishes': [
	  {
	    'id': 1,
	    'name': 'Paneer Butter Masala',
	    'price': 300,
	    'rating': 4.5,
	    'isVeg': 'true'
	  },
	  {
	    'id': 3,
	    'name': 'Veg Hakka Noodles',
	    'price': 250,
	    'rating': 4.3,
	    'isVeg': 'true'
	  }
	]
}




Exercise 9: Get Dishes Sorted by Price
Objective: Fetch dishes sorted by their price ( lowest to highest ).

Query Parameters: None

Tasks: Implement a function to fetch dishes sorted by price.

Example Call:
http://localhost:3000/dishes/sort-by-price
Expected Output:
{
	'dishes': [
	  {
	    'id': 3,
	    'name': 'Veg Hakka Noodles',
	    'price': 250,
	    'rating': 4.3,
	    'isVeg': 'true'
	  },
	  {
	    'id': 1,
	    'name': 'Paneer Butter Masala',
	    'price': 300,
	    'rating': 4.5,
	    'isVeg': 'true'
	  },
	  {
	    'id': 2,
	    'name': 'Chicken Alfredo Pasta',
	    'price': 500,
	    'rating': 4.7,
	    'isVeg': 'false'
	  }
	]
}

Summary
In this lesson, you have learned how to build a backend for a food discovery app called 'FoodieFinds' using raw SQL queries. You have practiced performing various read operations, filtering, and sorting data. With these skills, you can now create and manage a comprehensive food discovery system. Continue practicing and exploring more advanced features to enhance your SQL knowledge further.