import { Client, Databases, Account, Storage } from 'appwrite'; // Import Storage

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite API endpoint
  .setProject('67269d9a0023bf3ae88a'); // Project ID

const databases = new Databases(client);
const account = new Account(client);
const storage = new Storage(client); // Initialize Storage service

export { client, databases, account, storage }; // Export storage
