import mongoose from 'mongoose'

 const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: Number    ,
    required: true,
    minlength: 8
  }
//   ,
//  age: {
//     type:Number,
//     required:true,
//     min:18
//   }
})


const Users= mongoose.model('User', UserSchema)

export default Users