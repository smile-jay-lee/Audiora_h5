import { BASE_URL } from './config.js';

export function request(options) {
  options.url = BASE_URL + options.url;
  return uni.request(options);
}