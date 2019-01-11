// For illustration, i will code is as if it was calling a server,
// by applying STORAGE_KEY

// Action key that carries API call info interpreted by this Redux middleware.
export const STORAGE_KEY = Symbol('localStorage key');

//Below is a function that detects whether localStorage is both supported and available:
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}

async function callLocalStorage(storageKey, method, params) {
  let issueData = await localStorage.getItem(`${storageKey}`);
  console.log('issueData', issueData);
  switch (method) {
    case 'get':
      console.log('%s in storage are %s and parameters are %s',
      storageKey, issueData, params);
      if (issueData === null) {
        issueData = [];
      } else {
        issueData = JSON.parse(issueData)
      }
      return issueData;
      break;
    case 'post':
      if (issueData === null) {
        issueData = [];
      } else {
        issueData = JSON.parse(issueData)
      }
      issueData.push(params)
      localStorage.setItem(`${storageKey}`, `${JSON.stringify(issueData)}`);
      return issueData
      break;
    case 'put':
      issueData = JSON.parse(issueData);
      let updatedIssueData;
      if (params.id) {
        // If it's a singular issue update
        updatedIssueData = issueData.map((issue) => {
          if (issue.id === params.id) return params;
          return issue;
        })
      } else if (params.length) {
        // If it's a sorting update, replace whole array
        updatedIssueData = params;
      } else {
        // Error handling
        updatedIssueData = [];
      }
      localStorage.setItem(`${storageKey}`, `${JSON.stringify(updatedIssueData)}`);
      return updatedIssueData
      break;
    case 'delete':
      issueData = JSON.parse(issueData)
      let remainingIssueData = issueData.filter(issue => issue.id !== params.id)
      localStorage.setItem(`${storageKey}`, `${JSON.stringify(remainingIssueData)}`);
      return remainingIssueData
      break;
    default:
  }
}

export default store => next => (action) => {
  console.log('action IN localstorage MIDDLEWARE is', action);

  const storageKey = action[STORAGE_KEY];

  // If it's not a localStorage's action skip to next action.
  if (typeof storageKey === 'undefined') {
    return next(action);
  }

  const { method, types, params } = action;

  if (!storageAvailable('localStorage')) {
    return next({ type: types[2] });
  }

  next({ type: types[0] });

  return callLocalStorage(storageKey, method, params).then(
    response => next({
      response,
      type: types[1],
    }), error => next({
      error: (error && error.message) || 'Something bad happened',
      type: types[2]
    })
  )
}
