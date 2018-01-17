import React, { Component } from 'react'
import { TouchableOpacity, KeyboardAvoidingView, Text, StyleSheet, TextInput } from 'react-native'
import { saveDeckTitle, getDeck } from '../utils/api'
import { connect } from 'react-redux' // 5.0.6
import { addEntry } from '../actions'
import { NavigationActions } from 'react-navigation' // 1.0.0-beta.23

class NewDeck extends Component {
  state = {
    input: ''
  }
  
  handleTextChange = (input) => {
    this.setState({input})
  }
  
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.text}>
          What is the title of your new deck?
        </Text>
        <TextInput placeholder="Deck Title" 
                   onChangeText={this.handleTextChange}
                   value={this.state.input}
                   style={styles.input}>
        </TextInput>
        <TouchableOpacity 
          style={styles.btn}
          onPress={() => {
            const key = this.state.input
            const { dispatch } = this.props
            saveDeckTitle(key, {title: key, questions:[]})
              .then(() => dispatch(addEntry({[key]: {title: key, questions:[]}})))
              .then(() => this.props.navigation.dispatch(NavigationActions.back()))
              .then(() => getDeck(key))
              .then((item) => item && this.props.navigation.navigate('DeckDetail', { deck: item }))
              
            this.setState({input: ''})
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
  text: {
    fontSize: 40,
    textAlign: "center"
  },
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


export default connect()(NewDeck)