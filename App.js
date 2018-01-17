import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import DeckDetail from "./components/DeckDetail"
import AddCard from "./components/AddCard"
import Quiz from "./components/Quiz"
import { TabNavigator, StackNavigator } from 'react-navigation' // 1.0.0-beta.23
import { FontAwesome, Ionicons } from '@expo/vector-icons' // 6.2.2
import { Constants } from 'expo'
import { createStore } from 'redux' // 3.7.2
import { Provider } from 'react-redux' // 5.0.6
import reducer from './reducers'
import { setLocalNotification } from './utils/helpers'

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? "purple" : "white",
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? "white" : "purple",
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "purple",
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "purple",
      },
      title: "Add Card"
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "purple",
      },
      title: "Quiz"
    }
  }
  
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={"purple"} barStyle="light-content" />
          <MainNavigator/>
        </View>
      </Provider>
    )
  }
}