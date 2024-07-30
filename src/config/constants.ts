export enum ROUTES {
  HOME = "/",
  LOGIN = "/login",
  SIGNUP = "/signup",
  PROFILE = "/profile",
}

export enum UserRole {
  USER = 0,
  ADMIN = 1,
}

export enum HTTPStatusCode {
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  PartialContent = 206,
  MultipleChoices = 300,
  MovedPermanently = 301,
  Found = 302,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  UnprocessableEntity = 422,
  TooManyRequests = 429,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTiemout = 504,
}

export enum FILTER_TYPE {
  OLDEST,
  NEWEST,
  POPULAR,
}

export enum BUTTON_COLOR {
  BLACK = "black",
  GRAY = "gray",
  GREEN = "green",
  RED = "red",
}

export enum PROFILE_TAB {
  MY_PROFILE,
  MY_BLOGS,
  SECURITY,
}
