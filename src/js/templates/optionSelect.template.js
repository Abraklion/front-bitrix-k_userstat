/**
 *  Шаблон пункт выподающего списка
 *  @param {Object} option - пункт выподающего списка
 *  @return {string}
 * */
export function optionSelectTemplate({ID,NAME}) {

  return `
    <div class="dropdown__item" data-select-option="${ID}" title="${NAME}">
      ${NAME}
    </div>
  `
}
