import { fireApp, analytics } from "../../firebase-config.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs
} from "firebase/firestore";

const db = getFirestore(fireApp);

async function addPost(postData) {
    try {
        const docRef = await addDoc(collection(db, "post"), postData);
        console.log("Document written with ID: ", docRef.id);
        return { success: true, id: docRef.id };
    } catch (e) {
        console.error("Error adding document: ", e);
        return { success: false, error: e.message };
    }
}

async function readPost() {
    try {
        const querySnapshot = await getDocs(collection(db, "post"));
        const posts = [];
        querySnapshot.forEach((doc) => {
            posts.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, posts };
    } catch (e) {
        console.error("Error reading documents: ", e);
        return { success: false, error: e.message };
    }
}

export { db, addPost, readPost };
