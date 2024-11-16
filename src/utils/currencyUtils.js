import { Client, Databases } from "appwrite";
import { setConversionRate } from "@/redux/slices/currencySlice";

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // Appwrite API Endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID); // Appwrite Project ID

const databases = new Databases(client); // Initialize databases instance

const CURRENCY_COLLECTION_ID = process.env.NEXT_PUBLIC_CURRENCY_COLLECTION_ID;
const CURRENCY_DOC_ID = process.env.NEXT_PUBLIC_CURRENCY_DOC_ID;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

export const fetchOrUpdateConversionRate = async (dispatch, baseCurrency = "INR", targetCurrency = "USD") => {
  try {
    // Fetch the conversion rate from Appwrite
    const currencyDoc = await databases.getDocument(DATABASE_ID, CURRENCY_COLLECTION_ID, CURRENCY_DOC_ID);
    const lastUpdated = currencyDoc?.lastUpdated ? new Date(currencyDoc.lastUpdated) : null;
    const currentTime = new Date();

    // Check if the stored rate is expired (older than 24 hours)
    const isExpired = !lastUpdated || currentTime - lastUpdated > 24 * 60 * 60 * 1000;

    let rate = 1;
    if (!isExpired) {
      rate = currencyDoc[targetCurrency.toLowerCase()] || 1;
    } else {
      // Fetch a new conversion rate from the external API
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY}/latest/${baseCurrency}`
      );
      if (!response.ok) throw new Error("Failed to fetch conversion rate");

      const data = await response.json();
      rate = data.conversion_rates[targetCurrency];

      // Update Appwrite with the new rate and timestamp
      await databases.updateDocument(DATABASE_ID, CURRENCY_COLLECTION_ID, CURRENCY_DOC_ID, {
        [targetCurrency.toLowerCase()]: rate,
        lastUpdated: currentTime.toISOString(),
      });
    }

    // Dispatch the updated rate and timestamp to Redux
    dispatch(setConversionRate({ rate, timestamp: currentTime.toISOString() }));
  } catch (error) {
    console.error("Error fetching or updating conversion rate:", error);
  }
};
