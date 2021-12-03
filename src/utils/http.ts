import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
import { ElMessage, ElLoading, ILoadingInstance } from "element-plus";

const state = {
  ok: "200",
};

interface IResponseData<T> {
  status: number;
  message?: string;
  data: T;
  code: string;
}

type TOption = {
  baseURL: string;
  timeout: number;
};

const config = {
  baseURL: "/",
  timeout: 30 * 1000,
};

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
        if (stateToken) {
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

        if (code !== state["ok"]) {
          ElMessage.error(data.msg);
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
