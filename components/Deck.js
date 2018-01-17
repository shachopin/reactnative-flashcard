import { View, Text, StyleSheet, Platform } from 'react-native'
import React from 'react'

export default function Deck ({ deckTitle, cardCount }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {deckTitle}
      </Text>
      <Text style={styles.count}>
        {cardCount} {cardCount == 1 ? "card" : "cards"}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    textAlign: 'center'
  },
  count: {
    fontSize: 20,
    color: 'grey'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 60,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
})
  