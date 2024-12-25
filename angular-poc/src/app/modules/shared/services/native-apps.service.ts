import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NativeAppsService {
  isAndroidApp(): boolean {
    return typeof window.Android === 'object';
  }

  isIosApp(): boolean {
    return typeof window.webkit === 'object'
    && window.webkit.messageHandlers
    && (
      typeof window.webkit.messageHandlers.webView === 'object'
      || typeof window.webkit.messageHandlers.webViewDGbot === 'object'
      || typeof window.webkit.messageHandlers.refreshDGtoken === 'object'
    );
  }

  isNativeApp(): boolean {
    if (this.isAndroidApp() || this.isIosApp()) {
      const currentPageURL = window.location.href.split('/');
      const currentPage = currentPageURL[currentPageURL.length - 1];
      const nativeAppWhiteList = environment.NATIVE_APP_WHITE_LIST;

      const isAllowedPage = nativeAppWhiteList.some(
        (page) => currentPage === page,
      );

      return isAllowedPage;
    }

    return false;
  }

  isNativeAppDGBot() {
    return window.location.href.includes('chatbot.html');
  }

  handleWebViewDownloadFile(base64Data: string, documentName: string) {
    if (
      this.isAndroidApp()
      && typeof window.Android.handleWebViewDownloadFile === 'function'
    ) {
      window.Android.handleWebViewDownloadFile(base64Data, documentName);
    } else if (
      this.isIosApp()
      && window.webkit.messageHandlers.webView
      && typeof window.webkit.messageHandlers.webView.postMessage === 'function'
    ) {
      window.handleWebViewDownloadFile = () => JSON.stringify({
        base64Data,
        documentName,
      });

      window.webkit.messageHandlers.webView.postMessage('webViewDownloadFile');
    }
  }

  handleWebViewLinkRedirect(linkURL: string) {
    if (
      this.isAndroidApp()
      && typeof window.Android.handleWebViewLinkRedirect === 'function'
    ) {
      window.Android.handleWebViewLinkRedirect(linkURL);
    } else if (
      this.isIosApp()
      && window.webkit.messageHandlers.webView
      && typeof window.webkit.messageHandlers.webView.postMessage === 'function'
    ) {
      window.handleWebViewLinkRedirect = () => linkURL;

      window.webkit.messageHandlers.webView.postMessage('webViewLinkRedirect');
    }
  }

  handleWebViewClose() {
    // if (
    //   this.isAndroidApp()
    //   && typeof window.Android.handleWebViewChatbotClose === 'function'
    // ) {
    //   window.Android.handleWebViewChatbotClose();
    // } else if (
    //   this.isIosApp()
    //   && window.webkit.messageHandlers.webView
    //   && typeof window.webkit.messageHandlers.webView.postMessage === 'function'
    // ) {
    //   window.handleWebViewChatbotClose = () => {};

    //   window.webkit.messageHandlers.webView.postMessage('webViewChatbotClose');
    // }
  }
}
