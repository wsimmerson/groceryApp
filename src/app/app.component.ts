import { Component, OnInit } from '@angular/core';
import {GroceryService} from './grocery.service';
import {GroceryItem} from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'groceryApp';
  groceryItems = [];

  constructor(private groceryService: GroceryService) {}

  ngOnInit() {
    this.groceryService.read_Groceries().subscribe(data => {

      this.groceryItems = data.map(e => {
        return {
          id: e.payload.doc.id,
          checked: e.payload.doc.data()['checked'],
          name: e.payload.doc.data()['name'],
          category: e.payload.doc.data()['category'],
          when: e.payload.doc.data()['when'],
        } as GroceryItem;
      });
      console.log(this.groceryItems);

    });
  }

}
