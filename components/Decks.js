import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet, FlatList } from 'react-native'
import { getDecks } from '../utils/api'
import { AppLoading } from 'expo'
import Deck from './Deck'
import { connect } from 'react-redux' // 5.0.6
import { receiveEntries } from '../actions'

class Decks extends Component {
  state = {
    ready: false
  }
  
  componentDidMount() {
    const { dispatch } = this.props

    getDecks()
      .then((entries) => dispatch(receiveEntries(entries)))
      .then(() => this.setState(() => ({ready: true})))
  }
  
  renderItem = ({item}) => (
    <TouchableOpacity
            onPress={() => this.props.navigation.navigate(
              'DeckDetail',
              { deck: item }
            )}>
      <Deck deckTitle={item.title} cardCount={item.questions.length} />
    </TouchableOpacity>
    
  )
  
  render() {
    const { ready } = this.state
    if (ready === false) {
      return <AppLoading />
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.decks} 
          renderItem={this.renderItem} 
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
})

function mapStateToProps (state) {
  return {
    decks: Object.keys(state.entries).map((key) => state.entries[key])
  }
}
export default connect(
  mapStateToProps
)(Decks)