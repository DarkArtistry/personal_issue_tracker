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
      <h2>{title}</h2>
      <div>Case ID : {id}</div>
      <div>{status}</div>
      <div>{type}</div>
      <div>{description}</div>
      <div>{assignedTo}</div>
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
