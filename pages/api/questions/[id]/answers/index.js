import { addAnswer } from '../../../../../helpers/db'
import { runCors } from '../../index'

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
        console.error(error)
        res.status(400).send()
      }
      break
    }
    default:
      res.status(405).setHeader('Allow', ['POST']).send()
  }
}

export default handler
