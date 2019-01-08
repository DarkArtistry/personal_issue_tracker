import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeLeftPanel from './HomeLeftPanel.js';
import HomeRightPanel from './HomeRightPanel.js';
import './Home.css';

class Home extends Component {

  render() {
    return (
      <div className="Home">
        <HomeLeftPanel />
        <HomeRightPanel />
      </div>
    );
  }

}

function mapDispatchToProps (dispatch) {
  return {

  }
}

function mapStateToProps (state) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
