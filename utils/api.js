import { AsyncStorage } from 'react-native'
const STORAGE_KEY = "abc123"

export function getDecks () {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(showDecks)
}

export function saveDeckTitle (key, entry) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}

export function getDeck(key) {
  return getDecks().then((decks) => decks[key] )
}

export function addCardToDeck(title, card) {
  return getDecks().then((decks) => {
    decks[title].questions.push(card)
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
  })
}

function setDummyData () {
  const dummyData = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData))

  return dummyData
}

function showDecks (results) {
  return results === null
    ? setDummyData()
    : JSON.parse(results)
}
