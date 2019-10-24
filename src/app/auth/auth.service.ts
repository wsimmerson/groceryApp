import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import {Router} from '@angular/router';
import {GroceryService} from '../grocery.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  access = false;

  constructor(public  afAuth: AngularFireAuth, public  router: Router, private groceryService: GroceryService) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));

        // check if user has permissions
        this.groceryService.check_auth().subscribe(data => {
          this.access = true;
        }, error => {
          this.access = false;
        });
        //  end permissions check

      } else {
        localStorage.setItem('user', null);
        this.access = false;
      }
    });
  }

  async loginWithGoogle() {
    await  this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
  }

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }

  get hasPermission() {
    return this.access;
  }
}
