import { Country } from './Country';
import { City } from './City';
import { Gender } from './Gender';

export class User {
    name: string;
    email: string;
    adress: string;
    zipcode: string;
    password: string;
    birthdate: Date;
    country: Country;
    city: City;
    gender: Gender;
}
