export const card = [];

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
    
  }