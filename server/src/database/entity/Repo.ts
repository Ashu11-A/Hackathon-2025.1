import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, type Relation } from 'typeorm'
import { Skill } from './Skill'
import { User } from './User'

@Entity({ name: 'repos' })
export class Repo extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
      id!: number

    @Column({ type: 'text' })
      name!: string
    @Column({ type: 'text' })
      description!: string
    @Column({ type: 'text' })
      link!: string

    @ManyToMany(() => Skill, (skills) => skills.repos)
      skills!: Relation<Skill[]>
    @ManyToOne(() => User, (user) => user.repos)
      user!: Relation<User>

    @UpdateDateColumn()
      updatedAt!: Date
    @CreateDateColumn()
      createdAt!: Date
}