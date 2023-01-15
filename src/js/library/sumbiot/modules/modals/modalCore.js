
/**
 *  Модальное окно Ядро
 * */
export default class ModalCore {

  /**
   * Добавляет новый метод к модалки, не изменяя исходный код класса(первоначальную реализацию) {паттерн Visitor}
   * @return {this}
   */
  accept(visitor) {
    visitor(this)

    return this
  }
}
