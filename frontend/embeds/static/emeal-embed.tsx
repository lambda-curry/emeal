/// <reference path="../emeal-embed.d.ts" />

import {
  loadDependencies,
  addTargetElementBeforeScript,
  onWindowResize,
  getContainerSize,
} from '../helpers';
import { EmealSettings } from '../emeal-embed';

interface EmealEmbedSettings {
  isPreview?: boolean;
  title: string;
  description: string;
  image: string;
}

(function () {
  const staticEmbedScript = document.querySelector(
    `script[src$="/static/dist/emeal-embed.min.js"]`
  );

  addTargetElementBeforeScript(staticEmbedScript, 'emeal-embed');
  DOMReady().then(() => loadStatic());

  function loadStatic() {
    const React = window.React;
    const ReactDOM = window.ReactDOM;

    const presetSettings = window.emealSettings;

    const staticStyles = document.querySelector(
      `link[href$="/static/dist/emeal-static.css"]`
    );

    const vendorScript = document.querySelector(
      `script[src$="/static/dist/vendor.js"]`
    );

    const emealProjectId = staticEmbedScript?.getAttribute('data-coupon-id');
    const embedTarget = document.querySelector('#emeal-embed');

    if (!staticEmbedScript || !staticStyles || !vendorScript || !embedTarget)
      return;

    const StaticContent = ({ settings }: { settings: EmealEmbedSettings }) => {
      const [email, setEmail] = React.useState('');
      const [imgLoaded, setImgLoaded] = React.useState(false);
      const [error, setError] = React.useState<string>();

      const sendCoupon = async () => {
        const emailValid = validateEmail(email);
        if (!emailValid) return setError('Please enter a valid email.');

        const response = await fetch('https://app.emeal.me/api/coupon/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            projectId: emealProjectId,
            email,
          }),
        });
        const data = await response.json();
        if (response.status !== 200) {
          if (data.errors) return setError(data.errors[0]);
          return setError('An error occurred, let us know.');
        }

        if (data.errors) return setError('An error occurred, let us know.');
      };

      if (!settings) return <></>;

      return (
        <div className='emeal-static-content'>
          <div
            className={`emeal-static-content-img ${imgLoaded ? 'loaded' : ''}`}
          >
            <div className='emeal-static-content-loading'>
              <svg className='emeal-spinner' viewBox='0 0 50 50'>
                <circle
                  className='path'
                  cx='25'
                  cy='25'
                  r='20'
                  fill='none'
                  stroke-width='5'
                ></circle>
              </svg>
            </div>
            <img
              onLoad={() => setImgLoaded(true)}
              src={settings.image}
              height='300'
              width='auto'
              role='presentation'
              alt='coupon graphic'
            />
          </div>
          <h1 className='emeal-static-title'>{settings.title}</h1>
          <p>{settings.description}</p>
          <div className='emeal-static-content-row'>
            <div
              className={`emeal-static-content-input ${
                error ? 'hasError' : ''
              }`}
            >
              <input
                type='email'
                name='email'
                id='email'
                value={email}
                onChange={(e) => {
                  if (error) setError('');
                  setEmail(e.target.value);
                }}
                placeholder='Your email'
              />
              {error ? (
                <div className='emeal-static-content-error'>{error}</div>
              ) : (
                ''
              )}
            </div>

            <button type='button' onClick={sendCoupon}>
              SUBSCRIBE
            </button>
          </div>
          <div className='emeal-static-link'>
            Powered&nbsp;by&nbsp;
            <a
              href='https://emeal.me'
              target='_blank'
              rel='noopener noreferrer'
            >
              emeal.me
            </a>
          </div>
        </div>
      );
    };

    const StaticContainer = () => {
      const [loading, setLoading] = React.useState<boolean>(true);
      const [settings, setSettings] = React.useState<EmealSettings>(
        presetSettings
      );
      const [size, setSize] = React.useState<'small' | 'large'>();

      const containerRef = React.useRef() as React.MutableRefObject<
        HTMLDivElement
      >;

      const configureSettings = async () => {
        const noSettings = !presetSettings && !emealProjectId;
        if (noSettings) return;

        if (presetSettings?.isPreview) {
          setLoading(false);
          return setSettings(presetSettings);
        }

        const response = await fetch(
          'https://app.emeal.me/api/project/' + emealProjectId,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();

        console.log('>>>', data);

        const badResponse = !data || !data.project;
        if (badResponse) return;
        setLoading(false);
        setSettings(data.project.coupon);
      };

      const createSessionToken = () => {
        const tinyRandom = () => Math.random().toString(36).substring(2);
        return tinyRandom() + tinyRandom() + tinyRandom();
      };

      const markStaticObjectAsViewed = async () => {
        const emealSessionId = createSessionToken();
        console.log('__emeal session id', emealSessionId);
        window.localStorage.setItem('__emeal', emealSessionId);
        // TODO: Do we want to have this be a different endpoint or with a different body?
        await fetch(
          `https://app.emeal.me/api/project/${emealProjectId}/markPageView/${emealSessionId}`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );
      };

      React.useEffect(() => {
        configureSettings();
        if (!containerRef.current) return;
        onWindowResize(() => setSize(getContainerSize(containerRef.current)));
      }, [containerRef]);

      React.useEffect(() => {
        if (!window.emealSettings?.isPreview && !!settings && !loading)
          markStaticObjectAsViewed();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [settings, loading]);

      return (
        <div ref={containerRef} className={`cleanslate ${size}`}>
          <StaticContent settings={settings as EmealEmbedSettings} />
        </div>
      );
    };

    ReactDOM.render(<StaticContainer />, embedTarget);
  }

  function validateEmail(email: string) {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
  }

  function DOMReady() {
    return loadDependencies(
      '/static/dist/emeal-static.css',
      '/static/dist/vendor.js'
    ).then(
      () =>
        new Promise((resolve, reject) => {
          if (
            document.readyState === 'interactive' ||
            document.readyState === 'complete'
          ) {
            return resolve();
          }

          if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', () => {
              resolve();
            });
            return;
          }

          reject();
        })
    );
  }
})();
