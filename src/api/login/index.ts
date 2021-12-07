import http from "@/utils/http";
import { CodeData } from "@/type/login";

const baseURL = "prod-api";
export const getCaptchaImage = () => {
  return http.get<CodeData>("captchaImage", {}, { baseURL });
};

export const gotoLogin = (data: object) => {
  return http.post("/login", data, { baseURL });
};
