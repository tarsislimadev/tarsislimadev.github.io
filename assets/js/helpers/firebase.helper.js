import { initializeApp } from '../../../assets/js/apis/firebase/app/index.js'
import { getDatabase, ref, set, onValue } from '../../../assets/js/apis/firebase/database/index.js'
import firebase from '../../../assets/js/config/firebase/index.js'

export class FirebaseHelper {
  app = null
  database = null
  directory = null

  constructor(directory) {
    this.directory = directory
    this.app = initializeApp(firebase)
    this.database = getDatabase(this.app)
  }

  getDirectory() { return this.directory }

  getRef(item = null) {
    return ref(this.database, item ? (this.getDirectory() + '/' + item) : this.getDirectory())
  }

  save(data, ref1 = this.getRef(Date.now())) { return set(ref1, data) }

  list() {
    return new Promise((resolve, reject) => {
      onValue(this.getRef(), (snapshot) => {
        const data = snapshot.val()
        if (data) resolve(data)
        else resolve([])
      }, (error) => reject(error))
    })
  }
}
