import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Animal } from './animal.model';

@Component({
  selector: 'animal-list',
  template: `
    <select (change)="onChange($event.target.value)">
      <option value = "allAnimals">All animals</option>
      <option value = "animalsUnderTwo">Animals under 2</option>
      <option value = "animalsTwoOrOlder">Animals 2 or older</option>
    </select>
      <ul>
        <li *ngFor="let currentAnimal of childAnimalList | maturity:filterByMaturity">{{currentAnimal.name}}


        <button (click)="editButtonHasBeenClicked(currentAnimal)">Edit</button></li>
      </ul>
  `
})

export class AnimalListComponent {
  @Input() childAnimalList: Animal[];
  @Output() clickSender = new EventEmitter();

  editButtonHasBeenClicked(animalToEdit: Animal) {
    this.clickSender.emit(animalToEdit);
  }

  filterByMaturity: string = 'allAnimals';

  onChange(optionFromMenu) {
    this.filterByMaturity = optionFromMenu;
  }

  // animals: Animal[] = [
  //   // list of animals used to be here
  // ];
}
