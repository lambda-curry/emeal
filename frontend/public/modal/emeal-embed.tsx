/// <reference path="./emeal-embed.d.ts" />
interface EmealModalSettings {
  isPreview?: boolean;
  title: string;
  description: string;
  image: string;
}

(function () {
  addModalTargetElement();
  DOMReady().then(() => loadModal());

  function loadModal() {
    const React = window.React;
    const ReactDOM = window.ReactDOM;
    const Modal = window.ReactModal;

    const modalCloseTimeout = 520;
    const presetSettings = window.emealModalSettings;
    const emealCouponId = window.emealCouponId;

    const modalStyles = document.querySelector(
      `link[href="${getFullPath('/modal/dist/emeal-modal.css')}"]`
    );

    const vendorScript = document.querySelector(
      `script[src="${getFullPath('/modal/dist/vendor.js')}"]`
    );

    const modalEmbedScript = document.querySelector(
      `script[src="${getFullPath('/modal/dist/emeal-embed.min.js')}"]`
    );

    const embedTarget = document.querySelector('#emeal-embed');

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
      settings: EmealModalSettings;
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
            projectId: emealCouponId,
            email,
          }),
        });
        if (response.status !== 200)
          setError('An error occurred, let us know.');
        const data = await response.json();
        if (data.errors) setError('An error occurred, let us know.');
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
                  if (error) setError(null);
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
      const [settings, setSettings] = React.useState<EmealModalSettings>(
        presetSettings
      );

      const configureSettings = async () => {
        if (!presetSettings && !emealCouponId) return;
        const showOnDelay = presetSettings?.isPreview ? 100 : 2000;

        setTimeout(() => setOpen(true), showOnDelay);
        if (presetSettings?.isPreview) return setSettings(presetSettings);

        const response = await fetch(
          'https://app.emeal.me/api/project/' + emealCouponId,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();

        console.log('project response', data);

        if (!data || !data.project) return;
        setSettings(data.project.coupon);
      };

      React.useEffect(() => {
        configureSettings();
      }, []);

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
          <ModalContent
            settings={settings as EmealModalSettings}
            setOpen={setOpen}
          />
        </Modal>
      );
    };

    Modal.setAppElement('#emeal-embed');
    const domContainer = document.getElementById('emeal-embed');
    ReactDOM.render(<ModalContainer />, domContainer);
  }

  function getFullPath(path: string) {
    return window.emealModalSettings && window.emealModalSettings?.isPreview
      ? path
      : 'https://app.emeal.me' + path;
  }

  function validateEmail(email) {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
  }

  function addModalTargetElement() {
    const modalTarget = document.createElement('div');
    modalTarget.setAttribute('id', 'emeal-embed');
    document.body.appendChild(modalTarget);
  }

  function loadStyles() {
    const modalStyles = document.createElement('link');
    modalStyles.setAttribute('rel', 'stylesheet');
    modalStyles.setAttribute('type', 'text/css');
    modalStyles.setAttribute(
      'href',
      getFullPath('/modal/dist/emeal-modal.css')
    );
    document.getElementsByTagName('head')[0].appendChild(modalStyles);
    return new Promise((resolve) => (modalStyles.onload = resolve));
  }

  function loadDependencies() {
    const vendorjs = window.document.createElement('script');
    vendorjs.type = 'text/javascript';
    vendorjs.src = getFullPath('/modal/dist/vendor.js');
    document.body.appendChild(vendorjs);
    const vendorjsPromise = new Promise(
      (resolve) => (vendorjs.onload = resolve)
    );
    return loadStyles().then(() => vendorjsPromise);
  }

  function DOMReady() {
    return loadDependencies().then(
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
