import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, type Relation } from 'typeorm'
import { Skill } from './Skill'
import { Company } from './Company'

@Entity({ name: 'internships' })
export class Internship extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
      id!: number

    @Column({ type: 'text' })
      name!: string
    @Column({ type: 'text' })
      description!: string
    @Column({ type: 'int', nullable: true })
      salary?: number
    @Column({ type: 'text' })
      link!: string

    @ManyToMany(() => Skill, (skills) => skills.internships)
      skills!: Relation<Skill[]>
    @ManyToOne(() => Company, (company) => company.internships)
      company!: Relation<Company>

    @UpdateDateColumn()
      updatedAt!: Date
    @CreateDateColumn()
      createdAt!: Date
}