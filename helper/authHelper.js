const bcrypt = require('bcrypt')

 const hashPassword =async (password)=>{
    try{
        const rounds  = 10;
        const hashed = await bcrypt.hash(password,rounds)
        return hashed
    }
    catch(error){
      console.log(error);
    }
}
 const comparePassword =async (password,hashed)=>{
   return bcrypt.compare(password,hashed)
}

module.exports = {hashPassword,comparePassword}