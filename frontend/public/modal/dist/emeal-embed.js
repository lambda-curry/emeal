var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/// <reference path="./emeal-embed.d.ts" />
// Note: you cannot set global variables for preview when the script gets readded.
// Once a variable is set, it doesn't like to be readded,
// but for some reason functions don't complain about it.
addModalTargetElement();
DOMReady().then(function () { return loadModal(); });
function loadModal() {
    var _this = this;
    var React = window.React;
    var ReactDOM = window.ReactDOM;
    var Modal = window.ReactModal;
    var modalCloseTimeout = 520;
    var presetSettings = window.emealModalSettings;
    var emealCouponId = window.emealCouponId;
    var modalStyles = document.querySelector("link[href=\"" + getFullPath('/modal/dist/emeal-modal.css') + "\"]");
    var modalEmbedScript = document.querySelector("script[src=\"" + getFullPath('/modal/dist/emeal-embed.js') + "\"]");
    // Note: We need to clean up so that we can dynamically load this script as many times as we want for previewing it
    var removeAllAddedScriptsAndStyles = function () {
        // TODO: make sure we clean up everything once the modal is closed
        setTimeout(function () {
            modalStyles === null || modalStyles === void 0 ? void 0 : modalStyles.remove();
            modalEmbedScript === null || modalEmbedScript === void 0 ? void 0 : modalEmbedScript.remove();
        }, modalCloseTimeout);
    };
    var ModalContent = function (_a) {
        var settings = _a.settings, setOpen = _a.setOpen;
        var _b = React.useState(''), email = _b[0], setEmail = _b[1];
        var sendCoupon = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('https://app.emeal.me/api/coupon/' + emealCouponId, {
                            method: 'GET',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        setOpen(false);
                        return [2 /*return*/];
                }
            });
        }); };
        return (React.createElement("div", { className: 'emeal-modal-content' },
            React.createElement("img", { src: settings.imgSrc, role: 'presentation', alt: 'coupon graphic' }),
            React.createElement("h1", { className: 'emeal-modal-title' }, settings.title),
            React.createElement("p", null, settings.info),
            React.createElement("div", { className: 'emeal-modal-content-row' },
                React.createElement("input", { type: 'email', name: 'email', id: 'email', value: email, onChange: function (e) { return setEmail(e.target.value); }, placeholder: 'Email' }),
                React.createElement("button", { type: 'button', onClick: function () { } }, "Send"))));
    };
    var ModalContainer = function () {
        var _a = React.useState(), open = _a[0], setOpen = _a[1];
        var _b = React.useState(), settings = _b[0], setSettings = _b[1];
        var configureSettings = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setOpen(true);
                        if (!presetSettings && !emealCouponId)
                            return [2 /*return*/];
                        if (presetSettings)
                            return [2 /*return*/, setSettings(presetSettings)];
                        return [4 /*yield*/, fetch('https://app.emeal.me/api/coupon/' + emealCouponId, {
                                method: 'GET',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        setSettings(data);
                        return [2 /*return*/];
                }
            });
        }); };
        React.useEffect(function () {
            configureSettings();
        }, []);
        var handleRequestClose = function () {
            removeAllAddedScriptsAndStyles();
            setOpen(false);
        };
        return (React.createElement(Modal, { portalClassName: 'cleanslate', className: 'emeal-modal', overlayClassName: 'emeal-modal-overlay', isOpen: !!settings && !!open, closeTimeoutMS: modalCloseTimeout, contentLabel: 'emeal coupon modal', onRequestClose: handleRequestClose },
            React.createElement(ModalContent, { settings: settings, setOpen: setOpen })));
    };
    Modal.setAppElement('#emeal-embed');
    var domContainer = document.getElementById('emeal-embed');
    ReactDOM.render(React.createElement(ModalContainer, null), domContainer);
}
function getFullPath(path) {
    return window.emealModalSettings && window.emealModalSettings.isLocal
        ? path
        : 'https://app.emeal.me' + path;
}
function addModalTargetElement() {
    var modalTarget = document.createElement('div');
    modalTarget.setAttribute('id', 'emeal-embed');
    document.body.appendChild(modalTarget);
}
function loadStyles() {
    var modalStyles = document.createElement('link');
    modalStyles.setAttribute('rel', 'stylesheet');
    modalStyles.setAttribute('type', 'text/css');
    modalStyles.setAttribute('href', getFullPath('/modal/dist/emeal-modal.css'));
    document.getElementsByTagName('head')[0].appendChild(modalStyles);
    return new Promise(function (resolve) { return (modalStyles.onload = resolve); });
}
function loadDependencies() {
    var vendorjs = window.document.createElement('script');
    vendorjs.type = 'text/javascript';
    vendorjs.src = getFullPath('/modal/dist/vendor.js');
    document.body.appendChild(vendorjs);
    var vendorjsPromise = new Promise(function (resolve) { return (vendorjs.onload = resolve); });
    return loadStyles().then(function () { return vendorjsPromise; });
}
function DOMReady() {
    return loadDependencies().then(function () {
        return new Promise(function (resolve, reject) {
            if (document.readyState === 'interactive' ||
                document.readyState === 'complete') {
                return resolve();
            }
            if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', function () {
                    resolve();
                });
                return;
            }
            reject();
        });
    });
}
