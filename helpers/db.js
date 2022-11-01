import mongoose, { Schema, model, models } from 'mongoose'
import crypto from 'crypto'

const URI = `mongodb+srv://sheb:${process.env.MONGODB_PASSWORD}@ask-a-dev.6fcdgby.mongodb.net/?retryWrites=true&w=majority`

async function connectMongoose() {
  await mongoose.connect(URI)
}

const answerSchema = new Schema({
  id: String,
  answer: String,
  submitter: String,
  submissionDate: String,
})
const Answer = models.Answer || model('Answer', answerSchema)

const questionSchema = new Schema({
  id: String,
  question: String,
  submitter: String,
  submissionDate: String,
  answers: [
    {
      type: answerSchema,
    },
  ],
  closed: Boolean,
})
const Question = models.Question || model('Question', questionSchema)

const projectionWithoutAnswers = {
  id: true,
  question: true,
  submitter: true,
  submissionDate: true,
  closed: true,
  _id: false,
}
const projectionWithAnswers = {
  ...projectionWithoutAnswers,
  answers: {
    id: true,
    answer: true,
    submitter: true,
    submissionDate: true,
  },
}
function projectDBObject(object, projection = projectionWithAnswers) {
  const projected = {}
  for (const key of Object.keys(projection)) {
    if (projection[key]) {
      projected[key] = object[key]
    }
  }
  return projected
}

async function addQuestion(question, submitter) {
  await connectMongoose()
  const createdQuestion = await Question.create({
    id: crypto.randomUUID(),
    question,
    submitter,
    submissionDate: new Date().toISOString(),
    answers: [],
    closed: false,
  })
  const createdQuestionObject = createdQuestion.toObject()
  return projectDBObject(createdQuestionObject)
}

async function getQuestions() {
  await connectMongoose()
  return Question.find({}, projectionWithoutAnswers)
}

async function getQuestionById(id) {
  await connectMongoose()
  return Question.findOne({ id }, projectionWithAnswers)
}

async function addAnswer(questionId, answer, submitter) {
  await connectMongoose()

  await Question.updateOne(
    { id: questionId, closed: false },
    {
      $push: {
        answers: {
          id: crypto.randomUUID(),
          answer,
          submitter,
          submissionDate: new Date().toISOString(),
        },
      },
    },
  )
  return getQuestionById(questionId)
}

async function closeQuestion(questionId) {
  await connectMongoose()

  await Question.updateOne({ id: questionId }, { $set: { closed: true } })
  return getQuestionById(questionId)
}

export { getQuestions, addQuestion, getQuestionById, addAnswer, closeQuestion }
