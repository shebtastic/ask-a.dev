import { closeQuestion } from '../../../../../helpers/db'
import { runCors } from '../../index'

async function handler(req, res) {
  await runCors(req, res)

  const { id } = req.query

  switch (req.method) {
    case 'POST': {
      const question = await closeQuestion(id)
      res.status(200).send(question)
      break
    }
    default:
      res.status(405).setHeader('Allow', ['POST']).send()
  }
}

export default handler
