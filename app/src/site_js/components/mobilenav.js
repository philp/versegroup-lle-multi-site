function mobileNav(mobileNavs){
  $(mobileNavs).each(function(i, a) {
    var $a = $(this);
    if($a.children('.menu-toggle').length === 0) {
      $a.prepend(`<div class="menu-toggle">
        <span class="menu-toggle__toggleholder">
          <span class="menu-toggle__line menu-toggle__line1"></span>
          <span class="menu-toggle__line menu-toggle__line2"></span>
          <span class="menu-toggle__line menu-toggle__line3"></span>
        </span>
        <span class="menu-toggle__text">Menu</span>
      </div>`);
      $a.children('.menu-toggle').off('click').click(mobileMenuDisplay).end().children('div:not(".menu-toggle")').find('.nomobilenav').parent('.selectcontainer').remove().end().remove().end().prepend($('.nomobilenav').clone(true, true).addClass('mobileonly'));
      
      $('.pageholder, .topsection, .endsection, .footer').off('click').click(function(){
        if($('.menu-toggle').hasClass('selected')){
          $('.menu-toggle').removeClass('selected').siblings('div').fadeOut(400);
        }
      });
      
    }
    if(!$a.children('.menu-toggle').hasClass('selected')) {
      $a.children('div:not(".menu-toggle")').hide();
    }			
        
          
    switch(this.id) {
      case 'nav':
        $a.find('.tog-menu').text('');
        break;
    }
  });
  
  
  
  
}


function mobileMenuDisplay(e) {
	let anbtn = $(this);
	if(anbtn.hasClass('selected')) {
		anbtn.removeClass('selected').siblings('div').fadeOut(400);
    $('body').css({'overflow':'auto', 'position':'static'});
	} else {
		anbtn.addClass('selected').siblings('div:not(.keephidden)').fadeIn(400);
    $('body').css({'overflow':'hidden', 'position':'fixed'});
	}
	e.stopPropagation();
	e.preventDefault();
}

function removeMobileNav(mobileNavs){
  $('.menu-toggle').remove();
  $(mobileNavs).children('div:not(".menu-toggle")').show();
}