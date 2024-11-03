import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Function to add content to the database
export const putDb = async (content) => {
  // Open the database
  const db = await openDB('jate', 1);
  // Add content to the 'jate' object store
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const result = await store.add({ content });
  console.log('Data saved to the database', result);
};

// Function to get all content from the database
export const getDb = async () => {
  // Open the database
  const db = await openDB('jate', 1);
  // Create a transaction to read from the 'jate' object store
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  // Get all content from the object store
  const allContent = await store.getAll();
  console.log('Data retrieved from the database', allContent);
  return allContent; // Return the retrieved content
};

initdb();
