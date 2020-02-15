import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import LoadingScreen from './screens/LoadingScreen'
import HomeScreen from './screens/HomeScreen'


export default createAppContainer(
  createSwitchNavigator({
    LoadingScreen,
    HomeScreen
  })

)