import { Config } from '../Config/Config';
import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';

const ENV = process.env.NODE_ENV || 'development';
const SALT_ROUNDS = Config[ENV].encryption.saltRounds;
const AES_SECRET_KEY = Config[ENV].encryption.aesSecretKey;

export class EncryptionUtils {
    static async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, SALT_ROUNDS);
    }

    static encryptData(data: string): string {
        return CryptoJS.AES.encrypt(data, AES_SECRET_KEY).toString();
    }

    static decryptData(encryptedData: string): string {
        const bytes = CryptoJS.AES.decrypt(encryptedData, AES_SECRET_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}