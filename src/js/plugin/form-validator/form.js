
/**
 *  Базовый класс для работы с формами
 * */
export default class Form {

  /**
   * Конструктор
   * @param {Element} form      - форма.
   * @param {Object=} controls  - поля формы.
   */
  constructor(form, controls= {}) {
    this.form = form

    this.controls = controls
  }

  /**
   * Вытаскивает значения из полей формы
   * @return {Object}
   */
  value() {
    const value = {}

    Object.keys(this.controls).forEach(control => {
      value[control] = this.form[control].value
    })

    return value
  }

  /**
   * Проверка на валидацию
   * @return {boolean}
   */
  isValid() {

    let isFormValid = true // Флаг

    Object.keys(this.controls).forEach(control => {

      if(this.controls[control].length) {

        const validators = this.controls[control] // массив с валидаторами

        let isValid = true // Флаг

        validators.forEach(validator =>{

          isValid = validator(this.form[control].value) && isValid // запускаем валидаторы по цепочки

        })

        //если элемент формы валиден
        isValid ? clearError(this.form[control]) : setError(this.form[control])
        //если элемент формы невалиден

        isFormValid = isFormValid && isValid // переключаем Флаг

      }

    })

    return isFormValid
  }

  /**
   * Очищаем форму
   * @return {void}
   */
  clear() {
    this.form.reset()
  }

}

/**
 * Сформировать и отправить ошибку
 * @return {void}
 */
function setError($control){

  clearError($control) // удаляет сообщения об ошибки

  const error = '<span class="form__validation-error">Введите значение</span>' // формируем сообшения об ошибки

  $control.nextElementSibling.firstElementChild.style.backgroundColor = '#fff5f5' // подсветить не валидный элемент красным цветом

  $control.previousElementSibling.insertAdjacentHTML('beforeend', error) // добавляем сообщения от ошибки для невалидного элемента
}

/**
 * Удалить сообщения об ошибки
 * @return {void}
 */
function clearError($control){

  $control.nextElementSibling.firstElementChild.style.backgroundColor = '' // удалить подсветку

  // элемент с ошибкой сушествует
  if($control.previousElementSibling.querySelector('.form__validation-error')){

    $control.previousElementSibling.querySelector('.form__validation-error').remove() // удаляет ошибку

  }

}
