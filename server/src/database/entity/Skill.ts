import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn, type Relation } from 'typeorm'
import { Internship } from './Internship'
import { Repo } from './Repo'
import { User } from './User'

@Entity({ name: 'skills' })
export class Skill extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
      id!: number

    @Column({ type: 'text' })
      name!: string
    /** Isso vai ser basicamente o name mas em lowercase para ter um ID unico no banco de dados */
    @Column({ type: 'text', unique: true })
      value!: string
    @Column({ type: 'text' })
      link!: string

    @ManyToMany(() => Internship, (internship) => internship.skills)
    @JoinTable()
      internships!: Relation<Internship[]>

    @ManyToMany(() => Repo, (repo) => repo.skills)
    @JoinTable()
      repos!: Relation<Repo[]>
    @ManyToMany(() => User, (user) => user.skills)
    @JoinTable()
      users!: Relation<User[]>

    @UpdateDateColumn()
      updatedAt!: Date
    @CreateDateColumn()
      createdAt!: Date
}