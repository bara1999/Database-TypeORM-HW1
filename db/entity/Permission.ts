import { Entity , Column,BaseEntity, PrimaryGeneratedColumn,ManyToMany,JoinTable} from "typeorm"


@Entity()
export class Permission  extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        nullable: false
    })
    name: string


   
}