import { Exclude } from 'class-transformer';

export class SerializedUser {
  id: number;
  username: string;

  @Exclude()
  password: string;

  isActive: boolean;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
