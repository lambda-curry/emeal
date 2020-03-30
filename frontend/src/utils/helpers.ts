import { useEffect } from 'react';

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

// The useAsyncEffect function is a custom hook to pass asynchronous functions into.
// Most helpful when you only want to load data once in functional components (since you don't have access to the
// lifecycle hooks).
// Adapted from https://github.com/facebook/react/issues/14326
export const useAsyncEffect = (
  effect: () => Promise<any>,
  onDestroy?: (arg: any) => void,
  inputs: any[] = []
) => {
  let stillAround = true;
  let result: any;

  useEffect(() => {
    if (stillAround) {
      effect()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        .then(value => (result = value))
        .catch(err => {
          throw new Error(err);
        });
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      stillAround = false;
      if (typeof onDestroy === 'function') {
        onDestroy(result);
      }
    };
  }, inputs);
};
