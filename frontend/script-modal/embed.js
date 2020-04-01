const link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', 'emeal-modal.css');
document.getElementsByTagName('head')[0].appendChild(link);

document.addEventListener('DOMContentLoaded', function() {
  // eslint-disable-next-line no-use-before-define
  const React = window.React;
  // eslint-disable-next-line no-use-before-define
  const ReactDOM = window.ReactDOM;
  const e = React.createElement;
  const Modal = window.ReactModal;

  const modalCloseTimeout = 500;

  // Note: We need to clean up so that we can dynamically load this script as many times as we want for previewing it
  const removeAllAddedScriptsAndStyles = () => {
    // TODO: make sure we clean up everything once the modal is closed
    const stylesheet = document.querySelector('link[href="emeal-modal.css"]');
    const thisScript = document.querySelector('script[src="./embed.js"]');

    setTimeout(() => {
      stylesheet.remove();
      thisScript.remove();
    }, modalCloseTimeout);
  };

  const ModalContent = () => {
    const ModalTitle = e(
      'h1',
      { className: 'emeal-modal-title' },
      'Hello World'
    );

    return e('div', { className: 'emeal-modal-content' }, ModalTitle);
  };

  const ModalContainer = () => {
    const [open, setOpen] = React.useState();

    React.useEffect(() => {
      setOpen(true);
    }, []);

    return e(
      Modal,
      {
        portalClassName: 'cleanslate',
        className: 'emeal-modal',
        overlayClassName: 'emeal-modal-overlay',
        isOpen: open,
        onRequestClose: () => {
          removeAllAddedScriptsAndStyles();
          setOpen(false);
        },
        closeTimeoutMS: modalCloseTimeout,
        contentLabel: 'emeal coupon modal'
      },
      e(ModalContent)
    );
  };

  Modal.setAppElement('#emeal-embed');
  const domContainer = document.getElementById('emeal-embed');
  ReactDOM.render(e(ModalContainer), domContainer);
});
