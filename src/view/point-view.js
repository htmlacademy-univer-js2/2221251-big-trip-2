import { createElement } from '../render.js';
import {humanizePointDueDate, duration, getDate, getTime } from '../utils.js';


const renderOffers = (offers, offerIds) => offers.map((offer) => offerIds.includes(offer.id) ? `<li class="event__offer"><span class="event__offer-title">${offer.title}</span>&plus;&euro;&nbsp;<span class="event__offer-price">${offer.price}</span></li>` : '').join('');


const createTemplate = (point, destinations, offers) => {
  const {basePrice, type, destinationId, isFavorite, dateFrom, dateTo, offerIds} = point;
  const eventDuration = duration(dateFrom, dateTo);
  const startDate = dateFrom ? humanizePointDueDate(dateFrom) : '';
  const endDate = dateTo ? humanizePointDueDate(dateTo) : '';
  const startTime = startDate === endDate ? getTime(dateFrom) : startDate;
  const endTime = (startDate === endDate) ? getTime(dateTo) : endDate;
  const allOffersByType = offers.find((offer) => offer.type === type).offers;
  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${getDate(dateFrom)}">${startDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event ${type} icon">
        </div>
        <h3 class="event__title">${type} ${destinations[destinationId].name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${getDate(dateFrom)}">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${getDate(dateTo)}">${endTime}</time>
          </p>
          <p class="event__duration">${eventDuration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${renderOffers(allOffersByType, offerIds)}
        </ul>
        <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};


export default class PointView {
  constructor(point, destination, offers) {
    this.point = point;
    this.destination = destination;
    this.offers = offers;
  }

  getTemplate () {
    return createTemplate(this.point, this.destination, this.offers);
  }

  getElement() {
    if (!this.element){
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
