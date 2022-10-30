import { useState } from 'react'

function AddQuestion({ onAddQuestion }) {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [questionInput, setQuestionInput] = useState('')

  return (
    <>
      {isAddOpen ? (
        <>
          <button onClick={() => setIsAddOpen(false)}>x</button>
          <form
            onSubmit={(event) => {
              event.preventDefault()

              onAddQuestion(questionInput)

              setQuestionInput('')
              setIsAddOpen(false)
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
    </>
  )
}

export default AddQuestion
