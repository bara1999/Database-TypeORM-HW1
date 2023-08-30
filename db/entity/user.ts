import { Entity , Column,BaseEntity, PrimaryGeneratedColumn} from "typeorm"

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
}
