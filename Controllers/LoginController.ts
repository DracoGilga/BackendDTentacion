import { AdminModel } from "../Models/AdminModel";
import { ClientModel } from "../Models/ClientModel";
import { generateToken } from "../Utils/JwtUtils";
import bcrypt from 'bcryptjs';

export class LoginController {
    static async login(user: string, password: string, setToken: (token: string) => void) {
        let role: string | null = null;
        let lastName: string | null = null;
        let username: string | null = null;
        let phone: string | null = null;
        let payload: any = {};

        
        if (/^\d{10}$/.test(user)) { 
            const client = await ClientModel.findByPhone(user);
            if (client) {
                if (await bcrypt.compare(password, client.password)) { 
                    role = client.role;
                    lastName = client.lastName;
                    phone = client.phone;
                    payload = { lastName, phone, role };
                } 
            }
        } else { 
            const admin = await AdminModel.findByUsername(user);
            if (admin) {
                if (await bcrypt.compare(password, admin.password)) {
                    role = admin.role;
                    lastName = admin.lastName;
                    username = admin.username;
                    payload = { lastName, username, role };
                }
            }
        }

        if (!role) {
            return false;
        }

        const token = generateToken(payload);
        setToken(token);
        return true;
    }
}
