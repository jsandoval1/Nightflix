const express = require("express");
const cors = require('cors') //! <=============This is new
const app = express();
require("dotenv").config(); // Load environment variables from a .env file.
const port = process.env.PORT; // Set the port to be used from the environment variables.


require("./config/mongoose.config"); // Connect to the MongoDB database using Mongoose.
app.use(cors()) //! <============= This is new 
app.use(express.json(), express.urlencoded({ extended: true }));// Configure middleware to parse JSON and URL-encoded data.

const FavoriteMovieRoutes = require("./routes/FavoriteMovie.routes"); // Import and configure the favorite routes module.
FavoriteMovieRoutes(app);

app.listen(port, () => console.log(`Listening on port: ${port}`)); // Start the Express app, listening on the specified port.