import React from 'react';
import './App.css';
import Routes from './components/Routes/Routes'
import {store} from './components/Redux/Store'
import {Provider} from 'react-redux';

function App() {

  return (
    <Provider store={store}>
    <div className="App">
      <Routes/>
    </div>
    </Provider>
  );
}

export default App;
