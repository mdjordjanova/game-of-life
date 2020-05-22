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
      map(data => data.map(e => { return e.payload.doc.data() as Pattern; }))
    );
  }

  createPattern(pattern: Pattern){
    return this.firestore.collection('patterns').add({config: pattern.config, name: pattern.name});
  }
}