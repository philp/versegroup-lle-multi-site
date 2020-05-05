$(function() {
  $('.smoothscroll').unbind('click').click(function() {
    let $a = $(this);
    let $w = $(window);
    let ahref = $a.attr('href');
    let targetid = ahref.substring(ahref.indexOf('#')+1, ahref.length);
    scrollToId(targetid);
  });
});

function scrollToId(targetid) {
  let targettop = $('#'+targetid).offset().top;
  $('html, body').animate({scrollTop:targettop},2000);
}