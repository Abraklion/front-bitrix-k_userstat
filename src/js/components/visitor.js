import Support from '../core/support'

/**
 *  Добавляет новую функциональность уже существующим классам, не изменяя исходный код класса
 * */
export default class Visitor {

  /**
   * Посититель для экземпляра модального окна которое реализует
   * редактировать / добавить / продлить
   * удостоверение
   * @param {Object} instanceClass - экземпляр класса
   * @return {void}
   */
  static modalsUnityMod(instanceClass) {

    instanceClass.upgrade = function () {

      // изменяет заголовок
      const editTitle = (target) => {
        let btnText = target.innerText

        this.modal.querySelector('.modal__title').innerText = `${btnText || 'Редактировать'} удостоверение`
      }

      // изменяет обработчик
      const editAction = (target) => {
        this.modal.querySelector('form').action = target.dataset.action || ''
      }

      // добавляет id
      const addUserId = (target) => {
        if(target.dataset.idUser) {
          const input = document.createElement('input')

          input.classList.add('js-input-user-id')

          input.setAttribute('type','hidden')
          input.setAttribute('name','ID_USER')
          input.setAttribute('value',target.dataset.idUser)

          this.modal.querySelector('form').prepend(input)
        }

        if(target.dataset.customUser) {
          const input = document.createElement('input')

          input.classList.add('js-input-custom-user')

          input.setAttribute('type','hidden')
          input.setAttribute('name','CUSTOM_USER')
          input.setAttribute('value',target.dataset.customUser)

          this.modal.querySelector('form').prepend(input)
        }
      }

      // удаляет id
      const deleteUserId = () => {
        const inputs = this.modal.querySelectorAll('input')

        for (let input of inputs) {
          if (input.classList.contains('js-input-user-id') || input.classList.contains('js-input-custom-user'))
            input.remove()
        }
      }

      document.addEventListener('click', (e) => {
        let target = e.target;

        if (target && target.classList.contains(this._trigger.slice(1)) || target.parentElement.classList.contains(this._trigger.slice(1)) ) {

          if (target.parentElement.classList.contains(this._trigger.slice(1))){
            target = target.parentElement
          }

          Support.removeClass('.js-wrapper-modal',
            ['result__info--min_height-380', 'result__info--min_height-442', 'result__info--min_height-265'])

          Support.addClosestClass(target,'.js-wrapper-modal',['result__info--min_height-380'])

          deleteUserId()

          editTitle(target)

          editAction(target)

          addUserId(target)

        }

      })

      // по кнопки закрытия модального окна
      this._close.addEventListener('click', (e) => {
        Support.removeClosestClass(e.target,'.js-wrapper-modal',['result__info--min_height-380'])
      })

      // по клавиши Esc
      window.addEventListener("keydown", (e) => {
        if(e.key === "Escape" || e.keyCode === 27) {
          Support.removeClass('.js-wrapper-modal',
            ['result__info--min_height-380', 'result__info--min_height-442', 'result__info--min_height-265'])
        }
      })

    }
  }

  /**
   * Посититель для экземпляра модального окна (добавления сотрудника и фильтр) которое реализует
   * сброс высоты до стандартной
   * у блока 'result__info'
   * @param {Object} instanceClass - экземпляр класса
   * @return {void}
   */
  static modalsStandardMod(instanceClass) {

    instanceClass.upgrade = function () {

      document.addEventListener('click', (e) => {
        let target = e.target;

        if (target && target.classList.contains(this._trigger.slice(1)) || target && target.parentElement.classList.contains(this._trigger.slice(1)) ) {

          // неиспользуется

        }
      })

    }
  }

  /**
   * Посититель для экземпляра модального окна (редактировать сотрудника) которое реализует
   * подгон высоты для родительского блока под
   * модальное окно
   * @param {Object} instanceClass - экземпляр класса
   * @return {void}
   */
  static editUserMod(instanceClass) {

    instanceClass.upgrade = function () {

      document.addEventListener('click', (e) => {
        let target = e.target;

        if (target && target.classList.contains(this._trigger.slice(1)) || target.parentElement.classList.contains(this._trigger.slice(1)) ) {

          if (target.parentElement.classList.contains(this._trigger.slice(1)))
            target = target.parentElement

          Support.removeClass('.js-wrapper-modal',
            ['result__info--min_height-380', 'result__info--min_height-442', 'result__info--min_height-265'])

          Support.addClosestClass(target,'.js-wrapper-modal',['result__info--min_height-442'])

        }

      })

      // по кнопки закрытия модального окна
      this._close.addEventListener('click', (e) => {
        Support.removeClosestClass(e.target,'.js-wrapper-modal',['result__info--min_height-442'])
      })

    }
  }

  /**
   * Посититель для экземпляра модального окна (удаления) которое реализует
   * удаление
   * удостоверение / сотрудника
   * @param {Object} instanceClass - экземпляр класса
   * @return {void}
   */
  static modalsUnityDeleteMod(instanceClass) {

    instanceClass.upgrade = function () {

      // изменяет обработчик
      const editAction = (target) => {
        this.modal.querySelector('form').action = target.dataset.action || ''
      }

      // добавляет user id
      const addUserId = (target) => {
        if(target.dataset.idUser) {
          const input = document.createElement('input')

          input.classList.add('js-input-user-id')

          input.setAttribute('type','hidden')
          input.setAttribute('name','ID_USER')
          input.setAttribute('value',target.dataset.idUser)

          this.modal.querySelector('form').prepend(input)
        }

        if(target.dataset.customUser) {
          const input = document.createElement('input')

          input.classList.add('js-input-custom-user')

          input.setAttribute('type','hidden')
          input.setAttribute('name','CUSTOM_USER')
          input.setAttribute('value',target.dataset.customUser)

          this.modal.querySelector('form').prepend(input)
        }
      }

      // удаляет user id
      const deleteUserId = () => {
        const inputs = this.modal.querySelectorAll('input')

        for (let input of inputs) {
          if (input.classList.contains('js-input-user-id') || input.classList.contains('js-input-custom-user'))
            input.remove()
        }
      }

      document.addEventListener('click', (e) => {
        let target = e.target;

        if (target && target.classList.contains(this._trigger.slice(1)) || target.parentElement.classList.contains(this._trigger.slice(1)) ) {

          if (target.parentElement.classList.contains(this._trigger.slice(1))){
            target = target.parentElement
          }

          Support.removeClass('.js-wrapper-modal',
            ['result__info--min_height-380', 'result__info--min_height-442', 'result__info--min_height-265'])

          deleteUserId()

          editAction(target)

          addUserId(target)

        }

      })

    }
  }

  /**
   * Посититель для экземпляра модального окна (добавить HSE) которое реализует
   * останавку распростронения события и следит за позиционированием
   * модального окна
   * @param {Object} instanceClass - экземпляр класса
   * @return {void}
   */
  static addHseMod(instanceClass) {

    instanceClass.upgrade = function (instanceDropDown) {

      // если до низу экрана меньше 210px позицианируем модалку вверху кнопки
      const modalPosition = (e) => {
        if(window.innerHeight - e.clientY < 210) {
          this.modal.classList.add("modal--position-top")
        }else {
          this.modal.classList.remove("modal--position-top")
        }
      }

      document.addEventListener('click', (e) => {
        let target = e.target;

        if (target && target.classList.contains(this._trigger.slice(1)) || target.parentElement.classList.contains(this._trigger.slice(1)) ) {

          e.stopPropagation()

          Support.removeClass('.js-wrapper-modal',
            ['result__info--min_height-380', 'result__info--min_height-442', 'result__info--min_height-265'])

          instanceDropDown.reset(this.modal.querySelector('#add-hse'))

          modalPosition(e)
        }

      },true)

    }
  }

  /**
   * Посититель для экземпляра модального окна (редактировать HSE) которое реализует
   * подгон высоты для родительского блока под
   * модальное окно
   * @param {Object} instanceClass - экземпляр класса
   * @return {void}
   */
  static editHseMod(instanceClass) {

    instanceClass.upgrade = function () {

      document.addEventListener('click', (e) => {
        let target = e.target;

        if (target && target.classList.contains(this._trigger.slice(1)) || target.parentElement.classList.contains(this._trigger.slice(1)) ) {

          if (target.parentElement.classList.contains(this._trigger.slice(1))){
            target = target.parentElement
          }

          Support.removeClass('.js-wrapper-modal',
            ['result__info--min_height-380', 'result__info--min_height-442', 'result__info--min_height-265'])

          Support.addClosestClass(target,'.js-wrapper-modal',['result__info--min_height-265'])

        }

      })

      // по кнопки закрытия модального окна
      this._close.addEventListener('click', (e) => {
        Support.removeClosestClass(e.target,'.js-wrapper-modal',['result__info--min_height-265'])
      })

    }
  }

  /**
   * Посититель для экземпляра выподающего списка которое реализует
   * позицианирование
   * выподающего списка
   * @param {Object} instanceClass - экземпляр класса
   * @return {void}
   */
  static positionMod(instanceClass) {

    instanceClass.upgrade = function () {

      // если до низу экрана меньше 372px позицианируем модалку вверху кнопки
      const selectPosition = (wrap,e) => {
        if(document.documentElement.scrollHeight - e.pageY < 400) {
          wrap.nextElementSibling.classList.add('dropdown__options--top-position')
        }else {
          wrap.nextElementSibling.classList.remove('dropdown__options--top-position')
        }
      }

      let optionWrap = document.querySelectorAll('.js-dropdown__toggle')

      optionWrap.forEach(wrap => {

        wrap.addEventListener('click', (e)=> {
          e.preventDefault()

          selectPosition(wrap,e)

        })

      })

    }
  }

  /**
   * Посититель для экземпляра аккрдиона которое реализует
   * переключение класса активности родителю
   * аккрдиона
   * @param {Object} instanceClass - экземпляр класса
   * @return {void}
   */
  static accordionParentMod(instanceClass) {

    instanceClass.upgrade = function () {

      // переключает класс
      const toggleParent = (target) => {
        document.querySelectorAll(this._triggerSelector).forEach(element => {

          if(element === target.closest(this._triggerSelector)){
            target.closest(this._triggerSelector).parentElement.classList.toggle('result__row--active')
          }else {
            element.parentElement.classList.remove('result__row--active')
          }

        })
      }

      document.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.closest(this._triggerSelector)) {
          toggleParent(target)
        }

      })

    }
  }

}
