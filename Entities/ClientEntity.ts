import { Model } from 'objection';

export class ClientEntity extends Model {
    static tableName = 'clients'; 
    
    id!: number;
    name!: string;
    lastName!: string;
    phone!: string;
    birthDate!: Date;
    email!: string;
    password!: string;
    role!: string;
}