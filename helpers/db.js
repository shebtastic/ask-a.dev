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
})
const Question = models.Question || model('Question', questionSchema)

const projectionWithAnswers = {
  id: true,
  question: true,
  submitter: true,
  submissionDate: true,
  answers: true,
  _id: false,
}
const projectionWithoutAnswers = {
  id: true,
  question: true,
  submitter: true,
  submissionDate: true,
  _id: false,
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
  const question = await Question.findOne({ id }, projectionWithAnswers)
  return question
}

async function addAnswer(questionId, answer, submitter) {
  await connectMongoose()

  const createdAnswer = await Answer.create({
    id: crypto.randomUUID(),
    answer,
    submitter,
    submissionDate: new Date().toISOString(),
  })
  await Question.updateOne(
    { id: questionId },
    { $push: { answers: createdAnswer } },
  )
  return getQuestionById(questionId)
}

export { getQuestions, addQuestion, getQuestionById, addAnswer }
