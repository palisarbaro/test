import { Sequelize } from 'sequelize'
import fs from 'fs'

import  SeqUserInit from './SeqUser'
import  SeqDepartmentInit from './SeqDepartment'
import  SeqPcInit from './SeqPc'

import { SeqUser } from './SeqUser'
import { SeqDepartment } from './SeqDepartment'
import { SeqPC } from './SeqPc'
import { DB_USER, DB_NAME, DB_PASSWORD, DB_URL } from '../config'



const logStream = fs.createWriteStream('./sql.log', { 'flags': 'a' })
const options = { logging: (msg: string) => logStream.write(msg) }
let sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_URL}/${DB_NAME}`, options)
if(process.env.NODE_ENV === 'test'){
    sequelize = new Sequelize('sqlite::memory:', options)
}
const models_init = [SeqUserInit, SeqDepartmentInit, SeqPcInit]

for(const model_init of models_init){
    model_init(sequelize)
}
SeqPC.hasOne(SeqUser)
SeqUser.belongsTo(SeqPC)

SeqDepartment.hasMany(SeqUser)
SeqUser.belongsTo(SeqDepartment)

export default sequelize

