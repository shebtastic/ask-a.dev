import Cors from 'cors'

import { getQuestionById } from '../../../../helpers/db'

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

  const { id } = req.query

  switch (req.method) {
    case 'GET': {
      const questions = await getQuestionById(id)
      res.status(200).json(questions)
      break
    }
    default:
      res.status(405).setHeader('Allow', ['GET']).send()
  }
}

export default handler
