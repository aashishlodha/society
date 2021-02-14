import { User } from "../profile/user.model";

export class GuestQR {
  constructor(
    public name: string,
    public date: string,
    public host: User,
    public note?: string
  ) {}
}
