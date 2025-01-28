import { LoginController } from "../../Controllers/LoginController";
import { CustomContext } from '../../Middlewares/TokenMiddleware';

export const LoginResolver = {
    Mutation: {
        login: async (_: any, { user, password }: { user: string; password: string }, context: CustomContext) => {
            const loginSuccess = await LoginController.login(user, password, context.setToken);

            if (!loginSuccess) 
                return { response: "Login incorrect" };

            return { response: "Login correct" };
        },
    },
};