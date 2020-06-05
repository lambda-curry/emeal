export function getFullPath(path: string) {
  return window.emealModalSettings?.isPreview
    ? path
    : 'https://app.emeal.me' + path;
}

export function addTargetElementBeforeScript(embedScript: Node, id: string) {
  const target = document.createElement('div');
  target.setAttribute('id', id);
  embedScript.parentNode?.insertBefore(target, embedScript);
}

export function addTargetElementToBody(id: string) {
  const target = document.createElement('div');
  target.setAttribute('id', id);
  document.body.appendChild(target);
}

// '/modal/dist/vendor.js'
export function loadDependencies(stylePath: string, vendorPath: string) {
  const vendorjs = window.document.createElement('script');
  vendorjs.type = 'text/javascript';
  vendorjs.src = getFullPath(vendorPath);
  document.body.appendChild(vendorjs);
  const vendorjsPromise = new Promise((resolve) => (vendorjs.onload = resolve));
  return loadStyles(stylePath).then(() => vendorjsPromise);
}
// '/modal/dist/emeal-embed.css'
function loadStyles(path: string) {
  const modalStyles = document.createElement('link');
  modalStyles.setAttribute('rel', 'stylesheet');
  modalStyles.setAttribute('type', 'text/css');
  modalStyles.setAttribute('href', getFullPath(path));
  document.getElementsByTagName('head')[0].appendChild(modalStyles);
  return new Promise((resolve) => (modalStyles.onload = resolve));
}
