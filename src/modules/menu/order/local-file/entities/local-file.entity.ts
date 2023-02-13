import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
class LocalFile {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column({default: ""})
  filename: string;
 
  @Column({default: ""})
  path: string;
 
  @Column({default: ""})
  mimetype: string;
}
 
export default LocalFile;