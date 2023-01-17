import Component from "../core/component";
import ButtonExcelComponent from "./button-excel.component";

import ChainingSelectInFormPlugin from "../plugin/chaining-select-in-form.plugin";

import {optionSelectTemplate} from "../templates/optionSelect.template";

import VisitorPattern from "visitor.pattern";

/**
 *  Компонент добавить кастомного сотрудника #mainForm
 * */
export default class FormUsersStatisticsComponent extends Component {

  /**
   * Конструктор
   * @param {string} id         - находит компонент.
   * @param {Object=} options   - конфигурация.
   */
  constructor(id,options) {

    super(id,options);

    this.btns = this.$el.querySelectorAll('.searchButton')
  }

  /**
   * Интерфейс компонента
   * @return {void}
   */
  _init() {

    this.chainSelect = new ChainingSelectInFormPlugin(this.$el,
    {
      callAction: 'getDepartments'
    },
    {
      renderTemplate : optionSelectTemplate
    })

    this.chainSelect.accept(VisitorPattern.selectMod).upgrade()

    this._handlerEvent()
  }

  /**
   * Обработчик событий
   * @return {void}
   */
  _handlerEvent() {

    this.btns.forEach(btn => {

      btn.addEventListener('click', e => {
        e.preventDefault()

        new ButtonExcelComponent('#buttonExcelDownload', {
          create: 'button',
          formsData: new FormData(this.$el)
        })
      })
    })

  }

}

