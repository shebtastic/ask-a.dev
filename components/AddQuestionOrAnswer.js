import { useState } from 'react'

function AddQuestionOrAnswer({ onAdd, buttonText }) {
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

              onAdd(questionInput)

              setQuestionInput('')
              setIsAddOpen(false)
            }}
          >
            <textarea
              value={questionInput}
              onChange={(event) => setQuestionInput(event.target.value)}
            />
            <button type="submit">{buttonText}</button>
          </form>
        </>
      ) : (
        <button onClick={() => setIsAddOpen(true)}>+</button>
      )}
    </>
  )
}

export default AddQuestionOrAnswer
