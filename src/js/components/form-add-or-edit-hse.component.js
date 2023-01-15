import Component from "../core/component"

import Form from "../core/form";
import {Validators} from "../core/validators";
import Support from "../core/support";

import {apiService} from "../services/api.service";
import Loader from "./loader";

import {userCardInfoTemplate} from "../templates/user/userCardInfo.template";
import {workNameTemplate} from "../templates/workName.template";

/**
 *  Компонент добавить кастомного сотрудника
 * */
export default class FormAddOrEditHseComponent extends Component {

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

    if(this.$el.getAttribute('id') === 'edit-hse') {

      document.addEventListener('click', (e) => {
        let target = e.target;

        if (target && target.classList.contains('js-edit-hse-modal') || target.parentElement.classList.contains('js-edit-hse-modal') ) {
          e.preventDefault()

          if (target.parentElement.classList.contains('js-edit-hse-modal')){
            target = target.parentElement
          }

          getData.call(this,target)

        }
      })

    }

    this.form = new Form(this.$el, {
      ID: [],
      ID_MATRIX_WORKS: [Validators.required]
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
    loading: 'Идет сбор данных, о сотруднике',
  })

  try {

    const formData = new FormData(),
          options = this.$el.querySelectorAll('.dropdown__item')

    formData.append('ID',target.dataset.id)

    idTimeout = setTimeout(() =>{
      this.$el.append(loader.loading())
    },400)

    const response = await apiService.useRequest('getIdHse',formData)

    options.forEach(option => {
      if(+option.dataset.selectOption === +response.data.result) {

        option.click()
      }
    })

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

      console.group('In file FormAddOrEditHseComponent, in function getData error')
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

    const loader = new Loader({
      loading: 'Добавление должности',
      success: 'Должность добавлена',
      failure: 'Должность не добавлена'
    })

    try {

      const action = this.$el.getAttribute('action').slice(1),
            formData = new FormData(this.$el)

      this.$el.querySelector('button').blur()
      this.$el.append(loader.loading())

      const response = await apiService.useRequest(action,formData),
            result = JSON.parse(response.data.result)

      const htmlCardInfo = userCardInfoTemplate(result,{build: 2}),
            htmlUserWork = workNameTemplate(result.work)

      loader.success()

      setTimeout(() => {
        const parent = this.$el.closest('.result__row'),
              info = parent.querySelector('.result__info'),
              work = parent.querySelector('.js-matrix-work-hse')

        info.innerHTML = htmlCardInfo

        work.classList.add('g-justify-items-left')
        work.setAttribute('title',result.work)
        work.innerHTML = htmlUserWork
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

        console.group('In file FormAddOrEditHseComponent, in function submitHandler error')
          console.error(`${error.stack}`)
        console.groupEnd();

      }

    } finally {

      setTimeout(() => {
        this.$el.closest('.modal').style.display = 'none'

        Support.removeClass('.js-wrapper-modal',
          ['result__info--min_height-380', 'result__info--min_height-442', 'result__info--min_height-265'])

        loader.removeLoader()
      }, 900)

    }

  }

}
