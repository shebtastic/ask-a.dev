import Head from 'next/head'
import Link from 'next/link'

const questions = [
  {
    id: 'EF370F87-338F-47F2-AD2C-7CB23F3B9669',
    question: 'test?',
  },
  {
    id: 'B8AE42B9-5C0E-4336-A998-614A6A7249B9',
    question: 'y tho?',
  },
  {
    id: 'E3EB7364-CD78-4CC1-B616-C5CF588E3304',
    question: 'Is this the real life?',
  },
  {
    id: 'A997467E-E083-482C-B25C-B72B603CECC4',
    question: 'Is this just fantasy?',
  },
]

function LandingPage() {
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
          {questions.map(({ id, question }) => (
            <li key={id}>
              <Link href={`/question/${id}`}>{question}</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default LandingPage
