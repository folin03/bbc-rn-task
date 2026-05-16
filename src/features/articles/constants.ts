export const DOMAINS = [
  'bbc.com',
  'apple.com',
  'google.com',
  'ign.com',
  'youtube.com',
] as const;
export type Domain = (typeof DOMAINS)[number];
