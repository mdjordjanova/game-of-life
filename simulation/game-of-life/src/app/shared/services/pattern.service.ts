import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Pattern } from '../models/pattern.model';

@Injectable()
export class PatternService {
  constructor(private firestore: AngularFirestore) { }

  getPatterns(): Observable<Pattern[]> {
    return this.firestore.collection('patterns').snapshotChanges().pipe(
      map(data => data.map(e => {
        return {
          id: e.payload.doc.id,
          name: (e.payload.doc.data() as Pattern).name,
          config: (e.payload.doc.data() as Pattern).config
        }
      }))
    );
  }

  createPattern(pattern: Pattern){
    return this.firestore.collection('patterns').add({config: pattern.config, name: pattern.name});
  }

  updatePattern(pattern: Pattern){
    delete pattern.id;
    this.firestore.doc('patterns/' + pattern.id).update(pattern);
  }

  deletePattern(patternId: string){
    this.firestore.doc('patterns/' + patternId).delete();
}
}