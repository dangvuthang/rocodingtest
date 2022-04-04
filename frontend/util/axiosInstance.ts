import axios, { AxiosResponse } from "axios";

interface IRequest {
  url: string;
  body?: any;
  token?: string;
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_DEVELOPMENT,
});

const getRequest = async (
  request: IRequest
): Promise<AxiosResponse<any, any>> => {
  const { url, token } = request;
  try {
    const data = await axiosInstance.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const postRequest = async (
  request: IRequest
): Promise<AxiosResponse<any, any>> => {
  const { url, token, body } = request;
  try {
    const data = await axiosInstance.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const patchRequest = async (
  request: IRequest
): Promise<AxiosResponse<any, any>> => {
  const { url, token, body } = request;
  try {
    const data = await axiosInstance.patch(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteRequest = async (
  request: IRequest
): Promise<AxiosResponse<any, any>> => {
  const { url, token } = request;
  try {
    const data = await axiosInstance.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export { getRequest, postRequest, patchRequest, deleteRequest };

export default axiosInstance;
