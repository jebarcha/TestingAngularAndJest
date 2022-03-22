import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../interfaces';

@Component({
  selector: 'app-father-son',
  templateUrl: './father-son.component.html',
  styleUrls: ['./father-son.component.css']
})
export class FatherSonComponent  {

  @Input() client?: Client;
  @Output() onDeleteClient = new EventEmitter();
  @Output() onClientUpdated = new EventEmitter<Client>();

  constructor() { }

  onDelete() {
    this.client = undefined;
    this.onDeleteClient.emit();
  }

  onChange( newId: number) {
    if (!this.client) return;

    // this.client.id = newId;  // no usar
    this.client = {
      ...this.client,
      id: newId
    }
    this.onClientUpdated.emit({...this.client});
  }
  

}
