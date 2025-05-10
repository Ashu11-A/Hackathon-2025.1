import axios from "axios";
import Cookies from 'js-cookie';
import { UserProfile } from "./types";

export class API {
  public isLoggedIn = false
  public options: LoginData = {
    accessToken: {
      token: '',
      expireDate: new Date(),
      expireSeconds: 0
    },
    refreshToken: {
      token: '',
      expireDate: new Date(),
      expireSeconds: 0
    }
  }

  constructor() {
    // Try to load saved tokens from cookies
    const savedTokens = Cookies.get('auth_tokens')
    if (savedTokens) {
      try {
        const tokens = JSON.parse(savedTokens)
        this.options = {
          accessToken: {
            ...tokens.accessToken,
            expireDate: new Date(tokens.accessToken.expireDate)
          },
          refreshToken: {
            ...tokens.refreshToken,
            expireDate: new Date(tokens.refreshToken.expireDate)
          }
        }
        this.isLoggedIn = true
      } catch (error) {
        console.error('Failed to load saved tokens:', error)
      }
    }
  }

  get instance() {
    return axios.create({
      baseURL: 'http://localhost:4000',
      headers: {
        Authorization: this.options.accessToken.token ? `Bearer ${this.options.accessToken.token}` : undefined
      }
    })
  }

  async login({ email, password }: { email: string, password: string }) {
    const result = await this.instance.post('/auth/login', {
      email,
      password
    })

    if (result.status !== 200) return null

    this.isLoggedIn = true

    this.options = result.data.data as LoginData
    // Save tokens to cookies with expiration
    Cookies.set('auth_tokens', JSON.stringify(this.options), {
      expires: new Date(this.options.accessToken.expireDate),
      secure: true,
      sameSite: 'strict'
    })
    return this.options
  }

  async profile() {
    return await this.instance.get('/user/profile') as UserProfile
  }
}

export type Tag = {
  id: number;
  name: string;
  value: string;
  link: string;
}	

export type ProfileData = {
  name: string;
  email: string;
  username: string;
  language: string;
  tags: Tag[];
}

export type LoginData = {
  accessToken: {
    token: string;
    expireDate: Date;
    expireSeconds: number;
  };
  refreshToken: {
    token: string;
    expireDate: Date;
    expireSeconds: number;
  };
}