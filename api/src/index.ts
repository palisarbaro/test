
import express from 'express'
//import cors from 'cors'

import sequelize from './models/dbInstance'
import router from './router'
import { errorHandler } from './errors'
import { port } from './config'

export const app = express()

app.use(express.json())
//app.use(cors({ origin: frontend_url, methods: ['GET', 'POST'], credentials: true, optionsSuccessStatus: 200 }))
app.use('/api', router)
app.use(errorHandler)



async function start() {
    try{
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    }
    catch(e){
        console.log(e)
    }

}
sequelize.sync({ alter: true }).then(start)
