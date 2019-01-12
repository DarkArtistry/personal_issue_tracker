const issues = (state = { issues: [] }, action) => {
  console.log('action in issue reducer', action);
  switch (action.type) {
    case 'GET_ISSUES_REQUEST':
      return {
        ...state,
        isFetching: true,
      }
      break;
    case 'GET_ISSUES_SUCCESS':
      return {
        ...state,
        data: action.response,
        isFetching: false,
      }
      break;
    case 'CREATE_ISSUE_REQUEST':
      return {
        ...state,
        isFetching: true,
      }
      break;
    case 'CREATE_ISSUE_SUCCESS':
      return {
        ...state,
        data: action.response,
        isFetching: false,
        formIssue: action.response[action.response.length - 1]
      }
      break;
    case 'ISSUE_CLICKED':
      return {
        ...state,
        formIssue: action.params,
        showForm: true,
      }
      break;
    case 'UPDATE_ISSUE_REQUEST':
    return {
      ...state,
      isFetching: true,
    }
    case 'UPDATE_ISSUE_SUCCESS':
      return {
        ...state,
        data: action.response,
        isFetching: false,
      }
      break;
    case 'DELETE_ISSUE_REQUEST':
      return {
        ...state,
        isFetching: true,
      }
      break;
    case 'DELETE_ISSUE_SUCCESS':
      return {
        ...state,
        data: action.response,
        isFetching: false,
        formIssue: {
          id:  '',
          title: '',
          type: 'question',
          assignedTo: '',
          description: '',
          status: 'open'
        },
        showForm: false,
      }
      break;
    default:
      return state
  }
}

export default issues;
