import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Home from './components/home/Home.js';
import { getIssues } from './actions'

class App extends Component {

  componentDidMount() {
    console.log('1. Get the data from server/localStorage');
    // NOTE: because i will want to keep it for future use, i will add
    // react-router and redux and redux thunk
    this.props.loadInitialData();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="header">
            {/* NOTE:  Future Navigation bar here */}
          </header>
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadInitialData: function (params) {
      dispatch(getIssues())
    }
  }
}

function mapStateToProps (state) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
