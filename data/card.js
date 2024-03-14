export let card = JSON.parse(localStorage.getItem('card'));

if(!card){
    card = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2
    },{
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1
    }];
}


function saveToStorage(){
    localStorage.setItem('card', JSON.stringify(card))
}

export  function addToCard(productId){
    let matchingItem;
    card.forEach((cardItem)=>{
        if(productId === cardItem.productId){
            matchingItem= cardItem;
        }
    });
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(quantitySelector.value);
    if(matchingItem){
        matchingItem.quantity += quantity;
    } else{
        card.push({
            productId,
            quantity
        });
    }
    saveToStorage();
  }


 export function removeFromCard(productId){
    const newCard = [];
    card.forEach((cardItem)=>{
        if(cardItem.productId !== productId){
            newCard.push(cardItem);
        }
    });
    card = newCard;
    saveToStorage();
  }
  export function calculateCardQuantity(){
    let cardQuantity = 0;

    card.forEach((cardItem)=>{
        cardQuantity += cardItem.quantity;
    });
    return cardQuantity;
  }