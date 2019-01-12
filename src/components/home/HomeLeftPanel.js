import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeLeftPanel.css';
import ListStyleIssue from '../listStyleIssue/listStyleIssue.js';
import PieChartContainer from '../pieChart/PieChartContainer.js';
import { issueClicked, issueSort } from '../../actions';

// NOTE: the left component however is to render according to the redux
// store's state, which will be parsed to mapStateToProps.
// And therefore doesn't manage it's own state.
// NOTE: Now that the CRUD is completed i realized that it would be eaier if
// I'd let this component manage it's own state in order to do the drag and
// drop event. Thus, this component will manage it's own state for the listing's
// order
// NOTE: Also the size of each Issue has to be fixed and calculated in order
// to present a nicer UI when the dragOver event fires. This will be further
// improved if time permits

class HomeLeftPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      issues: props.issues || [],
      draggedItem: {},
      hoveredItem: null
    };
  }

  handleNewIssue = () => {
    let formData = {
      id:  '',
      title: '',
      type: 'question',
      assignedTo: '',
      description: '',
      status: 'open'
    }
    this.props.issueClicked(formData)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { issues, isFetchingIssue } = this.props;
    const issuesString = JSON.stringify(issues);
    const prevIssuesString = JSON.stringify(prevProps.issues)
    let difference = [
      (isFetchingIssue !== prevProps.isFetchingIssue),
      (issuesString !== prevIssuesString)
    ].some(value => { return value === true })

    if (difference) {
      this.setState({
        issues: issues,
      })
    }
  }

  dragStartHoist = (itemIndex) => {
    this.setState({
      draggedItem: this.state.issues[itemIndex]
    })
  }

  onDragOver = index => event => {
    console.log('index on dragOver', index);
    const { draggedItem } = this.state;
    const draggedOverItem = this.state.issues[index];
    // if the item is dragged over itself, ignore
    if (draggedItem === draggedOverItem) return
    // filter out the currently dragged item
    let issues = this.state.issues.filter(issue => issue !== draggedItem);
    // add the dragged item after the dragged over item
    issues.splice(index, 0, draggedItem);
    this.setState({ issues, hoveredItem: index });
  };

  // NOTE: To have the alignment persist in the localStorage, we will need to
  // fire an event when item is DroppED! At this point considerations would come
  // mind if we should fire an event from here to the redux store which will make
  // isFetching isFetchingIssue differ from the previous prop and re-render.
  // HOWEVER, it doesn't matter as we know that react will compare the DOM for us
  // and decide if it has to re-render.
  // NOTE: just FYI, checkout: The Differing Algorithm, https://reactjs.org/docs/reconciliation.html
  dragEndHoist = () => {
    const { draggedItem, issues } = this.state;
    this.setState({
      draggedItem: {},
      hoveredItem: null
    })
    this.props.issueSort(issues)
  }

  render() {
    const { issues, hoveredItem } = this.state;
    return (
      <div className="HomeLeftPanel">
        <h2>Issue Tracker</h2>
          <PieChartContainer/>
        <div>
          <button className="newIssue" type="button" onClick={this.handleNewIssue}>
            New Issue
          </button>
        </div>
        <div className="instructions">
          Drag & Drop Issue To Re-Arrange
        </div>
        <ul>
          { issues && issues.map((eachIssue, index) => {
            return <li
              className={hoveredItem === index ? 'itemHovered': ''}
              key={index}
              onDragOver={this.onDragOver(index)}>
              <ListStyleIssue
                itemIndex={index}
                dragEndHoist={this.dragEndHoist}
                dragStartHoist={this.dragStartHoist}
                data={eachIssue}
              />
            </li>
          })}
        </ul>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    issueClicked: function (params) {
      dispatch(issueClicked(params))
    },
    issueSort: function (params) {
      dispatch(issueSort(params))
    }
  }
}

function mapStateToProps (state) {
  return {
    isFetchingIssue: state.issues.isFetching,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeLeftPanel);
