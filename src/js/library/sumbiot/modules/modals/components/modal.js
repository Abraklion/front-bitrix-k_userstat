import ModalCore from "../modalCore";

/**
 *  Модальное окно стандарт
 * */
export default class Modal extends ModalCore{

  /**
   * Конструктор
   * @param {string} triggerSelector - селектор который открывает модальное окно.
   * @param {Object=} options        - конфигурация.
   */
  constructor(triggerSelector ,
              {
                modalSelector = null,          // - селектор модального окна которое мы будем открывать.
                modalGroup = '[data-sumbiot-modal]', // - группирует модалки в группы
                closeSelector = '[data-sumbiot-modal-close]', // - селектор который закрывает модальное окно.
                closeClickOverlay = true,      // - будет ли закрываться окно по клику по подложки
              } = {}) {

    super()

    this._trigger = triggerSelector
    this.modal = document.querySelector(modalSelector || document.querySelector(triggerSelector).dataset.sumbiotTarget)
    this._close = this.modal.querySelector(closeSelector)

    this._modalGroupSelector = modalGroup
    this._windows = document.querySelectorAll(modalGroup)
    this._closeClickOverlay = closeClickOverlay

    this._init()
  }

  /**
   * Инициализация модального окона
   * @return {void}
   */
  _init() {
    this.hideAllModals()

    this._showHandler()

    this._closeHandler()
  }

  /**
   * Скрывает все модальные окна
   * @return {void}
   */
  hideAllModals() {
    this._windows.forEach(modal => {
      modal.classList.add('animated', 'fadeIn');
      modal.style.display = 'none';
    })
  }

  /**
   * Обработчик события клика по элементу который открывает модальное окно
   * @return {void}
   */
  _showHandler() {
    document.addEventListener('click', (e) => {
      const target = e.target;

      if (target && target.classList.contains(this._trigger.slice(1)) || target && target.parentElement.classList.contains(this._trigger.slice(1)) ) {
        e.preventDefault()
        e.stopPropagation()

        this._show()

        setTimeout(() =>{
          target.blur()
        },150)
      }
    })
  }

  /**
   * Показать модальное окно
   * @return {void}
   */
  _show(){
    this.hideAllModals()

    this.modal.style.display = "block";
  }

  /**
   * Обработчик события клика по элементу который закрывает модальное окно
   * @return {void}
   */
  _closeHandler() {
    this._close.addEventListener('click', (e) => {
      if (e.target) {
        e.preventDefault()

        this._closeModal()
      }
    })

    this.modal.addEventListener('click', (e) => {
      if (e.target) {
        e.stopPropagation()

        this._closeModalOverlay(e)
      }
    })

    window.addEventListener("keydown", (e) => {
      if(e.key === "Escape" || e.keyCode === 27) {
        this._closeModalEscape(e)
      }
    })
  }

  /**
   * Скрыть модальное окно
   * @return {void}
   */
  _closeModal() {
    this.modal.style.display = "none";
  }

  /**
   * Скрыть модальное окно
   * @return {void}
   */
  _closeModalEscape(e) {

    document.querySelectorAll(this._modalGroupSelector).forEach((modals)=>{
      if(modals.style.display === 'block'){
        modals.style.display = "none"
      }
    })
  }

  /**
   * Скрывает модальне окно по клику на подложку
   * @return {void}
   */
  _closeModalOverlay(e) {

    if (e.target === this.modal && this._closeClickOverlay) {
      this.modal.style.display = "none";
    }
  }
}
