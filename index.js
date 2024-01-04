const express = require("express");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const app = express();

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);

// vidly manages movies based on genres
// http://vidly.com/api/genres
// endpoint for list of all genres:

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on PORT ${port}`));
