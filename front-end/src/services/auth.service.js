
const getCurrentUser=()=> {
    return JSON.parse(localStorage.getItem("user"));
  };

const Logout=()=>{
    localStorage.removeItem("user");
    window.location.reload();
}

export default {
  getCurrentUser,
  Logout,
}