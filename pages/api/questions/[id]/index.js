import { getQuestionById } from '../../../../helpers/db'
import { runCors } from '../index'

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
