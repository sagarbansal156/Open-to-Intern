const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    if (typeof value === Number && value.trim().length === 0) return false
    return true
}
const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  const validateMobile = (mobile)=>{
    return  String(mobile)
          .match(/^[6-9]\d{9}$/)
  }
  
const validatename =(name)=>{
  return String(name)
       .match(/^[a-z\s]{1,}[\.]{0,1}[a-z\s]{0,}$/)
}

const validateName =(name)=>{
  return String(name)
       .match(/^[A-Za-z\s]{1,}[\.,]{0,1}[A-Za-z\s]{0,}$/)
}


 
  module.exports={validateEmail,isValid,validateMobile,validateName,validatename}