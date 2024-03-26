import { getPage, logger } from 'vasu-playwright-utils';
import { Cookie, LocalStorage, SessionData } from './session-types';
import * as fs from 'fs';
import path from 'path';
import { BASE_URL, STORAGE_STATE_PATH } from '@playwright-config';
import { User } from '@testdata/sauce-demo-test-data';

// Minimum expiration time (in seconds) for a cookie to be considered valid.
const DEFAULT_EXPIRATION_THRESHOLD = 120;
// Name of the Login cookie that will be checked for expiration.
const COOKIE_NAME = 'session-username';
// Domain of the cookie that will be checked for expiration. If this is left empty, the domain check will be skipped.
const COOKIE_DOMAIN = '';
// Alternative: Set the domain explicitly for the cookie to be checked for expiration.
// const COOKIE_DOMAIN = 'www.saucedemo.com';
// Alternative: Extract the domain from the BASE_URL or from a specific URL.
// const COOKIE_DOMAIN = getURLDomain(BASE_URL);
// Path of the cookie that will be checked for expiration. If the path is set to '/', the path check will be skipped.
const COOKIE_PATH = '/';
//If your BASE_URL is different from the originUrl, you can change it here else you can use BASE_URL from @playwright-config
const ORIGIN_URL = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
// Alternative:  If your BASE_URL is different from the originUrl, you can adjust it here.
// const ORIGIN_URL = 'https://nucleus-latest.anacondaconnect.com';

//This cookie is considered valid if its remaining lifetime is greater than the specified threshold of default 120 seconds.
export function isSessionCookieValid(
  cookie: Cookie,
  options?: {
    expirationThreshold?: number;
  },
): boolean {
  const { expirationThreshold = DEFAULT_EXPIRATION_THRESHOLD } = options || {};
  const cookieExpirationTime = cookie.expires;
  // If cookie.expires is undefined or explicitly set to -1, treat as non-expiring cookie
  if (cookie.expires === undefined || cookie.expires === -1) {
    logger.info(`Cookie name: ${cookie.name} is considered non-expiring.`);
    return true;
  }
  const currentTimeInSeconds = Date.now() / 1000; // Current time in seconds
  const timeLeftForExpiration = cookieExpirationTime - currentTimeInSeconds;

  // Check if the cookie is valid for atleast expirationThresholdInSeconds from now
  if (timeLeftForExpiration > expirationThreshold) {
    logger.info(`Cookie name:${cookie.name} is valid for the next ${formatTime(timeLeftForExpiration)}.`);
    return true;
  } else if (timeLeftForExpiration > 0) {
    logger.error(
      `Cookie name:${cookie.name} will expire in ${formatTime(timeLeftForExpiration)} but minimum time set for cookie to be valid is ${formatTime(expirationThreshold)}.`,
    );
  } else {
    logger.error(`Cookie name: ${cookie.name} expired ${formatTime(timeLeftForExpiration)} ago.`);
  }
  return false;
}

export function isUserStorageStateValid(
  user: User,
  options?: { cookieName?: string; expirationThreshold?: number; exact?: boolean; domain?: string; path?: string },
): boolean {
  const defaultOptions = {
    cookieName: COOKIE_NAME,
    domain: COOKIE_DOMAIN,
    path: COOKIE_PATH,
    expirationThreshold: DEFAULT_EXPIRATION_THRESHOLD,
    exact: false,
  };
  const effectiveOptions = { ...defaultOptions, ...options };
  const userPath = getUserAuthPath(user);

  if (!fs.existsSync(userPath)) {
    logger.error(`Cookie file: ${userPath} doesn't exist.`);
    return false;
  }

  try {
    const storageState: SessionData = JSON.parse(fs.readFileSync(userPath, 'utf-8'));
    const validCookies = storageState.cookies.filter(
      cookie =>
        (cookie.name === effectiveOptions.cookieName ||
          (!effectiveOptions.exact && cookie.name.includes(effectiveOptions.cookieName))) &&
        (!effectiveOptions.domain || cookie.domain === effectiveOptions.domain) &&
        (effectiveOptions.path === '/' || cookie.path === effectiveOptions.path),
    );
    if (validCookies.length === 0) {
      logger.error(
        `No valid cookies found for user: ${user.username} with criteria: ${JSON.stringify(effectiveOptions)}`,
      );
      return false;
    }
    const hasValidCookie = validCookies.some(cookie => isSessionCookieValid(cookie, effectiveOptions));
    return hasValidCookie;
  } catch (error) {
    logger.error(`An error occurred while reading the storage file: ${String(error)}`);
    return false;
  }
}

export function getUserAuthPath(user: User): string {
  const username = typeof user === 'string' ? user : user.username;
  return path.join(STORAGE_STATE_PATH, `${username}.json`);
}

export async function addUserCookiesAndStorage(user: User, options?: { originUrl?: string }) {
  const originUrl = options?.originUrl || ORIGIN_URL;
  const userData: SessionData = JSON.parse(fs.readFileSync(getUserAuthPath(user), 'utf-8'));
  const cookies: Cookie[] = userData.cookies;
  const page = getPage();
  logger.info(`Adding cookies for user ${user.username}`);
  await page.context().addCookies(cookies);
  const originEntry = userData.origins.find(origin => origin.origin === originUrl);
  const appLocalStorage: LocalStorage[] = originEntry?.localStorage ?? [];
  // get LocalStorage from the index 0 of origins array but this won't check for the origin URL
  // const nucleusLocalStorage: LocalStorage[] = userData.origins[0].localStorage;
  if (appLocalStorage.length > 0) {
    logger.info(`Adding all the LocalStorage items for user ${user.username}`);
    for (const item of appLocalStorage) {
      await page.evaluate(
        ({ key, value }) => {
          localStorage.setItem(key, value);
        },
        { key: item.name, value: item.value },
      );
    }
  } else {
    logger.error(`No LocalStorage found for origin: ${originUrl}`);
  }
}

function formatTime(seconds: number): string {
  const sign = seconds < 0 ? '-' : '';
  seconds = Math.abs(seconds);

  const days = Math.floor(seconds / 86400);
  seconds -= days * 86400; // Subtract the total seconds for the days
  const hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600; // Subtract the total seconds for the hours
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);

  let timeString = sign;
  if (days > 0) {
    timeString += `${days}d `;
  }
  if (hours > 0 || days > 0) {
    // Show hours if there are any hours or if days were shown
    timeString += `${hours}h `;
  }
  timeString += `${minutes}m ${remainingSeconds}s`;

  return timeString.trim();
}

export function getURLDomain(url: string): string {
  const hostname = new URL(url).hostname;
  const parts = hostname.split('.');

  // If the hostname directly starts with 'www.', keep it as is.
  if (hostname.startsWith('www.')) {
    return hostname;
  }
  // If there are more than 2 parts, it means we have a subdomain.
  // In this case, join the last two parts and prepend a dot to denote domain-level.
  else if (parts.length > 2) {
    return '.' + parts.slice(-2).join('.');
  }
  // If none of the above, it's either a root domain or a www domain without subdomains.
  else {
    // Check specifically for 'www' subdomain if needed, or just return the domain.
    return parts.join('.');
  }
}
