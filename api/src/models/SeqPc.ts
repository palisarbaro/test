import { Sequelize, DataTypes, Model } from 'sequelize'
import { SeqUser } from './SeqUser'
export class SeqPC extends Model{
    declare id: number
    declare name: string
    declare SeqUser: SeqUser
}
export default function(sequelize: Sequelize){
    return SeqPC.init(
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
