
/**
 *  Погрузчик
 * */
export default class Loader{

  /**
   * Конструктор
   * @param {Object=} message - объект с настройками
   */
  constructor({
                loading = 'Загрузка...',
                success = 'Успех',
                failure = 'Неудача',
                activeClass = ''
              } = {}) {

    this.message = {
      loading: {
        title: loading,
        img: ''
      },
      success: {
        title: success,
        img: 'loader__img--ok'
      },
      failure: {
        title: failure,
        img: 'loader__img--error'
      }
    }
    this.activeClass = activeClass

    this._init()
  }

  /**
   * Интерфейс компонента
   * @return {void}
   */
  _init(){
    this.$el = document.createElement('div')
    this.$el.classList.add('loader')
    if(this.activeClass) {
      this.$el.classList.add(this.activeClass)
    }

    this.$el.innerHTML = `
      <div class="loader__img"></div>
      <p class="loader__massage">${this.message.loading.title}</p>
    `

    this.$img = this.$el.querySelector('.loader__img')
    this.$massage = this.$el.querySelector('.loader__massage')
  }

  /**
   * Загрузка
   * @return {Element}
   */
  loading() {
    return this.$el
  }

  /**
   * Успех
   * @return {void}
   */
  success(text = '') {
    this.$img.classList.add(this.message.success.img)
    this.$massage.innerHTML = text || this.message.success.title
  }

  /**
   * Неудача
   * @return {void}
   */
  failure() {
    this.$img.classList.add(this.message.failure.img)
    this.$massage.innerHTML = this.message.failure.title
  }

  /**
   * Удалить загрузчик
   * @return {void}
   */
  removeLoader() {
    this.$el.remove()
  }
}
