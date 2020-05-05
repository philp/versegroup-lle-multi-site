(function($) {

$.fn.infiniteScroll = function(options) {
	var defaults = {
		slideSpeed:500,
		autoplay:false,
		autoplaySpeed:5000,
		scrollVisible:true,
		resizeLimit:1150,
        fitSlideCount:false
		//slideCount:3
		//width:,
		//height:,
	}
	var o = $.extend(defaults, options);
	
	return this.each(function() {
		var sd, sc, totalChildren;
		var item = $(this);
		var myChildren = item.children();
		var slideInterval;
		var currentItem = 0;
		var totalWidth = 0;
		var childWidthExtras = 0;
		var tstartX, tstartY, tX, tY;
		
		if(!o.width) {
			o.width = item.width();
		}
		
		function resetSizes() {	
			childrenItems = item.find('.sliderContainer').children();
			childrenItems.css({'max-width':'','width':'','-webkit-transition-duration':'0s','-moz-transition-duration':'0s','transition-duration':'0s','-ms-transition-duration':'0s'});
			
            if(o.fitSlideCount && sd && sd.children('.sliderContainer').length == 3) {
                sc.children().css('width','');
                var targetwidth = Math.floor(item.outerWidth()/sc.children().outerWidth());
                var paddingpx = Number(sc.children().css('padding-left').replace('px','')) + Number(sc.children().css('padding-right').replace('px',''));
                sd.children().children().css('width', (item.outerWidth()/targetwidth) - paddingpx);
            }
            
			updateSizes();
			totalChildren = myChildren.length;
			totalWidth = o.childrenWidth;
						
			if(!o.height) {
				o.height = 0;
				myChildren.each(function() {
					o.height = Math.max ($(this).height(), o.height);
				});
			}
			childrenItems.css({'-webkit-transition-duration':'','-moz-transition-duration':'','transition-duration':'','-ms-transition-duration':''});
		}
		function updateSizes() {
			o.childWidth = 0;
			o.childHeight = 0;
			o.childrenWidth = 0;
            
			item.find('.sliderContainer').children().each(function() {
				var cItem = $(this);
				if(cItem.outerWidth(true) < o.resizeLimit && cItem.outerWidth(true) < item.width()) {
                    o.childrenWidth += cItem.outerWidth(true);
				} else {
					cItem.css('max-width',(Math.min(o.resizeLimit, item.width()) - cItem.css('padding-left').replace('px','') - cItem.css('padding-right').replace('px','')));
					o.childrenWidth += cItem.outerWidth(true);
				}
				o.childWidth = Math.max(cItem.outerWidth(true), o.childWidth);
				o.childHeight = Math.max(cItem.outerHeight(true), o.childHeight);
				childWidthExtras = cItem.outerWidth(true) - cItem.innerWidth();
			});
		}
		
		resetSizes();
		
        if(item.find('img').length > 0) {
            var imglength = item.find('img').length;
            var loadcount = 0;
            item.find('img').each(function() {
                var img = new Image();
                img.onload = function() {
                    loadcount++;
                    if(loadcount == imglength) {
                        resetSizes();
                        activateSlider();
                    }
                };
                img.src = this.src;
            });
        } else {
            activateSlider();
        }
		
		function activateSlider() {
			item.children().wrapAll('<div class="sliderDiv"><div class="sliderContainer" /></div>');
			if(o.buttonholder) {
				$(o.buttonholder).append('<div class="leftarrow"><span></span></div><div class="rightarrow"><span></span></div>');
				sd = item.children('.sliderDiv');
			} else {
				sd = item.prepend('<div class="leftarrow"><span></span></div><div class="rightarrow"><span></span></div>').children('.sliderDiv');
			}
			sc = sd.css({
				width:o.width,
				height:o.height,
				overflow:"hidden",
				position:"relative",
				'text-align':"left"
			}).children().css('position','absolute').end().children('.sliderContainer');
			
			resetSizes();
			
			sc.css('width',o.childrenWidth);
			sd.append(sc.clone(true).css('left',o.childrenWidth)).append(sc.clone(true).css('left',-o.childrenWidth));
			
			var slb, srb;
			if(o.buttonholder) {
				slb = $(o.buttonholder).children('.leftarrow');
				srb = $(o.buttonholder).children('.rightarrow');
			} else {
				slb = item.children('.leftarrow');
				srb = item.children('.rightarrow');
			}
			slb.click(function(e) {
				if(slideInterval) {
					clearInterval(slideInterval);
				}
				sliderLeft();
                e.stopPropagation();
				e.preventDefault();
			});
			srb.click(function(e) {
				if(slideInterval) {
					clearInterval(slideInterval);
				}
				sliderRight();
                e.stopPropagation();
				e.preventDefault();
			});
			
			item.bind('touchstart', function(e) {
				var touch = e.originalEvent.touch || e.originalEvent.touches[0];
				tstartX = touch.pageX;
				tstartY = touch.pageY;
			}).bind('touchmove', function(e) {
				var touch = e.originalEvent.touch || e.originalEvent.touches[0];
				tX = touch.pageX;
				tY = touch.pageY;
				
				if(tX < tstartX - 10 || tX > tstartX + 10) {
					e.preventDefault();
				}
				e.stopPropagation();
			}).bind('touchend', function(e) {
				if(tstartX && tX) {
					if(tX < tstartX - 20 || tX > tstartX + 20) {
						var origTrans = o.transition;
						if(tX < tstartX - 20) {
							o.transition = "right";
							if(slideInterval) {
								clearInterval(slideInterval);
							}
							sliderRight();
						}
						if(tX > tstartX + 20) {
							o.transition = "left";
							if(slideInterval) {
								clearInterval(slideInterval);
							}
							sliderLeft();
						}
						o.transition = origTrans;
						e.stopPropagation();
					}
					tstartX = tstartY = tX = tY = false;
				}
			});
			
			if(o.autoplay) {
				if(slideInterval) {
					clearInterval(slideInterval);
				}
				slideInterval = setInterval(function() {
					sliderRight();
				},o.autoplaySpeed);
			}
			
			sd.children('.sliderContainer').children(':eq('+currentItem+')').removeClass('noanim').addClass('activeslide');
			
            sd.children('.sliderContainer').children().click(function(e) {
                var ti = $(this);
                var ai = sd.find('.activeslide');
                if(!ti.hasClass('notclicked')) {
                    sd.addClass('clicked');
                    if(ti[0].nodeName == "A" && !ti.hasClass('activeslide') && !ti.hasClass('active')) {
                        var steps = ti.index() - ai.index();
                        if(ai.offset().left < ti.offset().left) {
                            if(steps < 0) {
                                steps += sd.children('.sliderContainer:eq(0)').children().length;
                            }
                            sliderRight(steps);
                        } else {
                            if(steps > 0) {
                                steps -= sd.children('.sliderContainer:eq(0)').children().length;
                            }
                            sliderLeft(-steps);
                        }
                    }
                    e.stopPropagation();
                    e.preventDefault();
                }
            }).find('a').click(function(e) {
                e.stopPropagation();
            });
            
			$(window).bind('load resize', resizeAndPosition).resize();
		}
		
		function resizeAndPosition(e,oldactive) {
			item.find('.sliderDiv').css({width:item.width()});
			sc.children().addClass('noanim');
			
            
			resetSizes();
			
			var as = item.find('.activeslide');
			var fc = as.parent();
            
			var targetleft = -as.position().left; 
            if(o.centerFirst) {
                targetleft = (item.width()/2) - (as.outerWidth()/2) - as.position().left;
            }
			if(oldactive) {
				targetleft = fc.position().left;
			}
			var fcchildwidth = 0;
			fc.children().each(function() {
				fcchildwidth += Math.ceil($(this).outerWidth(true));
			}).end().css({'width':fcchildwidth+1, 'left':targetleft});
			
			var nextfc = fc.next();
			var nextfcchildwidth = 0;
			if(nextfc.length == 0) {
				nextfc = fc.siblings().first();
			}
			nextfc.children().each(function() {
				nextfcchildwidth += Math.ceil($(this).outerWidth(true));
			}).end().css({'width':nextfcchildwidth+1,'left':targetleft + fcchildwidth});
			var prevfc = nextfc.next();
			if(prevfc.length == 0) {
				prevfc = nextfc.siblings().first();
			}
			var prevfcchildwidth = 0;
			prevfc.children().each(function() {
				prevfcchildwidth += Math.ceil($(this).outerWidth(true));
			}).end().css({'width':prevfcchildwidth+1,'left':targetleft - prevfcchildwidth});
			item.find('.sliderDiv').css('height',o.childHeight);
			
		}
		
		function sliderLeft(steps) {
            if(typeof steps != "number") {
                if(o.scrollVisible) {
                    var stepCount = 0;
                    var limitReached = false;
                    var lastItem = sd.children('.sliderContainer').children('.activeslide').first();;
                    var stepWidth = 0;
                    while(!limitReached) {
                        var nextItem = lastItem.prev();
                        if(nextItem.length == 0) {
                            nextItem = lastItem.siblings().last();
                        }
                        if(stepWidth + nextItem.outerWidth() <= sd.width()) {
                            stepWidth += nextItem.outerWidth(true);
                            stepCount++;
                            lastItem = nextItem;
                        } else {
                            limitReached = true;
                        }
                    }
                    steps = stepCount;
                } else {
                    steps = 1;
                }
            }
			o.width = item.width();
			var slideDist = 0;
			var oas = sd.children('.sliderContainer').children('.activeslide').first();
			var oldwidth = oas.outerWidth();
			var pos = oas.position();
			var limited = true;
			if(oas.outerWidth() > 0) {
				
				if(sd.children('.sliderContainer:animated').length == 0) {
					currentItem-=steps;
					while(currentItem < 0) {
						currentItem	+= totalChildren;
					}
                    
                    var as;
					if(currentItem > oas.index()) { 
						if(oas.parent().prev('.sliderContainer').length > 0) {
							as = oas.removeClass('activeslide').parent().prev('.sliderContainer').css('width','').children(':eq('+currentItem+')').addClass('activeslide');
						} else {
							as = oas.removeClass('activeslide').parent().parent().children('.sliderContainer').last().css('width','').children(':eq('+currentItem+')').addClass('activeslide');
						}
					} else {
						as = oas.removeClass('activeslide').parent().children(':eq('+currentItem+')').addClass('activeslide');
					}
                    as.parent().addClass('activeslider').siblings().removeClass('activeslider');
                    
					resizeAndPosition({},true);
					var masterslider = as.parent();
					var msleft = masterslider.position().left;
					
					updateSizes();
                    
					var slideDist = as.offset().left - sd.offset().left;
                    if(o.centerFirst) { 
                        slideDist = as.offset().left - ((sd.offset().left + (sd.width()/2)) - (as.outerWidth()/2));
                    }
					sd.children('.sliderContainer').each(function() {
						var childwidth = 0;
						var slider = $(this);
						slider.children().each(function() {
							childwidth += $(this).outerWidth(true);
						})
						var newwidth = childwidth + (slider.children().length);
						slider.width(newwidth);
						var pos = slider.position();
						
						slider.stop(true).stop(true).animate({left: pos.left - slideDist}, o.slideSpeed, function() {
							resizeAndPosition();
						});
					});
				}
			}
		}
		
		function sliderRight(steps) {
            if(typeof steps != "number") {
                if(o.scrollVisible) {
                    var stepCount = 1;
                    var limitReached = false;
                    var lastItem = sd.children('.sliderContainer').children('.activeslide').first();;
                    var stepWidth = lastItem.outerWidth(true);
                    while(!limitReached) {
                        var nextItem = lastItem.next();
                        if(nextItem.length == 0) {
                            nextItem = lastItem.siblings().first();
                        }
                        if(stepWidth + nextItem.outerWidth() <= sd.width()) {
                            stepWidth += nextItem.outerWidth(true);
                            stepCount++;
                            lastItem = nextItem;
                        } else {
                            limitReached = true;
                        }
                    }
                    steps = stepCount;
                } else {
                    steps = 1;
                }
            }
			o.width = item.width();
			var slideDist = 0;
			var oas = sd.children('.sliderContainer').children('.activeslide').first();
			var oldwidth = oas.outerWidth();
			var pos = oas.position();
			var limited = true;
			if(oas.outerWidth() > 0) {
				
				if(sd.children('.sliderContainer:animated').length == 0) {
					currentItem+=steps;
					while(currentItem >= totalChildren) {
						currentItem	-= totalChildren;
					}
					
					var as;
					if(currentItem < oas.index()) { 
						if(oas.parent().next('.sliderContainer').length > 0) {
							as = oas.removeClass('activeslide').parent().next('.sliderContainer').children(':eq('+currentItem+')').addClass('activeslide');
						} else {
							as = oas.removeClass('activeslide').parent().parent().children('.sliderContainer').first().children(':eq('+currentItem+')').addClass('activeslide');
						}
					} else {
						as = oas.removeClass('activeslide').parent().children(':eq('+currentItem+')').addClass('activeslide');
					}
                    
                    as.parent().addClass('activeslider').siblings().removeClass('activeslider');
                    
					var masterslider = as.parent();
					var msleft = masterslider.position().left;
					
					updateSizes();
					var slideDist = as.offset().left - sd.offset().left;
                    if(o.centerFirst) { 
                        slideDist = as.offset().left - ((sd.offset().left + (sd.width()/2)) - (as.outerWidth()/2));
                    }
					
					sd.children('.sliderContainer').each(function() {
						var childwidth = 0;
						var slider = $(this);
						slider.children().each(function() {
							childwidth += $(this).outerWidth(true);
						});
						var newwidth = childwidth;
						slider.width(newwidth);
						var pos = slider.position();
						if(slider.find('.activeslide').length == 0) {
							if(pos.left < msleft) {
								slider.stop(true).css('left',msleft - newwidth)
							} else {
								slider.stop(true).css('left',msleft + masterslider.outerWidth());
							}
						}
                        pos = slider.position();
												
						if(typeof o.itembuttonsSelector == "string" && $(o.itembuttonsSelector).length > 0) {
							$(o.itembuttonsSelector).find('.itemButton[data-index="'+currentItem+'"]').addClass('activeButton').siblings().removeClass('activeButton');
						}
						
						slider.stop(true).animate({left: pos.left - slideDist}, o.slideSpeed, function() {
							resizeAndPosition();
						});
					});
				}
			}
		}
		
	});
};
}) ($);