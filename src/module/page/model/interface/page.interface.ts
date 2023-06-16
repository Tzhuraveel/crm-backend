export interface IPageParameter {
  page: number;
  take: number;
  itemCount: number;
  totalCount: number;
}
export interface IPageOptions {
  take: number;
  page: number;
  skip: number;
  sort: string;
}

export interface IPageResponse {
  page: number;
  pageCount: number;
  itemCount: number;
  totalCount: number;
  nextPage: boolean;
  prevPage: boolean;
}

export interface IPagePagination<T> extends IPageResponse {
  data: T;
}
