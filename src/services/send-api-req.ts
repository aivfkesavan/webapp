import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosHeaders,
  InternalAxiosRequestConfig
} from "axios";

import useAuthStore from "../store/auth";
import { root } from './end-points';

type SendApiReqParams = Omit<AxiosRequestConfig, 'headers'> & {
  isAuthendicated?: boolean
  headers?: Record<string, string>
}

type CustomError = Error & {
  status?: number
}

const requestIntercepter = (
  instance: AxiosInstance,
  isAuthendicated: boolean,
  headers: Record<string, string>
): void => {
  instance.interceptors.request.use(
    function (config: InternalAxiosRequestConfig) {
      const axiosHeaders = new AxiosHeaders(config.headers)

      if (isAuthendicated) {
        const token = useAuthStore.getState().token
        axiosHeaders.set('Authorization', `Bearer ${token}`)

        // Merge additional headers
        Object.entries(headers).forEach(([key, value]) => {
          axiosHeaders.set(key, value)
        })
      }

      config.headers = axiosHeaders
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )
}

const responseIntercepter = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(
    (res: AxiosResponse) => res.data,
    error => {
      const err: CustomError = new Error(error?.message)
      err.status = error?.response?.status
      err.message = error?.response?.data?.message || error?.message
      throw err
    }
  )
}

const sendApiReq = ({
  isAuthendicated = true,
  headers = {},
  ...others
}: SendApiReqParams): Promise<any> => {
  const instance = axios.create({
    baseURL: root.liveBackendBaseUrl
  })

  requestIntercepter(instance, isAuthendicated, headers)
  responseIntercepter(instance)

  return instance({ ...others })
}

export default sendApiReq