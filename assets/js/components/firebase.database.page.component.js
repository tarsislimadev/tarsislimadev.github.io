import { PageComponent } from './page.component.js'
import { initializeApp } from '../../../assets/js/apis/firebase/app/index.js'
import { getFirestore } from '../../../assets/js/apis/firebase/firestore/index.js'
import { getDatabase, ref, set, onValue } from '../../../assets/js/apis/firebase/database/index.js'
import firebase from '../../../assets/js/config/firebase/index.js'

export class FirebaseDatabasePageComponent extends PageComponent {
  firebase = {
    app: null,
    db: null,
    database: null,
    json: null,
  }

  onCreate() {
    super.onCreate()
    this.firebase.app = initializeApp(firebase)
    this.firebase.db = getFirestore(this.firebase.app)
    this.firebase.database = getDatabase(this.firebase.app)
  }

  getDirectory() {
    return 'index'
  }

  save(data, ref1 = ref(this.firebase.database, this.getDirectory() + '/' + Date.now())) {
    return set(ref1, { data })
  }

  list() {
    return new Promise((resolve, reject) => {
      const ref1 = ref(this.firebase.database, this.getDirectory())
      onValue(ref1, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          this.firebase.json = data
          resolve(data)
        } else {
          resolve([])
        }
      }, (error) => {
        reject(error)
      })
    })
  }
}
