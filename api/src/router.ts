import { Router } from 'express'
import { userController, departmentController, pcController } from './controllers'

const router = Router()

router.get('/users', userController.getUsers.bind(userController))
router.post('/users', userController.postUser.bind(userController))
router.patch('/users', userController.pathcUser.bind(userController))


router.get('/departments', departmentController.getDepartments.bind(departmentController))
router.post('/departments', departmentController.postDepartment.bind(departmentController))
router.delete('/departments', departmentController.deleteDepartments.bind(departmentController))


router.get('/pc', pcController.getPC.bind(pcController))
router.post('/pc', pcController.postPC.bind(pcController))
router.delete('/pc', pcController.deletePCs.bind(pcController))



export default router