import conf from "../conf/config";
import { Client, Databases, ID } from "appwrite";

export class Services {
    client = new Client();
    databases;
    bucket;
    constructor (){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({title, content , slug, FeaturedImage, status, userId}){
        try {
            return await this.databases.createDocument({
                databasesId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteCollectionId,
                documentId: slug,
                data:{
                    title,
                    userId,
                    FeaturedImage,
                    content,
                    status
                }
            })
        } catch (error) {
            console.log("Appwrite Service :: CreatePost ::", error);
            
        }
    }
    async getPosts(queries=["status" , "active"]){
        try {
            return await this.databases.listDocuments({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteCollectionId,
                queries
            })
        } catch (error) {
            console.log("Appwrite Service :: getPosts ::", error);
            
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteCollectionId,
                documentId: slug
            })
        } catch (error) {
            console.log("Appwrite Service :: getPost ::", error);
            return false;
        }
    }
    async updatePost(slug, {title, content , FeaturedImage, status}){
        try {
            return await this.databases.updateDocument({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteCollectionId,
                documentId: slug,
                data: {
                    title,
                    content,
                    FeaturedImage,
                    status
                }
            })
        } catch (error) {
            console.log("Appwrite Service :: updatePost ::", error);
            return false;
        }


    }
    async deletePost(slug){
        try {
            return await this.databases.deleteDocument({
                databaseId: conf.appwriteDatabaseId,
                collectionId: conf.appwriteCollectionId,
                documentId: slug
            })
        } catch (error) {
            console.log("Appwrite Service :: deletePost ::", error);
            return false;
        }
    }
    async uploadFile(file){
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file
            })
        } catch (error) {
            console.log("Appwrite Service :: uploadFile ::", error);
            return false;
        }
    }
    async getFilePreview(fileId){
        try {
            return `${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/preview?project=${conf.appwriteProjectId}&width=400&height=400`
        } catch (error) {
            console.log("Appwrite Service :: getFilePreview ::", error);
            return false;
        }
    }
    // an other 
    // async getFilePreview(fileId){
    //     try {
    //         return await this.bucket.getFilePreview({
    //             bucketId: conf.appwriteBucketId,
    //             fileId
    //         })
    //     } catch (error) {
    //         console.log("Appwrite Service :: getFilePreview ::", error);
    //         return false;
    //     }
    // }
    async getFileDelete(fileId){
        try {
            return await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId
            })
        } catch (error) {
            console.log("Appwrite Service :: getFileDelete ::", error);
            return false;
        }
    }

}
const services = new Services();
export default services;