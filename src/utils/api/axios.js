import axios from 'axios';
import QUERY from '../../constants/query';
import { setCookie } from '../cookie';
import jwt_decode from 'jwt-decode';
import Storage from '../localStorage';

export default class Axios {
  constructor(url) {
    this.instance = axios.create({
      baseURL: url,
    });

    this.instance.interceptors.response.use(
      response => {
        console.log(response);
        const token = response.headers.authorization;
        const refreshToken = response.headers.refreshtoken;

        if (token) {
          const [, parseToken] = token.split(' ');
          setCookie(QUERY.COOKIE.COOKIE_NAME, parseToken);

          const userName = jwt_decode(parseToken);
          Storage.setUserName(userName.sub);
        } else {
          Storage.removeUserName();
        }

        if (refreshToken) {
          const [, parseToken] = token.split(' ');
          setCookie(QUERY.COOKIE.REFRESH_NAME, parseToken);
        }

        return response;
      },
      error => {
        console.log(error);
        // const myPage = '/api/posts/my-post-list';
        const errorMessage = error.response.data.errorMessage;
        if (errorMessage === 'Token Error') {
          Storage.removeUserName();
          window.location.reload();
        } else {
          alert(errorMessage);
        }

        // if (error.config.url !== myPage) {
        //   alert(errorMessage);
        // }
        console.log(error);
        return Promise.reject(error);
      },
    );
  }

  async get(path, option) {
    console.log(path);
    return this.instance.get(path, option);
  }

  async post(path, payload, option) {
    return this.instance.post(path, payload, option);
  }

  async delete(path, option) {
    return this.instance.delete(`${path}`, option);
  }

  async patch(path, payload, option) {
    return this.instance.patch(`${path}/${payload}`, option);
  }

  async put(path, payload, option) {
    return this.instance.put(`${path}`, payload, option);
  }
}
