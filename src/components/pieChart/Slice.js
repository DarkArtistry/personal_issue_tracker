import React, { Component } from 'react';
import * as d3 from "d3";

class Slice extends Component {

  render() {
    let {value, label, fill, innerRadius = 0, outerRadius, issueType } = this.props;

    let arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    return (
      <g>
        <path d={arc(value)} fill={fill} />
        <text transform={`translate(${arc.centroid(value)})`}
              dy=".35em"
              textAnchor="middle"
              fill="white">
          {label > 0 ? label : ''} {label > 0 ? issueType : ''}
        </text>
      </g>
    );
  }

}

export default Slice;
