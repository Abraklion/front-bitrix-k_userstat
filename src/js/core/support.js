
/**
 *  Базовый набор функций для проекта
 * */
export default class Support {

  /**
   * Удаления класс(ов) у элементов
   * @param {string} elementSelector - селектор элементов у которых надо удалить класс(ы).
   * @param {array} arrayClasses     - массив со списком классов.
   * @return {void}
   */
  static removeClass(elementSelector,arrayClasses) {
    document.querySelectorAll(elementSelector).forEach(element => {
      element.classList.remove(...arrayClasses)
    })
  }

  /**
   * Добавление класс(ов) у ближайщего подходящего родителя
   * @param {Element} element       - элемент у которого надо найти ближайщего подходящего родителя.
   * @param {string} searchSelector - селектор который надо найти у родителя.
   * @param {array} arrayClasses    - массив со списком классов.
   * @return {void}
   */
  static addClosestClass(element,searchSelector ,arrayClasses) {
    element.closest(searchSelector).classList.add(...arrayClasses)
  }

  /**
   * Удаления класс(ов) у ближайщего подходящего родителя
   * @param {Element} element       - элемент у которого надо найти ближайщего подходящего родителя.
   * @param {string} searchSelector - селектор который надо найти у родителя.
   * @param {array} arrayClasses    - массив со списком классов.
   * @return {void}
   */
  static removeClosestClass(element,searchSelector ,arrayClasses) {
    element.closest(searchSelector).classList.remove(...arrayClasses)
  }

}
