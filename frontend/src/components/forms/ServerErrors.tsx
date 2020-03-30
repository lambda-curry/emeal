import React, { FunctionComponent } from 'react';

export const ServerErrors: FunctionComponent<{
  status: { serverErrors?: string[] } | undefined;
}> = ({ status }) => (
  <>
    {status &&
      status.serverErrors &&
      status.serverErrors.map((error: string) => (
        <div key={error} className='form-error'>
          {error}
        </div>
      ))}
  </>
);
