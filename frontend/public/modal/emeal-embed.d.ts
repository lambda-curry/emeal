export interface EmealModalSettings {
  isLocal?: boolean;
  title: string;
  info: string;
  imgSrc: string;
}

declare global {
  export interface Window {
    emealModalSettings: EmealModalSettings;
    emealCouponId: string | undefined;
  }
}
