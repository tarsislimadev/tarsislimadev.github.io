import { HTML } from '../../../assets/js/libs/afrontend/index.js'
import { initializeApp } from '../../../assets/js/apis/firebase/app/index.js'
import { getFirestore } from '../../../assets/js/apis/firebase/firestore/index.js'
import { getDatabase, ref, set } from '../../../assets/js/apis/firebase/database/index.js'
import firebase from '../../../assets/js/config/firebase/index.js'

export class FirebaseDatabasePageComponent extends HTML {
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

  save(data, ref1 = ref(this.firebase.database, 'index/' + Date.now())) {
    return set(ref1, { data })
  }
}
