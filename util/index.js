

export const shortenText = (text, n) => {
  if (!text || typeof text !== "string") return "";
  if (text.length > n) {
    return text.substring(0, n).concat("...");
  }
  return text;
};




// validate the user's email

export const validateEmail = ((email)=>{
  return  String(email).toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

})

