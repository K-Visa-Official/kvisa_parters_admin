// types/global.d.ts
export {};

declare global {
  interface Window {
    JBPrivateBankBridge?: {
      callNative: (message: string) => void;
    };
    webkit?: {
      messageHandlers?: {
        JBPrivateBankBridge?: {
          postMessage: (message: string) => void;
        };
      };
    };
  }
}
