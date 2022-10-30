import Cors from 'cors'

import { addQuestion, getQuestions } from '../../../helpers/db'

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

const cors = Cors()
async function runCors(req, res) {
  return await runMiddleware(req, res, cors)
}

async function handler(req, res) {
  await runCors(req, res)

  switch (req.method) {
    case 'GET': {
      const questions = await getQuestions()
      res.status(200).json(questions)
      break
    }
    case 'POST': {
      try {
        const payload = JSON.parse(req.body)
        const keys = Object.keys(payload)
        if (keys.length !== 1 || keys[0] !== 'question') {
          throw new Error()
        }
        const question = await addQuestion(payload.question)
        res.status(200).send(question)
      } catch (error) {
        res.status(400).send()
      }
      break
    }
    default:
      res.status(405).setHeader('Allow', ['GET', 'POST']).send()
  }
}

export default handler
