export const DOMAINS = [
  'bbc.com',
  'apple.com',
  'google.com',
  'ign.com',
  'youtube.com',
] as const;
export type Domain = (typeof DOMAINS)[number];

export const DEFAULT_DOMAIN: Domain = 'bbc.com'; // this domain is presented as default ato user after app opens
