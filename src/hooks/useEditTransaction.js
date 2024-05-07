// import { useEffect, useState } from "react";

import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../config/firebase-config";

// const useEditTransaction = (transactions) => {
//   const [editIndex, setEditIndex] = useState(-1);
//   const [editedTransaction, setEditedTransaction] = useState({});

//   const startEditing = (index, transaction) => {
//     setEditIndex(index);
//     setEditedTransaction({ ...transaction });
//   };

//   useEffect(() => {
//     if (editIndex !== -1) {
//       setEditedTransaction(transactions[editIndex]);
//     }
//   }, [editIndex, transactions]);

//   const saveChanges = async (updateFunction) => {
//     try {
//       await updateFunction(editedTransaction);
//       setEditIndex(-1);
//     } catch (error) {
//       console.error("Error updating transaction:", error);
//     }
//   };

//   return {
//     editIndex,
//     editedTransaction,
//     startEditing,
//     saveChanges,
//     setEditedTransaction,
//   };
// };

// export default useEditTransaction;

export const useEditTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editTransaction = async (
    collectionName,
    transactionId,
    updatedData
  ) => {
    setLoading(true);
    try {
      const transactionCollectionRef = doc(db, collectionName, transactionId);
      await updateDoc(transactionCollectionRef, updatedData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  return { editTransaction, loading, error };
};
