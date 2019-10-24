import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  create_GroceryItem(record) {
    return this.firestore.collection('Groceries').add(record);
  }

  read_Groceries() {
    return this.firestore.collection('Groceries').snapshotChanges();
  }

  update_GroceryItem(recordID, record) {
    this.firestore.doc('Groceries/' + recordID).update(record);
  }

  delete_GroceryItem(recordID) {
    this.firestore.doc('Groceries/' + recordID).delete();
  }

  check_auth() {
    return this.firestore.collection('allowed_users').snapshotChanges();
  }
}
