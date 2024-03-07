//isLoggedIn =>
export const isLoggedIn = () => {
    let data = localStorage.getItem("data");
    return data != null ? true : false;
  };
  
  //doLogin => data to local storage
  
  export const doLogin = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data));
    next();
  };
  
  //doLogout => remove from local storage
  export const doLogout = (next) => {
    localStorage.removeItem("data");
    next();
  };
  
  //get currentUser
  
  export const getCurrentUserDetail = () => {
    if (isLoggedIn) {
      return JSON.parse(localStorage.getItem("data"));
    } else {
      return false;
    }
  };
  