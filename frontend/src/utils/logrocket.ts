import LogRocket from 'logrocket';
import { UserDto } from '../../../shared';

const shouldRun = process.env.REACT_APP_ENV === 'prod';

export const initLogrocket = () => {
  if (shouldRun)
    LogRocket.init('emealme/emeal', {
      network: {
        requestSanitizer: (request: any) => {
          const urlsToHide = ['login', 'signup', 'password'];
          if (urlsToHide.some((url) => request.url.toLowerCase().includes(url)))
            request.body = null;
          return request;
        },
      },
    });
};

export const identifyLogrocket = (user: UserDto) => {
  if (shouldRun)
    LogRocket.identify(user.id, {
      name: user.name,
      email: user.email,
    });
};
