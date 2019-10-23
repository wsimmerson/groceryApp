import {Component, OnInit, ViewChild} from '@angular/core';
import {GroceryService} from './grocery.service';
import {GroceryItem} from './models';

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

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
  addItems = false;

  constructor(private groceryService: GroceryService) {}

  displayedColumns: string[] = ['checked', 'name', 'category', 'trash'];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.groceryService.read_Groceries().subscribe(data => {

      this.groceryItems = data.map(e => {
        const item = e.payload.doc.data() as GroceryItem;
        return {
          id: e.payload.doc.id,
          checked: item.checked || false,
          name: item.name,
          category: item.category,
          when: item.when,
        } as GroceryItem;
      });
      this.dataSource = new MatTableDataSource(this.groceryItems);
      this.dataSource.sort = this.sort;
    });
  }

  CreateRecord() {
    const record = {
      checked: false,
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
    const r = confirm(`Delete ${rowID.name}?`);
    if (r) {
      this.groceryService.delete_GroceryItem(rowID.id);
    }

  }

}
