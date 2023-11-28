const data =  require('./src/db/data');
const admin = require('firebase-admin');
const serviceAccount = require('./ecommerce-ed610.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();
const productsCollection = firestore.collection('products');

const uploadData = async () => {
  try {
    const existingData = await productsCollection.get();
    if (!existingData.empty) {
      console.log('Data already exists in Firestore. Exiting.');
      process.exit();
    }

    for (const product of data) {
      await productsCollection.add(product);
    }
    console.log('Data uploaded to Firestore successfully!');
  } catch (error) {
    console.error('Error uploading data to Firestore:', error.message);
  } finally {
    process.exit();
  }
};

uploadData();
