import React, { Component } from 'react';
import './HomeRightPanel.css';
import { generateId } from '../../utils/helper.js';
import { config } from '../../utils/config.js';

class HomeRightPanel extends Component {
  // NOTE : I am thinking to let this component maintain it's own state.
  // Thus it will be having a constructor that receives props from the parent
  // component 'Home'. However it should still dispatch events to the redux store.

  constructor(props) {
    super(props);
    this.state = {
      title: props.title || '',
      type: props.type || 'question',
      assignedTo: props.assignedTo || '',
      description: props.description || ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = name => event => {
    console.log('input name %s event target\'s value is %s', name, event.target.value);
  }

  render() {
    const { issueTypes } = config;
    let currentState = this.state;
    return (
      <div className='HomeRightPanel'>
        Right Form For Issues
        <input type="hidden" name="id"/>
        <div className="inputGroup">
          <label htmlFor="title">Title : </label>
          <input onChange={this.handleChange('title')}/>
        </div>
        <div className="inputGroup">
          <label htmlFor="type">Type: </label>
          <select
            name="type"
            onChange={this.handleChange('type')}
          >
            {
              issueTypes.map((typeOfIssue, index) => {
                return (
                  <option
                    key={index}
                    value={typeOfIssue}
                    selected={currentState.type === typeOfIssue ? true : false}
                  >
                    {typeOfIssue}
                  </option>
                )
              })
            }
          </select>
        </div>
        <div className="inputGroup">
          <label htmlFor="assignedTo">Assigned To : </label>
          <input name="assignedTo" onChange={this.handleChange('assignedTo')}/>
        </div>
        <div className="inputGroup">
          <label htmlFor="description">Description: </label>
          <textarea
            name="description"
            rows="8"
            cols="32"
            onChange={this.handleChange('description')}
          />
        </div>
      </div>
    );
  }

}

export default HomeRightPanel;
