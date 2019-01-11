import { STORAGE_KEY } from '../middleware/localStorage.js';

const GET_ISSUES_REQUEST = 'GET_ISSUES_REQUEST';
const GET_ISSUES_SUCCESS = 'GET_ISSUES_SUCCESS';
const GET_ISSUES_FAILURE = 'GET_ISSUES_FAILURE';

const CREATE_ISSUE_REQUEST = 'CREATE_ISSUE_REQUEST';
const CREATE_ISSUE_SUCCESS = 'CREATE_ISSUE_SUCCESS';
const CREATE_ISSUE_FAILURE = 'CREATE_ISSUE_FAILURE';

const ISSUE_CLICKED = 'ISSUE_CLICKED';

const UPDATE_ISSUE_REQUEST = 'UPDATE_ISSUE_REQUEST';
const UPDATE_ISSUE_SUCCESS = 'UPDATE_ISSUE_SUCCESS';
const UPDATE_ISSUE_FAILURE = 'UPDATE_ISSUE_FAILURE';

const DELETE_ISSUE_REQUEST = 'DELETE_ISSUE_REQUEST';
const DELETE_ISSUE_SUCCESS = 'DELETE_ISSUE_SUCCESS';
const DELETE_ISSUE_FAILURE = 'DELETE_ISSUE_FAILURE';

const ISSUES_SORT_REQUEST = 'ISSUES_SORT_REQUEST';
const ISSUES_SORT_SUCCESS = 'ISSUES_SORT_SUCCESS';
const ISSUES_SORT_FAILURE = 'ISSUES_SORT_FAILURE';

export function issuesActions (params, route) {
  return {
    getIssues: {
      types: [GET_ISSUES_REQUEST, GET_ISSUES_SUCCESS, GET_ISSUES_FAILURE],
      [STORAGE_KEY]: 'issues',
      method: 'get'
    },
    createIssue: {
      types: [CREATE_ISSUE_REQUEST,CREATE_ISSUE_SUCCESS,CREATE_ISSUE_FAILURE],
      [STORAGE_KEY]: 'issues',
      method: 'post'
    },
    issueClicked: {
      type: ISSUE_CLICKED,
    },
    updateIssue: {
      types: [UPDATE_ISSUE_REQUEST, UPDATE_ISSUE_SUCCESS, UPDATE_ISSUE_FAILURE],
      [STORAGE_KEY]: 'issues',
      method: 'put'
    },
    deleteIssue: {
      types: [DELETE_ISSUE_REQUEST, DELETE_ISSUE_SUCCESS, DELETE_ISSUE_FAILURE],
      [STORAGE_KEY]: 'issues',
      method: 'delete'
    },
    issueSort: {
      types: [ISSUES_SORT_REQUEST, ISSUES_SORT_SUCCESS, ISSUES_SORT_FAILURE],
      [STORAGE_KEY]: 'issues',
      method: 'put'
    }
  }[route]
}
