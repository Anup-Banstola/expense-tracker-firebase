import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

const useGetCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userID } = useGetUserInfo();

  useEffect(() => {
    const getCategories = async () => {
      try {
        if (!userID) {
          setLoading(false);
          return;
        }

        const categoriesCollectionRef = collection(db, "categories");

        const queryCategories = query(
          categoriesCollectionRef,
          where("userID", "==", userID),
          orderBy("createdAt")
        );

        const unsubscribeCategories = onSnapshot(
          queryCategories,
          (snapshot) => {
            const categoriesDocs = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setCategories(categoriesDocs);
            setLoading(false);
          }
        );
        return () => unsubscribeCategories();
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error);
        setLoading(false);
      }
    };
    getCategories();
  }, [userID]);

  const deleteCategory = async (categoryId) => {
    try {
      await deleteDoc(doc(db, "categories", categoryId));
      setCategories(
        categories.filter((category) => category.id !== categoryId)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  return { categories, loading, error, deleteCategory };
};
export default useGetCategories;
