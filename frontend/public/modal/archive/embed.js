// // Note: you cannot set global variables for preview when the script gets readded.
// // Once a variable is set, it doesn't like to be readded,
// // but for some reason functions don't complain about it.

// addModalTargetElement();
// DOMReady().then(loadModal);

// function loadModal() {
//   const React = window.React;
//   const ReactDOM = window.ReactDOM;
//   const e = React.createElement;
//   const Modal = window.ReactModal;
//   const modalCloseTimeout = 520;
//   const presetSettings = window.emealModalSettings;
//   const emealCouponId = window.emealCouponId;

//   const vendorStyles = document.querySelector(
//     `link[href="${getFullPath('/modal/vendor.css')}"]`
//   );
//   const modalStyles = document.querySelector(
//     `link[href="${getFullPath('/modal/emeal-modal.css')}"]`
//   );
//   const modalEmbedScript = document.querySelector(
//     `script[src="${getFullPath('/modal/embed.js')}"]`
//   );
//   const modalVendorScript = document.querySelector(
//     `script[src="${getFullPath('/modal/vendor.js')}"]`
//   );

//   // Note: We need to clean up so that we can dynamically load this script as many times as we want for previewing it
//   const removeAllAddedScriptsAndStyles = () => {
//     // TODO: make sure we clean up everything once the modal is closed
//     setTimeout(() => {
//       vendorStyles.remove();
//       modalStyles.remove();
//       modalEmbedScript.remove();
//       modalVendorScript.remove();
//     }, modalCloseTimeout);
//   };

//   const ModalContent = ({ settings }) => {
//     const ModalImg = e('img', {
//       src: settings.imgSrc,
//       role: 'presentation',
//       alt: 'coupon image'
//     });

//     const ModalTitle = e(
//       'h1',
//       { className: 'emeal-modal-title' },
//       settings.title
//     );

//     const ModalInfo = e('p', { className: 'emeal-modal-info' }, settings.info);

//     return e(
//       'div',
//       { className: 'emeal-modal-content' },
//       ModalImg,
//       ModalTitle,
//       ModalInfo
//     );
//   };

//   const ModalContainer = () => {
//     const [open, setOpen] = React.useState();
//     const [settings, setSettings] = React.useState();
//     const configureSettings = () => {
//       setOpen(true);
//       if (!presetSettings && !emealCouponId) return;
//       if (presetSettings) return setSettings(presetSettings);

//       fetch('https://app.emeal.me/api/coupon/' + emealCouponId, {
//         method: 'GET',
//         header: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json'
//         }
//       })
//         .then(response => response.json())
//         .then(data => setSettings(data));
//     };

//     React.useEffect(() => {
//       configureSettings();
//     }, []);

//     return e(
//       Modal,
//       {
//         portalClassName: 'cleanslate',
//         className: 'emeal-modal',
//         overlayClassName: 'emeal-modal-overlay',
//         isOpen: !!settings && open,
//         onRequestClose: () => {
//           removeAllAddedScriptsAndStyles();
//           setOpen(false);
//         },
//         closeTimeoutMS: modalCloseTimeout,
//         contentLabel: 'emeal coupon modal'
//       },
//       e(ModalContent, { settings })
//     );
//   };

//   Modal.setAppElement('#emeal-embed');
//   const domContainer = document.getElementById('emeal-embed');
//   ReactDOM.render(e(ModalContainer), domContainer);
// }

// function getFullPath(path) {
//   return window.emealModalSettings && window.emealModalSettings.isLocal
//     ? path
//     : 'https://app.emeal.me' + path;
// }

// function addModalTargetElement() {
//   const modalTarget = document.createElement('div');
//   modalTarget.setAttribute('id', 'emeal-embed');
//   document.body.appendChild(modalTarget);
// }

// function loadStyles() {
//   const vendorFonts = document.createElement('link');
//   vendorFonts.setAttribute('rel', 'stylesheet');
//   vendorFonts.setAttribute('type', 'text/css');
//   vendorFonts.setAttribute('href', getFullPath('/modal/vendor.css'));
//   document.getElementsByTagName('head')[0].appendChild(vendorFonts);
//   new Promise(resolve => (vendorFonts.onload = resolve));

//   const modalFonts = document.createElement('link');
//   modalFonts.setAttribute('rel', 'stylesheet');
//   modalFonts.setAttribute('type', 'text/css');
//   modalFonts.setAttribute('href', getFullPath('/modal/emeal-modal.css'));
//   document.getElementsByTagName('head')[0].appendChild(modalFonts);
//   new Promise(resolve => (modalFonts.onload = resolve));

//   return Promise.all([vendorFonts, modalFonts]);
// }

// function loadDependencies() {
//   const vendorjs = window.document.createElement('script');
//   vendorjs.type = 'text/javascript';
//   vendorjs.src = getFullPath('/modal/vendor.js');
//   document.body.appendChild(vendorjs);
//   const vendorjsPromise = new Promise(resolve => (vendorjs.onload = resolve));
//   return loadStyles().then(() => vendorjsPromise);
// }

// function DOMReady() {
//   return loadDependencies().then(
//     () =>
//       new Promise((resolve, reject) => {
//         if (
//           document.readyState === 'interactive' ||
//           document.readyState === 'complete'
//         ) {
//           return resolve();
//         }
//         if (document.addEventListener) {
//           document.addEventListener('DOMContentLoaded', resolve());
//           return;
//         }

//         if (document.attachEvent) {
//           document.attachEvent('onreadystatechange', function() {
//             if (document.readyState !== 'loading') {
//               return resolve();
//             }
//           });
//         }

//         reject();
//       })
//   );
// }
