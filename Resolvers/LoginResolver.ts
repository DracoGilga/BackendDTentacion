import { AdminModel } from '../Models/AdminModel';
import { ClientModel } from '../Models/ClientModel';

export const LoginResolver = {
    Mutation: {
        login: async (_: any, { user, password }: { user: string; password: string }) => {
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

            return {
                response: role || "Invalid username or password",
            };
        },
    },
};
