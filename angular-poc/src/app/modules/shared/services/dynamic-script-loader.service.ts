import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
// import { environment } from 'src/environments/environment';

interface Scripts {
  name: string;
  src: string;
  type: string;
}

declare let document: any;

@Injectable({
  providedIn: 'root',
})
export class DynamicScriptLoaderService {
  private scripts: any = {};

  load(...scripts: string[]) {
    return new Promise((resolve) => {
      const ScriptStore: Scripts[] = [
        {
          name: 'chatbot-js',
          src: environment.CHATBOT_JS_URL,
          type: 'js',
        },
        {
          name: 'chatbot-css',
          src: environment.CHATBOT_CSS_URL,
          type: 'css',
        },
      ];

      ScriptStore.forEach((script: any) => {
        this.scripts[script.name] = {
          loaded: false,
          src: script.src,
          type: script.type,
        };
      });

      const promises: any[] = [];

      scripts.forEach((script) => promises.push(this.loadScript(script)));

      resolve(Promise.all(promises));
    });
  }

  loadScript(name: string) {
    return new Promise((resolve) => {
      if (!this.scripts[name].loaded) {
        if (this.scripts[name].type === 'js') {
          // load script
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = this.scripts[name].src;

          if (script.readyState) {
            script.onreadystatechange = () => {
              if (
                script.readyState === 'loaded'
                || script.readyState === 'complete'
              ) {
                script.onreadystatechange = null;
                this.scripts[name].loaded = true;
                resolve({ script: name, loaded: true, status: 'Loaded' });
              }
            };
          } else {
            script.onload = () => {
              this.scripts[name].loaded = true;
              resolve({ script: name, loaded: true, status: 'Loaded' });
            };
          }

          script.onerror = () => resolve({ script: name, loaded: false, status: 'Loaded' });
          document.getElementsByTagName('head')[0].appendChild(script);
        } else {
          const head = document.getElementsByTagName('head')[0];
          const link = document.createElement('link');
          link.href = this.scripts[name].src;
          link.type = 'text/css';
          link.rel = 'stylesheet';
          head.appendChild(link);
        }
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }
}
