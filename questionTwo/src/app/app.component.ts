import { Component } from '@angular/core';
import { CallApiService } from './call-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'questionTwo';
  listCategories: string[] = [];
  tempToShowCategories: string[] = [];
  inputValue = '';

  constructor(private apiService: CallApiService) {
    apiService.getListCategories().subscribe((categories) => {
      console.log(categories);
      this.listCategories = categories;
      this.tempToShowCategories = categories;
    });
  }

  onChangeSearchInput(searchValue: string) {
    const isEmpty = this.listCategories.length === 0;
    if (isEmpty) return;

    const newList = this.listCategories.filter(
      (category) =>
        // category.toLowerCase().includes(searchValue.toLowerCase()) // <- insensitive case
        category.includes(searchValue) // <- sensitive case
    );

    this.tempToShowCategories = newList;
  }
}
