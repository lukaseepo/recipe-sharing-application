import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RecipesService} from '../../../recipes/recipes.service';

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
  @Input() public favorite = false;
  @Input() public id!: string;
  @Output() public addToFavorite: EventEmitter<string> = new EventEmitter<string>();
  @Output() public removeFromFavorite: EventEmitter<string> = new EventEmitter<string>();
  public addToFavorites(id: string) {
    this.favorite = true;
    this.addToFavorite.emit(id);
  }

  public removeFromFavorites(id: string) {
    this.favorite = false;
    this.removeFromFavorite.emit(id);
  }
}
