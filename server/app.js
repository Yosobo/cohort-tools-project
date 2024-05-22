const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 27017;
const mongoose = require('mongoose')

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const cohortsApi = require("./cohorts.json")
const studentsApi = require("./students.json")

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
const cors = require("cors")



app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(
  cors({
    // Add the URLs of allowed origins to this array
    origin: ['http://localhost:5005', 'http://example.com'],

  })
);

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(`${__dirname}/views/docs.html`);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/mongoose-example-dev")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err))

const cohortsSchema = new mongoose.Schema({
  inProgress: Boolean,
  cohortSlug: String,
  cohortName: String,
  program: String,
  campus: String,
  startDate: Date,
  endDate: Date,
  programManager: String,
  leadTeacher: String,
  totalHours: Number
})

const studentsSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  linkedinUrl: String,
  languages: [String],
  program: String,
  background: String,
  image: String,
  projects: [String],
  cohort: mongoose.Types.ObjectId
})

const CohortModel = mongoose.model('cohort', cohortsSchema)
const StudentModel = mongoose.model('student', studentsSchema)

app.get('/api/cohorts', (req, res) => {

  CohortModel
    .find()
    .then(allCohorts => res.json(allCohorts))
    .catch(err => res.json({ code: 500, errorDetails: err }))
})

app.get('/api/students', (req, res) => {

  StudentModel
    .find()
    .then(allStudents => res.json(allStudents))
    .catch(err => res.json({ code: 500, errorDetails: err }))
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
