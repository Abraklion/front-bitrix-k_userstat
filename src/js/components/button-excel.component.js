import Component from "../core/component";

import {apiService} from "../services/api.service";

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
   * @param {string} [options.action] - обработчик на сервере
   */
  constructor(id,options) {

    super(id,options);

    this.formData = options.formData
    this.action = options.action
  }

  /**
   * Интерфейс компонента
   * @return {void}
   */
  _init() {
    this._configureElement()

    this._append('.js-form__buttons-inner')

    this.$el.addEventListener('click', this._clickHandler)

  }

  /**
   * Конфигурация компонента (стили | атрибуты)
   * @return {void}
   */
  _configureElement() {
    this.$el.classList.add('button','button--icon-excel')
    this.$el.setAttribute('title', 'Скачать Excel')
  }

  /**
   * Куда вставить компонент в документ
   * @param {string} parentElement - селектор элемента куда вставить
   * @return {void}
   */
  _append(parentElement) {
    const $parent = document.querySelector(parentElement)

    $parent.querySelector(`#${this.$el.getAttribute('id')}`)?.remove()
    $parent.append(this.$el)
  }

  /**
   * Обработчик клика на компонент
   * @return {void}
   */
   _clickHandler = async (e) => {
     e.preventDefault()

     const response = await apiService.useRequest(this.action,this.formData),
           path = response.data.result

     this.downloadLink(path)
  }

  /**
   * Скачать Excel
   * @param {string} path - путь к файлу который надо скачать
   * @return {void}
   */
  downloadLink(path){
    const element = document.createElement('a');

    element.setAttribute('href', path);
    element.setAttribute('download', '');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

}
