import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'

import { fetcher, sendQuestion } from '../helpers/api'
import AddQuestionOrAnswer from '../components/AddQuestionOrAnswer'
import { localStorageKey } from './settings'

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
          {questions?.map(({ id, question }) => (
            <li key={id}>
              <Link href={`/questions/${id}`}>{question}</Link>
            </li>
          ))}
          <li>
            <AddQuestionOrAnswer
              onAdd={async (question) => {
                const json = localStorage.getItem(localStorageKey)
                try {
                  let item
                  if (json !== null) {
                    item = JSON.parse(json)
                  }
                  await sendQuestion(question, item?.name)
                  await mutate()
                } catch (error) {
                  console.error(error)
                }
              }}
              buttonText="Send question."
            />
          </li>
        </ul>
      </section>
    </>
  )
}

export default LandingPage
