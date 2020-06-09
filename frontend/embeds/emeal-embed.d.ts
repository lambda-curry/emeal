export interface EmealSettings {
  isPreview?: boolean;
  title: string;
  description: string;
  image: string;
}

declare global {
  export interface Window {
    emealSettings: EmealSettings;
    emealCouponId: string | undefined;
  }
}
