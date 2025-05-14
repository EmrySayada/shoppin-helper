"use client";
import React, {useState, useEffect, useRef} from "react";
import Link from "next/link";
import Item from "./components/Item";
import { getItems, searchItem } from "./dbManager";



export default function Home() {
  const [currItems, setCurrItems] = useState([]);
  const [items, setItems] = useState([])
  useEffect(() => {
    async function getData(){
      var resItems = await getItems();
      setItems(resItems);
      setCurrItems(resItems);
    }
    getData()
  }, []);
  return (
    <div className="h-screen w-[100%] flex flex-col item-center">
      <section className="flex w-[100%] h-[50%] items-center justify-center">
        <input className=" w-[45%] h-[15%] rounded-[10px] border-[5px] border-[#03a9fc] pl-[10px] text-[18px]" placeholder="What item are you looking for?" onChange={async (val) => {setCurrItems(searchItem(val.target.value, items))}}/>
        <Link href={'/newitem'} className="bg-[#03a9fc] ml-[10px] h-[15%] w-[5%] rounded-full flex items-center justify-center text-white text-[35px] hover:bg-white hover:text-[#03a9fc] hover:border-[#03a9fc] hover:border-[5px] transition-all">+</Link>
      </section>
      <section className="flex w-[100%] h-[50%] items-center justify-center flex-wrap">
          {currItems.map((item) => {
            return <Item name={item.name} price={item.avgPrice} code={item.code} cheapest={item.cheapest} key={currItems.indexOf(item)}/>
          })}
      </section>
    </div>
  );
}
