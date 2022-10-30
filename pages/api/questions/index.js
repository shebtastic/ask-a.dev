import Cors from 'cors'

import { fakeFetcher } from '../../../helpers/api'
import { getQuestions } from '../../../helpers/db'

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

  const questions = await getQuestions()
  res.status(200).json(questions)
}

export default handler
