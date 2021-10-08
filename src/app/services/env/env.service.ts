export class EnvService {
  // The values that are defined here are the default values that can
  // be overridden by env.js

  // API url
  private apiUrl = '';

  // Puerto
  private apiService = '';

  // Whether or not to enable debug mode
  private enableDebug = true;

  constructor() {}

  public setUrl(url: string) {
    if (url) {
      this.apiUrl = url;
      localStorage.setItem('apiUrl', this.apiUrl);
    }
  }

  public getUrl() {
    return localStorage.getItem('apiUrl');
  }

  public setService(service: string) {
    if (service) {
      this.apiService = service;
    }
  }

  public getService() {
    return this.apiService;
  }
}
