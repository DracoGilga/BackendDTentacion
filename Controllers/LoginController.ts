import { AdminModel } from "../Models/AdminModel";
import { ClientModel } from "../Models/ClientModel";

export class LoginController {
    static async login(user: string, password: string) {
        let role: string | null = null;

        if (/^\d{10}$/.test(user)) {
            const client = await ClientModel.login(user, password);
            if (client) 
                role = client.role;
        } else {
            const admin = await AdminModel.login(user, password);
            if (admin) 
                role = admin.role;
        }

        return role || "Invalid username or password";
    }
}