import { Sequelize, DataTypes, Model } from 'sequelize'
import { SeqDepartment } from './SeqDepartment'
import { SeqPC } from './SeqPc'
export class SeqUser extends Model{
    declare id: number
    declare salary: number
    declare name: string
    declare SeqPC: SeqPC
    declare SeqDepartment: SeqDepartment
}
export default function(sequelize: Sequelize){
    return SeqUser.init(
        {
            id: {
                type         : DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey   : true
            },
            salary: {
                type     : DataTypes.INTEGER,
                allowNull: false,
            },
            name: {
                type     : DataTypes.TEXT,
                allowNull: false,
            },
            SeqPCId: {
                type  : DataTypes.INTEGER,
                unique: true
            }

        },
        { timestamps: false, sequelize }
    )
}
