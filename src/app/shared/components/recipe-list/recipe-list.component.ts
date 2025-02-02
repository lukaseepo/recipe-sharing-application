import { Component, Input } from '@angular/core';
import {Recipe} from '../../models/recipe';

@Component({
  selector: 'app-recipe-list',
  standalone: false,

  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent {
  @Input() public recipes!: Recipe[];
}
