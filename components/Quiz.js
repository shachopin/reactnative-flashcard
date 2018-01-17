import React, { Component } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux' // 5.0.6
import { answerQuestion, receiveQuestions, changeDisplayText } from '../actions'

class Quiz extends Component {
  render() {
    const { question, totalQuestionCount, currentRightAnswerCount, answeredQuestionCount, dispatch } = this.props
    
    if (!question) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>
            {`${currentRightAnswerCount} out of ${totalQuestionCount} correct`}
          </Text>
          <TouchableOpacity 
            style={[styles.btn, {backgroundColor: 'green'}]}
            onPress={() => dispatch(receiveQuestions(this.props.navigation.state.params.questions))}>
          <Text style={styles.btnText}>
            Restart
          </Text>
          </TouchableOpacity>
          <TouchableOpacity 
              style={[styles.btn, {backgroundColor: 'red'}]}
              onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.btnText}>
              Return
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
    
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 25}}>
          {`${answeredQuestionCount + 1}/${totalQuestionCount}`}
        </Text>
        <Text style={styles.text}>
          {question.displayText}
        </Text>
        <TouchableOpacity
            onPress={() => dispatch(
              question.displayType === 'question' ? 
              changeDisplayText(question, question.answer, "answer")
              :
              changeDisplayText(question, question.question, "question")
              )}>
          <Text style={{fontSize: 20, color: 'red'}}>
            {question.displayType === "question" ? 'show answer' : "show question"} 
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={[styles.btn, {backgroundColor: 'green'}]}
            onPress={() => dispatch(answerQuestion(question, 1))}>
          <Text style={styles.btnText}>
            Correct
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={[styles.btn, {backgroundColor: 'red'}]}
            onPress={() => dispatch(answerQuestion(question, 0))}>
          <Text style={styles.btnText}>
            Incorrect
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 7,
    height: 45,
    width: 150,
    marginLeft: 40,
    marginRight: 40,
  },
  btnText: {
    color: "white", 
    fontSize: 20, 
    fontWeight: 'bold'
  }
})

function mapStateToProps(state) {
  const { questions } = state
  const remainingQuestions = Object.keys(questions)
                                   .filter((key) => questions[key].score === null)
                                   .map((key) => questions[key])
  return {
    question: remainingQuestions.shift(),
    totalQuestionCount : Object.keys(questions).length,
    currentRightAnswerCount : Object.keys(questions)
                                   .filter((key) => questions[key].score === 1)
                                   .length,
    answeredQuestionCount: Object.keys(questions)
                                   .filter((key) => questions[key].score !== null)
                                   .length
  }
}

export default connect(mapStateToProps)(Quiz)