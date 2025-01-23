import { LoginController } from "../../Controllers/LoginController";

export const LoginResolver = {
    Mutation: {
        login: async (_: any, { user, password }: { user: string; password: string }) => {
            const response = await LoginController.login(user, password);
            return { response };
        },
    },
};