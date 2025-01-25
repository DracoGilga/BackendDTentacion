import fs from 'fs';
import path from 'path';
import moment from 'moment';
import { ApolloServerPlugin } from '@apollo/server';

export const LogGraphQLMiddleware: ApolloServerPlugin = {
    async requestDidStart() {
        return {
            async willSendResponse({ request, response }) {
                const logsDir = path.join(__dirname, '../logs');

                if (!fs.existsSync(logsDir)) 
                    fs.mkdirSync(logsDir);

                const operationName = request?.operationName || 'Unknown';
                const status = response.http?.status || 200;

                if (operationName === 'IntrospectionQuery')
                    return;

                const logMessage = `[${moment().format('YYYY-MM-DD HH:mm:ss')}][GraphQL] ` +
                    `Operation: ${operationName} | Status: ${status}\n`;

                const logFile = path.join(logsDir, `${moment().format('DD-MM-YYYY')}.log`);

                try {
                    if (fs.existsSync(logFile)) 
                        fs.appendFileSync(logFile, logMessage);
                    else 
                        fs.writeFileSync(logFile, logMessage);
                } catch (error) {
                    console.error(`Error writing to log file: ${error}`);
                }
            },
        };
    },
};