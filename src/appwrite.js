import { Client, Databases, Account, Storage } from 'appwrite'; // Import Storage

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // Appwrite API endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID); // Project ID

const databases = new Databases(client);
const account = new Account(client);
const storage = new Storage(client); // Initialize Storage service

export { client, databases, account, storage }; // Export storage for fetching
