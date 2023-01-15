import Component from "../core/component";

import {userMainTemplate} from "../templates/user/userMain.template";
import Loader from "./loader";
import {apiService} from "../services/api.service";
import Pagination from "../library/sumbiot/modules/pagination/components/pagination";

/**
 *  Компонент вывод все сотрудников
 * */
export default class ResultMainComponent extends Component {

  /**
   * Конструктор
   * @param {string} id         - находит компонент.
   * @param {Object=} options   - конфигурация.
   */
  constructor(id,options) {

    super(id,options);

    this.$pasteInElement =  this.$el.querySelector('.result__inner')

  }

  /**
   * Интерфейс компонента
   * @return {void}
   */
  _init() {

    this.getAllUsers()

  }

  /**
   * Отрисовать всех сотрудниуов на главной страницы ком
   * @return {void}
   */
  async getAllUsers() {

    const loader = new Loader({
      loading: 'Приложение загружается, подождите',
      success: 'Приложение загружено, приятной работы',
      failure: 'Приложение не загружено, что то пошло не так',
      activeClass: 'loader--min-height'
    })

    try {

      document.querySelector('.result').append(loader.loading())

      const response = await apiService.getUsers()

      if(Array.isArray(response) && response.length) {

        this.html = response.map(user => {
          if(+user.customUser) {
            return userMainTemplate(user,{build: 1})
          } else if (+user.idMatrixWorks) {
            return userMainTemplate(user,{build: 2})
          } else {
            return userMainTemplate(user,{build: 0})
          }
        })

        loader.success()

        setTimeout(() => {
          this.pagination = new Pagination(this.$el, this.$pasteInElement, this.html)
        }, 950)

      } else {

        console.error('In file ResultMainComponent, in function getAllUsers, response is either not an array or an empty array')

      }

    } catch (error) {

      loader.failure()

      if(error.status === 'error') {

        console.group('In file ApiService, in function getUsers, promise return reject')

          console.group('List of errors')

          error.errors.forEach(error => {
            console.error(`Name: ${error.message}\n Code: ${error.code}\n customData: ${error.customData}`)
          })

          console.groupEnd();

        console.groupEnd();

      } else {

        console.group('In file ResultMainComponent, in function getAllUsers error')
          console.error(`${error.stack}`)
        console.groupEnd();

      }
    } finally {

      setTimeout(() => {

        loader.removeLoader()

      }, 900)

    }
  }

  /**
   * добавить сотрудника в начало
   * @param {Object} user - сотрудник
   * @return {this}
   */
  unshift(user) {

    if(user) {
      let html =  userMainTemplate(user,{build: 1})

      if(this.html) {

        this.html.unshift(html)

        this.pagination.showPage(1)

      } else {

        this.$pasteInElement.insertAdjacentHTML('afterbegin', html)

      }

    }

    return this
  }

}
