const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

let db;
(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
})();

app.get('/', (req, res) => {
  return res.send('Welcome to resturant Assignment API');
});

async function fetchAllResturant() {
  let query = 'SELECT * FROM restaurants';
  let response = await db.all(query, []);
  return { resturant: response };
}

app.get('/restaurants', async (req, res) => {
  try {
    let result = await fetchAllResturant();
    if (result.resturant.length === 0) {
      return res.status(404).json({ message: 'No resutarant found!' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

async function fetchResturantById(resturantId) {
  try {
    let query = 'SELECT * FROM restaurants WHERE id = ?';
    return await db.get(query, [resturantId]);
  } catch (error) {
    throw new Error('Database query failed');
  }
}

app.get('/restaurants/details/:restaurantId', async (req, res) => {
  try {
    let restaurantId = parseInt(req.params.restaurantId);
    if (isNaN(restaurantId) || restaurantId <= 0) {
      return res.status(400).json({ message: 'Invalid restaurant ID' });
    }
    let restaurant = await fetchResturantById(restaurantId);
    return res.status(200).json({ restaurant: restaurant });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

async function fetchResturantBycuisine(cuisine) {
  try {
    let query = 'SELECT * FROM restaurants WHERE cuisine = ?';
    return db.all(query, [cuisine]);
  } catch (error) {
    throw new Error('Database query failed!');
  }
}

app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  try {
    let cuisine = req.params.cuisine;
    let restaurants = await fetchResturantBycuisine(cuisine);
    return res.status(200).json({ restaurants: restaurants });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Function to fetch restaurants by filters
async function fetchRestaurantsByFilter(filters) {
  try {
    // Base query
    let query = 'SELECT * FROM restaurants WHERE 1=1';
    const params = [];

    // Add filters dynamically
    if (filters.isVeg) {
      query += ' AND isVeg = ?';
      params.push(filters.isVeg);
    }

    if (filters.hasOutdoorSeating) {
      query += ' AND hasOutdoorSeating = ?';
      params.push(filters.hasOutdoorSeating);
    }

    if (filters.isLuxury) {
      query += ' AND isLuxury = ?';
      params.push(filters.isLuxury);
    }

    // Execute the query
    const response = await db.all(query, params);
    return { restaurants: response };
  } catch (error) {
    throw new Error('Database query failed');
  }
}

app.get('/restaurants/filter', async (req, res) => {
  try {
    const { isVeg, hasOutdoorSeating, isLuxury } = req.query;
    if (
      (isVeg && !['true', 'false'].includes(isVeg)) ||
      (hasOutdoorSeating && !['true', 'false'].includes(hasOutdoorSeating)) ||
      (isLuxury && !['true', 'false'].includes(isLuxury))
    ) {
      return res
        .status(400)
        .json({ message: 'Invalid query parameter values' });
    }
    // Fetch filtered restaurants
    const filters = { isVeg, hasOutdoorSeating, isLuxury };
    let result = await fetchRestaurantsByFilter(filters);
    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: 'No resutarant found!' });
    }
    return res.status(200).json({ restaurants: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

async function sortRestuarentByRating() {
  try {
    let query = 'SELECT * FROM restaurants ORDER BY rating DESC;';
    let response = await db.all(query, []);
    return { restaurants: response };
  } catch (error) {
    throw new Error('Database query failed!');
  }
}

app.get('/restaurants/sort-by-rating', async (req, res) => {
  try {
    let result = await sortRestuarentByRating();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

async function getAllDishes() {
  try {
    let query = 'SELECT * FROM dishes';
    let response = await db.all(query, []);
    return { dishes: response };
  } catch (error) {
    throw new Error('Database query failed');
  }
}

app.get('/dishes', async (req, res) => {
  try {
    let result = await getAllDishes();
    if (result.dishes.length === 0) {
      return res.status(404).json({ message: 'No Dish found!' });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

async function fetchDisheById(dishId) {
  try {
    let query = 'SELECT * FROM dishes WHERE id = ?';
    return await db.get(query, [dishId]);
  } catch (error) {
    throw new Error('Database query failed');
  }
}

app.get('/dishes/details/:dishId', async (req, res) => {
  try {
    let dishId = parseInt(req.params.dishId);
    if (isNaN(dishId) || dishId <= 0) {
      return res.status(400).json({ message: 'Invalid Dish ID' });
    }
    let dish = await fetchDisheById(dishId);
    return res.status(200).json({ dish: dish });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Function to fetch dishes by filters
async function fetchDishesByFilter(filters) {
  try {
    // Base query
    let query = 'SELECT * FROM dishes WHERE 1=1';
    const params = [];

    // Add filters dynamically
    if (filters.isVeg) {
      query += ' AND isVeg = ?';
      params.push(filters.isVeg);
    }
    // Execute the query
    const response = await db.all(query, params);
    return { dishes: response };
  } catch (error) {
    throw new Error('Database query failed');
  }
}

app.get('/dishes/filter', async (req, res) => {
  try {
    const { isVeg } = req.query;
    if (isVeg && !['true', 'false'].includes(isVeg)) {
      return res
        .status(400)
        .json({ message: 'Invalid query parameter values' });
    }
    // Fetch filtered restaurants
    const filters = { isVeg };
    let result = await fetchDishesByFilter(filters);
    if (result.dishes.length === 0) {
      return res.status(404).json({ message: 'No dishes found!' });
    }
    return res.status(200).json({ dishes: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

async function sortDishesByPrice() {
  try {
    let query = 'SELECT * FROM dishes ORDER BY price DESC;';
    let response = await db.all(query, []);
    return { dishes: response };
  } catch (error) {
    throw new Error('Database query failed!');
  }
}

app.get('/dishes/sort-by-price', async (req, res) => {
  try {
    let result = await sortDishesByPrice();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
