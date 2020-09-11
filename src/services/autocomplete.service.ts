import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteService {
  filteredOptions: Observable<string[]>;

  public _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();

    return options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0,
    );
  }
}
