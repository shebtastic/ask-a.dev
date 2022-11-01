import { useEffect, useState } from 'react'
import Head from 'next/head'
import { getItem, nuke, setItem } from '../../helpers/storage'
import styled from 'styled-components'

const initialState = {
  name: '',
  isAnonymous: true,
}

function Settings() {
  const [storage, setStorage] = useState(initialState)

  useEffect(() => {
    if (window) {
      const item = getItem()

      if (item !== null) {
        setStorage(item)
      }
    }
  }, [])

  function updateName(name) {
    setStorage((storage) => {
      if (storage.isAnonymous) {
        return storage
      }

      const newStorage = {
        ...storage,
        name,
      }

      setItem(newStorage)

      return newStorage
    })
  }

  function toggleAnonymous() {
    setStorage((storage) => {
      const newStorage = {
        ...storage,
        isAnonymous: !storage.isAnonymous,
      }

      setItem(newStorage)

      return newStorage
    })
  }

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <h1>Settings</h1>
      <Form>
        <label htmlFor="name-input">Your current display name:</label>
        <input
          id="name-input"
          type="text"
          disabled={storage?.isAnonymous}
          value={storage?.isAnonymous ? 'Anonymous' : storage?.name}
          onChange={(event) => updateName(event.target.value)}
        />
        <label htmlFor="hide-name">Hide your name:</label>
        <input
          id="hide-name"
          type="checkbox"
          checked={storage?.isAnonymous ? 'on' : false}
          onChange={toggleAnonymous}
        />
      </Form>
      <button
        onClick={() => {
          nuke()
          setStorage(initialState)
        }}
      >
        Nuke LocalStorage! 💣
      </button>
    </>
  )
}

const Form = styled.form`
  display: grid;
  grid-row-gap: 1em;
  grid-template-areas: 'name-label name-input' 'hide-label hide-input' 'button button';
  label:first-of-type {
    grid-area: name-label;
  }
  input:first-of-type {
    grid-area: name-input;
  }
  label:last-of-type {
    grid-area: hide-label;
  }
  input:last-of-type {
    grid-area: hide-input;
  }
  button {
    grid-area: button;
  }
`

export default Settings
