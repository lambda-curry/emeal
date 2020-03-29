export const titleCase = (str: string) => {
  const strArr = str.toLowerCase().split(' ');
  for (var i = 0; i < strArr.length; i++) {
    strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1);
  }
  return strArr.join(' ');
};

// Returns a tuple with [responseData, catchError] from a promise.
// The catchError will return as null if there is no caught error.
// If there is a caught error, the responseData will be sent as an empty object.
// Adapted from https://dev.to/sobiodarlington/better-error-handling-with-async-await-2e5m
export const handlePromise = (promise: Promise<any>) =>
  promise.then(data => [data, null]).catch(err => [{}, err]);
