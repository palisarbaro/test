import { SeqDepartment } from '../models/SeqDepartment'
import { SeqPC } from '../models/SeqPc'
import { SeqUser } from '../models/SeqUser'

export default class UserService {
    async getUsers(){
        const users = await SeqUser.findAll({ include: [SeqDepartment, SeqPC], order: [['id', 'ASC']], })
        const result = []
        for (const user of users){
            result.push({
                id        : user.id,
                salary    : user.salary,
                name      : user.name,
                computer  : { name: user.SeqPC?.name, id: user.SeqPC?.id },
                department: { name: user.SeqDepartment?.name, id: user.SeqDepartment?.id }
            })
        }
        return result
    }
    async addUser(name: string, salary: number, pc: number, department: number){
        await SeqUser.create({ name, salary, SeqPCId: pc, SeqDepartmentId: department })
    }
    async updateDepartment(id: number, department: number){
        await SeqUser.update({ SeqDepartmentId: department }, { where: { id } })
    }
}
