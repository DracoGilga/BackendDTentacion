import { Model } from 'objection';

export class AdminEntity extends Model {
    static tableName = 'admins'; 
    
    id!: number;
    firstName!: string;
    lastName!: string;
    username!: string;
    password!: string;
    phone!: string;
    role!: string;
}