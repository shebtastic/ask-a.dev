const localStorageKey = 'ask-a-dev-name'

function getItem(key = localStorageKey) {
  if (!window?.localStorage) {
    return
  }

  const json = localStorage.getItem(key)
  console.log(json)
  let item = null
  if (json !== null) {
    item = JSON.parse(json)
  }
  console.log(item)
  return item
}

function setItem(item, key = localStorageKey) {
  if (!window?.localStorage) {
    return
  }

  localStorage.setItem(key, JSON.stringify(item))
}

function nuke(key = localStorageKey) {
  localStorage.removeItem(key)
}

export { getItem, setItem, nuke }
