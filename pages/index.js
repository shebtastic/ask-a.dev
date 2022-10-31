import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'

import { fetcher, sendQuestion } from '../helpers/api'
import AddQuestionOrAnswer from '../components/AddQuestionOrAnswer'
import { getItem } from '../helpers/storage'

function LandingPage() {
  const { data: questions, error, mutate } = useSWR('/api/questions', fetcher)

  return (
    <>
      <Head>
        <title>Ask away!</title>
      </Head>
      <section>
        <h1>Ask a dev!</h1>
        <p>
          Feel free to browse or ask any question while your identity stays
          stealthy and hidden.
        </p>
        <aside>{"🥷Like a freakin' ninja!"}</aside>
      </section>
      <section>
        <ul>
          {questions?.map(
            ({ id, question, submitter, submissionDate, closed }) => (
              <li key={id}>
                <Link href={`/questions/${id}`}>
                  <p>
                    <span>{closed && '✅'}</span>
                    {question}
                    <span>{closed && ' - Closed.'}</span>
                  </p>
                  <span>{submitter}</span>
                  <span>{submissionDate}</span>
                </Link>
              </li>
            ),
          )}
        </ul>
        <AddQuestionOrAnswer
          onAdd={async (question) => {
            const item = getItem()
            await sendQuestion(question, item?.name)
            await mutate()
          }}
          buttonText="Send question."
        />
      </section>
    </>
  )
}

export default LandingPage
