import React, { Component } from 'react';

import {createAppContainer} from 'react-navigation'
import SwitchNav from "./src/Navigations/SwitchNav";
import { SafeAreaView } from 'react-native-safe-area-context';
import {Provider} from 'react-redux'
import Store from './src/RideRedux/store'
AppContainer=createAppContainer(SwitchNav)
class App extends Component {
  state = {  }
  render() { 
    return ( 
      <Provider store={Store}>
      <AppContainer />
      </Provider>
      
     );
  }
}
 
export default App;