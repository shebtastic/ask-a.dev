import { useEffect, useState } from 'react'
import Head from 'next/head'

const localStorageKey = 'ask-a-dev-name'

function Settings() {
  const [storage, setStorage] = useState({
    name: '',
    isAnonymous: true,
  })

  useEffect(() => {
    if (window) {
      const item = localStorage.getItem(localStorageKey)

      if (item !== null) {
        setStorage(JSON.parse(item))
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

      localStorage.setItem(localStorageKey, JSON.stringify(newStorage))

      return newStorage
    })
  }

  function toggleAnonymous() {
    setStorage((storage) => {
      const newStorage = {
        ...storage,
        isAnonymous: !storage.isAnonymous,
      }

      localStorage.setItem(localStorageKey, JSON.stringify(newStorage))

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
        <button onClick={() => localStorage.clear()}>
          Nuke LocalStorage! 💣
        </button>
      </form>
    </>
  )
}

export default Settings
export { localStorageKey }
