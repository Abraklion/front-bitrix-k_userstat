
/**
 *  Базовый класс для компонентов
 * */
export default class Component {

  /**
   * Конструктор
   * @param {string} id         - находит компонент.
   * @param {Object=} options   - конфигурация.
   */
  constructor(id,{} = {}) {
    this.$el = document.querySelector(id)

    this._init()
  }

  /**
   * Интерфейс компонента
   * @return {void}
   */
  _init() {}

  /**
   * Скрывает компонент
   * @return {void}
   */
  hide() {
    this.$el.style.display = 'none'

    this._onHide() // -> после скрытия компонента вызываем метод
  }

  /**
   * Показать компонент
   * @return {void}
   */
  show() {
    this.$el.style.display = 'block'

    this._onShow() // -> после показа компонента вызываем метод
  }

  /**
   * Действия после скрытия компонента (хук)
   * @return {void}
   */
  _onHide() {

  }

  /**
   * Действия после показа компонента (хук)
   * @return {void}
   */
  _onShow() {

  }

}
