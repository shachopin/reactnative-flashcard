import { combineReducers } from 'redux' // 3.7.2
import { RECEIVE_ENTRIES, ADD_ENTRY, ADD_CARD, RECEIVE_QUESTIONS, ANSWER_QUESTION, CHANGE_DISPLAY_TEXT } from '../actions'

function entries(state = {}, action) {
  switch (action.type) {
    case RECEIVE_ENTRIES :
      return {
        ...state,
        ...action.entries,
      }
    case ADD_ENTRY :
      return {
        ...state,
        ...action.entry
      }
    case ADD_CARD :
      return {
        ...state,
        [action.title] : {
          ...state[action.title],
          questions: [
            ...state[action.title].questions,
            action.card
          ]
        }
      }
    default :
      return state
  }
}

function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS :
      return action.questions.reduce(function(result, entry){
        result[entry.question] = {
          ...entry, 
          displayText: entry.question,
          displayType: 'question',
          score: null
        }
        return result
      }, {})   
    case ANSWER_QUESTION :
      return {
        ...state,
        [action.question.question] : {
          ...action.question,
          score: action.isAnswerCorrect
        }
      }
    case CHANGE_DISPLAY_TEXT :
      return {
        ...state,
        [action.question.question] : {
          ...action.question,
          displayText: action.displayText,
          displayType: action.displayType
        }
      }
    default :
      return state
  }
}

export default combineReducers({
  entries,
  questions
})
