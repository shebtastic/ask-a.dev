import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'

import { fetcher, sendQuestion } from '../helpers/api'
import { useState } from 'react'

function LandingPage() {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [questionInput, setQuestionInput] = useState('')

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
            {isAddOpen ? (
              <>
                <button onClick={() => setIsAddOpen(false)}>x</button>
                <form
                  onSubmit={async (event) => {
                    event.preventDefault()

                    await sendQuestion(questionInput)

                    setQuestionInput('')
                    setIsAddOpen(false)
                    await mutate()
                  }}
                >
                  <textarea
                    value={questionInput}
                    onChange={(event) => setQuestionInput(event.target.value)}
                  />
                  <button type="submit">Send question.</button>
                </form>
              </>
            ) : (
              <button onClick={() => setIsAddOpen(true)}>+</button>
            )}
          </li>
        </ul>
      </section>
    </>
  )
}

export default LandingPage
