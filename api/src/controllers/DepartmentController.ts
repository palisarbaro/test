import { Request, Response, NextFunction } from 'express'

import { BadRequest } from '../errors'
import { responseOk } from '../utils'
import  DepartmentService from '../services/DepartmentService'

export default class DepartmentController {

    departmentService: DepartmentService
    constructor(departmentService: DepartmentService){
        this.departmentService = departmentService
    }
    async getDepartments(req: Request, res: Response, next: NextFunction) {
        try{
            const departments = await this.departmentService.getDepartments()
            responseOk(res, { departments })
        }
        catch(err){
            next(err)
        }
    }
    async postDepartment(req: Request, res: Response, next: NextFunction) {
        try{
            const name = req.body.name
            if(typeof name != 'string'){
                throw new BadRequest('name must be a string')
            }
            if(!name){
                throw new BadRequest('name cannot be empty')
            }
            try{
                await this.departmentService.addDepartment(name)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            catch(e: any){
                if(e.name == 'SequelizeUniqueConstraintError'){
                    throw new BadRequest('Department already exists')
                }
                throw e
            }
            responseOk(res, {})
        }
        catch(err){
            next(err)
        }
    }
    async deleteDepartments(req: Request, res: Response, next: NextFunction) {
        try{
            const ids = req.body.ids
            if(!Array.isArray(ids)){
                throw new BadRequest('ids must be an array')
            }
            for(const id of ids){
                if(typeof id != 'number'){
                    throw new BadRequest(' every id must be a number')
                }
            }
            try{
                await this.departmentService.deleteDepartments(ids)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            catch(e: any){
                console.log(e)
                throw e
            }
            responseOk(res, {})
        }
        catch(err){
            next(err)
        }
    }
}
