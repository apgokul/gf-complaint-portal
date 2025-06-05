// src/api/complaints.js
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import db from "../firebase";

export async function submitComplaint(data) {
  await addDoc(collection(db, "complaints"), data);
}

export async function getRecentComplaints(limit = 3) {
  const q = query(collection(db, "complaints"), orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data()).slice(0, limit);
}
