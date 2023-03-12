function isAuthenticated() {
  const token = localStorage.getItem("techkart_token");

  if (!token) {
    return false;
  }

  return true;
  // verify token
  //   try {
  //     // const decoded = jwt.verify(
  //     //   token,
  //     //   "c6a4f5a07c5141f7cbbfb5cde9edccead9df5b3e6611ae1c0770458e0571bf0fe4453b35bee4651cf91461e16f288bd2"
  //     // );
  //     console.log(decoded);
  //     return true;
  //   } catch (err) {
  //     console.log(err);
  //     return false;
  //   }
}

export default isAuthenticated;
