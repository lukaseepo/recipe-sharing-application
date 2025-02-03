import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  public filterEmptyValues(array: any[], key: string): any[] {
    return array.filter(item => item[key] && item[key].trim() !== '');
  }
}
