import Cors from 'cors'

import { addAnswer } from '../../../../../helpers/db'

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
    case 'POST': {
      try {
        const payload = JSON.parse(req.body)
        const keys = Object.keys(payload)
        if (keys.length !== 1 || keys[0] !== 'answer') {
          throw new Error()
        }
        const question = await addAnswer(id, payload.answer)
        res.status(200).send(question)
      } catch (error) {
        res.status(400).send()
      }
      break
    }
    default:
      res.status(405).setHeader('Allow', ['POST']).send()
  }
}

export default handler
