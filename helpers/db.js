import mongoose, { Schema, model, models } from 'mongoose'
import crypto from 'crypto'

const URI = `mongodb+srv://sheb:${process.env.MONGODB_PASSWORD}@ask-a-dev.6fcdgby.mongodb.net/?retryWrites=true&w=majority`

async function connectMongoose() {
  console.log(URI)
  await mongoose.connect(URI)
}

const answerSchema = new Schema({
  id: String,
  answer: String,
})
const Answer = models.Answer || model('Answer', answerSchema)

const questionSchema = new Schema({
  id: String,
  question: String,
  answers: [
    {
      type: answerSchema,
    },
  ],
})
const Question = models.Question || model('Question', questionSchema)

const projection = { id: true, question: true, answers: true, _id: false }
const projectionWithoutAnswers = {
  id: true,
  question: true,
  _id: false,
}
function projectDBObject(object, projection = projection) {
  const projected = {}
  for (const key of Object.keys(projection)) {
    if (projection[key]) {
      projected[key] = object[key]
    }
  }
  return projected
}

async function addQuestion(question) {
  await connectMongoose()
  const createdQuestion = await Question.create({
    id: crypto.randomUUID(),
    question,
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
  const question = await Question.findOne({ id }, projection)
  return question
}

async function addAnswer(questionId, answer) {
  await connectMongoose()

  const createdAnswer = await Answer.create({
    id: crypto.randomUUID(),
    answer,
  })
  const updatedQuestion = await Question.updateOne(
    { id: questionId },
    { $push: { answers: createdAnswer } },
  )
  const updatedQuestionObject = updatedQuestion.toObject()
  return projectDBObject(updatedQuestionObject)
}

export { getQuestions, addQuestion, getQuestionById, addAnswer }
