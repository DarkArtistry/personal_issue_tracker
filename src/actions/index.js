import { issuesActions } from './issueActions.js';

function fetchActionSection (section, route, params) {
  switch (section) {
    case 'issues':
      let actionObject = issuesActions(params, route)
      // NOTE: because currently we will be using localStorage, it wont have
      // multiple actionObject.types, but for future server request intergration
      // purposes i will still apply it here.
      // actionObject = actionObject.types.length > 1 ? actionObject : actionObject.types[0];
      return async (dispatch, getState) => {
        if (params) {
          actionObject['params'] = params;
          console.log('actionObject w/ params is ..', actionObject);
          dispatch(actionObject);
        } else {
          dispatch(actionObject);
        }
      }
      break;
    default:

  }
}

export function getIssues(params) {
  return fetchActionSection('issues', 'getIssues', params);
}

export function createIssue(params) {
  return fetchActionSection('issues', 'createIssue', params);
}

export function issueClicked(params) {
  return fetchActionSection('issues', 'issueClicked', params);
}

export function updateIssue(params) {
  return fetchActionSection('issues', 'updateIssue', params);
}

export function deleteIssue(params) {
  return fetchActionSection('issues', 'deleteIssue', params);
}

export function issueSort(params) {
  return fetchActionSection('issues', 'issueSort', params);
}
