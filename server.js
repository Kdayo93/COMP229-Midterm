 /**
 * Midterm API Project - COMP229 Summer 2025
 * 
 * Challenge: Implement the API logic for managing a collection of movies!
 * 
 * Here's the deal:
 * You have a server running on port 3000, and an array of movie objects.
 * Your mission, should you choose to accept it, is to implement the missing logic
 * for each of the following API endpoints. 
 * 
 * Endpoints:
 * 1. GET /api/movies       - Retrieve the full list of movies.
 * 2. GET /api/movies/filter?genre=[genre name] - Retrieve movies by genre match.
 * 3. GET /api/movies/:id   - Retrieve a movie by its index.
 * 4. POST /api/movies      - Add a new movie to the collection.
 * 5. PUT /api/movies/:id   - Update a movie by its index.
 * 6. DELETE /api/movies/:id - Remove a movie from the collection by its index.
 * 
 * The array of movies is already defined for you, but you need to bring the logic
 * to life. Test your work using tools like Postman, Thunder Client, or Insomnia.
 * 
 * Submission Requirements:
 * 1. **Screenshots**: Provide screenshots of your API tests, clearly showing:
 *    - There should be 1 screenshot per Endpoint (6 in total)
 *    - The API request URL and method.
 *    - The request body (where applicable).
 *    - The successful response with proper HTTP status codes.
 *    Use Postman, Thunder Client, Insomnia, or another similar API testing tool.
 * 
 * 2. **Code Submission**: 
 *    - Include your code in a **.zip** file.
 *    - Provide a GitHub link to your repository containing the project.
 *    - Make sure all screenshots are clearly visible in your submission.
 * 
 * Good luck, and may your code be bug-free!
 */

const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

// Serve static files (e.g., images, CSS) from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Array of movie objects
let movies = [
  { title: 'The Matrix', genre: 'Sci-Fi', year: 1999, director: 'The Wachowskis' },
  { title: 'Inception', genre: 'Sci-Fi', year: 2010, director: 'Christopher Nolan' },
  { title: 'The Godfather', genre: 'Drama', year: 1972, director: 'Francis Ford Coppola' },
  { title: 'Pulp Fiction', genre: 'Crime', year: 1994, director: 'Quentin Tarantino' },
  { title: 'The Dark Knight', genre: 'Action', year: 2008, director: 'Christopher Nolan' },
  { title: 'Enough', genre: 'Thriller', year: 2002, director: 'Michael Apted' },
  { title: 'The Parent Trap', genre: 'Family', year: 2005, director: 'Nancy Meyers' }
];

// Set the port for the server
const PORT = 3000;

// Serve the instructions HTML file (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});
// GET /api/movies
app.get('/api/movies', (req, res) => {
  res.status(200).json(movies);
});

// GET /api/movies/filter?genre=[genre name]
app.get('/api/movies/filter', (req, res) => {
  const genre = req.query.genre;
  if (!genre) {
    return res.status(400).json({ error: 'Genre query parameter is required' });
  }
  const filtered = movies.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
  res.status(200).json(filtered);
});

// GET /api/movies/:id
app.get('/api/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id < 0 || id >= movies.length) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  res.status(200).json(movies[id]);
});

// POST /api/movies
app.post('/api/movies', (req, res) => {
  const { title, genre, year, director } = req.body;
  if (!title || !genre || !year || !director) {
    return res.status(400).json({ error: 'Missing required movie fields' });
  }
  const newMovie = { title, genre, year, director };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

// PUT /api/movies/:id
app.put('/api/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id < 0 || id >= movies.length) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  const { title, genre, year, director } = req.body;
  if (!title || !genre || !year || !director) {
    return res.status(400).json({ error: 'Missing required movie fields' });
  }
  movies[id] = { title, genre, year, director };
  res.status(200).json(movies[id]);
});

// DELETE /api/movies/:id
app.delete('/api/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id < 0 || id >= movies.length) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  const removed = movies.splice(id, 1);
  res.status(200).json(removed[0]);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});