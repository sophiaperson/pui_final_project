/* script.js */

function initializePopover() {
  $(document).ready(function(){
  $('[data-toggle="popover"]').popover();
  });
}

function dismissPopover() {
  $('.popover-dismiss').popover({
  trigger: 'focus'
  });
}

function handlePopover() {
  initializePopover()
  dismissPopover()
}

function onLoadHome() {

}

function onLoadProfile() {
  handlePopover()
}