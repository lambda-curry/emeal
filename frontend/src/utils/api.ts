import { handlePromise } from './helpers';

export const post = async (location: string, values: any) => {
  const [response, error] = await handlePromise(
    fetch(`https://app.emeal.me/api/${location}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
  );

  if (error) return Promise.reject(error);
  const responseJson = await response.json();
  if (response.status !== 200) return Promise.reject(responseJson);
  return Promise.resolve(responseJson);
};
