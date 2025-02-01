import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient) { }

  public addRecipe(recipe: any) {
    return this.http.post<any>(`${environment.apiUrl}/recipes`, recipe);
  }
}
