import Component from "../core/component"

import Form from "../core/form";

import {apiService} from "../services/api.service";
import Loader from "./loader";

/**
 *  Компонент добавить кастомного сотрудника
 * */
export default class FormSearchComponent extends Component {

  /**
   * Конструктор
   * @param {string} id         - находит компонент.
   * @param {Object=} options   - конфигурация.
   * @param {Array=} [options.partners] - партнерские компоненты, которые помогают этому
   */
  constructor(id,options) {

    super(id,options);

    this.partners = options.partners || []
  }

  /**
   * Интерфейс компонента
   * @return {void}
   */
  _init() {
    this.$el.addEventListener('submit', submitHandler.bind(this))

    this.form = new Form(this.$el, {
      SEARCH: [],
      STATUS: []
    })

    getData.call(this)

  }

}

/**
 * Обработчик заполнения имен сотрудников для поиска
 * @return {void}
 */
async function getData() {
  try {

    const optionsWrap = this.$el.querySelector('.js-options-search')

    const response = await apiService.getFio()

    if(Array.isArray(response)) {

      let html = response.map(name => {
        return `
          <div class="dropdown__item" title="${name}" style="display: none">
            ${name}
          </div>
        `
      })

      optionsWrap.innerHTML = ''
      optionsWrap.insertAdjacentHTML('afterbegin', html.join(''))

    }

  } catch (error) {
    if(error.status === 'error') {

      console.group('In file ApiService, in function getUsers, promise return reject')

        console.group('List of errors')

        error.errors.forEach(error => {
          console.error(`Name: ${error.message}\n Code: ${error.code}\n customData: ${error.customData}`)
        })

        console.groupEnd();

      console.groupEnd();

    } else {

      console.group('In file SearchComponent, in function getData error')
        console.error(`${error.stack}`)
      console.groupEnd();

    }
  }

}

/**
 * Обработчик отправки формы
 * @return {void}
 */
async function submitHandler(e) {

  e.preventDefault()

  let btnSubmit = e.target.querySelector('.js-button-search-submit')

  btnSubmit.disabled = true
  setTimeout(() => {
    btnSubmit.blur()
  },150)


  if(this.form.isValid()){

    const loader = new Loader({
      loading: 'Идет поиск сотрудника',
      failure: 'Ошибка',
      activeClass: 'loader--min-height'
    })

    try {

      const action = this.$el.getAttribute('action').slice(1),
            formData = new FormData(this.$el),
            searchResult = this.partners.find(partner => partner.name === 'searchResult')

      this.$el.querySelector('.form__button--reset_search')?.remove()

      this.partners.forEach(partner => partner.component.hide())

      document.querySelector('.result').append(loader.loading())

      const response = await apiService.useRequest(action,formData),
            result = JSON.parse(response.data.result),
            count = result.length || 0,
            bntNext = nextBtn.call(this)

      loader.success(`Найдено: ${count} совпадений`)

      count ?
        searchResult.component.register(result).show() :
        searchResult.component.register(result,{bntNext}).show()

      this.$el.querySelector('.dropdown--input')?.append(resetRender.call(this))

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

        console.group('In file FormSearchComponent error')
          console.error(`${error.stack}`)
        console.groupEnd();

      }

    } finally {

      setTimeout(() => {

        loader.removeLoader()

        btnSubmit.disabled = false

      }, 900)

    }

  }

}

/**
 * Обработчик сброса поиска
 * @return {HTMLElement}
 */
function resetRender() {

  // btnReset
  const btnReset = () => {
    let btn = document.createElement('button')

    btn.classList.add('form__button','form__button--reset_search')
    btn.setAttribute('type','reset')

    return btn
  }

  // btnHandler
  const btnHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()

    this.form.clear()
    this.$el.querySelector('.dropdown__toggle').style.paddingRight = ''

    btn.removeEventListener('click', btnHandler)
    btn.remove()

    this.partners.forEach(partner => partner.component.hide())

    this.partners.find(partner => partner.name === 'mainResult')
      .component.show()
  }

  const btn = btnReset()

  this.$el.querySelector('.dropdown__toggle').style.paddingRight = '30px'
  btn.addEventListener('click', btnHandler)

  return btn
}

/**
 * Назад кнопка, если поиск не дал результатов
 * @return {HTMLElement}
 */
function nextBtn() {
  let btn = document.createElement('button'),
      text = document.createTextNode('на главную')

  btn.append(text)
  btn.classList.add('button','button--text')
  btn.style.marginLeft = '10px'

  btn.addEventListener('click', () => {

    if(this.$el.querySelector('.dropdown__toggle'))
      this.$el.querySelector('.dropdown__toggle').style.paddingRight = ''

    this.$el.querySelector('.form__button--reset_search')?.remove()

    this.partners.forEach(partner => partner.component.hide())

    this.partners.find(partner => partner.name === 'mainResult')
      .component.show()
  })

  return btn
}


