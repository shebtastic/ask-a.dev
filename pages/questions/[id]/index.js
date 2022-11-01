import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { closeQuestion, fetcher, sendAnswer } from '../../../helpers/api'
import AddQuestionOrAnswer from '../../../components/AddQuestionOrAnswer'
import { getItem } from '../../../helpers/storage'
import { BackLink } from '../../../components/NavBar'
import Card from '../../../components/Card'

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
        <BackLink />
      </section>
      <section>
        <ul>
          {question?.answers?.map(
            ({ id, answer, submitter, submissionDate }) => (
              <li key={id}>
                <Card>
                  <h2>{answer}</h2>
                  <span>{submitter}</span>
                  <span>{new Date(submissionDate).toLocaleString()}</span>
                </Card>
              </li>
            ),
          )}
        </ul>
      </section>
      {question.closed ? (
        'Closed thread.'
      ) : (
        <>
          <Card>
            <AddQuestionOrAnswer
              onAdd={async (answer) => {
                const item = getItem()
                await sendAnswer(question.id, answer, item?.name)
                await mutate()
              }}
              buttonText="Send answer."
            />
          </Card>
          <Card>
            <div>
              <button
                onClick={async () => {
                  await closeQuestion(question.id)
                  await mutate()
                }}
              >
                Close thread.
              </button>
            </div>
          </Card>
        </>
      )}
    </>
  )
}

export default QuestionDetailPage
