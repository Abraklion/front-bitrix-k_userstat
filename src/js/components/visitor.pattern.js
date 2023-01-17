import Support from '../core/support'

/**
 *  Добавляет новую функциональность уже существующим классам, не изменяя исходный код класса
 * */
export default class VisitorPattern {

  /**
   * Посититель для экземпляра связаных выподающий списков
   * 1) блокикует кнопку если не выбран дивизион
   * 2) если выбран дивизион, в input отдела(выподающего списка В) записывается id дивизиона
   * @param {Object} instanceClass - экземпляр класса
   * @return {void}
   */
  static selectMod(instanceClass) {

    instanceClass.upgrade = function () {

      let btnDeps = document.querySelector('.js-btn-deps'),
          workConfiguration = (option) => {
            let idSelectA = option.dataset.selectOption,
                input = this.$selectB.parentElement.querySelector(this.resetParamsB.input)

            input.setAttribute('value', idSelectA)

            btnDeps.disabled = false;
          }

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

    }
  }

}
