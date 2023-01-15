import DropdownSelect from './library/sumbiot/modules/dropdown/components/dropdownSelect';

import ChainingSelectInFormPlugin from "./plugin/chaining-select-in-form.plugin";

// import Visitor from "./components/visitor";
import SearchSelect from "./components/search-select";

import {optionSelectTemplate} from "./templates/optionSelect.template";

$(function(){
  // Адрес ссылки для AJAX
  let zeroLink = BX.message("ZEROLINK");

  // daterangepicker на поле с интервалом дат
  $('#dataSob').daterangepicker();

  // выподающий список select
  new DropdownSelect('.dropdown--select',{
    dropdownToggleSelector: '.dropdown__toggle',
    dropdownOptionsWrapperSelector: '.dropdown--select .dropdown__options',
    dropdownOptionSelector: '.dropdown__item'
  })

  // поиск по выпадающему списку
  new SearchSelect('.js-option-panel','.dropdown__search-box')

  // связываем выподающие списки Дивизион и Отдел
  new ChainingSelectInFormPlugin('#mainForm',
    {
      callAction: 'getDepartments'
    },
    {
      renderTemplate : optionSelectTemplate
  })

  $('#mainForm').on('click', '.searchButton', function(){
    let sData = $('#mainForm').serialize();
    sData += '&action=' + $(this).val();
    $.ajax({
      type: "POST",
      url: zeroLink,
      data: sData,
      success: function( res ){
        $('.data').remove();
        $( res ).insertAfter('#insertPlace');
      },
      error: function( res ){
        console.log('error get data from server');
      }
    });
  });

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


