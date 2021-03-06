import {Place} from './place.model';

export class Resource {
  id: number;
  name: string;
  description: string;
  type: number;
  state: number;
  addTime: any;
  delTime: any;
  externalId: number;
  place: Place;
  parentResource: Resource;
}

