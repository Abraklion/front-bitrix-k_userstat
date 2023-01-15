import Modal from "./modal";

/**
 *  Модальное окна c привязкой к блоку
 * */
export default class ModalDynamics extends Modal{

  /**
   * Создает скрытый input
   * @return {Node}
   */
  static createInput() {
    const input = document.createElement('input')

    input.classList.add('sumbiot-input-dynamic')

    input.setAttribute('type','hidden')
    input.setAttribute('name','ID')

    return input
  }

  /**
   * Конструктор
   * @param {string} triggerSelector - селектор который открывает модальное окно.
   * @param {Object=} options        - конфигурация.
   */
  constructor(triggerSelector, options = {}) {

    super(triggerSelector,options)

    this._wrapperModalSelector = options.modalWrapper || '.sumbiot-wrapper'            // - родитель куда вставляем модальное окно
    this._wrapperElementSelector = options.elementWrapper || '[data-sumbiot-wrapper]'  // - родитель куда вставить input
    this._existsElementForPasteIdSelector = options.existsElementForPasteId            // - элемент уже существует в форме и готов с добавлению id
  }

  /**
   * Обработчик события клика по элементу который открывает модальное окно
   * @return {void}
   */
  _showHandler() {
    document.addEventListener('click', (e) => {
      const target = e.target;

      if (target && target.classList.contains(this._trigger.slice(1))) {
          e.preventDefault()

          this._triggerEvent = target
          this._show()
      }else if(target && target.parentElement.classList.contains(this._trigger.slice(1))) {
          e.preventDefault()

          this._triggerEvent = target.parentElement
          this._show()
      }

    },true)
  }

  /**
   * Показать модальное окно
   * @return {void}
   */
  _show(){

    this.hideAllModals()

    this._modalPosition()

    this.modal.style.display = "block";
  }

  /**
   * Позицианирует модальное окно в нужное место
   * @return {void}
   */
  _modalPosition(){

    this._elementPosition()

    if(!this._triggerEvent.closest(this._wrapperModalSelector)) {
      this._triggerEvent.parentElement.classList.add(this._wrapperModalSelector.slice(1))
    }

    this._wpapper = this._triggerEvent.closest(this._wrapperModalSelector)
    this._wpapper.append(this.modal)
  }

  /**
   * Вставляет input или добавляет data-sumbiot-id в нужный элемент
   * @return {void}
   */
  _elementPosition() {
    let id = this._triggerEvent.dataset.id,
        elementForPasteId  = this.modal.querySelector(this._existsElementForPasteIdSelector || '.sumbiot-input-dynamic')

    if(!elementForPasteId) {
      elementForPasteId = ModalDynamics.createInput()

      this.modal.querySelector(this._wrapperElementSelector) ?
        this.modal.querySelector(this._wrapperElementSelector).prepend(elementForPasteId) :
        this.modal.querySelector('form').prepend(elementForPasteId)
    }

    this._existsElementForPasteIdSelector ? elementForPasteId.setAttribute('data-sumbiot-id',id) : elementForPasteId.setAttribute('value',id)
  }

}
