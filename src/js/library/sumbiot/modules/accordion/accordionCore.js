
/**
 *  Аккардион Ядро
 * */
export default class AccordionCore {

  /**
   * Добавляет новый метод к аккардион, не изменяя исходный код класса(первоначальную реализацию) {паттерн Visitor}
   * @return {this}
   */
  accept(visitor) {
    visitor(this)

    return this
  }
}
