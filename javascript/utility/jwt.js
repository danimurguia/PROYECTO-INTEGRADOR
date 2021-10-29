function decrypJwt(){
  var base64url = localStorage.getItem("jwt-token").split('.')[1];
    var base64 = decodeURIComponent(atob(base64url).split('').map((c)=>{
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    let jwtJson = JSON.parse(base64);
    return jwtJson;
}

function jwtIsActive(){
  try{
    let jwtJson = decrypJwt();
    console.log(jwtJson.exp)
    const date = new Date(0);  
    date.setUTCSeconds(jwtJson.exp);
    //Si la fecha expiracion es mayor a nuestra fecha actual es por que aún hay sesión activa
    console.log(date.valueOf()>new Date().valueOf());
    if(date.valueOf()>new Date().valueOf()){
      return true;
    }
    return false;  
  }catch(error){
    console.log(error)
    return false;
  }
}

function getUsernameJwt(){
  try{
    let jwtJson = decrypJwt();
    console.log(jwtJson.username);
    return jwtJson.username;
  }catch(error){
    console.log(error)
    return false;
  }
}

function getRoleJwt(){
  try{
    let jwtJson = decrypJwt();
    console.log(jwtJson.role);
    return jwtJson.role;
  }catch(error){
    console.log(error)
    return false;
  }
}
