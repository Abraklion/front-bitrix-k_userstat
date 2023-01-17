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
  }

  /**
   * Интерфейс компонента
   * @return {void}
   */
  _init() {
    this._configureElement()

    this.parent = document.querySelector('.js-form__buttons-inner')

    this.parent.querySelector(`#${this.$el.getAttribute('id')}`)?.remove()
    this.parent.append(this.$el)

    console.log('1')

    this.$el.addEventListener('click', e => {
      e.preventDefault()

      console.log(this.formData)

      for(let [name, value] of this.formData) {
        console.log(`${name} = ${value}`); // key1=value1, потом key2=value2
      }

    })

  }

  _configureElement() {
    this.$el.classList.add('button','button--icon-excel')
    this.$el.setAttribute('title', 'Скачать Excel')
  }

  /**
   * Скачать Excel
   * @return {void}
   */
   _download = async (e) => {
    e.preventDefault()
  }



}
