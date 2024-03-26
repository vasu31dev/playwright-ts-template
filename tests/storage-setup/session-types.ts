export interface Cookie {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires: number;
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'Strict' | 'Lax' | 'None';
}

export interface LocalStorage {
  name: string;
  value: string;
}

export interface Origin {
  origin: string;
  localStorage: LocalStorage[];
}

export interface SessionData {
  cookies: Cookie[];
  origins: Origin[];
}
