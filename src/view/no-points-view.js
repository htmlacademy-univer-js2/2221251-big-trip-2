import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';


const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.FUTURE]: 'There are no future events now',
};


const createTemplate = (filterType) => {
  const noPointTextValue = NoPointsTextType[filterType];
  return (
    `<p class="trip-events__msg">
      ${noPointTextValue}
    </p>`
  );
};


export default class NoPointsView extends AbstractView {
  #filterType = null;


  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }


  get template() {
    return createTemplate(this.#filterType);
  }
}

