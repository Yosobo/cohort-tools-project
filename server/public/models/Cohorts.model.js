const { model, Schema } = require('mongoose')
const cohortSchema = new Schema(

    {
        inProgress: {
            type: Boolean,
            default: false
        },
        Studentslug: {
            type: String
        },
        StudentName: {
            type: String
        },
        program: {
            type: String
        },
        campus: {
            type: String
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        },
        programManager: {
            type: String
        },
        leadTeacher: {
            type: String
        },
        totalHours: {
            type: Number
        }
    },
    {
        timestamps: true
    }
)

const Cohort = model('Cohort', cohortSchema)
module.exports = Cohort


