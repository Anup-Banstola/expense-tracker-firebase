import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddCategory = () => {
  const { userID } = useGetUserInfo();
  const addCategory = async ({ categoryTitle, categoryColor }) => {
    try {
      const categoryCollectionRef = collection(db, "categories");

      await addDoc(categoryCollectionRef, {
        userID,
        categoryTitle,
        categoryColor,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error adding category");
      throw error;
    }
  };
  return { addCategory };
};
