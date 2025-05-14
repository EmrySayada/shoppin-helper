import { setDoc, doc, updateDoc, arrayUnion, collection, getDocs } from "firebase/firestore";
import {db} from './firebase';

export async function addItem(code, name, price, place){
    const docRef = doc(db, 'items', code);
    try{
      await updateDoc(docRef, {
          prices: arrayUnion(price),
          cheapest: place 
      })
    }catch (FirebaseError){
      await setDoc(docRef, {
        code: code,
        name: name,
        prices: arrayUnion(price),
        cheapest: place,
        avgPrice: price
      })
    }
}


export async function getItems(){
  const itemsArr = [];
  const querySnapshot = await getDocs(collection(db, "items"));
  querySnapshot.forEach((doc) => {
    itemsArr.push(doc.data());
  });
  return itemsArr;
}

export function searchItem(query, data){
  const keywords = query.toLowerCase().split(/\s+/);
  return data.map(doc => {
    const text = String(doc.name).toLowerCase();
    const matchCount = keywords.filter(word => text.includes(word)).length;
    return {...doc, relevance: matchCount};
  }).filter(doc => doc.relevance > 0)
  .sort((a, b) => b.relevance - a.relevance);
}
