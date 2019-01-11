import React from 'react';
import { connect } from 'react-redux';
import './HomeLeftPanel.css';
import ListStyleIssue from '../listStyleIssue/listStyleIssue.js';
import { issueClicked } from '../../actions';

const HomeLeftPanel = ({ issues, issueClicked }) => {
  // NOTE: the left component however is to render according to the redux
  // store's state, which will be parsed to mapStateToProps.
  // And therefore doesn't manage it's own state.

  const handleNewIssue = () => {
    let formData = {
      id:  '',
      title: '',
      type: 'question',
      assignedTo: '',
      description: ''
    }
    issueClicked(formData)
  }

  return (
    <div className="HomeLeftPanel">
      <div>Chart Here</div>
      <div>
        <button type="button" onClick={handleNewIssue}>
          +New Issue
        </button>
      </div>
      { issues && issues.map((eachIssue, index) => {
        return <ListStyleIssue data={eachIssue} key={index} />
      })}
    </div>
  )
}

function mapDispatchToProps (dispatch) {
  return {
    issueClicked: function (params) {
      dispatch(issueClicked(params))
    }
  }
}

function mapStateToProps (state) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeLeftPanel);
