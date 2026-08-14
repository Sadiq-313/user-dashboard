import Users from "../Models/UserModel.js";

const signupController = async (req,res) =>{

     try {
           const { name, email, password, age } = req.body;
   
           if(!name || !email|| !password|| !age){
              return res.status(400).json({
           status: false,
           message: "All fields are required"
         });
       }
   
   
      await  Users.create(req.body)
   
       res.json({
           status:true,
           msesage:"User Signed Up successfully"
       })
   
   
     } catch (error) {
            console.log(error.msesage)
            

    res.json({
            status:false,
            message:error.message
    })



     }
}

const loginController = async (req,res) =>{
  res.json({
        status:true,
        msesage:"User Login successfully"
    })


}


export  {signupController, loginController};