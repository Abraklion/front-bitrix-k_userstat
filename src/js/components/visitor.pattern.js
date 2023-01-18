
/**
 *  Добавляет новую функциональность уже существующим классам, не изменяя исходный код класса
 * */
export default class VisitorPattern {

  /**
   * Посититель для экземпляра связаных выподающий списков
   * 1) блокикует кнопку если не выбран дивизион
   * 2) если выбран дивизион, в input отдела(выподающего списка В) записывается id дивизиона
   * 3) если отдел(выподающего списка В) активный пункт сделали пустой в input отдела записовается id дивизиона
   * @param {Object} instanceClass - экземпляр класса
   * @return {void}
   */
  static selectMod(instanceClass) {

    instanceClass.upgrade = function () {

      let btnDeps = document.querySelector('.js-btn-deps'),
          // -2-
          workConfiguration = (option) => {
            let idSelectA = option.dataset.selectOption,
                input = this.$selectB.parentElement.querySelector(this.resetParamsB.input)

            this.$pasteOptions.insertAdjacentHTML('afterbegin', `
              <div class="dropdown__item js-dropdown__item-empty" data-select-option="" title="Не выбран">
                ---
              </div>
            `)

            input.setAttribute('value', idSelectA)

            btnDeps.disabled = false;
          },
          // -3-
          emptyOptionSelectorB = () => {
            let inputA = this.$selectA.parentElement.querySelector('.sumbiot-input-select'),
                inputB = this.$selectB.parentElement.querySelector('.sumbiot-input-select')

            inputB.value = inputA.value
          }

      // -1-
      btnDeps.disabled = true;

      this.$selectA.addEventListener('click', (e) => {
        let target = e.target;

        if (target && target.classList.contains(this.selectATriggerSelector.slice(1)) || target && target.parentElement.classList.contains(this.selectATriggerSelector.slice(1)) ) {
          e.preventDefault()

          if (target.parentElement.classList.contains(this.selectATriggerSelector.slice(1))){
            target = target.parentElement
          }

          workConfiguration(target)
        }
      })

      this.$selectB.addEventListener('click', (e) => {
        let target = e.target;

        if (target && target.classList.contains('js-dropdown__item-empty') || target && target.parentElement.classList.contains('js-dropdown__item-empty') ) {
          e.preventDefault()

          emptyOptionSelectorB()

        }
      })

    }
  }

}
