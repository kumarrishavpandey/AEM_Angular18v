export interface WebPageDetailsDL {
  URL: string;
  name: string;
  server: string;
  siteSection: string;
  pageViews: {
    value: number;
  },
  isErrorPage?: boolean;
}
