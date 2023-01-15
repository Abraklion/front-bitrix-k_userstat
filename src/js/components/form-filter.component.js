import Component from "../core/component"

import Form from "../core/form";

import {apiService} from "../services/api.service";
import Loader from "./loader";

/**
 *  Компонент добавить кастомного сотрудника
 * */
export default class FormFilterComponent extends Component {

  /**
   * Конструктор
   * @param {string} id         - находит компонент.
   * @param {Object=} options   - конфигурация.
   * @param {Object=} [options.instanceDropDown] - экземпляр класса кастомных селектов
   * @param {Array=} [options.partners] - партнерские компоненты, которые помогают этому
   */
  constructor(id,options) {

    super(id,options);

    this.instanceDropDown = options.dropDown || {}
    this.partners = options.partners || []
  }

  /**
   * Интерфейс компонента
   * @return {void}
   */
  _init() {
    this.$el.addEventListener('submit', submitHandler.bind(this))

    this.$el.addEventListener('reset', resetHandler.bind(this))

    this.form = new Form(this.$el, {
      DATE_BEGIN: [],
      DATE_END: [],
      ID_DIVISION: [],
      ID_MATRIX_WORKS: [],
      ID_PROGRAM: []
    })

  }

}

/**
 * Обработчик отправки формы
 * @return {void}
 */
async function submitHandler(e) {

  e.preventDefault()
  e.target.querySelector('.form__button--submit').blur()

  if(this.form.isValid()){

    const loader = new Loader({
      loading: 'Идет фильтрация данных',
      failure: 'Ошибка'
    })

    try {

      const action = this.$el.getAttribute('action').slice(1),
            formData = new FormData(this.$el),
            filterResult = this.partners.find(partner => partner.name === 'filterResult')

      this.$el.append(loader.loading())

      const response = await apiService.useRequest(action,formData),
            result = JSON.parse(response.data.result),
            count = result.length || 0

      loader.success(`Найдено: ${count} совпадений`)

      this.partners.forEach(partner => partner.component.hide())

      filterResult.component.register(result).show()

    } catch (error) {

      loader.failure()

      if(error.status === 'error') {

        console.group('In file ApiService, in function useRequest, promise return reject')

          console.group('List of errors')

          error.errors.forEach(error => {
            console.error(`Name: ${error.message}\n Code: ${error.code}\n customData: ${error.customData}`)
          })

          console.groupEnd();

        console.groupEnd();

      } else {

        console.group('In file FormFilterComponent error')
          console.error(`${error.stack}`)
        console.groupEnd();

      }

    } finally {

      setTimeout(() => {

        loader.removeLoader()

      }, 900)

    }

  }

}

/**
 * Обработчик сброса фильтра
 * @return {void}
 */
function resetHandler(e) {

  setTimeout(() => {
    e.target.querySelector('.form__button--reset_filter').blur()
  },150)

  this.instanceDropDown.reset(this.form.form)

  this.partners.forEach(partner => partner.component.hide())

  this.partners.find(partner => partner.name === 'mainResult')
    .component.show()
}
