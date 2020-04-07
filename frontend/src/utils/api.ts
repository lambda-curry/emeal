import { handlePromise } from './helpers';
import { ErrorDto } from '../../../shared';
const api = process.env.REACT_APP_API;
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const respond = async (response: Response, error: ErrorDto) => {
  if (error) return Promise.reject(error);
  const responseJson = await response.json();
  if (response.status !== 200 || responseJson.errors)
    return Promise.reject(responseJson);
  return Promise.resolve(responseJson);
};

const handleResponse = <T>(
  response: Response,
  error: ErrorDto
): Promise<[T, ErrorDto]> =>
  handlePromise(respond(response, error)) as Promise<[T, ErrorDto]>;

export const post = async <T, R>(location: string, values: R) => {
  const [response, error] = await handlePromise(
    fetch(`${api}${location}`, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify(values),
    })
  );

  return handleResponse<T>(response, error);
};

export const get = async <T>(location: string) => {
  const [response, error] = await handlePromise(
    fetch(`${api}${location}`, {
      method: 'GET',
      headers,
      credentials: 'include',
    })
  );

  return handleResponse<T>(response, error);
};

export const patch = async <T, R>(location: string, values: R) => {
  const [response, error] = await handlePromise(
    fetch(`${api}${location}`, {
      method: 'PATCH',
      headers,
      credentials: 'include',
      body: JSON.stringify(values),
    })
  );

  return handleResponse<T>(response, error);
};

export const upload = async <T>(location: string, body: FormData) => {
  const [response, error] = await handlePromise(
    fetch(`${api}${location}`, {
      method: 'POST',
      credentials: 'include',
      body,
    })
  );

  return handleResponse<T>(response, error);
};
