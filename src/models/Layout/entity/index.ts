import { ObjectID } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";
import { CommonEntity } from "../../Common/entity";

@Entity("Layout")
export class Layout extends CommonEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  attribute: object;

  // @ManyToOne(() => Style, (style) => style.layout)
  // parent: Style;

  @Column({ default: false })
  isDeleted: boolean = false;
}
