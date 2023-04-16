import { initializeApp } from "firebase/app";
import {getFirestore,collection, addDoc, onSnapshot, query, where, deleteDoc, doc} from "firebase/firestore"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updatePassword
} from "firebase/auth";
import store from "./store";
import { login as loginHandle, logout as logoutHandle } from "./store/auth";
import toast from "react-hot-toast";
import { setBlogs } from "./store/blogs";

const firebaseConfig = {
  apiKey: "AIzaSyA3Geef5SFycJSa2sQBwpM_VboltHiRZ9g",
  authDomain: "blogproject-cc718.firebaseapp.com",
  projectId: "blogproject-cc718",
  storageBucket: "blogproject-cc718.appspot.com",
  messagingSenderId: "697319602954",
  appId: "1:697319602954:web:7c1634e382167a376698f3",
  measurementId: "G-5JS2STEFZK",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
// export { auth };
export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};
export const login = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};
export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};
export const update = async (data) => {
  try {
    await updateProfile(auth.currentUser, data);
    toast.success("Profile is updated");
    return true;
  } catch (error) {
    toast.error(error.messsage);
  }
};
export const resetPassword = async (password) => {
  try {
    await updatePassword(auth.currentUser, password);
    toast.success("Password is updated");
    return true;
  } catch (error) {
    toast.error("Weak password!!");
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(loginHandle(user));
    onSnapshot(query(collection(db,"blogs"), where("uid", "==", auth.currentUser.uid)), (doc) => {
      store.dispatch(setBlogs(doc.docs.reduce((blogs, blog) => [...blogs, {...blog.data(), id:blog.id}], [])))
      // doc.docs.map(blog => {
      //   console.log(blog.data())
      // })
      // console.log("current data", doc.docs)
    })
  } else {
    store.dispatch(logoutHandle());
  }
});
export const addBlog = async (data) =>{
try {
  const result = await addDoc(collection(db,"blogs"), data) 
  toast.success("A blog is added")
  return result.id
 
} catch (error) {
  toast.error(error.message)
}
}
export const deleteBlog = async(id) => {
 try { 
  toast.success("A blog is deleted")
  return await deleteDoc(doc(db,"blogs", id))
 
 } catch (error) {
  toast.error(error.message)
 }
}

export default app;

