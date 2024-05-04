export const useGetUserInfo = () => {
  try {
    const { name, profilePhoto, userID, isAuth } =
      JSON.parse(localStorage.getItem("auth")) || {};
    return { name, profilePhoto, userID, isAuth };
  } catch (error) {
    console.error("Error retrieving user info:", error);
    return {};
  }
};
