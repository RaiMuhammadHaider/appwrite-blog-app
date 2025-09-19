import config from "../conf/config"
import { Client, Account, ID } from "appwrite";
export class authService{
client = new Client()
account
constructor() {
    this.client
    .setEndpoint(config.appwriteUrl)
    .setProject(config.appwriteProjectId)
    this.account = new Account(this.client)
}
async createAccount({ name, email, password }) {
  try {
    // Correct order: ID, email, password, name
    const userAccount = await this.account.create(ID.unique(), email, password, name);

    if (userAccount) {
      // Automatically log in after signup
      return this.login({ email, password });
    }

    return userAccount;
  } catch (error) {
    console.log(`Auth :: CreateAccount :: ${error}`);
    throw error; // so your React component can display the error
  }
}
async login({ email, password }) {
  try {
    return await this.account.createEmailPasswordSession(email, password)
  } catch (error) {
    console.log(`Auth :: Login :: ${error}`)
    throw error // so your React component can handle it
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

const AuthService = new authService()
export default AuthService;