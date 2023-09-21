import { DataSource, Db } from "typeorm"
import { User } from "./entity/user.js"
import { Profile } from "./entity/Profile.js"
import { Role } from "./entity/Role.js"
import { Permission } from "./entity/Permission.js"

const db = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "gsg_user",
    entities: [User,Profile,Role,Permission],
    synchronize: true,
    
})
 
const initialize=() => {
    db.initialize().then(()=>{
        console.log("connected")
    })
    .catch(err => console.log(err))
    
    
}

export default {initialize}