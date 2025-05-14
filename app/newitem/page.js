"use client";
import Link from 'next/link';
import React, {useRef, useState} from 'react'
import { addItem } from '../dbManager';

async function addItemHelper(itemCode, itemName, itemPrice, itemPlace){
  const code = itemCode.current.value;
  const name = itemName.current.value;
  const price = itemPrice.current.value;
  const place = itemPlace.current.value;
  await addItem(code, name, price, place);
}

function NewItem() {
  const itemCode = useRef();
  const itemName = useRef();
  const itemPrice = useRef();
  const itemPlace = useRef();
  return (
    <div className='w-[100%] h-screen flex flex-col items-center justify-center'>
      <input className='field w-[400px] h-[55px]' placeholder='Item code' ref={itemCode}/>
      <input className='field w-[400px] h-[55px]' placeholder='Item name' ref={itemName}/>
      <input className='field h-[55px] mb-[10px]' placeholder='Price' type='number' min={0} ref={itemPrice}/>
      <input className='field h-[55px] mb-[10px]' placeholder='Where did you buy it?' ref={itemPlace}/>
      <button className='field w-[400px] h-[55px] bg-[#03a9fc] text-white hover:text-[#03a9fc] hover:bg-white transition-all cursor-pointer' onClick={async () => {await addItemHelper(itemCode, itemName, itemPrice, itemPlace)}}>Add Item</button>
      <Link href={"/"}><button className='backBtn'>Back to Search</button></Link>
    </div>
  )
}

export default NewItem
