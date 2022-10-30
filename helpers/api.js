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

function getQuestions() {
  return questions
}

function getQuestionById(id) {
  return questions.find((question) => question.id === id)
}

function fetcher(url) {
  if (!url) return

  return fetch(url).then((res) => res.json())
}

function fakeFetcher(url) {
  if (!url) return

  switch (true) {
    case '/api/questions' === url:
      return getQuestions()
    case url?.startsWith('/api/questions/'):
      return getQuestionById(url.split('/').at(-1))
    default:
      throw new Error('unmapped request')
  }
}

export default questions
export { fetcher, fakeFetcher }
