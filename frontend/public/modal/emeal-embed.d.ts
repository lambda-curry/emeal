export interface EmealModalSettings {
  isPreview?: boolean;
  title: string;
  description: string;
  image: string;
}

declare global {
  export interface Window {
    emealModalSettings: EmealModalSettings;
    emealCouponId: string | undefined;
    Cookies: Cookies.CookiesStatic;
  }
}
