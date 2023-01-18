import './oldCode/scripts'

import DropdownSelect from './library/sumbiot/modules/dropdown/components/dropdownSelect';

import SearchInSelectPlugin from "./plugin/search-in-select.plugin";

import FormUsersStatisticsComponent from "./components/form-users-statistics.component";

$(function(){

  // выподающий список select
  new DropdownSelect('.dropdown--select',{
    dropdownToggleSelector: '.dropdown__toggle',
    dropdownOptionsWrapperSelector: '.dropdown--select .dropdown__options',
    dropdownOptionSelector: '.dropdown__item'
  })

  // выподающий список поиск
  new SearchInSelectPlugin('.js-option-panel','.dropdown__search-box')

  // компонент форма
  new FormUsersStatisticsComponent('#mainForm')

});


