// Initialize Firebase
const firebase = require("firebase/app");
require("firebase/database");

// Your Firebase configuration
const firebaseConfig = {
  // ... your Firebase config
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

// Get a reference to the 'users' node
const usersRef = database.ref('users');

// Read data from the 'users' node
usersRef.on('value', (snapshot) => {
  const users = snapshot.val();
  console.log(users);
});

// Write data to the 'users' node
usersRef.push({
  name: 'John Doe',
  email: 'john.doe@example.com'
});
