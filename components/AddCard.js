import React, { Component } from 'react'
import { TouchableOpacity, KeyboardAvoidingView, Text, StyleSheet, TextInput } from 'react-native'
import { addCardToDeck } from "../utils/api"
import { addCard } from "../actions"
import { connect } from "react-redux" // 5.0.6

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }
  
  handleChangeText = fieldName => text => {
    this.setState({ [fieldName]: text })
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TextInput placeholder="Type a question" 
                   onChangeText={this.handleChangeText('question')}
                   value={this.state.question}
                   style={styles.input}>
        </TextInput>
        <TextInput placeholder="Type an answer" 
                   onChangeText={this.handleChangeText('answer')}
                   value={this.state.answer}
                   style={styles.input}>
        </TextInput>
        <TouchableOpacity 
            style={styles.btn}
            onPress={() => {
              addCardToDeck(this.props.navigation.state.params.title, this.state).then(() => {
                this.props.dispatch(addCard(this.props.navigation.state.params.title, this.state))
                this.props.navigation.goBack()
              })
            }}>
          <Text style={{color: "white", fontSize: 20}}>
            Submit
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    marginTop: 30,
    width: 300,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#757575"
  },
  btn: {
    marginTop: 10,
    backgroundColor: "black",
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
  },
})

export default connect()(AddCard)