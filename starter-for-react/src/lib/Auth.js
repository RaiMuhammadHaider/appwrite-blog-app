import config from "../conf/config"
import { Client, Account, ID } from "appwrite";
export class AuthService{
client = new Client()
account
constructor() {
    this.client
    .setEndpoint(config.appwriteUrl)
    .setProject(config.appwriteProjectId)
    this.account = new Account(this.client)
}
async creatAccount ({name , email , password}) {
    try {
       const userAccount =  await this.account.create( ID.unique() ,name, email , password)
       if (userAccount) {
        return this.login({email, password})
       }
       else
        return userAccount
    } catch (error) {
        console.log(`Auth :: CreateAccount :: ${error}`);
        
    }
}
async login({email, password}) {
    try {
        return await this.account.createEmailPasswordSession({
            email, password
        })
        
    } catch (error) {
        console.log(`Auth :: Login :: ${error}`);
    }
}
async currentUser () {
    try {
        return await this.account.get()
    } catch (error) {
         console.log(`Auth :: CurrentUser :: ${error}`);
    }
}
async logout() {
    try {
        return await this.account.deleteSession()
    } catch (error) {
         console.log(`Auth :: Logout :: ${error}`);
    }
}

}

const AuthService = new AuthService()
export default AuthService;