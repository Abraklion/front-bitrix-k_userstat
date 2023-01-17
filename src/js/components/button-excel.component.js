import Component from "../core/component";

// import {apiService} from "../services/api.service";

/**
 *  Компонент добавить кастомного сотрудника #mainForm
 * */
export default class ButtonExcelComponent extends Component {

  /**
   * Конструктор
   * @param {string} id         - находит компонент.
   * @param {Object=} options   - конфигурация.
   * @param {string|null} [options.create] - названи тега, генерировать компонент программно(по умолчанию отбирается со страницы)
   * @param {Object} [options.formData] - данные с формы
   */
  constructor(id,options) {

    super(id,options);

    this.formData = options.formData

    this._init()
  }

  /**
   * Интерфейс компонента
   * @return {void}
   */
  _init() {
    this.parent = document.querySelector('.js-wrapper-btn')
    this.parent.style.position = 'relative'

    this.parent.querySelector(`#${this.$el.getAttribute('id')}`)?.remove()
    this.parent.append(this.$el)

    this.$el.addEventListener('click', e => {
      e.preventDefault()

    })

  }

  /**
   * Скачать Excel
   * @return {void}
   */
   _download = async (e) => {
    e.preventDefault()
  }



}
