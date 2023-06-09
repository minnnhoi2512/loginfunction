import { print, OutputType } from '../helpers/print.js'
export default class Exception extends Error {
    static WRONG_DB_USERNAME_PASSWORD = "WRONG DB USERNAME OR PASSWORD"
    static WRONG_CONNECTION_STRING = "WRONG SERVER NAME/CONNECTION STRING"
    static CANNOT_CONNECT_MOOGOOSE = "CANNOT CONNECT TO MOOGOOSE"
    static USER_EXIST = "USER ALREADY EXIST"
    static CUSTOMER_EXIST = "CUSTOMER ALREADY EXIST"
    static ADMIN_EXSIT = "ADMIN ALREADY EXIST"
    static CANNOT_RETRISTER = "CANNOT REGISTER USER"
    static WRONG_USERNAME_OR_PASSWORD = "WRONG USERNAME OR PASSWORD"

    constructor(message, validationError = {}) {
        super(message)// call constructor of parent
        print(message, OutputType.ERROR)
        this.validationError = validationError;
        
    }
}