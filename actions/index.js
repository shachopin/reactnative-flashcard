export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_ENTRY = 'ADD_ENTRY'
export const ADD_CARD = "ADD_CARD"
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = "ANSWER_QEUSTION"
export const CHANGE_DISPLAY_TEXT = "CHANGE_DISPLAY_TEXT"

export function receiveEntries (entries) {
  return {
    type: RECEIVE_ENTRIES,
    entries
  }
}

export function addEntry (entry) {
  return {
    type: ADD_ENTRY,
    entry
  }
}

export function addCard (title, card) {
  return {
    type: ADD_CARD,
    title,
    card
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function answerQuestion (question, isAnswerCorrect) {
  return {
    type: ANSWER_QUESTION,
    question,
    isAnswerCorrect
  }
}

export function changeDisplayText(question, displayText, displayType) {
  return {
    type: CHANGE_DISPLAY_TEXT,
    question,
    displayText,
    displayType
  }
}