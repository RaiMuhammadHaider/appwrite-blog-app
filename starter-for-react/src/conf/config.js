// const conf = {
//   appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID), // ✅ fix typo
//   appwriteUrl: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
//   appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
//   appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
//   appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
// }

// export default conf
const conf = {
  appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  appwriteUrl: import.meta.env.VITE_APPWRITE_ENDPOINT,
  appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  appwriteCollectionId: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
  appwriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
};
export default conf;
