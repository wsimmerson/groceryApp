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
  groceryName;
  groceryCategory;

  constructor(private groceryService: GroceryService) {}

  ngOnInit() {
    this.groceryService.read_Groceries().subscribe(data => {

      this.groceryItems = data.map(e => {
        const item = e.payload.doc.data() as GroceryItem;
        return {
          id: item.id,
          checked: item.checked,
          name: item.name,
          category: item.category,
          when: item.when,
        } as GroceryItem;
      });
    });
  }

  CreateRecord() {
    const record = {
      name: this.groceryName,
      category: this.groceryCategory,
      when: (new Date()).toLocaleString()
    } as GroceryItem;

    this.groceryService.create_GroceryItem(record).then(resp => {
      this.groceryName = '';
      this.groceryCategory = '';
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  UpdateRecord(record) {
    record.when = (new Date()).toLocaleString();
    this.groceryService.update_GroceryItem(record.id, record);
  }

  RemoveRecord(rowID) {
    this.groceryService.delete_GroceryItem(rowID);
  }

}
