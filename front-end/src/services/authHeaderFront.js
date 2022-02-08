export default function authHeaderFront() {
  // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return {
      "x-auth-token": user.token,
    };
  } else {
    return {};
  }
}