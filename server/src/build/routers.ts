import Home from '../../routers/index.js'
import UserRegistration from '../../routers/auth/signup.js'
import refresh from '../../routers/auth/refresh.js'
import logout from '../../routers/auth/logout.js'
import UserLogin from '../../routers/auth/login.js'

export const routers = {
  '/': Home,
  '/auth/signup': UserRegistration,
  '/auth/refresh': refresh,
  '/auth/logout': logout,
  '/auth/login': UserLogin
}
