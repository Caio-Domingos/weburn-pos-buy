import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth) {}

  login(email: string, password: string) {
    // TODO
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    // TODO
    return this.auth.signOut();
  }
}
