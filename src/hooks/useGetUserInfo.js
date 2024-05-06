export const useGetUserInfo = () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("auth")) || {};
    const { name, profilePhoto, userID, isAuth, email } = userInfo;

    return { name, profilePhoto, userID, isAuth, email };
  } catch (error) {
    console.error("Error retrieving user info:", error);
    return {};
  }
};
