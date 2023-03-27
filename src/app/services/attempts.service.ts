import { Injectable } from '@angular/core';
import {
  QueryFn,
  AngularFirestoreCollection,
  AngularFirestore,
  Query,
  DocumentData,
} from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { combineLatest, map, switchMap, tap } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AttemptsService {
  collection = 'Attempts';
  constructor(private afs: AngularFirestore) {}

  getAttemptsFiltredByItemAndDate(item: number, date: Date) {
    const attempts$ = this.afs
      .collection<any>(this.collection, (ref) => {
        let query:
          | firebase.firestore.CollectionReference
          | firebase.firestore.Query = ref;
        query = query.orderBy('createdAt', 'desc');
        query = query.limit(10);
        // if (lastDoc) {
        //   query = query.startAfter(lastDoc);
        // }
        return query;
      })
      .snapshotChanges()
      .pipe(
        switchMap((attemptsSnap) => {
          const ret = attemptsSnap.map((attemptSnap) => {
            const attempt = attemptSnap.payload.doc.data();
            const attemptId = attemptSnap.payload.doc.id;
            const userId = attempt.userId;
            // Get the user document for this attempt
            return this.afs
              .doc(`Users/${userId}`)
              .valueChanges()
              .pipe(map((user) => ({ id: attemptId, ...attempt, user })));
          });

          return combineLatest([...ret]);
        }),
        tap((attempts) => {
          console.log('attempts', attempts);
        })
      );

    return attempts$;
  }
}
