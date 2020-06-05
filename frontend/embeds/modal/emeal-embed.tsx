/// <reference path="../emeal-embed.d.ts" />

import {
  addTargetElementToBody,
  getFullPath,
  loadDependencies,
} from '../helpers';

interface EmealEmbedSettings {
  isPreview?: boolean;
  title: string;
  description: string;
  image: string;
}

(function () {
  addTargetElementToBody('emeal-embed');
  DOMReady().then(() => loadModal());

  const modalEmbedScript = document.querySelector(
    `script[src$="/modal/dist/emeal-embed.min.js"]`
  );

  function loadModal() {
    const React = window.React;
    const ReactDOM = window.ReactDOM;
    const Modal = window.ReactModal;

    const modalCloseTimeout = 520;
    const presetSettings = window.emealModalSettings;

    const modalStyles = document.querySelector(
      `link[href$="/modal/dist/emeal-modal.css"]`
    );

    const vendorScript = document.querySelector(
      `script[src$="/modal/dist/vendor.js"]`
    );

    const emealProjectId = modalEmbedScript?.getAttribute('data-coupon-id');
    const embedTarget = document.querySelector('#emeal-embed');

    if (!modalEmbedScript || !modalStyles || !vendorScript || !embedTarget)
      return;

    // Note: We need to clean up so that we can dynamically load this script as many times as we want for previewing it
    const removeAllAddedScriptsAndStyles = () => {
      // TODO: make sure we clean up everything once the modal is closed
      setTimeout(() => {
        embedTarget.remove();
        vendorScript.remove();
        modalStyles.remove();
        modalEmbedScript.remove();
      }, modalCloseTimeout);
    };

    const ModalContent = ({
      settings,
      setOpen,
    }: {
      settings: EmealEmbedSettings;
      setOpen: Function;
    }) => {
      const [email, setEmail] = React.useState('');
      const [imgLoaded, setImgLoaded] = React.useState(false);
      const [error, setError] = React.useState<string>();

      const sendCoupon = async () => {
        const emailValid = validateEmail(email);
        if (!emailValid) return setError('Please enter a valid email.');

        if (settings.isPreview) return setOpen(false);

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
        if (response.status !== 200)
          return setError('An error occurred, let us know.');
        const data = await response.json();
        if (data.errors) return setError('An error occurred, let us know.');
        setOpen(false);
      };

      return (
        <div className='emeal-modal-content'>
          <div
            className={`emeal-modal-content-img ${imgLoaded ? 'loaded' : ''}`}
          >
            <div className='emeal-modal-content-loading'>
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
          <h1 className='emeal-modal-title'>{settings.title}</h1>
          <p>{settings.description}</p>
          <div className='emeal-modal-content-row'>
            <div
              className={`emeal-modal-content-input ${error ? 'hasError' : ''}`}
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
                <div className='emeal-modal-content-error'>{error}</div>
              ) : (
                ''
              )}
            </div>

            <button type='button' onClick={sendCoupon}>
              SUBSCRIBE
            </button>
          </div>
          <div className='emeal-modal-link'>
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

    const ModalContainer = () => {
      const [open, setOpen] = React.useState<boolean>();
      const [settings, setSettings] = React.useState<EmealEmbedSettings>(
        presetSettings
      );

      const configureSettings = async () => {
        const noSettingsOrAlreadyOpened =
          (!presetSettings && !emealProjectId) ||
          (!presetSettings?.isPreview &&
            window.localStorage.getItem('__emeal'));

        if (noSettingsOrAlreadyOpened) return;

        const showOnDelay = presetSettings?.isPreview ? 100 : 2000;
        setTimeout(() => setOpen(true), showOnDelay);

        if (presetSettings?.isPreview) return setSettings(presetSettings);

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

        const badResponseOrDisabled =
          !data || !data.project || data.project.disabledAt;
        if (badResponseOrDisabled) return;
        setSettings(data.project.coupon);
      };

      const createSessionToken = () => {
        const tinyRandom = () => Math.random().toString(36).substring(2);
        return tinyRandom() + tinyRandom() + tinyRandom();
      };

      const markModalAsViewed = async () => {
        const emealSessionId = createSessionToken();
        console.log('__emeal session id', emealSessionId);
        window.localStorage.setItem('__emeal', emealSessionId);
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
      }, []);

      React.useEffect(() => {
        if (!window.emealModalSettings?.isPreview && !!settings && !!open)
          markModalAsViewed();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [settings, open]);

      const handleRequestClose = () => {
        removeAllAddedScriptsAndStyles();
        setOpen(false);
      };

      return (
        <Modal
          portalClassName='cleanslate'
          className='emeal-modal'
          overlayClassName='emeal-modal-overlay'
          isOpen={!!settings && !!open}
          closeTimeoutMS={modalCloseTimeout}
          contentLabel='emeal coupon modal'
          onRequestClose={handleRequestClose}
        >
          <button className='emeal-modal-close' onClick={() => setOpen(false)}>
            <img
              src={getFullPath('/graphics/close.svg')}
              alt='close coupon modal'
            />
          </button>

          <ModalContent
            settings={settings as EmealEmbedSettings}
            setOpen={setOpen}
          />
        </Modal>
      );
    };

    Modal.setAppElement('#emeal-embed');
    ReactDOM.render(<ModalContainer />, embedTarget);
  }

  function validateEmail(email: string) {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
  }

  function DOMReady() {
    return loadDependencies(
      '/modal/dist/emeal-modal.css',
      '/modal/dist/vendor.js'
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
