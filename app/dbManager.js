import { setDoc, doc, updateDoc, arrayUnion, collection, getDocs, getDoc } from "firebase/firestore";
import {db} from './firebase';

export async function addItem(code, name, price, place){
  var item = await getSingleItem(code);
  const docRef = doc(db, 'items', code);
  try{
    await updateDoc(docRef, {
        prices: arrayUnion(price),
        cheapest: getArrayMin(item.prices) > price ? place : item.place,
        price: getArrayMin(item.prices) > price ? price : getArrayMin(item.prices)
    })
  }catch (FirebaseError){
    await setDoc(docRef, {
      code: code,
      name: name,
      prices: arrayUnion(price),
      cheapest: place,
      price: price
    })
  }
}

function getArrayMin(arr){
  var min = arr[0];
  for(let i = 0; i< arr.length; i++){
    if(min > arr[i]){
      min = arr[i];
    }
  }
  return min;
}

async function getSingleItem(code){
  const docRef = doc(db, "items", code);
  const docSanp = await getDoc(docRef);

  if(docSanp.exists()){
    return docSanp.data();
  }else{
    console.log("skibidi");
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
