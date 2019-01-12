import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeRightPanel.css';
import { generateId } from '../../utils/helper.js';
import { config } from '../../utils/config.js';
import { updateIssue, createIssue, deleteIssue } from '../../actions';

class HomeRightPanel extends Component {
  // NOTE : I am thinking to let this component maintain it's own state.
  // the values from the super props is only for seed data.

  constructor(props) {
    super(props);
    const { formData: { id, title, type, assignedTo, description, status }} = props;
    this.state = {
      id: id || '',
      title: title || '',
      type: type || 'question',
      assignedTo: assignedTo || '',
      description: description || '',
      status: status || 'open'
    };
    this.handleChange = this.handleChange.bind(this);
    this.createIssue = this.createIssue.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let { formData } = this.props;
    if (JSON.stringify(prevProps.formData) !== JSON.stringify(formData)) {
        this.setState(formData)
    }
  }

  handleChange = name => event => {
    console.log('input name %s event target\'s value is %s', name, event.target.value);
    let change = {};
    change[`${name}`] = event.target.value;
    this.setState(change);
  }

  createIssue = () => {
    let state = this.state;
    console.log('generating id ..');
    let id = generateId();
    console.log('generated id %s', id);
    state.id = id;
    console.log('state before creating', state);
    this.props.createIssue(state)
  }

  updateIssue = () => {
    const issueToUpdate = this.state;
    this.props.updateIssue(issueToUpdate);
  }

  deleteIssue = () => {
    const issueToDelete = this.state;
    this.props.deleteIssue(issueToDelete);
  }

  handleClickOutside = () => {
    // NOTE: to come back to complete this part again
    console.log('handleClickOutside');
  }

  render() {
    const { issueTypes, statusTypes } = config;
    let {id, title, type, assignedTo, description } = this.state;
    return (
      <div
        className='HomeRightPanel'
        // ref={node => this.node = node}
      >
        <div className="inputGroup">
          <input
            className="title"
            value={title}
            onChange={this.handleChange('title')}
            placeholder="Title"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="type">Status: </label>
          <select
            className="status"
            name="status"
            onChange={this.handleChange('status')}
          >
            {
              statusTypes.map((typeOfStatus, index) => {
                return (
                  <option
                    key={index}
                    value={typeOfStatus}
                    selected={type === typeOfStatus ? true : false}
                  >
                    {typeOfStatus}
                  </option>
                )
              })
            }
          </select>
        {/* </div>
        <div className="inputGroup"> */}
          <label id="labelType" htmlFor="type"> Type: </label>
          <select
            className="type"
            name="type"
            onChange={this.handleChange('type')}
          >
            {
              issueTypes.map((typeOfIssue, index) => {
                return (
                  <option
                    key={index}
                    value={typeOfIssue}
                    selected={type === typeOfIssue ? true : false}
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
          <input
            className="assignedTo"
            name="assignedTo"
            onChange={this.handleChange('assignedTo')}
            value={assignedTo}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="description">Description: </label>
          <textarea
            value={description}
            name="description"
            rows="8"
            cols="32"
            onChange={this.handleChange('description')}
          />
        </div>
        {
          (id === '') && <button
            type="button"
            onClick={this.createIssue}
          >
            Create Issue
          </button>
        }
        {
          (id !== '') && <div>
            <button
              type="button"
              onClick={this.updateIssue}
            >
              Update Issue
            </button>
            <button
              type="button"
              onClick={this.deleteIssue}
            >Delete Issue</button>
          </div>
        }
      </div>
    );
  }

}

function mapDispatchToProps (dispatch) {
  return {
    createIssue: function (params) {
      dispatch(createIssue(params))
    },
    updateIssue: function (params) {
      dispatch(updateIssue(params))
    },
    deleteIssue: function (params) {
      dispatch(deleteIssue(params))
    }
  }
}

function mapStateToProps (state) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeRightPanel);
