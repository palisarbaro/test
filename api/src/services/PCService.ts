import { SeqPC } from '../models/SeqPc'
import { SeqUser } from '../models/SeqUser'


export default class PCService {
    async getPC(){
        const pcs = await SeqPC.findAll({ include: SeqUser, order: [['id', 'ASC']] })
        const result = []
        for (const pc of pcs){
            result.push({
                id   : pc.id,
                name : pc.name,
                inuse: pc.SeqUser != null
            })
        }
        return result
    }
    async addPC(name: string){
        await SeqPC.create({ name })
    }
    async deletePCs(ids: Array<number>){
        await SeqPC.destroy({ where: { id: ids } })
    }
}
