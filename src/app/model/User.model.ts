
export class User {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public type: number;
  public state: number;
  public addTime: any;
  public delTime: any;
  public note: string;
  public authKey: string;
  public parentUser: User;
  public role: string;

  constructor() {
  }
}
