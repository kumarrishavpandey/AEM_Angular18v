import { AnalyticsInfo } from './datalayer/analytics-info';

export { };

declare global {
  interface Window {
    adobeDataLayer: any[];
    Android: {
      getDGauthCred: () => string;
      refreshDGtoken: () => void;
      handleWebViewDownloadFile: (
        base64Data: string,
        documentName: string
      ) => void;
      handleWebViewLinkRedirect: (linkURL: string) => void;
      handleWebViewChatbotClose: () => void;
    };
    chatbotConfig: {
      isNativeAppPage: boolean;
      isAndroidApp: boolean;
      isIsoApp: boolean;
      expandView: boolean;
      showMinimizeChatBtn: boolean;
      showCloseChatBtn: boolean;
    };
    getDGAuthCred: (authCredStr: string) => void;
    myaiAnalyticsInfo: AnalyticsInfo;
    webkit: {
      messageHandlers: {
        webViewDGbot: {
          postMessage: (message: string) => void;
        };
        webView: {
          postMessage: (message: string) => void;
        };
        refreshDGtoken: {
          postMessage: (message: string) => void;
        };
      };
    };
    handleWebViewDownloadFile: () => string;
    handleWebViewLinkRedirect: () => string;
    handleWebViewChatbotClose: () => void;
  }
}
