import {Resource} from './Resource.model';
import {User} from './User.model';

export class Ticket {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public tel: string;
  public type: number;
  public active: number;
  public addTime: any;
  public dateFrom: any;
  public dateTo: any;
  public note: string;
  public user: User;
  public owner: User;
  public resource: Resource;

  constructor() {
  }
}
