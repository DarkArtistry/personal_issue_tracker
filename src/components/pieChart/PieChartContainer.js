import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pie from './Pie.js';
import './PieChartContainer.css';
import { config } from '../../utils/config.js'

class PieChartContainer  extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    this.pieChartWrapper = React.createRef();
  }


  render () {
    // Set the Data
    const { issues } = this.props;
    const { issueTypes } = config;
    let openIssues =  issues.filter(issue => issue.status === 'open');
    let data = issueTypes.map((issuetype) => {
      let totalIssueType = openIssues.filter((issue) => issue.type === issuetype)
      return totalIssueType.length
    })

    const width = 210;
    const height = 210;
    const minViewportSize = Math.min(width, height);
    // This sets the radius of the pie chart to fit within
    // the current defined size, with some additional padding
    const radius = (minViewportSize * .9) / 2;
    // Centers the pie chart
    let containerWidth = this.pieChartWrapper.clientWidth
    const x = containerWidth / 2;
    const y = height / 2;



    // NOTE: According to current React docs, the preferred use of refs is to
    // pass it a callback rather than a string to be accessed elsewhere in
    // this.refs. checkout: https://reactjs.org/docs/refs-and-the-dom.html
    return (
      <div ref={(input) => { this.pieChartWrapper = input }} style={{ height: minViewportSize }}>
        <svg className="svgTag" width="100%" height="100%">
          <Pie x={x} y={y} radius={radius} data={data} issueTypes={issueTypes} />
        </svg>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PieChartContainer);
