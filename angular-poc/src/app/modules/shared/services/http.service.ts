import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../../environments/environment';
// import { environment } from 'src/environments/environment';

interface ICustomHttpHeader {
  [key: string]: string | string[];
}

interface IAdditionalHttpHeader {
  [key: string]: string | string[] | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private defaultHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    // Set up default headers
    this.defaultHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );
  }

  private getRequestOptions(
    customHeaders: ICustomHttpHeader,
    additionalFields: IAdditionalHttpHeader
  ): any {
    let requestOptions = {};

    if (customHeaders !== null) {
      requestOptions = {
        headers: Object.keys(customHeaders).length
          ? new HttpHeaders(customHeaders)
          : this.defaultHeaders,
      };
    }

    if (additionalFields !== null) {
      requestOptions = {
        ...requestOptions,
        ...additionalFields,
      };
    }

    return requestOptions;
  }

  trimURL(url: string): string {
    return url
      .replace(/^\/+|\/+$/g, '')
      .replace(/^\?+|\?+$/g, '')
      .replace(/^&+|&+$/g, '');
  }

  formatURLpath(paths: string[]): string {
    const pathURL = paths.map((path) => this.trimURL(path)).join('/');
    return this.trimURL(pathURL);
  }

  formatURL(servicePath: string, endpointPath: string | string[]): string {
    const baseURL = servicePath.replace(environment.AEM_BASE_URL, '');

    const endpoint = Array.isArray(endpointPath)
      ? this.formatURLpath(endpointPath)
      : endpointPath;

    let formattedURL = [this.trimURL(baseURL), this.trimURL(endpoint)].join(
      '/'
    );

    // formattedURL = this.trimURL(formattedURL.replace(/\/+/g, '/'));

    if (endpoint.includes('.json')) {
      if (window.location.origin.includes('localhost')) {
        formattedURL = ['http://localhost:4200', formattedURL].join('/');
      }
    } else {
      formattedURL = [formattedURL].join('/');
    }

    formattedURL = this.trimURL(formattedURL);

    if (!formattedURL.startsWith('http') && !formattedURL.startsWith('/')) {
      formattedURL = `/${formattedURL}`;
    }

    return formattedURL;
  }

  createURLendpoint(
    endpointParams: string[],
    queryParams: { [key: string]: string | number } = {}
  ): string {
    const endpoint = this.formatURLpath(endpointParams);

    const queryString = Object.keys(queryParams)
      .reduce((acc: string[], key) => {
        acc.push([key, queryParams[key]].join('=').replace(/\?+|&+/g, ''));
        return acc;
      }, [])
      .join('&');

    return [endpoint, queryString]
      .join('?')
      .replace(/\/+/g, '/')
      .replace(/\?+$/g, '');
  }

  // Common GET request
  get(
    baseURL: string,
    endpoint: string | string[],
    customHeaders: ICustomHttpHeader = null,
    additionalFields: IAdditionalHttpHeader = null
  ): Observable<any> {
    const url = this.formatURL(baseURL, endpoint);
    return this.http.get(
      url,
      this.getRequestOptions(customHeaders, additionalFields)
    );
  }


  get2(
    baseURL: string,
    endpoint: string,
    customHeaders: ICustomHttpHeader = null,
    additionalFields: IAdditionalHttpHeader = null
  ): Observable<any> {
    // const url = this.formatURL(baseURL, endpoint);
    return this.http.get(
      [baseURL,endpoint].join("/"),
      this.getRequestOptions(customHeaders, additionalFields)
    );
  }

  // Common POST request
  post(
    baseURL: string,
    endpoint: string | string[],
    data: any,
    customHeaders: ICustomHttpHeader = null,
    additionalFields: IAdditionalHttpHeader = { reportProgress: true }
  ): Observable<any> {
    const url = this.formatURL(baseURL, endpoint);
    return this.http.post(
      url,
      data,
      this.getRequestOptions(customHeaders, additionalFields)
    );
  }

  // Common PUT request
  put(
    apiUrl: string,
    endpoint: string,
    data: any,
    customHeaders: ICustomHttpHeader = null,
    additionalFields: IAdditionalHttpHeader = null
  ): Observable<any> {
    const url = `${apiUrl}/${endpoint}`;
    return this.http.put(
      url,
      data,
      this.getRequestOptions(customHeaders, additionalFields)
    );
  }

  // Common DELETE request
  delete(
    apiUrl: string,
    endpoint: string,
    customHeaders: ICustomHttpHeader = {},
    additionalFields: IAdditionalHttpHeader = {}
  ): Observable<any> {
    const url = `${apiUrl}/${endpoint}`;
    return this.http.delete(
      url,
      this.getRequestOptions(customHeaders, additionalFields)
    );
  }
}
