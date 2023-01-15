import Component from "../core/component"

import Form from "../core/form";
import Support from "../core/support";

import {apiService} from "../services/api.service";
import Loader from "./loader";

import {userCardInfoTemplate} from "../templates/user/userCardInfo.template";

/**
 *  Компонент добавить кастомного сотрудника
 * */
export default class FormAddOrEditCardComponent extends Component {

  /**
   * Конструктор
   * @param {string} id         - находит компонент.
   * @param {Object=} options   - конфигурация.
   */
  constructor(id,options) {

    super(id,options);
  }

  /**
   * Интерфейс компонента
   * @return {void}
   */
  _init() {
    this.$el.addEventListener('submit', submitHandler.bind(this))

    document.addEventListener('click', (e) => {

      let target = e.target;

      if (target && target.classList.contains('js-edit-card-modal') || target.parentElement.classList.contains('js-edit-card-modal') ) {
        e.preventDefault()

        if (target.parentElement.classList.contains('js-edit-card-modal')){
          target = target.parentElement
        }

        this.form.clear()
      }

      if (target && target.classList.contains('js-edit-card') || target.parentElement.classList.contains('js-edit-card') ) {
        e.preventDefault()

        if (target.parentElement.classList.contains('js-edit-card')){
          target = target.parentElement
        }

        getData.call(this,target)
      }

    })

    this.form = new Form(this.$el, {
      ID: [],
      C_ATTESTATION_DATE: [],
      C_NEXT_ATTESTATION_DATE: [],
      C_CARD_NUMBER: [],
    })
  }

}

/**
 * Обработчик заполнения формы
 * @return {void}
 */
async function getData(target) {

  let idTimeout;

  const loader = new Loader({
    loading: 'Идет сбор данных, об удостоверение',
  })

  try {

    const formData = new FormData(),
          attDateInput = this.$el.querySelector('.js-edit-att-date'),
          nextAttDateInput = this.$el.querySelector('.js-edit-next-att-date'),
          cardNumberInput = this.$el.querySelector('.js-edit-card-number')

    formData.append('ID',target.dataset.id)

    idTimeout = setTimeout(() =>{
      this.$el.append(loader.loading())
    },400)

    const response = await apiService.useRequest('getCard',formData),
      result = JSON.parse(response.data.result)

    attDateInput.value = result.attestationDate
    nextAttDateInput.value = result.nextAttestationDate
    cardNumberInput.value = result.cardNumber

  } catch (error) {
    if(error.status === 'error') {

      console.group('In file ApiService, in function useRequest, promise return reject')

        console.group('List of errors')

        error.errors.forEach(error => {
          console.error(`Name: ${error.message}\n Code: ${error.code}\n customData: ${error.customData}`)
        })

        console.groupEnd();

      console.groupEnd();

    } else {

      console.group('In file FormAddOrEditCardComponent, in function getData error')
        console.error(`${error.stack}`)
      console.groupEnd();

    }
  } finally {
    clearTimeout(idTimeout)

    loader.removeLoader()
  }

}

/**
 * Обработчик отправки формы
 * @return {void}
 */
async function submitHandler(e) {

  e.preventDefault()

  if(this.form.isValid()){

    let loader;

    if (this.$el.getAttribute('action').slice(1) === 'addCard') {

      loader = new Loader({
        loading: 'Добавление удостоверения',
        success: 'Удостоверение добавлено',
        failure: 'Удостоверение не добавлено'
      })

    }
    else if (this.$el.getAttribute('action').slice(1) === 'editCard') {

      loader = new Loader({
        loading: 'Редактирование удостоверения',
        success: 'Удостоверение отредактировано',
        failure: 'Удостоверение не отредактировано'
      })

    }

    try {

      const action = this.$el.getAttribute('action').slice(1),
            formData = new FormData(this.$el)

      this.$el.append(loader.loading())

      const response = await apiService.useRequest(action,formData),
            result = JSON.parse(response.data.result)

      const htmlCardInfo = (+result.customUser) ? userCardInfoTemplate(result,{build: 1}) :
            (+result.idMatrixWorks) ? userCardInfoTemplate(result,{build: 2}) :
              userCardInfoTemplate(result,{build: 0})

      loader.success()

      setTimeout(() => {
        const parent = this.$el.closest('.result__row'),
              info = parent.querySelector('.result__info')

        info.innerHTML = htmlCardInfo

      },900)

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

        console.group('In file FormAddOrEditCardComponent, in function submitHandler error')
          console.error(`${error.stack}`)
        console.groupEnd();

      }

    } finally {

      setTimeout(() => {
        this.form.clear()

        this.$el.closest('.modal').style.display = 'none'

        Support.removeClass('.js-wrapper-modal',
          ['result__info--min_height-380', 'result__info--min_height-442', 'result__info--min_height-265'])

        loader.removeLoader()
      }, 900)

    }

  }

}
