import Knex from 'knex';
import { Model } from 'objection';
import { Config } from './Config';

const environment = process.env.NODE_ENV || "development"; 
const knexConfig = Config[environment];

const DBConfig  = Knex(knexConfig); 
Model.knex(DBConfig ); 

export { DBConfig };