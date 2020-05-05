$(function() {

	const prefixAnimationEvent = "webkitAnimationEnd oanimationend oAnimationEnd msAnimationEnd animationend";
	const prefixTransitionEvent = "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";
	const mobileswitchwidth = 975;
	const mobileNavs = '#nav, #smallnav';

	if($('#contactholder').length > 0 && document.getElementById("contactholder").hasAttribute('data-subject')){
		$('#contactholder').find(`select[name="subject"] option:contains(${$('#contactholder').data('subject')})`).prop({selected:true});
	}

	function windowResize() {
		/*
		if(window.matchMedia(`(max-width: ${mobileswitchwidth}px)`).matches){
			mobileNav(mobileNavs);
		} else {
			removeMobileNav(mobileNavs);
		}*/
		
		if($('.brochures__listarea--wcontainer').length > 0){
			$('.brochures__listarea--wcontainer').each(function(){
				let current = $(this);
				if(window.matchMedia('(max-width: 400px)').matches){
					current.find('.brochures__itemtext').removeAttr('style');
				} else if(window.matchMedia('(max-width: 750px)').matches){
					current.find('.brochures__itemtext').equalRowHeight({rowLength:2});
				} else {
					current.find('.brochures__itemtext').equalRowHeight({rowLength:4});	
				}
			});
		}
		
		if($('.pricetable__headings').length > 0){
			$('.pricetable__headings').each(function(){
				let current = $(this);
				
				if(current.find('.pricetable__mainheading').length > 0 && current.find('.pricetable__secondaryheading').length > 0){
					
					let mainHeading = current.find('.pricetable__mainheading');
					let secondaryHeading = current.find('.pricetable__secondaryheading');
					
					mainHeading.removeAttr('style');
					secondaryHeading.removeAttr('style');
					
					if(secondaryHeading.outerHeight() > mainHeading.outerHeight()){
						mainHeading.css({'height': secondaryHeading.outerHeight() + 'px'});
					} else {
						secondaryHeading.css({'height': mainHeading.outerHeight() + 'px'});
					}
				}
			});
		}
		
		if($('.freeformpanelarea .freeform-row').length > 0){
			$('.freeformpanelarea .freeform-row').each(function(){
				let current = $(this);
				if(current.children().length == 2){
					current.addClass('freeform-row--twocol');
				}
			});
		}
					
				
		if($('.propertydetail__linktext').length > 0) {
			$('.propertydetail__linktext').each(function(){
			let current = $(this);
			current.removeAttr('style');
			if(current.outerHeight() < 38){
				current.css({'height': 38 + 'px'});
				}
			});
		}

		if($('.mooringtable__contentrow').length > 0){
			$('.mooringtable__contentrow').each(function(){
				let thisRow = $(this);
				thisRow.find('.mooringtable__contentcell').removeAttr('style');
				thisRow.find('.mooringtable__contentcell').css({'height': thisRow.height() + 'px'});
			});
		}
		
		if($('.mooringtable__headingrow').length > 0){
			$('.mooringtable__headingrow').each(function(){
				let thisRow = $(this);
				thisRow.find('.mooringtable__headingcellinner').removeAttr('style');
				thisRow.find('.mooringtable__headingcellinner').css({'height': thisRow.height() + 'px'});
			});
		}
		
		if($('.mooringtable__midheadingrow').length > 0){
			$('.mooringtable__midheadingrow').each(function(){
				let thisRow = $(this);
				thisRow.find('.mooringtable__midheadingcell').removeAttr('style');
				thisRow.find('.mooringtable__midheadingcell').css({'height': thisRow.height() + 'px'});
			});
		}
		
		if($('.mappanel__headingbefore').length > 0){
			let leftSpace = $('.mappanel__heading').offset().left;
			$('.mappanel__headingbefore').css({'left': '-' + leftSpace + 'px', 'width': leftSpace + 'px'});
		}

		if($('.headerarea').length > 0){
			if($('.headerarea__background').length > 0 || $('.headerarea__galleryholder').length > 0){
				$('.headerarea').css({'min-height': $(window).height() + 'px'});
				setTimeout(function(){
					// slight pause
					if($('.headerarea__scrollholder').length > 0){
						$('.headerarea__scrollholder').addClass('headerarea__scrollholder--show');
					}
					if($('.headerarea__form').length > 0){
						$('.headerarea__form').addClass('headerarea__form--show');
					}
				},200);
			}			
		}
		
		if($('.salespanels__item').length > 0){
			if(!window.matchMedia(`(max-width: 600px)`).matches){
			$('.salespanels__item').equalRowHeight({rowLength:2});
			}
		}
		
		if($('.blogslist__itemcontent--equals').length > 0){
			$('.blogslist__itemcontent--equals').equalRowHeight({rowLength:2});
		}
		
		if($('.optionboxes__imgarea').length > 0){
			$('.optionboxes__imgarea').equalRowHeight();
		}
		
		if($('.properties__enditemimage').length > 0){
			$('.properties__enditemimage').css({'height': $('.properties__enditemcontent').outerHeight() + 'px'});
		}
		
		if($('.popup__back').length > 0 && $('.popup__back').is(':visible')){
			$('.popup__back').each(function(){
				let current = $(this);
				let thisPop = current.closest('.popup');
				let thisAreaHeight = thisPop.find('.popup__box').outerHeight() + parseInt(thisPop.css('padding-top')) + parseInt(thisPop.css('padding-bottom'));
				current.removeAttr('style');
				current.css({'height': thisAreaHeight  + 'px'});
			});
		}
		
		if($('.section__half--imgside').length > 0){
			$('.section__half--imgside').each(function(){
				let current = $(this);
				let thisContainer = current.closest('.container');
				if(current.hasClass('section__half--alignright')){
					// same level as content
					current.removeAttr('style');
					current.css({'min-height': thisContainer.find('.section__half--contentside').outerHeight() + 'px'});
				} else {
					current.removeAttr('style');
					current.css({'min-height': thisContainer.find('.section__half--contentside').outerHeight() + (parseInt(thisContainer.find('.section__half--contentside').css('margin-top')) - parseInt(current.css('margin-top'))) + 'px'});
				}
			});
		}
		
		if($('.popup__topexpand').length > 0 && $('.popup__aboveformheading').length > 0 && $('.popup__formexpandarea').length > 0){
			$('.popup').each(function(){
				let current = $(this);
				let topArea = false;
				let headingArea = false;
				let formArea = false;
				if(current.find('.popup__topexpand').length > 0){
					topArea = current.find('.popup__topexpand');
				}
				if(current.find('.popup__aboveformheading').length > 0){
					headingArea = current.find('.popup__aboveformheading');
				}
				if(current.find('.popup__formexpandarea').length > 0){
					formArea = current.find('.popup__formexpandarea');
				}
				if(topArea != false && headingArea != false && formArea != false){
					if(window.matchMedia(`(max-width: 400px)`).matches){
						if(!(headingArea.hasClass('popup__aboveformheading--formopen') || headingArea.hasClass('popup__aboveformheading--formclosed'))){
							headingArea.addClass('popup__aboveformheading--formclosed');
							formArea.slideUp().promise().done(function(){
								$(window).trigger('resize');
							});
						}
					} else {
						if(headingArea.hasClass('popup__aboveformheading--formopen') || headingArea.hasClass('popup__aboveformheading--formclosed')){
							topArea.removeAttr('style');
							formArea.removeAttr('style');
							current.find('.popup__content').removeClass('popup__content--notopspacing');
							headingArea.removeClass('popup__aboveformheading--formopen popup__aboveformheading--formclosed');
						}
					}
				}
			});
			
		}
		
		if($('.section__listingstopright').length > 0 && $('.section__listingstopleft').length > 0){
			if(($('.section__listingstopleft').width() + $('.section__listingstopright').width()) < $('.section__listingstopinner').width()){
				let listingsLeftHeight = $('.section__listingstopleft').height();
				let listingsRightHeight = $('.section__listingstopright').height();
				let listingsDiff = listingsLeftHeight - listingsRightHeight;
				if(listingsDiff > 0) {
					$('.section__listingstopright').css({'margin-top': listingsDiff + 'px'});
				}
			} else {
				$('.section__listingstopright').removeAttr('style');
			}
		}
		
		if($('.properties__itemimgsideinner').length > 0){
			$('.properties__itemimgsideinner').each(function(){
				let current = $(this);
				let thisItem = current.closest('.properties__item');
				let imgSide = thisItem.find('.properties__itemimgsideinner');
				let contentSide = thisItem.find('.properties__itemcontentside');
			
				imgSide.removeAttr('style');
				contentSide.removeAttr('style');
				
				if(!window.matchMedia(`(max-width: 700px)`).matches){
					
					let checkImg = setInterval(sideImgCheck,200);
					
					function sideImgCheck(){						
						if(thisItem.find('.properties__itemimg').height() > 0){
							clearInterval(checkImg);
							let thisImageHeight = thisItem.find('.properties__itemimg').height();
							let thisContentHeight = thisItem.find('.properties__itemcontentside').outerHeight();
											
							let imgTopMargin = (thisContentHeight - thisImageHeight) / 2;
							if(imgTopMargin > 0){
								imgSide.css({'margin-top': imgTopMargin + 'px'});
							} else {
								let contentTopMargin = (thisImageHeight - thisContentHeight) / 2;
								if(contentTopMargin > 0){
									contentSide.css({'margin-top': contentTopMargin + 'px'});
								}
							}	
						} 
					}
					
				}
			});
		}
		
		if($('.membership').length > 0){
			if(!window.matchMedia(`(max-width: 1100px)`).matches){
				$('.membership').each(function(){
					let current = $(this);
					let name = current.find('.membership__name');
					let options = current.find('.membership__options');
					let endText = current.find('.membership__enddetail');
					name.removeAttr('style');
					options.removeAttr('style');
					endText.removeAttr('style');
					let nameHeight = parseFloat(name.outerHeight());
					let optionsHeight = parseFloat(options.outerHeight());
					let endTextHeight = parseFloat(endText.outerHeight());
					
					if(nameHeight >= optionsHeight && nameHeight >= endTextHeight) {
						options.css({'height': nameHeight + 'px'});
						endText.css({'height': nameHeight + 'px'});
					} else if(optionsHeight >= nameHeight && optionsHeight >= endTextHeight) {
						name.css({'height': optionsHeight + 'px'});
						endText.css({'height': optionsHeight + 'px'});
					} else if(endTextHeight >= optionsHeight && endTextHeight >= nameHeight) {
						name.css({'height': endTextHeight + 'px'});
						options.css({'height': endTextHeight + 'px'});
					}
				});
			} else {
				$('.membership__name').removeAttr('style');
				$('.membership__enddetail').removeAttr('style');
				$('.membership__options').removeAttr('style');
			}
		}
		
		if($('.menutable__3colequaltitle').length > 0){
			$('.menutable__3colequaltitle').equalRowHeight({rowLength:3});
		}
		
		if($('.galleryarea__img').length > 0){
			let fifthWindowWidth = Math.ceil($(window).width() / 100 * 20);
			if($('.galleryarea__img--short').length > 0){
				$('.galleryarea__img--short').css({'height':fifthWindowWidth + 'px'});
			}
			if($('.galleryarea__img--tall').length > 0){
				$('.galleryarea__img--tall').css({'height':fifthWindowWidth * 2 + 'px'});
			}
		}
		
		if($('.events__itemimg').length > 0 && 	!window.matchMedia(`(max-width: 670px)`).matches){
			$('.events__itemimg').each(function(){
				let current = $(this);
				let thisHeight = current.next('.events__itemcontent').outerHeight();
				current.css({'height':thisHeight + 'px'});
			});
		}
		
		if($('.section__equalsides').length > 0){
			$('.section__equalsides').equalRowHeight({rowLength:2});
		}
		
		if($('.articles__item--equal').length > 0){
			$('.articles__item--equal').equalRowHeight({rowLength:2});
		}
		
		if($('.headerarea__scrollholder').length > 0 && $('.headerarea__form').length == 0){
			$('.headerarea__scrollholder').addClass('headerarea__scrollholder--noform'); 
		}
		
		if($('.headerarea__form').length > 0){
			var extraSpace = 0;
			if($('.headerarea__financeholder').length > 0){
				extraSpace = $('.headerarea__financeholder').outerHeight();
			}
			var announceSpace = 0;
			if($('.announcement').length > 0){
				announceSpace = $('.announcement').outerHeight();
			}
			var takenSpace = $(window).height() - ($('.headerarea__top').outerHeight() + $('.headerarea__scrollholder').outerHeight() + $('.headerarea__form').outerHeight() + announceSpace + extraSpace);
			if(takenSpace > 0){
				$('.headerarea__form').css({'margin-top': takenSpace  + 'px'});
			}
		}
		
		if($('.headerarea__financeholder').length > 0){
			if($('.headerarea__form').height() == 0){
				$('.headerarea__form').addClass('headerarea__form--none');
				var announceSpace = 0;
				if($('.announcement').length > 0){
					announceSpace = $('.announcement').outerHeight();
				}
				var takenSpace = $(window).height() - ($('.headerarea__top').outerHeight() + $('.headerarea__scrollholder').outerHeight() + $('.headerarea__financeholder').outerHeight() + announceSpace);
				$('.headerarea__financeholder').css({'margin-top': takenSpace + 'px'});
			} else {
				$('.headerarea__form').removeClass('headerarea__form--none');
				$('.headerarea__financeholder').removeAttr('style');
			}
		}
		
		scrollMarkers('.scrolldots__dot','scrolldots__dot--active','section');
		
		$('.socialfeeds__item').css({'min-height': $('.socialfeeds__item').width() + 'px'});
		
		$('.socialfeeds__itemcontent').equalRowHeight({rowLength:12});
		
		$('.socialfeeds__itemcaption').each(function(){
			var current = $(this);
			var panelWidth = current.outerWidth();
			var thisHeight = current.find('.socialfeeds__itemcaptioninner').height();
			var bottomSpace = $('.socialfeeds__itemtype').height() + (parseInt($('.socialfeeds__itemtype').css('bottom')) * 2);
			current.css({'padding-top': (panelWidth/2 - thisHeight/2) + 'px', 'padding-bottom': bottomSpace + 'px'});
		});
		
		
		if($('.menutable__title--right').length > 0){
			$('.menutable__title--right').each(function(){
				let current = $(this);
				let outerTable = current.closest('.menutable');
				let thisTable = outerTable.find('.menutable__table');
				let firstTdWidth = thisTable.find('td:first-child').outerWidth();
				let lastTdWidth = thisTable.find('td:last-child').outerWidth();
				let numRight = 1;
				let addExtra = 0;
				if(current.hasClass('menutable__title--rightthreecol')){
					numRight = 2;
				}
				if(current.hasClass('menutable__title--rightthreemid')){
					addExtra = 1;
				}
				current.css({'width': (((lastTdWidth + firstTdWidth) - firstTdWidth + (outerTable.outerWidth() - (lastTdWidth + firstTdWidth))) / numRight) + addExtra + 'px'});
				
		
			});
		}
		/*
		$('.menutable__title--right').css({'width': ($('.menutable__table td:last-child').outerWidth() + $('.menutable__table td:first-child').outerWidth()) - $('.menutable__table td:first-child').outerWidth() + ($('.menutable').outerWidth() - ($('.menutable__table td:last-child').outerWidth() + $('.menutable__table td:first-child').outerWidth())) + 'px'});
		*/
		if($('.imgopts__imgopt').length > 0){
			setTimeout(function(){
			$('.imgopts__imgopt').on('click',function(){
				var current = $(this);
				$('.imgopts__imgopt').removeClass('imgopts__imgopt--active');
				current.addClass('imgopts__imgopt--active');
				var img = current.find('img').attr('src');
				$('.headerarea__background').css({'background-image': 'url('+img+')'});
			});
			},300);
		}

	}
	
	if($('.freeformpanelarea .freeform-row .freeform-column select.freeform-input').length > 0){
		$('.freeformpanelarea .freeform-row .freeform-column select.freeform-input').wrap('<div class="freeformpanelarea__fieldholder freeformpanelarea__fieldholder--arrow"></div>');
	}
	
	if($('.freeformpanelarea .freeform-row .freeform-column .freeform-input.form-date-time-field').length > 0){
		$('.freeformpanelarea .freeform-row .freeform-column .freeform-input.form-date-time-field').wrap('<div class="freeformpanelarea__fieldholder freeformpanelarea__fieldholder--date"></div>');
	}
	
	if($('.popuplink').length > 0){
		$('.popuplink').click(function(e){
			e.preventDefault();
			let current = $(this);
			let thisPopup = current.data('popup');
			$(`.popup[data-popup="${thisPopup}"]`).fadeIn();
			$('body,html').css({'overflow':'hidden', /*'height':'100%', */'position':'relative'});
			$(window).trigger('resize');
			if(thisPopup == 'newsletter-signup'){
				$('#mce-EMAIL').val($('.newsletter__input').val());
			}
		});
		$('.popup__back, .popup__close').click(function(){
			$(this).closest('.popup').fadeOut();
			$('body,html').removeAttr('style');
		});
		if($('.freeform-form-has-errors').length > 0){
			$('.freeform-form-has-errors').closest('.popup').fadeIn();
			$('body,html').css({'overflow':'hidden', /*'height':'100%', */'position':'relative'});
			$(window).trigger('resize');
		}
	}

	if($('.popup__topexpand').length > 0 && $('.popup__aboveformheading').length > 0 && $('.popup__formexpandarea').length > 0){
		$('.popup__aboveformheading').click(function(){
			let thisHeading = $(this);
			if(window.matchMedia(`(max-width: 400px)`).matches){
				let thisPop = thisHeading.closest('.popup');
				if(thisPop.find('.popup__topexpand').length > 0 && thisPop.find('.popup__formexpandarea').length > 0){
					let thisTopArea = thisPop.find('.popup__topexpand');
					let thisFormArea = thisPop.find('.popup__formexpandarea');
					if(thisHeading.hasClass('popup__aboveformheading--formopen')){
						thisHeading.removeClass('popup__aboveformheading--formopen').addClass('popup__aboveformheading--formclosed');
						thisPop.find('.popup__content').removeClass('popup__content--notopspacing');
						thisTopArea.slideDown();
						thisFormArea.slideUp().promise().done(function(){
							$(window).trigger('resize');
						});;
					} else if(thisHeading.hasClass('popup__aboveformheading--formclosed')) {
						thisHeading.addClass('popup__aboveformheading--formopen').removeClass('popup__aboveformheading--formclosed');
						thisPop.find('.popup__content').addClass('popup__content--notopspacing');
						thisFormArea.slideDown();
						thisTopArea.slideUp().promise().done(function(){
							$(window).trigger('resize');
						});;
					}				
				}
			}			
		});
	}

	validateContactForm('.contact__form');

	if($('.articles__details').length > 0){
		$('.articles__item').hover(function(){
			let current = $(this).find('.articles__details');
			current.css({'visibility':'visible'});
			setTimeout(function(){
				current.css({'opacity':1});
			},50);
		}, function(){
			let current = $(this).find('.articles__details');
			current.css({'opacity':0});
			setTimeout(function(){
				current.css({'visibility':'hidden'});
			},350);
		});
	}

	if($('.faqs__answer').length > 0){
		$('.faqs__answer').hide();
		$('.faqs__question').click(function(){
			let current = $(this);
			if(current.hasClass('faqs__question--active')){
				current.removeClass('faqs__question--active');
				current.next().slideUp();
			} else {
				current.addClass('faqs__question--active');
				current.next().slideDown();
			}
		});
	}

	$('.mobiletopsearch__btn').on('click',function(){
				var current = $(this);
				var content = current.next();
				content.slideDown();
				current.fadeOut();
	});
	
	/*
	$('.fader').each(function() {
		var f = $(this);
		if(f.data('url')) {
			var furl = f.data('url');
			if(furl.indexOf('.xml') > -1) {
				loadSlideshowGalleryXml(f,furl,function() {
					f.imageGallery();
				});
			} else {
				f.load(f.data('url'), function() {
					f.imageGallery();
				});
			}
		} else {
			f.imageGallery();
		}
	});
	*/
	
	

	mobileNav(mobileNavs);

	overlapColour($('.section--white'), $('.scrolldots__dot'), 'scrolldots__dot--grey');
	
	$(window).scroll(function(){
		
		overlapColour($('.section--white'), $('.scrolldots__dot'), 'scrolldots__dot--grey');

		scrollMarkers('.scrolldots__dot','scrolldots__dot--active','section');
		
	});


	if($('.endgallery__opts').length > 0){
		$('.endgallery__opts').slick({
			dots:false,
			infinite: false,
			slidesToShow:6,
			slidesToScroll:1,
			arrows:false,
			asNavFor: '.endgallery__lrgopts',
			focusOnSelect: true,
			responsive: [
				{
					breakpoint: 1550,
					settings: {
						slidesToShow: 5,
					}
				},
				{
					breakpoint: 1150,
					settings: {
						slidesToShow: 4,
					}
				},
				{
					breakpoint: 930,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 730,
					settings: {
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 601,
					settings: {
						slidesToShow: 3,
					}
				}
			]
		});
		$('.endgallery__lrgopts').slick({
			dots:false,
			infinite: false,
			slidesToShow:1,
			slidesToScroll:1,
			arrows:true,
			focusOnSelect: true,
			asNavFor: '.endgallery__opts'
		});
	}

	if($('.scrollproperties__scroll').length > 0){
		$('.scrollproperties__scroll').slick({
			infinite: true,
		  slidesToShow: 3,
		  slidesToScroll: 3,
			dots:true,
			arrows:true,
			responsive: [
				{
					breakpoint: 851,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					}
				}, 
				{
					breakpoint: 601,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
				}				
			]
		});
	}

	if($('.imgopts').length > 0){
		
		$('.imgopts__inner').slick({
			dots:false,
			infinite: false,
			slidesToShow:6,
			slidesToScroll:2,
			arrows:false,
			responsive: [
				{
					breakpoint: 900,
					settings: {
						slidesToShow: 5,
					}
				},
				{
					breakpoint: 760,
					settings: {
						slidesToShow: 4,
					}
				},
				{
					breakpoint: 550,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 400,
					settings: {
						slidesToShow: 2,
					}
				}
			]
		});
		
		
		var galleryLoadClick = setInterval(function(){
			if($('.headerarea__background').css('background-image') == 'none'){
				if($('.imgopts__imgopt').length > 0){
					if($('.headerarea__background').css('background-image') == 'none'){
						$('.slick-slide:first-child .imgopts__imgopt').click();
					}	
				}
			} else {
				clearInterval(galleryLoadClick);				
			}
		},200);
	}

	if($('#socialfeedtemplate').length > 0) {
		let thisSite = $('#socialfeed').data('site');
		$.getJSON('assets/js/'+ thisSite +'/socialwall.php',function(data) {
			var feedtemplate = $('#socialfeedtemplate')[0].innerHTML;
			var feedhtml = '';

			var imgs = [];
			var imgscount = data.length;
			var imgsloadedcount = 0;

			for(var n in data) {
				var img = new Image();
				img.onload = function() {
					imgsloadedcount++;
					if(imgsloadedcount == imgscount) {
						$(window).resize();
					}
				}

				img.src = data[n].url;
				feedhtml += applyTemplate(feedtemplate,data[n]);
			}
			$('#socialfeed').html(feedhtml);
		}).done(function( json ) {
    	$(window).trigger('resize');
			if($('.socialfeeds__item').length < 8){
				$('.socialfeeds__info').addClass('socialfeeds__info--static');
			}
  	}).fail(function( jqxhr, textStatus, error ) {
	    var err = textStatus + ", " + error;
	    console.log( "Request Failed: " + err );
			$('.socialfeeds__info').addClass('socialfeeds__info--static');
		});
	}

	//$(window).resize(throttle(windowResize,100));

	
	$(".swipebox").swipebox({ selector: '.swipebox' });

	$(window).resize(windowResize);

	$(window).on('load', function() {
	    $(window).trigger('resize');
	});

});


function scrollMarkers(dotClass,activeClass,dataName){
	
	var ids = [];
	//get ids
	$(dotClass).each(function(){
		var current = $(this);
		var thisId = current.data(dataName);
		ids.push(thisId);
	});	

	var sections = [];
	//get location of each section
	for(var i = 0; i < ids.length; i++) {
		var thisSection = $('#' + ids[i]);
		var thisId = ids[i];
		if(thisSection.height() > 0){
			var top = thisSection.offset().top;
			var end = thisSection.offset().top + thisSection.outerHeight();
			sections.push([top,end,thisId]);
		}
	}
	
	// scroll location
	var screenTop = $(window).scrollTop();
	var screenBottom = $(window).scrollTop() + $(window).height();
	
	var visibleEls = [];
	// which sections are visible currently?
	for(var i = 0; i < sections.length; i++) {
		var top = sections[i][0];
		var bottom = sections[i][1];
		
		var topBeforeScreenTop = false;
		var bottomBeforeScreenTop = false;
		
		var topAfterScreenBottom = false;
		var bottomAfterScreenBottom = false; 
		
		var topOnScreen = false;
		var bottomOnScreen = false;
		
		var withinBoundaries = false;
		var middleVisible = false;
		var topBeforeBottomOn = false;
		var topOnBottomAfter = false;
		var offScreen = false;
		
		var pixels = 0;
		
		// boundary locations
		if(top < screenTop){
			topBeforeScreenTop = true;
		} else if(top > screenBottom) {
			topAfterScreenBottom = true;
		} else {
			topOnScreen = true;
		}
		if(bottom < screenTop){
			bottomBeforeScreenTop = true;
		} else if(bottom > screenBottom){
			bottomAfterScreenBottom = true;
		} else {
			bottomOnScreen = true;
		}
		// section location
		if(topOnScreen && bottomOnScreen){
			withinBoundaries = true;
		} else if(topBeforeScreenTop && bottomAfterScreenBottom){
			middleVisible = true;
		} else if(topBeforeScreenTop && bottomOnScreen){
			topBeforeBottomOn = true;
		} else if(topOnScreen && bottomAfterScreenBottom){
			topOnBottomAfter = true;
		} else {
			offScreen = true;
		}
		
		// pixels visible
		if(withinBoundaries){
			pixels = bottom - top;
		} else if(middleVisible){
			pixels = screenBottom - screenTop;
		} else if(topBeforeBottomOn){
			pixels = bottom - screenTop;
		} else if(topOnBottomAfter){
			pixels = screenBottom - top;
		}
		// set array with all visible elements 
		if(!offScreen){
			var thisId = sections[i][2];
			visibleEls.push([thisId,pixels]);
		}		
	}
	
	var currentTallest = 0;
	var tallestId;
	// find tallest
	for(var i = 0; i < visibleEls.length; i++){
		var id = visibleEls[i][0];
		var pixels = visibleEls[i][1];
		if(pixels > currentTallest){
			currentTallest = pixels;
			tallestId = id;
		}
		
	}
	
	// set active dot
	$(dotClass).removeClass(activeClass);
	$(dotClass + '[data-'+ dataName +'='+ tallestId +']').addClass(activeClass);
	
}


function overlapColour(overlappedEl, movingEl, newColourClass){
	var whiteAreas = [];
	overlappedEl.each(function(){
		var top = $(this).offset().top;
		var end = $(this).offset().top + $(this).outerHeight();
		whiteAreas.push([top,end]);
	});
	
	movingEl.each(function(){
		var current = $(this);
		var thisTop = current.offset().top;
		var currentHeight = current.outerHeight();
		var overlapping = false;
		for(var i = 0; i < whiteAreas.length; i++) {
			var top = whiteAreas[i][0];
			var end = whiteAreas[i][1];
			if(thisTop > top && (thisTop + currentHeight) < end){
				overlapping = true;
				current.addClass(newColourClass);
			}
		}
		if (overlapping === false){
			current.removeClass(newColourClass);
		}
	});
}


/* Twitter Feed */
var Twitter = {};

Twitter.getUserTimeline = function(screenName, callback){
    var url = "/assets/js/gettweets.php?screen_name=" + encodeURIComponent(screenName);
    $.getJSON(url, callback);
};

var shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function shortMonthIndex(monthText) {
   var myIndex;
   $.each(shortMonths,function(i,a) {
		if(a == monthText) {
			myIndex = i;
		}
   });
   return myIndex;
}
function showTweets(screenName, selector){
    Twitter.getUserTimeline(screenName, function(timeline){
		var index = 0; 
        var nextTimeout;
		var $d = $(document.createElement("div"));
		$(selector).empty();
        $(selector).append($d).append('<div class="controls"><a class="nextTweet"></a><a class="prevTweet"></a></div>');
		
		$(selector).children('.controls').children('.nextTweet').click(function() { update(); }).end().children('.prevTweet').click(function() {
			index -= 4; 
			if(index < 0) {
				index += timeline.length; 
			}
			update();
		});
		
        function update() {
            $d.fadeOut(500, function(){
                if(timeline) {
					var tweet = timeline[index = (index + 1) % timeline.length];
					
					$d.empty().append(returnTweetContent(tweet));
					
					var sectweet = timeline[index = (index + 1) % timeline.length];
					$d.append(returnTweetContent(sectweet));
					
					$d.fadeIn(500, schedNextUpdate);
					
				}
			});
        }
		
		function returnTweetContent(tweet) {
			var a = document.createElement("a");
			a.href = "https://twitter.com/#!/" + screenName + "/status/" + tweet.id_str;
			
			var now = new Date();
			var v= tweet.created_at.split(/\s+/); 
			var created = new Date(Date.parse(v[1]+" "+v[2]+", "+v[5]+" "+v[3]+" UTC"));
			var e = (now.getTime() - created.getTime()) / 1000;
			var f;
			if(e<60)
				{f=e+" seconds ago"}
			else if(e<120)
				{f="a minute ago"}
			else if(e<45*60)
				{f=parseInt(e/60,10).toString()+" minutes ago"}
			else if(e<2*60*60)
				{f="an hour ago"}
			else if(e<24*60*60)
				{f=""+parseInt(e/3600,10).toString()+" hours ago"}
			else if(e<48*60*60){f="a day ago"}
			else{f=parseInt(e/86400,10).toString()+" days ago"}
			a.href = "https://twitter.com/#!/" + screenName + "/status/" + tweet.id_str;
			$(a).append('<span class="colour">' + screenName + '</span> ' + tweet.text);
			
			setTimeout(function() {
				var $a = $(a);
				$a.attr('target','_blank');
			});
			tdiv = $('<div class="tweet"></div>').append(a);
			return tdiv;
		}
        
        function schedNextUpdate(){
			if(nextTimeout) {
				clearTimeout(nextTimeout);
			}
            nextTimeout = setTimeout(update, 10000);
        }
        
        update();
			
	});
}

var timeouts = [];
function slideRender(slide) {
	var inttime = 2000;
	for(var i = 0; i < timeouts.length; i++) {
		if(timeouts[i]) {
			clearTimeout(timeouts[i]);
		}
	}
	timeouts = [];
	slide.siblings().find('.galleryText').find(':not(:has(*))').hide();
}


/* Gallery XML */
function loadSlideshowGalleryXml(slideshow, url, callback) {
	$('#headerplaceholder').remove();
	callback = callback || $.noop;
	var first = true;
	$.get(url, function(data){
		var dir = url.match(/(.*)\/.*$/)[1];

		var gal = $("document > gallery", data);
		var itemwidth = gal.attr('width');
		var itemheight = gal.attr('height');

		slideshow.html('');
		$("document > gallery > photo", data).each(function(){
			var caption = this.getAttribute("caption");
			if(!caption){
				caption = "";
			} else {
				if(caption.indexOf('"bottom"') > -1) {
					caption = '<div class="galleryText bottom"><div class="holder"><div class="back">' +caption + '</div></div></div>';
				} else {
					caption = '<div class="galleryText"><div class="holder"><div class="back">' +caption + '</div></div></div>';
				}
			}
			if(this.getAttribute("href")) {
				slideshow.append('<div class="galleryItem" style="background-image:url('+dir+'/'+this.getAttribute("src")+')"><div class="imgholder"><a href="'+this.getAttribute("href")+'"><img class="img" src="'+dir+'/'+this.getAttribute("src")+'" alt="" /></a></div>'+caption+'</div>');
			} else {
				slideshow.append('<div class="galleryItem" style="background-image:url('+dir+'/'+this.getAttribute("src")+')"><div class="imgholder"><img class="img" src="'+dir+'/'+this.getAttribute("src")+'" alt="" width="'+itemwidth+'" height="'+itemheight+'" /></div>'+caption+'</div>');
			}
		});
		callback();
	});
}

function applyTemplate(temp, data) {
	var newText = temp;
	for(var nme in data) {
		var newtext = data[nme] || "";
		if(typeof newtext == 'function') {
			newtext = '';
		}
		newText = newText.replace(new RegExp('{{'+nme+'}}','g'), newtext);
	}
	return newText;
}

(function($) {

$.fn.selectBox = function(options) {
	var defaults = {
		nooptsText:'Any',
		includeLabel:false,
        setWidth:false
	}
	var o = $.extend(defaults, options);

	return this.each(function() {
		if(this.nodeName == 'SELECT') {
			var s = this;
			var $s = $(s);
			var label = $('label[for="' + s.id +'"]');
			var labeltext = "";
			if(label.length > 0) {
				if(o.includeLabel) {
					label.hide();
				}
				labeltext = label.html();
			}
			var highlighted = 0;
			if($.inArray($s.parent().css('position'),['relative','absolute'])) {
				$s.wrap('<span class="selectcontainer"></span>');
			}
			$s.next('.selectLabel').remove();
			$s.next('.selectOpts').remove();
			var charmem = '';

			var l = $('<div class="selectLabel"><a class="back" href="javascript:;"><span class="icon"></span></a></div>');
			var la = l.children('a').bind('keydown',function(e) {
				switch(e.keyCode) {
					case 32:
					case 38:
					case 40:
						$(this).blur().parent().click();
						return false;
						break;
				}
			});
			var cssopts = { display:$s.css('display') };

			l.css(cssopts);
			var d = $('<div class="selectOpts"><div class="optcontainer"></div></div>');
			d.hide();
			var oc = d.children().css({position:'relative'});

			$(window).resize(function() {
				$s.show();
				if($s.outerWidth() > 10 && o.setWidth) {
					l.css({width:$s.outerWidth()});
				}
				$s.hide();
			}).resize();

			function showDrop(e) {
				d.stop(true,true).slideDown();
				$('html').click().click(hideDrop).bind('keydown',keyActions);
				e.stopPropagation();
                l.addClass('active');
				la.blur();
			}
			function hideDrop() {
				$('html').unbind('click',hideDrop).unbind('keydown',keyActions);
				d.stop(true,true).slideUp();
				charmem = "";
                l.removeClass('active');
				la.focus();
			}

			function ensureonscreen(hov) {
				var hovpos = hov.position();
				if(hovpos.top + hov.outerHeight() > d.scrollTop() + d.height()) {
					d.scrollTop(hovpos.top + hov.outerHeight() - d.height());
				} else if(hovpos.top < d.scrollTop()) {
					d.scrollTop(hovpos.top);
				}
				var hovpos = hov.offset();
				if(hovpos.top + hov.outerHeight() > $('body').scrollTop() + $(window).height()) {
					$('html,body').scrollTop(hovpos.top + hov.outerHeight() - $(window).height());
				} else if(hovpos.top < $('body').scrollTop()) {
					$('html,body').scrollTop(hovpos.top);
				}
			}

			function keyActions(e) {
				var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
				switch(charCode) {
					case 38:
						highlighted--;
						if(highlighted < 0) {
							highlighted += oc.children().length;
						}
						var hov = oc.children().removeClass('hovered').filter(':eq('+highlighted+')').addClass('hovered');
						ensureonscreen(hov);
						break;
					case 40:
						highlighted++;
						if(highlighted >= oc.children().length) {
							highlighted -= oc.children().length;
						}
						var hov = oc.children().removeClass('hovered').filter(':eq('+highlighted+')').addClass('hovered');
						var hovpos = hov.position();
						ensureonscreen(hov);
						break;
					case 13:
						if(multi) {
							hideDrop();
						} else {
							oc.children(':eq('+highlighted+')').click();
						}
						break;
					case 32:
						oc.children(':eq('+highlighted+')').click();
						break;
				}
				if(charCode >= 65 && charCode <= 90) {
					var charregex = new RegExp("^" +  charmem + String.fromCharCode(charCode),"i");
					var hov = oc.children().filter(function() {
						var c = this.textContent || this.innerText;
						return charregex.test(c);
					}).first();
					charmem += String.fromCharCode(charCode);
					if(hov.length == 0) {
						var first = true;
						while(hov.length == 0 && charCode >= 65) {
							charmem = "";
							var hov = oc.children().filter(function() {
								var c = this.textContent || this.innerText;
								return c.indexOf(String.fromCharCode(charCode)) === 0;
							});
							if(first) {
								hov = hov.first();
								charmem = String.fromCharCode(charCode);
							} else {
								hov = hov.last();
							}
							first = false;
							charCode--;
						}
					}
					if(hov.length > 0) {
						oc.children().removeClass('hovered');
						hov.addClass('hovered');
						highlighted = hov.index();
						ensureonscreen(hov);
					}
				}
				return false
			}

			function populateLabel() {
				l.children().html('');
				$s.find('option').each(function(i) {
					var opt = this
					var itemText = $(opt).html();
                    if($(opt).data('image')) {
                        itemText = '<img src="'+$(opt).data('image')+'" alt="'+itemText+'" />' + itemText;
                    }
					if(opt.selected) {
						if(multi) {
							if(l.children().text() != "") {
								l.children().append(', ');
							}
							l.children().append('<span class="selectedLabel"><span class="icon"></span>' + itemText + '</span>');
						} else {
							highlighted = i;
							l.children().html('<span class="icon"></span>' + itemText);
						}
					}
				});
				if(l.children().text() == '') {
					l.children().html(o.nooptsText);
				}
				if(o.includeLabel) {
					l.children().prepend('<strong>' + labeltext + '</strong> ');
				}
			}

			l.click(function(e) {
				if(d.filter(":visible").length == 0) {
					showDrop(e);
				}
			})
			var multi = s.multiple;
			$s.find('option').each(function() {
				var opt = this
				var itemText = $(opt).html();
                if($(opt).data('image')) {
                    itemText = '<img src="'+$(opt).data('image')+'" alt="'+itemText+'" />' + itemText;
                }
				var $opt = $('<div class="opt">'+itemText+'</div>');
				if(opt.selected) {
					$opt.addClass('selected');
				}

				$opt.click(function optionClicked(e) {
					if(multi) {
						opt.selected = !opt.selected;
						if(opt.selected) {
							$opt.addClass('selected');
						} else {
							$opt.removeClass('selected');
						}
					} else {
						opt.selected = true;
						$opt.addClass('selected').siblings().removeClass('selected');
					}
					$s.change();
					if(!multi) {
						hideDrop();
					}
					populateLabel();
					e.stopPropagation();
				});
				oc.append($opt);
			})
			populateLabel();
			$s.after(d).after(l).hide();

		}
	});
};
}) ($);

