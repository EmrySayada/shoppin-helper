import React from "react";


function Item(props){
  return(
    <div className="itemContainer">
      <p className="itemName">{props.name}</p>
      <p className="itemPrice">{props.price}₪</p>
      <p className="itemCheapest">Best bought at: {props.cheapest}</p>
    </div>
    );
}

export default Item;
