import mongoose, { Schema, model, models } from 'mongoose'
import crypto from 'crypto'

const URI = `mongodb+srv://sheb:${process.env.MONGODB_PASSWORD}@ask-a-dev.6fcdgby.mongodb.net/?retryWrites=true&w=majority`

async function connectMongoose() {
  console.log(URI)
  await mongoose.connect(URI)
}

const questionSchema = new Schema({
  id: String,
  question: String,
})

const Question = models.Question || model('Question', questionSchema)

async function addQuestion(question) {
  await connectMongoose()
  const createdQuestion = await Question.create({
    id: crypto.randomUUID(),
    question,
  })
  const createdQuestionObject = createdQuestion.toObject()
  return {
    id: createdQuestionObject.id,
    question: createdQuestionObject.question,
  }
}

async function getQuestions() {
  await connectMongoose()
  return Question.find({}, { id: true, question: true, _id: false })
}

export { getQuestions, addQuestion }
