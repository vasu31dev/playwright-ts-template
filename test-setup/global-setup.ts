/**
 * global-setup.ts: This module is responsible for setting up the global state before all tests start.
 * It includes a default export function that runs before all tests, setting up any necessary global context.
 * By centralizing these setup operations, it ensures a consistent starting point for all tests, improving test reliability.
 * You can add any initialization setup code within this function.
 */

/* import { MAX_TIMEOUT } from 'vasu-playwright-utils';
import { LOCAL_HOST_URL } from '../playwright.config';
import axios from 'axios';
import https from 'https';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // Ignore self-signed certificate error
});

export default async () => {
  console.log('Global-setup Waiting for dev Server to load Completely');
  const startTime = Date.now();
  while (Date.now() - startTime < MAX_TIMEOUT) {
    try {
      // Update the URL to match your dev server URL
      await axios.get(LOCAL_HOST_URL, { httpsAgent });
      console.log('Server is reachable and fully loaded');
      break;
    } catch (err) {
      console.log('Server is unreachable ' + String(err)); // Ignore error and try again
    }
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait before trying again
  }
  console.log('dev Server setup is completed in ' + (Date.now() - startTime) + ' ms');
}; */

export default () => {
  // console.log("Add any initialization setup here");
};
