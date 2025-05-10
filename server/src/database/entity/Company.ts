import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, type Relation } from 'typeorm'
import { Internship } from './Internship'

@Entity({ name: 'institutions' })
export class Company extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
      id!: number

    @Column({ type: 'text' })
      name!: string
    @Column({ type: 'text', nullable: true })
      link!: string

    @OneToMany(() => Internship, (internship) => internship.company)
      internships!: Relation<Internship>

    @UpdateDateColumn()
      updatedAt!: Date
    @CreateDateColumn()
      createdAt!: Date
}