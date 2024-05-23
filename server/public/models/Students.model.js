const { model, Schema } = require('mongoose')
const studentSchema = new Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String
        },
        email: {
            type: String
        },
        phone: {
            type: String
        },
        linkedinUrl: {
            type: String
        },
        languages: {
            type: [String]
        },
        program: {
            type: String
        },
        background: {
            type: String
        },
        image: {
            type: String
        },
        projects: {
            type: [String]
        },
        cohort: {
            type: Schema.ObjectId,
            ref: 'Cohort'
        }
    },
    {
        timestamps: true
    }
)

const Student = model('Student', studentSchema)
module.exports = Student