import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeLeftPanel from './HomeLeftPanel.js';
import HomeRightPanel from './HomeRightPanel.js';
import './Home.css';

class Home extends Component {

  state = {};

  componentDidUpdate(prevProps, prevState, snapshot) {

    let difference = [
      (this.props.isFetchingIssue !== prevProps.isFetchingIssue),
      (this.props.formIssue && (this.props.formIssue.id !== prevProps.formIssue.id))
    ].some(value => { return value === true })

    if (difference) {
      this.setState({
        issues: this.props.issues,
        showForm: this.props.showForm
      })
    }
  }

  render() {
    const { showForm, formIssue } = this.props;
    return (
      <div className="Home">
        <HomeLeftPanel issues={this.state.issues}/>
        { console.log('showForm is', showForm)}
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
  console.log('statessss', state);
  return {
    isFetchingIssue: stateIssues.isFetching,
    issues: stateIssues.data ? stateIssues.data : stateIssues,
    showForm: stateIssues.showForm ? stateIssues.showForm : false,
    formIssue: stateIssues.formIssue ? stateIssues.formIssue : {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
