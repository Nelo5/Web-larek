import './scss/styles.scss';

import { CDN_URL, API_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { ApiModel } from './components/Model/ApiModel';
import { CatalogModel } from './components/Model/CatalogModel';
import { CardView } from './components/View/CardView';
import { CardModalView } from './components/View/CardModalView';
import { IOrder, IProductItem } from './types';
import { ModalView } from './components/View/ModalView';
import { ensureElement } from './utils/utils';
import { BasketModel } from './components/Model/BasketModel';
import { BasketView } from './components/View/BasketView';
import { BasketItemView } from './components/View/BasketItemView';
import { FormModel } from './components/Model/FormModel';
import { FormOrderView } from './components/View/FormOrderView';
import { FormContactsView } from './components/View/FormContactsView';
import { SuccessModalView } from './components/View/SuccessModalView';

const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
const successTemplate = document.querySelector('#success') as HTMLTemplateElement;

const apiModel = new ApiModel(CDN_URL, API_URL);
const events = new EventEmitter();
const dataModel = new CatalogModel(events);
const modal = new ModalView(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new BasketView(basketTemplate, events);
const basketModel = new BasketModel();
const formModel = new FormModel(events);
const order = new FormOrderView(orderTemplate, events);
const contacts = new FormContactsView(contactsTemplate, events);

events.on('productCards:receive', () => {
  dataModel.productCards.forEach(item => {
    const card = new CardView(cardCatalogTemplate, events, () => events.emit('card:select', item) );
    ensureElement<HTMLElement>('.gallery').append(card.render(item));
  });
});

events.on('card:select', (item: IProductItem) => { dataModel.openPreview(item) });

events.on('modalCard:open', (item: IProductItem) => {
  const detailedCard = new CardModalView(cardPreviewTemplate, events)
  if(!item.price) {
    detailedCard.setButtonState("Не продаётся");
  } else if(basketModel.hasCard(item)) {
    detailedCard.setButtonState("В корзине");
  } else {
    detailedCard.setButtonState("Купить");
  }

  modal.content = detailedCard.render(item);
  modal.render();
});

events.on('card:addBasket', () => {
  basketModel.addSelectedСard(dataModel.selectedСard);
  basket.renderHeaderBasketCounter(basketModel.getCounter());
  modal.close();
});

events.on('basket:open', () => {
  basket.renderSumAllProducts(basketModel.getSum());
  let i = 0;
  basket.items = basketModel.basketProducts.map((item) => {
    const basketItem = new BasketItemView(cardBasketTemplate, events, () => events.emit('basket:basketItemRemove', item) );
    i = i + 1;
    return basketItem.render(item, i);
  })
  modal.content = basket.render();
  modal.render();
});

events.on('basket:basketItemRemove', (item: IProductItem) => {
  basketModel.deleteSelectedCard(item);
  basket.renderHeaderBasketCounter(basketModel.getCounter());
  basket.renderSumAllProducts(basketModel.getSum());
  let i = 0;
  basket.items = basketModel.basketProducts.map((item) => {
    const basketItem = new BasketItemView(cardBasketTemplate, events, () => events.emit('basket:basketItemRemove', item) );
    i = i + 1;
    return basketItem.render(item, i);
  })
});

events.on("order:open", () => {
	modal.content = order.render();
	modal.open();
	formModel.items = basketModel.basketProducts.map((item) => item.id);
});

events.on("orderForm:paymentSelection", (button: HTMLButtonElement) => {
	formModel.payment = button.name;
	formModel.validateOrder("payment");
});

events.on(
	`orderForm:changeAddress`,
	(data: { field: string; value: string }) => {
		formModel.setOrderData(data.field, data.value);
	}
);

events.on("formErrors:shipping", (errors: Partial<IOrder>) => {
	const { address, payment } = errors;
	order.toggleButtonDisability(!address && !payment);
	order.formErrors.textContent = Object.values({ address, payment })
		.filter((i) => !!i)
		.join("; ");
});

events.on('contactsForm:open', () => {
  formModel.total = basketModel.getSum();
  modal.content = contacts.render();
  modal.render();
});

events.on(`contacts:changeInput`, (data: { field: string, value: string }) => {
  formModel.setOrderData(data.field, data.value);
});

events.on('formErrors:contacts', (errors: Partial<IOrder>) => {
  const { email, phone } = errors;
  contacts.valid = !email && !phone;
  contacts.errors.textContent = Object.values({phone, email}).filter(i => !!i).join('; ');
})

events.on('success:open', () => {
  apiModel.postOrderLot(formModel.getOrderData())
    .then((data) => {
      const success = new SuccessModalView(successTemplate, events);
      modal.content = success.render(basketModel.getSum());
      basketModel.clearBasket();
      basket.renderHeaderBasketCounter(basketModel.getCounter());
      modal.render();
    })
    .catch(error => console.log(error));
});

events.on('success:close', () => modal.close());

events.on('modal:open', () => {
  modal.locked = true;
});

events.on('modal:close', () => {
  modal.locked = false;
});

apiModel.getListProductCard()
  .then(function (data: IProductItem[]) {
    dataModel.productCards = data;
  })
  .catch(error => console.log(error))