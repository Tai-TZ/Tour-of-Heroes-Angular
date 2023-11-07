import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 0, name: 'Dr. Nice' },
      { id: 1, name: 'Bombasto' },
      { id: 2, name: 'Celeritas' },
      { id: 3, name: 'Magneta' },
      { id: 4, name: 'RubberMan' },
      { id: 5, name: 'Dynama' },
      { id: 6, name: 'Dr. IQ' },
      { id: 7, name: 'Magma' },
      { id: 8, name: 'Tornado' }
    ];
    return { heroes };
  }


}