/* eslint-disable @typescript-eslint/no-explicit-any */
import type { z } from 'zod'
import type { Router } from '../controllers/router.js'
import teste from '../../routers/teste.js'
import Home from '../../routers/index.js'
import CreateInternship from '../../routers/internship/create.js'
import EditUser from '../../routers/user/user.post.js'
import Getuserprofile from '../../routers/user/profile.js'
import RegisterAllReposinDatabase from '../../routers/github/register.js'
import UserRegistration from '../../routers/auth/signup.js'
import refresh from '../../routers/auth/refresh.js'
import logout from '../../routers/auth/logout.js'
import UserLogin from '../../routers/auth/login.js'
import AuthWithGithub from '../../routers/auth/github.js'

type MergeUnion<T> = (T extends any ? (x: T) => void : never) extends (x: infer R) => void ? { [K in keyof R]: R[K] }: never
type UnwrapPromise<T> = T extends Promise<any> ? Awaited<T> : T
type FirstParameter<T> = T extends Router<infer First, any, any> ? First : never

export type Routers = {
  '/teste': {
    post: {
      response: MergeUnion<UnwrapPromise<ReturnType<typeof teste.methods.post>>>,
      request: z.infer<NonNullable<typeof teste.schema>['post']>,
      auth: undefined
    }
  },
  '/': {
    get: {
      response: MergeUnion<UnwrapPromise<ReturnType<typeof Home.methods.get>>>,
      request: undefined,
      auth: undefined
    }
  },
  '/internship/create': {
    post: {
      response: MergeUnion<UnwrapPromise<ReturnType<typeof CreateInternship.methods.post>>>,
      request: z.infer<NonNullable<typeof CreateInternship.schema>['post']>,
      auth: undefined
    }
  },
  '/user/user.post': {
    post: {
      response: MergeUnion<UnwrapPromise<ReturnType<typeof EditUser.methods.post>>>,
      request: z.infer<NonNullable<typeof EditUser.schema>['post']>,
      auth: FirstParameter<typeof EditUser>
    }
  },
  '/user/profile': {
    get: {
      response: MergeUnion<UnwrapPromise<ReturnType<typeof Getuserprofile.methods.get>>>,
      request: undefined,
      auth: FirstParameter<typeof Getuserprofile>
    }
  },
  '/github/register': {
    get: {
      response: MergeUnion<UnwrapPromise<ReturnType<typeof RegisterAllReposinDatabase.methods.get>>>,
      request: undefined,
      auth: undefined
    }
  },
  '/auth/signup': {
    post: {
      response: MergeUnion<UnwrapPromise<ReturnType<typeof UserRegistration.methods.post>>>,
      request: z.infer<NonNullable<typeof UserRegistration.schema>['post']>,
      auth: undefined
    }
  },
  '/auth/refresh': {
    post: {
      response: MergeUnion<UnwrapPromise<ReturnType<typeof refresh.methods.post>>>,
      request: undefined,
      auth: undefined
    }
  },
  '/auth/logout': {
    post: {
      response: MergeUnion<UnwrapPromise<ReturnType<typeof logout.methods.post>>>,
      request: undefined,
      auth: FirstParameter<typeof logout>
    }
  },
  '/auth/login': {
    post: {
      response: MergeUnion<UnwrapPromise<ReturnType<typeof UserLogin.methods.post>>>,
      request: z.infer<NonNullable<typeof UserLogin.schema>['post']>,
      auth: undefined
    }
  },
  '/auth/github/callback': {
    get: {
      response: MergeUnion<UnwrapPromise<ReturnType<typeof AuthWithGithub.methods.get>>>,
      request: undefined,
      auth: FirstParameter<typeof AuthWithGithub>
    }
  }
}