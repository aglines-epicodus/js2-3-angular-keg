import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Animal } from './animal.model';

@Component({
  selector: 'edit-animal',
  template: `
  <div class="well">
    <div *ngIf="childSelectedAnimal">
      <h4>Edit {{childSelectedAnimal.species}}
      <p>Name: <input [(ngModel)]="childSelectedAnimal.name"></p>
      <p>Age: <input [(ngModel)]="childSelectedAnimal.age"></p>
      <p>Diet: {{childSelectedAnimal.diet}}</p>
      <p>Location: {{childSelectedAnimal.location}}</p>
      <p>Caretakers: <input [(ngModel)]="childSelectedAnimal.caretakers"></p>
      <p>Sex: {{childSelectedAnimal.sex}}</p>
      <p>Likes: {{childSelectedAnimal.likes}}</p>
      <p>Dislikes: {{childSelectedAnimal.dislikes}}</p>
      </h4>
      <button (click)="doneButtonClicked()">Done</button>
      </div>
    </div>
  `
})

export class EditAnimalComponent{
  @Input() childSelectedAnimal: Animal;
  @Output() doneButtonClickedSender = new EventEmitter();

  doneButtonClicked() {
    this.doneButtonClickedSender.emit();
  }
}
