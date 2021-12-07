//返回数据规则
export interface IResponseData<T> {
  status?: number;
  msg?: string;
  img?: string;
  data?: T;
  code: number;
  captchaOnOff?: boolean;
  uuid?: string;
}
