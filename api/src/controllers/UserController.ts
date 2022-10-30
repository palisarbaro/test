import { Request, Response, NextFunction } from 'express'

import { BadRequest } from '../errors'
import { responseOk } from '../utils'
import  UserService from '../services/UserService'


export default class UserController {

    userService: UserService
    constructor(userService: UserService){
        this.userService = userService
    }
    async getUsers(req: Request, res: Response, next: NextFunction) {
        try{
            const users = await this.userService.getUsers()
            responseOk(res, { users })
        }
        catch(err){
            next(err)
        }
    }
    async postUser(req: Request, res: Response, next: NextFunction) {
        try{
            const name = req.body.name
            const salary = parseInt(req.body.salary)
            const pc = req.body.pc
            const department = req.body.department
            if(typeof name != 'string'){
                throw new BadRequest('name must be a string')
            }
            if(!name){
                throw new BadRequest('name cannot be empty')
            }
            if(pc != null && typeof pc != 'number'){
                throw new BadRequest('pc must be null or number')
            }
            if(department != null && typeof department != 'number'){
                throw new BadRequest('department must be null or number')
            }
            if(Number.isNaN(salary) || salary < 0){
                throw new BadRequest('salary must be a positive number')
            }

            try{
                await this.userService.addUser(name, salary, pc, department)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            catch(e: any){
                if(e.name == 'SequelizeUniqueConstraintError'){
                    throw new BadRequest('PC already in use')
                }
                console.log(e)
            }
            responseOk(res, {})
        }
        catch(err){
            next(err)
        }
    }
    async pathcUser(req: Request, res: Response, next: NextFunction) {
        try{
            const id = req.body.id
            const department = req.body.department
            if(typeof id != 'number'){
                throw new BadRequest('name must be a number')
            }
            if(department != null && typeof department != 'number'){
                throw new BadRequest('department must be null or number')
            }

            await this.userService.updateDepartment(id, department)

            responseOk(res, {})
        }
        catch(err){
            next(err)
        }
    }

}
