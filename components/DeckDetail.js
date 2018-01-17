import React, { Component } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux' // 5.0.6
import { receiveQuestions } from '../actions'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params
    return {
      title: deck.title
    }
  }
  
  render() {
    const { deck } = this.props.navigation.state.params
    const { questions } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {deck.title}
        </Text>
        <Text style={styles.count}>
          {questions.length} {questions.length == 1 ? "card" : "cards"}
        </Text>
        
        <View style={{marginTop: 150}}>
          <TouchableOpacity 
              style={[styles.btn, {backgroundColor: 'white'}]}
              onPress={() => this.props.navigation.navigate(
              'AddCard', {title: deck.title}
            )}>
            <Text style={{color: 'black'}}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity 
              style={[styles.btn, {backgroundColor: 'black'}]}
              onPress={
                () => {
                  this.props.dispatch(receiveQuestions(questions))
                  clearLocalNotification().then(setLocalNotification)
                  this.props.navigation.navigate('Quiz', {questions})
                }}>
            <Text style={{color: 'white'}}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40
  },
  count: {
    fontSize: 20,
    color: "grey"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5, 
    borderColor: "black",
    padding: 10,
    borderRadius: 7,
    height: 45,
    width: 150,
    marginLeft: 40,
    marginRight: 40,
  }
})

function mapStateToProps(state, ownProps) {
  return {
    questions: state.entries[ownProps.navigation.state.params.deck.title].questions
  }
}
export default connect(mapStateToProps)(DeckDetail)