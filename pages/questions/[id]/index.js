import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { fetcher, sendAnswer } from '../../../helpers/api'
import AddQuestionOrAnswer from '../../../components/AddQuestionOrAnswer'

function QuestionDetailPage() {
  const router = useRouter()
  const { id } = router.query

  const {
    data: question = {},
    error,
    mutate,
  } = useSWR(`/api/questions/${id}`, fetcher)

  return (
    <>
      <Head>
        <title>{question.question}</title>
      </Head>
      <section>
        <h1>{question.question}</h1>
      </section>
      <section>
        <ul>
          {question?.answers?.map((answer) => (
            <li key={answer.id}>{answer.answer}</li>
          ))}
          <li>
            <AddQuestionOrAnswer
              onAdd={async (answer) => {
                await sendAnswer(question.id, answer)
                await mutate()
              }}
              buttonText="Send answer."
            />
          </li>
        </ul>
      </section>
    </>
  )
}

export default QuestionDetailPage
