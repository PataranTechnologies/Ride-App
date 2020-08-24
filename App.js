import React, { Component } from 'react';

import {createAppContainer} from 'react-navigation'
import SwitchNav from "./src/Navigations/SwitchNav";
import { SafeAreaView } from 'react-native-safe-area-context';
AppContainer=createAppContainer(SwitchNav)
class App extends Component {
  state = {  }
  render() { 
    return ( 
      
      <AppContainer />
      
     );
  }
}
 
export default App;