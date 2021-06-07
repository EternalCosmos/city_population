import axios, { Method } from "axios"

export const makeRequest = (method: Method, url: string, data?: any | undefined) => {
  return axios({
    method,
    url,
    data,
  })
}
