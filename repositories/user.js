import Exception from '../exceptions/exception.js'
import { User } from '../model/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// generate for all
const login = async ({ email, password }) => {
    //print('login user in user repoasdasdsitory', OutputType.INFORMATION)

    const existingUser = await User.findOne({ email }).exec()
    if (existingUser) {
        // not encrypt password
        const isMatched = await bcrypt.compare(password, existingUser.password)
        if (isMatched) {
            // create Java Web token
            let token = jwt.sign({
                data: existingUser
            }, process.env.JWT_SECRET, {
                expiresIn: '10 days' // 1 minute '10 days '
            }
            )
            // clone an add more properties

            return {
                ...existingUser.toObject(),
                password: 'Not show',
                token: token
            }
        } else {
            throw new Exception(Exception.WRONG_USERNAME_OR_PASSWORD)
        }

    } else {
        throw new Exception(Exception.WRONG_USERNAME_OR_PASSWORD)
    }
}
const register = async ({
    name,
    email,
    password,
    address,
    phone,
    gender, }) => {
    //print('register user : ' + email, password, phoneNumber, address,OutputType.INFORMATION)
    try {
        debugger
        const existingUser = await User.findOne({ email }).exec()
        if (!!existingUser) {
            throw new Exception(Exception.USER_EXIST)
        }
        // encrypt password, use bcrypt
        //use for login
        // const isMatched = await bcrypt.compare(password, existingUser.password)
        // if(isMatched){

        // }
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            gender
        })
        return {
            ...newUser._doc,
            password: 'Not show'
        }
    } catch (exception) {
        //check model validation here
        debugger
        console.log(exception)
        throw new Exception(Exception.CANNOT_RETRISTER)
    }
}

const getDetailUser = async (id) => {
    const user = await User.findById(id)
    if (!user) {
        throw new Exception('Cannot find user with id :' + id)
    }
    return user
}
// for admin and staff
const updateUser = async ({
    id,
    name,
    email,
    address,
    phone,
    gender
}) => {
    const user = await User.findById(id);
    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.phone = phone ?? user.phone;
    user.address = address ?? user.address;
    user.gender = gender ?? user.gender;
    await user.save();
    return user;

}
const updateRoleByStaff = async ({
    id,
    roleId,
}) => {
    const user = await User.findById(id);
    if(roleId <= 3){
        user.roleId = roleId ?? user.roleId
        await user.save();
        return user;
    }else throw new Exception('Cannot update user become ADMIN ')
}
const updateRoleByAdmin = async ({
    id,
    roleId,
}) => {
    const user = await User.findById(id);
    user.roleId = roleId ?? user.roleId
    await user.save();
    return user;

}

const getAllUserByAdmin = async () => {
    // aggregate data for all Customer
   
    let filteredUser = await User.aggregate([
        {
            $match: {
            }
        }
    ])
    return filteredUser
}
export default {
    login,
    register,
    updateUser,
    getDetailUser,
    updateRoleByStaff,
    updateRoleByAdmin,
    getAllUserByAdmin,
   
    
}