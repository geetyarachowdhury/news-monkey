import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export class App extends Component {
  apiKey = process.env.NEWS_API_KEY;
  state = {
    progress: 0,
  }
  setProgress = ( progress ) => {
    this.setState({progress : progress,})
  }
  render() {
    return (
      <Router>
      <div>
        <NavBar />
        <LoadingBar
        color='#4166f5'
        progress={this.state.progress}
      />
          
          <Switch>
          <Route exact key="general" path="/"><News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={ 9 } country="in" category="general" /></Route>
          <Route exact key="business" path="/business"><News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={ 9 } country="in" category="business" /></Route>
          <Route exact key="entertainment" path="/entertainment"><News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={ 9 } country="in" category="entertainment" /></Route>
          <Route exact key="health" path="/health"><News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={ 9 } country="in" category="health" /></Route>
          <Route exact key="science" path="/science"><News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={ 9 } country="in" category="science" /></Route>
          <Route exact key="sports" path="/sports"><News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={ 9 } country="in" category="sports" /></Route>
          <Route exact key="technology" path="/technology"><News apiKey={this.apiKey} setProgress={this.setProgress} pageSize={ 9 } country="in" category="technology" /></Route>
          
        </Switch>
        </div>
        </Router>
    )
  }
}

export default App
