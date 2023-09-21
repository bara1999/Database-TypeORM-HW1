import { Entity , Column,BaseEntity, PrimaryGeneratedColumn,ManyToMany,JoinTable} from "typeorm"
import { Permission } from "./Permission.js";
import { Role } from "./Role.js";

@Entity()
export class User  extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        nullable: false
    })
    name: string

    @Column(
        {
            nullable: false
        }
    )
    password: string

    @Column({ nullable: false, unique: true })
    email: string;


    @ManyToMany(() => Role, { cascade: true, eager: true })
    @JoinTable()    
    roles: Role[];

   
}
