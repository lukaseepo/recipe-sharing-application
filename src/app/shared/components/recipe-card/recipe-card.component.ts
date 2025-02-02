import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  standalone: false,

  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {
  @Input() public recipeDescription!: string;
  @Input() public recipeTitle!: string;
  @Input() public recipeImage!: string;
  @Input() public id!: string;
}
