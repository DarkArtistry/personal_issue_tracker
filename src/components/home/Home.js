import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeLeftPanel from './HomeLeftPanel.js';
import HomeRightPanel from './HomeRightPanel.js';
import './Home.css';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      issues: []
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { formIssue, issues , showForm, isFetchingIssue } = this.props;
    let difference = [
      (isFetchingIssue !== prevProps.isFetchingIssue),
      (formIssue && (formIssue.id !== prevProps.formIssue.id))
    ].some(value => { return value === true })

    if (difference) {
      this.setState({
        issues: issues,
        showForm: showForm
      })
    }
  }

  render() {
    const { showForm, formIssue } = this.props;
    const { issues } = this.state;
    return (
      <div className="Home">
        <HomeLeftPanel issues={issues}/>
        { showForm ? <HomeRightPanel formData={formIssue} /> : ''}
      </div>
    );
  }

}

function mapDispatchToProps (dispatch) {
  return {

  }
}

function mapStateToProps (state) {
  let stateIssues = state.issues;
  return {
    isFetchingIssue: stateIssues.isFetching,
    issues: stateIssues.data ? stateIssues.data : stateIssues,
    showForm: stateIssues.showForm ? stateIssues.showForm : false,
    formIssue: stateIssues.formIssue ? stateIssues.formIssue : {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
