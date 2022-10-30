import { Request, Response, NextFunction } from 'express'

import { BadRequest } from '../errors'
import { responseOk } from '../utils'
import  PCService from '../services/PCService'

export default class PCController {

    pcService: PCService
    constructor(pcService: PCService){
        this.pcService = pcService
    }
    async getPC(req: Request, res: Response, next: NextFunction) {
        try{
            const pc = await this.pcService.getPC()
            responseOk(res, { pc })
        }
        catch(err){
            next(err)
        }
    }
    async postPC(req: Request, res: Response, next: NextFunction) {
        try{
            const name = req.body.name
            if(typeof name != 'string'){
                throw new BadRequest('name must be a string')
            }
            if(!name){
                throw new BadRequest('name cannot be empty')
            }
            try{
                await this.pcService.addPC(name)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            catch(e: any){
                if(e.name == 'SequelizeUniqueConstraintError'){
                    throw new BadRequest('PC already exists')
                }
                throw e
            }
            responseOk(res, {})
        }
        catch(err){
            next(err)
        }
    }
    async deletePCs(req: Request, res: Response, next: NextFunction) {
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
                await this.pcService.deletePCs(ids)
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
