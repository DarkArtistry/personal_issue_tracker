import React, { Component } from 'react';
import * as d3 from "d3";
import Slice from './Slice.js';
import './Pie.css';

class Pie extends Component {

  constructor(props) {
    super(props);
    // https://github.com/d3/d3/wiki/Ordinal-Scales#category10
    this.colorScale = d3.schemeCategory10
    this.renderSlice = this.renderSlice.bind(this);
  }

  renderSlice(value, i) {
    return (
      <Slice
        key={i}
        issueType={this.props.issueTypes[i]}
        outerRadius={this.props.radius}
        value={value}
        label={value.data}
        fill={this.colorScale[i]} />
    );
  }

  render() {
    let {x, y, data} = this.props;
    let pie = d3.pie();
    return (
      <g className="pie" transform={`translate(${x}, ${y})`}>
        { pie(data).map(this.renderSlice) }
      </g>
    );
  }

}

export default Pie;
