import mongoose, { Schema, model, models } from 'mongoose'

const URI = `mongodb+srv://sheb:${process.env.MONGODB_PASSWORD}@ask-a-dev.6fcdgby.mongodb.net/?retryWrites=true&w=majority`

async function connectMongoose() {
  console.log(URI)
  await mongoose.connect(URI)
}

const questionSchema = new Schema({
  question: String,
})

const Question = models.Question || model('Question', questionSchema)

async function addQuestion(question) {
  await connectMongoose()
  return Question.create({
    question,
  })
}

async function getQuestions() {
  await connectMongoose()
  return Question.find()
}

export { getQuestions, addQuestion }
