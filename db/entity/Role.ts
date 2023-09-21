import { Entity , Column,BaseEntity, PrimaryGeneratedColumn,ManyToMany,JoinTable} from "typeorm"
import { User } from "./user.js";
import { Permission } from "./Permission.js";

@Entity()
export class Role  extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        nullable: false
    })
    name: string


    // @ManyToMany(() => User, { cascade: true, eager: true })
    // @JoinTable()
    // users: User[];


    @ManyToMany(() => Permission, { cascade: true, eager: true })
    @JoinTable()
    permissions: Permission[];
}
