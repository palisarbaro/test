
import UserController from './UserController'
import DepartmentController from './DepartmentController'
import UserService from '../services/UserService'
import DepartmentService from '../services/DepartmentService'
import PCService from '../services/PCService'
import PCController from './PCController'

const userService = new UserService()
const departmentService = new DepartmentService()
const pcService = new PCService()

export const userController = new UserController(userService)
export const departmentController = new DepartmentController(departmentService)
export const pcController = new PCController(pcService)