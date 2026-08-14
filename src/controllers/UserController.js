// import Users from "../Models/UserModel"
import Users from "../Models/UserModel.js   "

const getUsersController = async (req,res)=>{

    console.log(req.query,'----<< query param')

   

    //users mongoose find

    const users = await Users.find()



res.json({
    status:true,
    message:'All Users fetched successfully ',
    data:users
}
)}


export default getUsersController