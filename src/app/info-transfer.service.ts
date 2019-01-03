import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoTransferService {

  private displayEdit = new BehaviorSubject<boolean>(false);
  displayEditState = this.displayEdit.asObservable();

  constructor() { }

  changeDisplayEditState(isOn: boolean) {
    console.log(this.displayEdit);
    this.displayEdit.next(isOn);
  }
}
