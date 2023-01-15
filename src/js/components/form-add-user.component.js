import Component from "../core/component";

import Form from "../core/form";
import {Validators} from "../core/validators";

import {apiService} from "../services/api.service";

import Loader from "./loader";

/**
 *  Компонент добавить кастомного сотрудника
 * */
export default class FormAddUserComponent extends Component {

  /**
   * Конструктор
   * @param {string} id         - находит компонент.
   * @param {Object=} options   - конфигурация.
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

    this.form = new Form(this.$el, {
      E_FIO: [],
      ID_DIVISION: [Validators.required],
      ID_DEPARTMENT: [Validators.required],
      ID_MATRIX_WORKS: [Validators.required],
      E_EMPLOYEE_STATUS: [Validators.required]
    })

  }

}

/**
 * Обработчик отправки формы
 * @return {void}
 */
async function submitHandler(e) {

  e.preventDefault()

  if(this.form.isValid()){

    const loader = new Loader({
      loading: 'Идет добавления сотрудника',
      success: 'Сотрудник добавлен',
      failure: 'Сотрудник не добавлен'
    })

    try {

      const action = this.$el.getAttribute('action').slice(1),
            formData = new FormData(this.$el),
            mainResult = this.partners.find(partner => partner.name === 'mainResult'),
            options = document.querySelector('.js-options-search')

      this.$el.append(loader.loading())

      const response = await apiService.useRequest(action,formData),
            result = JSON.parse(response.data.result)

      loader.success()

      this.partners.forEach(partner => partner.component.hide())

      mainResult.component.unshift(result).show()

      options.append(optionsUser(result.fio))

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

        console.group('In file FormAddUserComponent error')
          console.error(`${error.stack}`)
        console.groupEnd();

      }

    } finally {

      setTimeout(() => {
        this.form.clear()
        this.instanceDropDown.reset(this.form.form)

        loader.removeLoader()
      }, 900)

    }

  }

}

/**
 * Пункт в ФИО сотрудника
 * @return {HTMLElement}
 */
function optionsUser(fio) {
  let div = document.createElement('div'),
      text = document.createTextNode(fio)

  div.append(text)
  div.classList.add('dropdown__item')
  div.setAttribute('title', fio)
  div.style.display = 'none'

  return div
}
