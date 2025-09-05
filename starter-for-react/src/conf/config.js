const conf = {
    appwriteProjectId: String(import.meta.env.VITE_APPWARITE_PROJECT_ID),
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}
export default conf;
