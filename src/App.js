import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Home from './home';
import Login from './login'

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/home" component={Home}/>
            <Route path="/" component={Login}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
