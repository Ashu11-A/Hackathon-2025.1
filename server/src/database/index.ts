import dataSource from './dataSource.js'
import { Auth } from './entity/Auth.js'
import { Internship } from './entity/Internship.js'
import { User } from './entity/User.js'

export const userRepository = dataSource.getRepository(User)
export const authRepository = dataSource.getRepository(Auth)
export const internshipRepository = dataSource.getRepository(Internship)
export const authTreeRepository = dataSource.getTreeRepository(Auth)