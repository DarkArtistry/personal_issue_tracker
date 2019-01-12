import React from 'react';
import { connect } from 'react-redux';
import './listStyleIssue.css';
import { issueClicked } from '../../actions';

// NOTE: Stateless components (also known as presentational components) should
// make up the bulk of your React applications. As a general rule of thumb,
// the less stateful components your application has, the better.
// Stateless components are easier to test, because you never have to
// interact or set up state.

const ListStyleIssue = ({
    data,
    issueClicked,
    dragStartHoist,
    itemIndex,
    dragEndHoist
  }) => {

  const handleClick = () => {
    issueClicked(data)
  }

  const onDragStart = e => {
    dragStartHoist(itemIndex);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  const onDragEnd = e => {
    dragEndHoist()
  }

  const { id, title, type, assignedTo, description, status } = data;

  return (
    <div
      className="issueListStyle"
      onClick={handleClick}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <h3>{title}</h3>
      <div className="issueRow">iD: {id}</div>
      <div className="issueRow">status: {status}</div>
      <div className="issueRow">type: {type}</div>
      <div className="issueRow">description: </div>
      <div className="issueRow">{description}</div>
      <div className="issueRow">assigned to: {assignedTo}</div>
    </div>
  );

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

export default connect(mapStateToProps, mapDispatchToProps)(ListStyleIssue);
