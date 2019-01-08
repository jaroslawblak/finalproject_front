import {User} from './User.model';
import {Resource} from './Resource.model';

export class UserResource {
  id: number;
  type: number;
  state: number;
  addTime: any;
  delTime: any;
  priority: string;
  dateFrom: any;
  dateTo: any;
  note: string;
  user: User;
  resource: Resource;
  parentUserResources: UserResource;
}

