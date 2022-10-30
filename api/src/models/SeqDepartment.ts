import { Sequelize, DataTypes, Model } from 'sequelize'
import { SeqUser } from './SeqUser'
export class SeqDepartment extends Model{
    declare id: number
    declare name: string
    declare SeqUsers: Array<SeqUser>
}
export default function(sequelize: Sequelize){
    return SeqDepartment.init(
        {
            id: {
                type         : DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey   : true
            },
            name: {
                type     : DataTypes.TEXT,
                allowNull: false,
                unique   : true
            },

        },
        { timestamps: false, sequelize }
    )
}
