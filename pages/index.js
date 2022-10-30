import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'

import { fetcher, sendQuestion } from '../helpers/api'
import AddQuestion from '../components/AddQuestion'

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
        <aside>🥷Like a freakin' ninja!</aside>
      </section>
      <section>
        <ul>
          {questions?.map(({ id, question }) => (
            <li key={id}>
              <Link href={`/questions/${id}`}>{question}</Link>
            </li>
          ))}
          <li>
            <AddQuestion
              onAddQuestion={async (question) => {
                await sendQuestion(question)
                await mutate()
              }}
            />
          </li>
        </ul>
      </section>
    </>
  )
}

export default LandingPage
