import { SeqDepartment } from '../models/SeqDepartment'
import { SeqUser } from '../models/SeqUser'


export default class DepartmentService {
    async getDepartments(){
        const departments = await SeqDepartment.findAll({ order: [['id', 'ASC']], include: SeqUser })
        const result = []
        for (const department of departments){
            result.push({
                id   : department.id,
                name : department.name,
                inuse: department.SeqUsers.length != 0

            })
        }
        return result
    }
    async addDepartment(name: string){
        await SeqDepartment.create({ name })
    }
    async deleteDepartments(ids: Array<number>){
        await SeqDepartment.destroy({ where: { id: ids } })
    }
}
