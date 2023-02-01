import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentData,
  QueryDocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { first, map, Observable, switchMap } from 'rxjs';
import { Item } from '../core/interfaces/item.interface';
import firebase from 'firebase/compat/app';
@Injectable({
  providedIn: 'root',
})
export class ItemService {
  collection = 'Items';
  constructor(private afs: AngularFirestore) {}

  getAll() {
    return this.afs
      .collection<Item>(this.collection)
      .snapshotChanges()
      .pipe(
        map((docs) => {
          return docs.map((doc) => {
            const data = doc.payload.doc.data();
            const id = doc.payload.doc.id;
            return { ...data, id };
          });
        })
      );
  }

  // , (ref) => {
  //   let query: any = ref;
  //   query = query.orderBy(orderBy || 'name');
  //   query = query.limit(pageSize);
  //   if (lastDoc) {
  //     query = query.startAfter(lastDoc);
  //   }
  //   return query;
  // }
  getAllPaginated(
    pageSize: number,
    lastDoc: string | undefined,
    orderBy: string | undefined
    // ) {
  ): Observable<{ results: Item[]; total: number }> {
    // console.log('getAllPaginated: ', pageSize, lastDoc, orderBy);

    return this.afs
      .collection<Item>(this.collection, (ref) => {
        let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        query = query.orderBy(orderBy || 'name');
        query = query.limit(pageSize);
        if (lastDoc) {
          query = query.startAfter(lastDoc);
        }
        return query;
      })
      .snapshotChanges()
      .pipe(
        first(),
        map((docs) => {
          return docs.map((doc) => {
            const data = doc.payload.doc.data();
            const id = doc.payload.doc.id;
            return { ...data, id };
          });
        }),
        switchMap((items) => {
          return this.afs
            .collection(this.collection)
            .get()
            .pipe(
              map((docs) => {
                return { results: items, total: docs.size };
              })
            );
        })
      );
  }
  // getOne(id: string) {
  //   return this.afs
  //     .collection<Item>(this.collection)
  //     .doc(id)
  //     .snapshotChanges()
  //     .pipe(
  //       map((doc) => {
  //         const data = doc.payload.data();
  //         const id = doc.payload.id;
  //         return { ...data, id };
  //       })
  //     );
  // }
  // create(item: Item) {
  //   return this.afs.collection(this.collection).add(item);
  // }
  // update(id: string, item: Item) {
  //   return this.afs.collection(this.collection).doc(id).update(item);
  // }
  // delete(id: string) {
  //   return this.afs.collection(this.collection).doc(id).delete();
  // }
}
