import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
import { ElMessage, ElLoading, ILoadingInstance } from "element-plus";
import { IResponseData } from "@/type/type";

const state = {
  ok: 200, //请求成功状态码
};

//请求默认配置规则
type TOption = {
  baseURL: string;
  timeout: number;
};

//默认配置
const config = {
  baseURL: "/api",
  timeout: 30 * 1000,
  withCredentials: true,
};

const whiteUrl = ["/captchaImage", "/login"];
//默认加载样式
let loading: ILoadingInstance = ElLoading.service({
  lock: true,
  text: "Loading",
  spinner: "el-icon-loading",
});

class Http {
  service: any;
  constructor(config: TOption) {
    //实例化请求配置
    this.service = axios.create(config);

    //请求拦截
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        let stateToken = localStorage.getItem("token") as string;
        if (config.url && !whiteUrl.includes(config.url) && stateToken) {
          (config.headers as AxiosRequestHeaders).authorization = stateToken;
        }

        return config;
      },
      (error: any) => {
        loading.close();
        return Promise.reject(error);
      }
    );

    //响应拦截
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        loading.close();

        const data = response.data;
        const { code } = data;

        if (!code) {
          //如果没有返回状态码，直接返回数据，针对于返回数据为blob类型
          return response;
        } else if (code !== state["ok"]) {
          ElMessage.error(data.msg || "请求异常");
          return Promise.reject(data);
        }
        return response.data;
      },
      (error: any) => {
        loading.close();
        ElMessage.error("请求失败");
        return Promise.reject(error);
      }
    );
  }

  get<T>(url: string, params?: object, data = {}): Promise<IResponseData<T>> {
    return this.service.get(url, { params, ...data });
  }

  post<T>(url: string, params?: object, data = {}): Promise<IResponseData<T>> {
    return this.service.post(url, params, data);
  }

  put<T>(url: string, params?: object, data = {}): Promise<IResponseData<T>> {
    return this.service.put(url, params, data);
  }

  delete<T>(
    url: string,
    params?: object,
    data = {}
  ): Promise<IResponseData<T>> {
    return this.service.delete(url, { params, ...data });
  }
}

export default new Http(config);
