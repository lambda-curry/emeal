import { handlePromise } from './helpers';
const api = process.env.REACT_APP_API;
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const respond = async (response: Response, error: Error) => {
  if (error) return Promise.reject(error);
  const responseJson = await response.json();
  if (response.status !== 200) return Promise.reject(responseJson);
  return Promise.resolve(responseJson);
};

const handleResponse = (response: Response, error: Error) =>
  handlePromise(respond(response, error));

export const post = async (location: string, values: any) => {
  const [response, error] = await handlePromise(
    fetch(`${api}${location}`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify(values)
    })
  );

  return handleResponse(response, error);
};

export const get = async (location: string) => {
  const [response, error] = await handlePromise(
    fetch(`${api}${location}`, {
      method: 'GET',
      headers,
      credentials: 'include'
    })
  );

  return handleResponse(response, error);
};

export const patch = async (location: string, values: any) => {
  const [response, error] = await handlePromise(
    fetch(`${api}${location}`, {
      method: 'PATCH',
      headers,
      credentials: 'include',
      body: JSON.stringify(values)
    })
  );

  return handleResponse(response, error);
};
