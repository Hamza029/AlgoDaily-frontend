export default interface APIResponse<T> {
  status: number;
  message: string;
  data: T;
}
