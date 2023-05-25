import { Column, Entity, ObjectId, ObjectIdColumn } from "@loopback/typeorm"

@Entity()
export class Version {
    @ObjectIdColumn()
    id: ObjectId

    @Column()
    version: string

    @Column()
    versionNumber: number

    @Column()
    use: number

    @Column()
    versionType: number

    @Column()
    height: number

    @Column()
    totalSize: number

    @Column()
    incSize: number

    @Column()
    downloaded: boolean

    @Column()
    install: number

    @Column()
    upgradeMode: number

    @Column()
    upgrading: boolean

    @Column()
    files: Array<string>

    @Column()
    content: string

    @Column()
    gensisBlockSignature: string
}
