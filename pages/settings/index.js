import { useEffect, useState } from 'react'
import Head from 'next/head'
import { getItem, nuke, setItem } from '../../helpers/storage'

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
      <form>
        <label htmlFor="name-input">Your current display name:</label>
        <input
          id="name-input"
          type="text"
          disabled={storage.isAnonymous}
          value={storage.isAnonymous ? 'Anonymous' : storage.name}
          onChange={(event) => updateName(event.target.value)}
        />
        <label htmlFor="hide-name">Hide your name:</label>
        <input
          id="hide-name"
          type="checkbox"
          checked={storage.isAnonymous ? 'on' : false}
          onChange={toggleAnonymous}
        />
      </form>
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

export default Settings
