import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { fetcher } from '../../../helpers/api'

function QuestionDetailPage() {
  const router = useRouter()
  const { id } = router.query

  const { data: question = {}, error } = useSWR(`/api/questions/${id}`, fetcher)

  return (
    <>
      <Head>
        <title>{question.question}</title>
      </Head>
      <section>
        <h1>{question.question}</h1>
      </section>
      <section>
        <p>{question.id}</p>
      </section>
    </>
  )
}

export default QuestionDetailPage
