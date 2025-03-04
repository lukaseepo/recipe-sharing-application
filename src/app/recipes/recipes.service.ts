import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.dev';
import {Recipe} from '../shared/models/recipe';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient) { }

  public addRecipe(recipe: Recipe): Observable<Recipe[]>{
    return this.http.post<Recipe[]>(`${environment.apiUrl}/recipes`, recipe);
  }

  public editRecipe(recipe: Recipe, id: string): Observable<Recipe> {
    return this.http.put<Recipe>(`${environment.apiUrl}/recipes/${id}`, recipe)
  }

  public getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${environment.apiUrl}/recipes`);
  }

  public deleteRecipeById(id: string): Observable<Recipe> {
    return this.http.delete<Recipe>(`${environment.apiUrl}/recipes/${id}`);
  }

  public getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${environment.apiUrl}/recipes/${id}`);
  }
}
