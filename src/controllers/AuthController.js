import Users from "../Models/UserModel.js";

const signupController = async (req,res) =>{

     try {
           const { name, email, password, age } = req.body;
   
           if(!name || !email|| !password){
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



const loginController = async (req, res) => {

        
  try {
    // 1. Request se email aur password lena
    const { email, password } = req.body;

    // 2. Check karo dono values aayi hain
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Email and password are required",
      });
    }
    console.log('Before seraching users')

    // 3. Database mein email se user find karo
    const user = await Users.findOne({ email  });

    console.log('seraching users' , email, password)
    console.log("Database password:", user.password);
console.log("Frontend password:", password);
console.log("Types:", typeof user.password, typeof password);

    // 4. User nahi mila
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }



    console.log("DB Password:", user.password);
console.log("Entered Password:", password);
console.log("DB Password Type:", typeof user.password);
console.log("Entered Password Type:", typeof password);
console.log("Match:", user.password === password);
    // 5. Password check karo
    if (user.password !== password) {
      return res.status(401).json({
        status: false,
        message: "Invalid password",
      });
    }

    // 6. Login successful
    res.status(200).json({
      status: true,
      message: "User Login successfully",
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Server error", error,
    });
  }
};

export  {signupController, loginController};