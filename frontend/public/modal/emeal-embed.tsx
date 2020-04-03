/// <reference path="./emeal-embed.d.ts" />

interface EmealModalSettings {
  isLocal?: boolean;
  title: string;
  info: string;
  imgSrc: string;
}

// Note: you cannot set global variables for preview when the script gets readded.
// Once a variable is set, it doesn't like to be readded,
// but for some reason functions don't complain about it.

addModalTargetElement();
DOMReady().then(() => loadModal());

function loadModal() {
  const React = window.React;
  const ReactDOM = window.ReactDOM;
  const Modal = window.ReactModal;

  const modalCloseTimeout = 520;
  const presetSettings = window.emealModalSettings;
  const emealCouponId = window.emealCouponId;

  const vendorStyles = document.querySelector(
    `link[href="${getFullPath('/dist/vendor.css')}"]`
  );
  const modalStyles = document.querySelector(
    `link[href="${getFullPath('/dist/emeal-modal.css')}"]`
  );
  const modalEmbedScript = document.querySelector(
    `script[src="${getFullPath('/dist/emeal-embed.js')}"]`
  );

  // Note: We need to clean up so that we can dynamically load this script as many times as we want for previewing it
  const removeAllAddedScriptsAndStyles = () => {
    // TODO: make sure we clean up everything once the modal is closed
    setTimeout(() => {
      vendorStyles?.remove();
      modalStyles?.remove();
      modalEmbedScript?.remove();
    }, modalCloseTimeout);
  };

  const ModalContent = ({ settings }: { settings: EmealModalSettings }) => (
    <div className='emeal-modal-content'>
      <img src={settings.imgSrc} role='presentation' alt='coupon graphic' />
      <h1 className='emeal-modal-title'>{settings.title}</h1>
      <p>{settings.info}</p>
    </div>
  );

  const ModalContainer = () => {
    const [open, setOpen] = React.useState<boolean>();
    const [settings, setSettings] = React.useState<EmealModalSettings>();

    const configureSettings = async () => {
      setOpen(true);
      if (!presetSettings && !emealCouponId) return;
      if (presetSettings) return setSettings(presetSettings);

      const response = await fetch(
        'https://app.emeal.me/api/coupon/' + emealCouponId,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );
      const data: EmealModalSettings = await response.json();
      setSettings(data);
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
        <ModalContent settings={settings as EmealModalSettings} />
      </Modal>
    );
  };

  Modal.setAppElement('#emeal-embed');
  const domContainer = document.getElementById('emeal-embed');
  ReactDOM.render(<ModalContainer />, domContainer);
}

function getFullPath(path: string) {
  return window.emealModalSettings && window.emealModalSettings.isLocal
    ? '.' + path
    : 'https://app.emeal.me/modal' + path;
}

function addModalTargetElement() {
  const modalTarget = document.createElement('div');
  modalTarget.setAttribute('id', 'emeal-embed');
  document.body.appendChild(modalTarget);
}

function loadStyles() {
  const vendorStyles = document.createElement('link');
  vendorStyles.setAttribute('rel', 'stylesheet');
  vendorStyles.setAttribute('type', 'text/css');
  vendorStyles.setAttribute('href', getFullPath('/dist/vendor.css'));
  document.getElementsByTagName('head')[0].appendChild(vendorStyles);
  new Promise(resolve => (vendorStyles.onload = resolve));

  const modalStyles = document.createElement('link');
  modalStyles.setAttribute('rel', 'stylesheet');
  modalStyles.setAttribute('type', 'text/css');
  modalStyles.setAttribute('href', getFullPath('/dist/emeal-modal.css'));
  document.getElementsByTagName('head')[0].appendChild(modalStyles);
  new Promise(resolve => (modalStyles.onload = resolve));

  return Promise.all([vendorStyles, modalStyles]);
}

function loadDependencies() {
  const vendorjs = window.document.createElement('script');
  vendorjs.type = 'text/javascript';
  vendorjs.src = getFullPath('/dist/vendor.js');
  document.body.appendChild(vendorjs);
  const vendorjsPromise = new Promise(resolve => (vendorjs.onload = resolve));
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
