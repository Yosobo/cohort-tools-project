const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
<<<<<<< HEAD
const PORT = 5005;
const mongoose = require('mongoose')

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const cohortsApi = require("./cohorts.json")
const studentsApi = require("./students.json")

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
=======
>>>>>>> 16204e5 (Miniproject done)
const cors = require("cors")
const PORT = 5005;

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

require('./db/database-connection')

app.use(
  cors({
<<<<<<< HEAD
    // Add the URLs of allowed origins to this array
    origin: ['http://localhost:5005', 'http://example.com'],
=======
    origin: ['http://localhost:5173', 'http://example.com'],
>>>>>>> 16204e5 (Miniproject done)

  })
);

app.get("/docs", (req, res) => {
  res.sendFile(`${__dirname}/views/docs.html`);
});

const CohortModel = require('./public/models/Cohorts.model')
const StudentModel = require('./public/models/Students.model');

app.get('/api/cohorts', (req, res) => {

  CohortModel
    .find()
    .then(allCohorts => res.json(allCohorts))
    .catch(err => res.json({ code: 500, errorDetails: err }))
})

app.get('/api/students', (req, res) => {

  StudentModel
    .find()
    .then(allStudents => { res.json(allStudents) })
    .catch(err => res.json({ code: 500, errorDetails: err }))
})

app.post('/api/cohorts', (req, res) => {

  const { inProgress, Studentslug, StudentName, program, campus, startDate, endDate, programManager, leadTeacher, totalHours } = req.body
  CohortModel
    .create({ inProgress, Studentslug, StudentName, program, campus, startDate, endDate, programManager, leadTeacher, totalHours })
    .then(newCohort => res.sendStatus(201))
    .catch(err => res.json({ code: 500, errorDetails: err }))
})

app.post('/api/students', (req, res) => {

  const { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, projects } = req.body

  StudentModel
    .create({ firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, projects })
    .then(newStudent => res.sendStatus(201))
    .catch(err => res.json({ code: 500, errorDetails: err }))
})



app.get('/api/students/cohort/:cohortId', (req, res) => {

  const { studentId } = req.params

  StudentModel
    .findById(studentId)
    .populate('Cohort')
    .then(students => res.json(students))
    .catch(err => res.json({ code: 500, errorDetails: err }))
})

app.get('/api/students/:studentId', (req, res) => {

  const { studentId } = req.params

  StudentModel
    .findById(studentId)
    .then(students => res.json(students))
    .catch(err => res.json({ code: 500, errorDetails: err }))

})

app.get('/api/cohorts/:cohortId', (req, res) => {

  const { cohortId } = req.params

  CohortModel
    .findById(cohortId)
    .then(cohorts => res.json(cohorts))
    .catch(err => res.json({ code: 500, errorDetails: err }))

})


app.put('/api/students/:studentId', (req, res) => {
  const { studentId } = req.params
  const { firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, projects } = req.body

  StudentModel
    .findByIdAndUpdate(studentId, {
      firstName, lastName, email,
      phone, linkedinUrl, languages, program, background, image, projects
    })
    .then(updatedStudent => res.sendStatus(204))
    .catch(err => res.json({ code: 500, errorDetails: err }))

})


app.put('/api/cohorts/:cohortId', (req, res) => {
  const { cohortId } = req.params
  const { inProgress, Studentslug, StudentName, program, campus, startDate, endDate, programManager,
    leadTeacher, totalHours } = req.body

  CohortModel
    .findByIdAndUpdate(cohortId, {
      inProgress, Studentslug, StudentName, program, campus, startDate, endDate, programManager,
      leadTeacher, totalHours
    })
    .then(updatedStudent => res.sendStatus(204))
    .catch(err => res.json({ code: 500, errorDetails: err }))
})



app.delete('/api/students/:studentId', (req, res) => {

  const { studentId } = req.params

  StudentModel
    .findByIdAndDelete(studentId)
    .then(() => res.sendStatus(204))
    .catch(err => res.json({ code: 500, errorDetails: err }))
})


app.delete('/api/cohorts/:cohortId', (req, res) => {

  const { cohortId } = req.params

  CohortModel
    .findByIdAndDelete(cohortId)
    .then(() => res.sendStatus(204))
    .catch(err => res.json({ code: 500, errorDetails: err }))
})




app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
