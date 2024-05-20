const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;


const app = express();
const cors = require("cors")



app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


app.use(
  cors({
    // Add the URLs of allowed origins to this array
    origin: ['http://localhost:5173', 'http://example.com'],

  })
);



// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});