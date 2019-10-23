import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(public  afAuth: AngularFireAuth, public  router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  async loginWithGoogle() {
    await  this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.router.navigate(['/']);
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }
}
