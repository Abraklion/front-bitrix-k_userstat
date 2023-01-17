import './oldCode/scripts'

import DropdownSelect from './library/sumbiot/modules/dropdown/components/dropdownSelect';

import SearchInSelectPlugin from "./plugin/search-in-select.plugin";

$(function(){

  // выподающий список select
  new DropdownSelect('.dropdown--select',{
    dropdownToggleSelector: '.dropdown__toggle',
    dropdownOptionsWrapperSelector: '.dropdown--select .dropdown__options',
    dropdownOptionSelector: '.dropdown__item'
  })

  // выподающий список поиск
  new SearchInSelectPlugin('.js-option-panel','.dropdown__search-box')


  $('.js-btn-xl').on('click', async function(e) {
    e.preventDefault()

    let formData = new FormData()

    formData.append('build', this.dataset.build)
    formData.append('id', this.dataset.id)
    formData.append('dataSob', this.dataset.sob)

    console.log(this.dataset.build,this.dataset.id, this.dataset.sob)

    let path = await getPathToFile(formData)

    console.log(path)

    downloadLink(path)
  })

  async function getPathToFile(data) {
    // делаем ajax запрос в компонент bizproc:otipb.new к методу getUsersAction()
    const response = await BX.ajax.runComponentAction('bizproc:k_userstat', 'getPathToFile', {
      mode: 'class',
      data: data
    })

    return response.data.result
  }

  function downloadLink(path) {
    /**
     * скачивает файлы
     * path -> путь к файлу
     */
    const element = document.createElement('a');

    element.setAttribute('href', path);
    element.setAttribute('download', '');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

});


