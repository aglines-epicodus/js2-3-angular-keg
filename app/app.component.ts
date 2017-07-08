import { Component } from '@angular/core';
import { Animal } from './animal.model';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <h1>Zoo-Do List</h1>
    <h3>Today is {{month}}/{{day}}</h3>
    <hr>
    <animal-list [childAnimalList]="masterAnimalList" (clickSender)="editAnimal($event)"></animal-list>
    <hr>
    <edit-animal>[childSelectedAnimal]="selectedAnimal" (doneButtonClickedSender)="finishedEditing()"</edit-animal>
    <new-animal (newAnimalSender)="addAnimal($event)"></new-animal>
  </div>

  `
})

export class AppComponent {
  // DATE
  currentTime = new Date();
  month: number = this.currentTime.getMonth() + 1;
  day: number = this.currentTime.getDate();
  selectedAnimal = null;

  masterAnimalList: Animal[] = [
    new Animal("Arctic Fox", "Moon", 2, "Carnivore", "Northern Trail", 5,"Female", "Cool shade", "Loud noises"),
    new Animal("Ocelot","Prince",4,"Carnivore","Tropical Rain Forest Building",6,"Male","Laying in the sunshine","Toys that are not rope-based"),
    new Animal("Northwest Black Tailed Deer","Tinkerbell",8,"Herbivore","Northern Trail",2,"Female","Delicate roots and leaves","Loud Noises")
  ];

  editAnimal(clickedAnimal) {
    this.selectedAnimal = clickedAnimal;
  }
  finishedEditing() {
    this.selectedAnimal = null;
  }

  addAnimal(newAnimalFromChild: Animal) {
    this.masterAnimalList.push(newAnimalFromChild);
  }

}
