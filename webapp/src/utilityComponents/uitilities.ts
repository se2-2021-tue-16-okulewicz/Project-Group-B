export interface IFiltersAndCookies {
  filters: IFilters;
  cookies: {
    [name: string]: any;
  };
};

export interface IFilters{
  [name: string]: any;}