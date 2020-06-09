export function getFullPath(path: string) {
  return window.emealSettings?.isPreview ? path : 'https://app.emeal.me' + path;
}

export function addTargetElementBeforeScript(
  embedScript: Node | null,
  id: string
) {
  if (!embedScript) return;
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

export function onWindowResize(callback: Function) {
  callback();
  window.addEventListener(
    'resize',
    debounce(() => callback(), 200)
  );
}

export function getContainerSize(container: HTMLDivElement) {
  const width = container.offsetWidth;
  return width < 525 ? 'small' : 'large';
}

function debounce(callback: Function, wait: number) {
  let timeout: any;
  return (...args: any[]) => {
    const context = this as Function;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
}
