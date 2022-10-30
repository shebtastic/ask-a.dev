import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'

import { fetcher } from '../helpers/api'

function LandingPage() {
  const { data: questions, error } = useSWR('/api/questions', fetcher)

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
        </ul>
      </section>
    </>
  )
}

export default LandingPage
