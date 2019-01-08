import React, { Component } from 'react';
import './HomeLeftPanel.css';

class HomeLeftPanel extends Component {
  // NOTE: the left component however is to render according to the redux
  // store's state, which will be parsed to mapStateToProps.
  // And therefore doesn't manage it's own state.

  render() {
    return (
      <div className="HomeLeftPanel">
        left
      </div>
    );
  }

}

export default HomeLeftPanel;
