 const validateBoolean = (data) => {
  if(typeof data === 'string' || typeof data === 'number'){
    let formatedString = String(data).toLowerCase()
    switch(formatedString){
      case "1": case 'true':{
        return true
      };
      case '0': case 'false':{
        return false
      };
      default: {
        return null
      }
    }
  }
  if(typeof data === 'boolean'){
    return data
  }
  return null
}
export default validateBoolean