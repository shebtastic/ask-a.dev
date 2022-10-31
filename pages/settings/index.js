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
        <input
          type="text"
          value={storage.isAnonymous ? 'Anonymous' : storage.name}
          onChange={(event) => updateName(event.target.value)}
        />
        <input
          type="checkbox"
          checked={storage.isAnonymous ? 'on' : undefined}
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
