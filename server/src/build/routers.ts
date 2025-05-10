import teste from '../../routers/teste.js'
import Home from '../../routers/index.js'
import EditUser from '../../routers/user/user.post.js'
import Getuserprofile from '../../routers/user/profile.js'
import UserRegistration from '../../routers/auth/signup.js'
import refresh from '../../routers/auth/refresh.js'
import logout from '../../routers/auth/logout.js'
import UserLogin from '../../routers/auth/login.js'
import AuthWithGithub from '../../routers/auth/github.js'
import RegisterAllReposinDatabase from '../../routers/github/register.js'

export const routers = {
  '/teste': teste,
  '/': Home,
  '/user/user.post': EditUser,
  '/user/profile': Getuserprofile,
  '/auth/signup': UserRegistration,
  '/auth/refresh': refresh,
  '/auth/logout': logout,
  '/auth/login': UserLogin,
  '/auth/github/callback': AuthWithGithub,
  '/github/register': RegisterAllReposinDatabase
}
