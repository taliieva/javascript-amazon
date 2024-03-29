import { card, removeFromCard, calculateCardQuantity, updateQuantity } from "../data/card.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
let cardSummaryHTML = ''
card.forEach((cardItem)=>{
    const productId = cardItem.productId;

    let matchingProduct;
    products.forEach((product)=>{
        if(product.id === productId){
            matchingProduct = product
        }
    })

    cardSummaryHTML += `
    <div class="cart-item-container js-card-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cardItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
            Update
          </span>
          <input class="quantity-input js-quantity-input-${matchingProduct.id}"/>
          <span class="save-quantity-link link-primary js-sace-link" data-product-id="${matchingProduct.id}">Save</span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
});

document.querySelector('.js-order-summary').innerHTML = cardSummaryHTML;


document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click',()=>{
        const productId = link.dataset.productId;
        removeFromCard(productId);

        const container = document.querySelector(`.js-card-item-container-${productId}`);
        container.remove();
        updateCardQuantity();
    })

function updateCardQuantity(){
    const cardQuantity = calculateCardQuantity();
    document.querySelector('.js-return-to-home-link').innerHTML = `${cardQuantity} items`
}
    updateCardQuantity();

})

document.querySelectorAll('.js-update-link').forEach((link)=>{
    link.addEventListener('click',()=>{
        const productId = link.dataset.productId;

        const container = document.querySelector(`.js-card-item-container-${productId}`)
        container.classList.add('is-editing-quantity')
    })
})

document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove('is-editing-quantity');

      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      const newQuantity = Number(quantityInput.value);
      updateQuantity(productId, newQuantity);

      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
      quantityLabel.innerHTML = newQuantity;
      updateCardQuantity();
    });
  });