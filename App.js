import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import LoadingScreen from './screens/LoadingScreen'
import HomeScreen from './screens/HomeScreen'

console.ignoredYellowBox = ['Failed prop type: Invalid props.style'];

export default createAppContainer(
  createSwitchNavigator({
    LoadingScreen,
    HomeScreen
  })

)