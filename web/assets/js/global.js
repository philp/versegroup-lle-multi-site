'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 * https://remysharp.com/2010/07/21/throttling-function-calls
 */
function throttle(fn, threshhold, scope) {
	threshhold || (threshhold = 250);
	var last, deferTimer;
	return function () {
		var context = scope || this;

		var now = +new Date(),
		    args = arguments;
		if (last && now < last + threshhold) {
			// hold on to it
			clearTimeout(deferTimer);
			deferTimer = setTimeout(function () {
				last = now;
				fn.apply(context, args);
			}, threshhold);
		} else {
			last = now;
			fn.apply(context, args);
		}
	};
}

function debounce(fn, delay) {
	var timer = null;
	return function () {
		var context = this,
		    args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
			fn.apply(context, args);
		}, delay);
	};
}

/*! Swipebox v1.4.4 | Constantin Saguin csag.co | MIT License | github.com/brutaldesign/swipebox */

;(function (window, document, $, undefined) {

	$.swipebox = function (elem, options) {

		// Default options
		var ui,
		    defaults = {
			useCSS: true,
			useSVG: true,
			initialIndexOnArray: 0,
			removeBarsOnMobile: true,
			hideCloseButtonOnMobile: false,
			hideBarsDelay: 3000,
			videoMaxWidth: 1140,
			vimeoColor: 'cccccc',
			beforeOpen: null,
			afterOpen: null,
			afterClose: null,
			afterMedia: null,
			nextSlide: null,
			prevSlide: null,
			loopAtEnd: false,
			autoplayVideos: false,
			queryStringData: {},
			toggleClassOnLoad: ''
		},
		    plugin = this,
		    elements = [],
		    // slides array [ { href:'...', title:'...' }, ...],
		$elem,
		    selector = elem.selector,
		    isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i),
		    isTouch = isMobile !== null || document.createTouch !== undefined || 'ontouchstart' in window || 'onmsgesturechange' in window || navigator.msMaxTouchPoints,
		    supportSVG = !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect,
		    winWidth = window.innerWidth ? window.innerWidth : $(window).width(),
		    winHeight = window.innerHeight ? window.innerHeight : $(window).height(),
		    currentX = 0,

		/* jshint multistr: true */
		html = '<div id="swipebox-overlay">\
					<div id="swipebox-container">\
						<div id="swipebox-slider"></div>\
						<div id="swipebox-top-bar">\
							<div id="swipebox-title"></div>\
						</div>\
						<div id="swipebox-bottom-bar">\
							<div id="swipebox-arrows">\
								<a id="swipebox-prev"></a>\
								<a id="swipebox-next"></a>\
							</div>\
						</div>\
						<a id="swipebox-close"></a>\
					</div>\
			</div>';

		plugin.settings = {};

		$.swipebox.close = function () {
			ui.closeSlide();
		};

		$.swipebox.extend = function () {
			return ui;
		};

		plugin.init = function () {

			plugin.settings = $.extend({}, defaults, options);
			selector = plugin.settings.selector;
			if ($.isArray(elem)) {

				elements = elem;
				ui.target = $(window);
				ui.init(plugin.settings.initialIndexOnArray);
			} else {

				$(document).on('click', selector, function (event) {

					// console.log( isTouch );

					if (event.target.parentNode.className === 'slide current') {

						return false;
					}

					if (!$.isArray(elem)) {
						ui.destroy();
						$elem = $(selector);
						ui.actions();
					}

					elements = [];
					var index, relType, relVal;

					// Allow for HTML5 compliant attribute before legacy use of rel
					if (!relVal) {
						relType = 'data-rel';
						relVal = $(this).attr(relType);
					}

					if (!relVal) {
						relType = 'rel';
						relVal = $(this).attr(relType);
					}

					if (relVal && relVal !== '' && relVal !== 'nofollow') {
						$elem = $(selector).filter('[' + relType + '="' + relVal + '"]');
					} else {
						$elem = $(selector);
					}

					$elem.each(function () {

						var title = null,
						    href = null;

						if ($(this).attr('title')) {
							title = $(this).attr('title');
						}

						if ($(this).attr('href')) {
							href = $(this).attr('href');
						}

						elements.push({
							href: href,
							title: title
						});
					});

					index = $elem.index($(this));
					event.preventDefault();
					event.stopPropagation();
					ui.target = $(event.target);
					ui.init(index);
				});
			}
		};

		ui = {

			/**
    * Initiate Swipebox
    */
			init: function init(index) {
				if (plugin.settings.beforeOpen) {
					plugin.settings.beforeOpen();
				}
				this.target.trigger('swipebox-start');
				$.swipebox.isOpen = true;
				this.build();
				this.openSlide(index);
				this.openMedia(index);
				this.preloadMedia(index + 1);
				this.preloadMedia(index - 1);
				if (plugin.settings.afterOpen) {
					plugin.settings.afterOpen(index);
				}
			},

			/**
    * Built HTML containers and fire main functions
    */
			build: function build() {
				var $this = this,
				    bg;

				$('body').append(html);

				if (supportSVG && plugin.settings.useSVG === true) {
					bg = $('#swipebox-close').css('background-image');
					bg = bg.replace('png', 'svg');
					$('#swipebox-prev, #swipebox-next, #swipebox-close').css({
						'background-image': bg
					});
				}

				if (isMobile && plugin.settings.removeBarsOnMobile) {
					$('#swipebox-bottom-bar, #swipebox-top-bar').remove();
				}

				$.each(elements, function () {
					$('#swipebox-slider').append('<div class="slide"></div>');
				});

				$this.setDim();
				$this.actions();

				if (isTouch) {
					$this.gesture();
				}

				// Devices can have both touch and keyboard input so always allow key events
				$this.keyboard();

				$this.animBars();
				$this.resize();
			},

			/**
    * Set dimensions depending on windows width and height
    */
			setDim: function setDim() {

				var width,
				    height,
				    sliderCss = {};

				// Reset dimensions on mobile orientation change
				if ('onorientationchange' in window) {

					window.addEventListener('orientationchange', function () {
						if (window.orientation === 0) {
							width = winWidth;
							height = winHeight;
						} else if (window.orientation === 90 || window.orientation === -90) {
							width = winHeight;
							height = winWidth;
						}
					}, false);
				} else {

					width = window.innerWidth ? window.innerWidth : $(window).width();
					height = window.innerHeight ? window.innerHeight : $(window).height();
				}

				sliderCss = {
					width: width,
					height: height
				};

				$('#swipebox-overlay').css(sliderCss);
			},

			/**
    * Reset dimensions on window resize envent
    */
			resize: function resize() {
				var $this = this;

				$(window).resize(function () {
					$this.setDim();
				}).resize();
			},

			/**
    * Check if device supports CSS transitions
    */
			supportTransition: function supportTransition() {

				var prefixes = 'transition WebkitTransition MozTransition OTransition msTransition KhtmlTransition'.split(' '),
				    i;

				for (i = 0; i < prefixes.length; i++) {
					if (document.createElement('div').style[prefixes[i]] !== undefined) {
						return prefixes[i];
					}
				}
				return false;
			},

			/**
    * Check if CSS transitions are allowed (options + devicesupport)
    */
			doCssTrans: function doCssTrans() {
				if (plugin.settings.useCSS && this.supportTransition()) {
					return true;
				}
			},

			/**
    * Touch navigation
    */
			gesture: function gesture() {

				var $this = this,
				    index,
				    hDistance,
				    vDistance,
				    hDistanceLast,
				    vDistanceLast,
				    hDistancePercent,
				    vSwipe = false,
				    hSwipe = false,
				    hSwipMinDistance = 10,
				    vSwipMinDistance = 50,
				    startCoords = {},
				    endCoords = {},
				    bars = $('#swipebox-top-bar, #swipebox-bottom-bar'),
				    slider = $('#swipebox-slider');

				bars.addClass('visible-bars');
				$this.setTimeout();

				$('body').bind('touchstart', function (event) {

					$(this).addClass('touching');
					index = $('#swipebox-slider .slide').index($('#swipebox-slider .slide.current'));
					endCoords = event.originalEvent.targetTouches[0];
					startCoords.pageX = event.originalEvent.targetTouches[0].pageX;
					startCoords.pageY = event.originalEvent.targetTouches[0].pageY;

					$('#swipebox-slider').css({
						'-webkit-transform': 'translate3d(' + currentX + '%, 0, 0)',
						'transform': 'translate3d(' + currentX + '%, 0, 0)'
					});

					$('.touching').bind('touchmove', function (event) {
						event.preventDefault();
						event.stopPropagation();
						endCoords = event.originalEvent.targetTouches[0];

						if (!hSwipe) {
							vDistanceLast = vDistance;
							vDistance = endCoords.pageY - startCoords.pageY;
							if (Math.abs(vDistance) >= vSwipMinDistance || vSwipe) {
								var opacity = 0.75 - Math.abs(vDistance) / slider.height();

								slider.css({ 'top': vDistance + 'px' });
								slider.css({ 'opacity': opacity });

								vSwipe = true;
							}
						}

						hDistanceLast = hDistance;
						hDistance = endCoords.pageX - startCoords.pageX;
						hDistancePercent = hDistance * 100 / winWidth;

						if (!hSwipe && !vSwipe && Math.abs(hDistance) >= hSwipMinDistance) {
							$('#swipebox-slider').css({
								'-webkit-transition': '',
								'transition': ''
							});
							hSwipe = true;
						}

						if (hSwipe) {

							// swipe left
							if (0 < hDistance) {

								// first slide
								if (0 === index) {
									// console.log( 'first' );
									$('#swipebox-overlay').addClass('leftSpringTouch');
								} else {
									// Follow gesture
									$('#swipebox-overlay').removeClass('leftSpringTouch').removeClass('rightSpringTouch');
									$('#swipebox-slider').css({
										'-webkit-transform': 'translate3d(' + (currentX + hDistancePercent) + '%, 0, 0)',
										'transform': 'translate3d(' + (currentX + hDistancePercent) + '%, 0, 0)'
									});
								}

								// swipe rught
							} else if (0 > hDistance) {

								// last Slide
								if (elements.length === index + 1) {
									// console.log( 'last' );
									$('#swipebox-overlay').addClass('rightSpringTouch');
								} else {
									$('#swipebox-overlay').removeClass('leftSpringTouch').removeClass('rightSpringTouch');
									$('#swipebox-slider').css({
										'-webkit-transform': 'translate3d(' + (currentX + hDistancePercent) + '%, 0, 0)',
										'transform': 'translate3d(' + (currentX + hDistancePercent) + '%, 0, 0)'
									});
								}
							}
						}
					});

					return false;
				}).bind('touchend', function (event) {
					event.preventDefault();
					event.stopPropagation();

					$('#swipebox-slider').css({
						'-webkit-transition': '-webkit-transform 0.4s ease',
						'transition': 'transform 0.4s ease'
					});

					vDistance = endCoords.pageY - startCoords.pageY;
					hDistance = endCoords.pageX - startCoords.pageX;
					hDistancePercent = hDistance * 100 / winWidth;

					// Swipe to bottom to close
					if (vSwipe) {
						vSwipe = false;
						if (Math.abs(vDistance) >= 2 * vSwipMinDistance && Math.abs(vDistance) > Math.abs(vDistanceLast)) {
							var vOffset = vDistance > 0 ? slider.height() : -slider.height();
							slider.animate({ top: vOffset + 'px', 'opacity': 0 }, 300, function () {
								$this.closeSlide();
							});
						} else {
							slider.animate({ top: 0, 'opacity': 1 }, 300);
						}
					} else if (hSwipe) {

						hSwipe = false;

						// swipeLeft
						if (hDistance >= hSwipMinDistance && hDistance >= hDistanceLast) {

							$this.getPrev();

							// swipeRight
						} else if (hDistance <= -hSwipMinDistance && hDistance <= hDistanceLast) {

							$this.getNext();
						}
					} else {
						// Top and bottom bars have been removed on touchable devices
						// tap
						if (!bars.hasClass('visible-bars')) {
							$this.showBars();
							$this.setTimeout();
						} else {
							$this.clearTimeout();
							$this.hideBars();
						}
					}

					$('#swipebox-slider').css({
						'-webkit-transform': 'translate3d(' + currentX + '%, 0, 0)',
						'transform': 'translate3d(' + currentX + '%, 0, 0)'
					});

					$('#swipebox-overlay').removeClass('leftSpringTouch').removeClass('rightSpringTouch');
					$('.touching').off('touchmove').removeClass('touching');
				});
			},

			/**
    * Set timer to hide the action bars
    */
			setTimeout: function setTimeout() {
				if (plugin.settings.hideBarsDelay > 0) {
					var $this = this;
					$this.clearTimeout();
					$this.timeout = window.setTimeout(function () {
						$this.hideBars();
					}, plugin.settings.hideBarsDelay);
				}
			},

			/**
    * Clear timer
    */
			clearTimeout: function clearTimeout() {
				window.clearTimeout(this.timeout);
				this.timeout = null;
			},

			/**
    * Show navigation and title bars
    */
			showBars: function showBars() {
				var bars = $('#swipebox-top-bar, #swipebox-bottom-bar');
				if (this.doCssTrans()) {
					bars.addClass('visible-bars');
				} else {
					$('#swipebox-top-bar').animate({ top: 0 }, 500);
					$('#swipebox-bottom-bar').animate({ bottom: 0 }, 500);
					setTimeout(function () {
						bars.addClass('visible-bars');
					}, 1000);
				}
			},

			/**
    * Hide navigation and title bars
    */
			hideBars: function hideBars() {
				var bars = $('#swipebox-top-bar, #swipebox-bottom-bar');
				if (this.doCssTrans()) {
					bars.removeClass('visible-bars');
				} else {
					$('#swipebox-top-bar').animate({ top: '-50px' }, 500);
					$('#swipebox-bottom-bar').animate({ bottom: '-50px' }, 500);
					setTimeout(function () {
						bars.removeClass('visible-bars');
					}, 1000);
				}
			},

			/**
    * Animate navigation and top bars
    */
			animBars: function animBars() {
				var $this = this,
				    bars = $('#swipebox-top-bar, #swipebox-bottom-bar');

				bars.addClass('visible-bars');
				$this.setTimeout();

				$('#swipebox-slider').click(function () {
					if (!bars.hasClass('visible-bars')) {
						$this.showBars();
						$this.setTimeout();
					}
				});

				$('#swipebox-bottom-bar').hover(function () {
					$this.showBars();
					bars.addClass('visible-bars');
					$this.clearTimeout();
				}, function () {
					if (plugin.settings.hideBarsDelay > 0) {
						bars.removeClass('visible-bars');
						$this.setTimeout();
					}
				});
			},

			/**
    * Keyboard navigation
    */
			keyboard: function keyboard() {
				var $this = this;
				$(window).bind('keyup', function (event) {
					event.preventDefault();
					event.stopPropagation();

					if (event.keyCode === 37) {

						$this.getPrev();
					} else if (event.keyCode === 39) {

						$this.getNext();
					} else if (event.keyCode === 27) {

						$this.closeSlide();
					}
				});
			},

			/**
    * Navigation events : go to next slide, go to prevous slide and close
    */
			actions: function actions() {
				var $this = this,
				    action = 'touchend click'; // Just detect for both event types to allow for multi-input

				if (elements.length < 2) {

					$('#swipebox-bottom-bar').hide();

					if (undefined === elements[1]) {
						$('#swipebox-top-bar').hide();
					}
				} else {
					$('#swipebox-prev').bind(action, function (event) {
						event.preventDefault();
						event.stopPropagation();
						$this.getPrev();
						$this.setTimeout();
					});

					$('#swipebox-next').bind(action, function (event) {
						event.preventDefault();
						event.stopPropagation();
						$this.getNext();
						$this.setTimeout();
					});
				}

				$('#swipebox-close').bind(action, function () {
					$this.closeSlide();
				});
			},

			/**
    * Set current slide
    */
			setSlide: function setSlide(index, isFirst) {

				isFirst = isFirst || false;

				var slider = $('#swipebox-slider');

				currentX = -index * 100;

				if (this.doCssTrans()) {
					slider.css({
						'-webkit-transform': 'translate3d(' + -index * 100 + '%, 0, 0)',
						'transform': 'translate3d(' + -index * 100 + '%, 0, 0)'
					});
				} else {
					slider.animate({ left: -index * 100 + '%' });
				}

				$('#swipebox-slider .slide').removeClass('current');
				$('#swipebox-slider .slide').eq(index).addClass('current');
				this.setTitle(index);

				if (isFirst) {
					slider.fadeIn();
				}

				$('#swipebox-prev, #swipebox-next').removeClass('disabled');

				if (index === 0) {
					$('#swipebox-prev').addClass('disabled');
				} else if (index === elements.length - 1 && plugin.settings.loopAtEnd !== true) {
					$('#swipebox-next').addClass('disabled');
				}
			},

			/**
    * Open slide
    */
			openSlide: function openSlide(index) {
				$('html').addClass('swipebox-html');
				if (isTouch) {
					$('html').addClass('swipebox-touch');

					if (plugin.settings.hideCloseButtonOnMobile) {
						$('html').addClass('swipebox-no-close-button');
					}
				} else {
					$('html').addClass('swipebox-no-touch');
				}
				$(window).trigger('resize'); // fix scroll bar visibility on desktop
				this.setSlide(index, true);
			},

			/**
    * Set a time out if the media is a video
    */
			preloadMedia: function preloadMedia(index) {
				var $this = this,
				    src = null;

				if (elements[index] !== undefined) {
					src = elements[index].href;
				}

				if (!$this.isVideo(src)) {
					setTimeout(function () {
						$this.openMedia(index);
					}, 1000);
				} else {
					$this.openMedia(index);
				}
			},

			/**
    * Open
    */
			openMedia: function openMedia(index) {
				var $this = this,
				    src,
				    slide;

				if (elements[index] !== undefined) {
					src = elements[index].href;
				}

				if (index < 0 || index >= elements.length) {
					return false;
				}

				slide = $('#swipebox-slider .slide').eq(index);

				if (!$this.isVideo(src)) {
					slide.addClass('slide-loading');
					$this.loadMedia(src, function () {
						slide.removeClass('slide-loading');
						slide.html(this);

						if (plugin.settings.afterMedia) {
							plugin.settings.afterMedia(index);
						}
					});
				} else {
					slide.html($this.getVideo(src));

					if (plugin.settings.afterMedia) {
						plugin.settings.afterMedia(index);
					}
				}
			},

			/**
    * Set link title attribute as caption
    */
			setTitle: function setTitle(index) {
				var title = null;

				$('#swipebox-title').empty();

				if (elements[index] !== undefined) {
					title = elements[index].title;
				}

				if (title) {
					$('#swipebox-top-bar').show();
					$('#swipebox-title').append(title);
				} else {
					$('#swipebox-top-bar').hide();
				}
			},

			/**
    * Check if the URL is a video
    */
			isVideo: function isVideo(src) {

				if (src) {
					if (src.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || src.match(/vimeo\.com\/([0-9]*)/) || src.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/)) {
						return true;
					}

					if (src.toLowerCase().indexOf('swipeboxvideo=1') >= 0) {

						return true;
					}
				}
			},

			/**
    * Parse URI querystring and:
    * - overrides value provided via dictionary
    * - rebuild it again returning a string
    */
			parseUri: function parseUri(uri, customData) {
				var a = document.createElement('a'),
				    qs = {};

				// Decode the URI
				a.href = decodeURIComponent(uri);

				// QueryString to Object
				if (a.search) {
					qs = JSON.parse('{"' + a.search.toLowerCase().replace('?', '').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
				}

				// Extend with custom data
				if ($.isPlainObject(customData)) {
					qs = $.extend(qs, customData, plugin.settings.queryStringData); // The dev has always the final word
				}

				// Return querystring as a string
				return $.map(qs, function (val, key) {
					if (val && val > '') {
						return encodeURIComponent(key) + '=' + encodeURIComponent(val);
					}
				}).join('&');
			},

			/**
    * Get video iframe code from URL
    */
			getVideo: function getVideo(url) {
				var iframe = '',
				    youtubeUrl = url.match(/((?:www\.)?youtube\.com|(?:www\.)?youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/),
				    youtubeShortUrl = url.match(/(?:www\.)?youtu\.be\/([a-zA-Z0-9\-_]+)/),
				    vimeoUrl = url.match(/(?:www\.)?vimeo\.com\/([0-9]*)/),
				    qs = '';
				if (youtubeUrl || youtubeShortUrl) {
					if (youtubeShortUrl) {
						youtubeUrl = youtubeShortUrl;
					}
					qs = ui.parseUri(url, {
						'autoplay': plugin.settings.autoplayVideos ? '1' : '0',
						'v': ''
					});
					iframe = '<iframe width="560" height="315" src="//' + youtubeUrl[1] + '/embed/' + youtubeUrl[2] + '?' + qs + '" frameborder="0" allowfullscreen></iframe>';
				} else if (vimeoUrl) {
					qs = ui.parseUri(url, {
						'autoplay': plugin.settings.autoplayVideos ? '1' : '0',
						'byline': '0',
						'portrait': '0',
						'color': plugin.settings.vimeoColor
					});
					iframe = '<iframe width="560" height="315"  src="//player.vimeo.com/video/' + vimeoUrl[1] + '?' + qs + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
				} else {
					iframe = '<iframe width="560" height="315" src="' + url + '" frameborder="0" allowfullscreen></iframe>';
				}

				return '<div class="swipebox-video-container" style="max-width:' + plugin.settings.videoMaxWidth + 'px"><div class="swipebox-video">' + iframe + '</div></div>';
			},

			/**
    * Load image
    */
			loadMedia: function loadMedia(src, callback) {
				// Inline content
				if (src.trim().indexOf('#') === 0) {
					callback.call($('<div>', {
						'class': 'swipebox-inline-container'
					}).append($(src).clone().toggleClass(plugin.settings.toggleClassOnLoad)));
				}
				// Everything else
				else {
						if (!this.isVideo(src)) {
							var img = $('<img>').on('load', function () {
								callback.call(img);
							});

							img.attr('src', src);
						}
					}
			},

			/**
    * Get next slide
    */
			getNext: function getNext() {
				var $this = this,
				    src,
				    index = $('#swipebox-slider .slide').index($('#swipebox-slider .slide.current'));
				if (index + 1 < elements.length) {

					src = $('#swipebox-slider .slide').eq(index).contents().find('iframe').attr('src');
					$('#swipebox-slider .slide').eq(index).contents().find('iframe').attr('src', src);
					index++;
					$this.setSlide(index);
					$this.preloadMedia(index + 1);
					if (plugin.settings.nextSlide) {
						plugin.settings.nextSlide(index);
					}
				} else {

					if (plugin.settings.loopAtEnd === true) {
						src = $('#swipebox-slider .slide').eq(index).contents().find('iframe').attr('src');
						$('#swipebox-slider .slide').eq(index).contents().find('iframe').attr('src', src);
						index = 0;
						$this.preloadMedia(index);
						$this.setSlide(index);
						$this.preloadMedia(index + 1);
						if (plugin.settings.nextSlide) {
							plugin.settings.nextSlide(index);
						}
					} else {
						$('#swipebox-overlay').addClass('rightSpring');
						setTimeout(function () {
							$('#swipebox-overlay').removeClass('rightSpring');
						}, 500);
					}
				}
			},

			/**
    * Get previous slide
    */
			getPrev: function getPrev() {
				var index = $('#swipebox-slider .slide').index($('#swipebox-slider .slide.current')),
				    src;
				if (index > 0) {
					src = $('#swipebox-slider .slide').eq(index).contents().find('iframe').attr('src');
					$('#swipebox-slider .slide').eq(index).contents().find('iframe').attr('src', src);
					index--;
					this.setSlide(index);
					this.preloadMedia(index - 1);
					if (plugin.settings.prevSlide) {
						plugin.settings.prevSlide(index);
					}
				} else {
					$('#swipebox-overlay').addClass('leftSpring');
					setTimeout(function () {
						$('#swipebox-overlay').removeClass('leftSpring');
					}, 500);
				}
			},
			/* jshint unused:false */
			nextSlide: function nextSlide(index) {
				// Callback for next slide
			},

			prevSlide: function prevSlide(index) {
				// Callback for prev slide
			},

			/**
    * Close
    */
			closeSlide: function closeSlide() {
				$('html').removeClass('swipebox-html');
				$('html').removeClass('swipebox-touch');
				$(window).trigger('resize');
				this.destroy();
			},

			/**
    * Destroy the whole thing
    */
			destroy: function destroy() {
				$(window).unbind('keyup');
				$('body').unbind('touchstart');
				$('body').unbind('touchmove');
				$('body').unbind('touchend');
				$('#swipebox-slider').unbind();
				$('#swipebox-overlay').remove();

				if (!$.isArray(elem)) {
					elem.removeData('_swipebox');
				}

				if (this.target) {
					this.target.trigger('swipebox-destroy');
				}

				$.swipebox.isOpen = false;

				if (plugin.settings.afterClose) {
					plugin.settings.afterClose();
				}
			}
		};

		plugin.init();
	};

	$.fn.swipebox = function (options) {

		if (!$.data(this, '_swipebox')) {
			var swipebox = new $.swipebox(this, options);
			this.data('_swipebox', swipebox);
		}
		return this.data('_swipebox');
	};
})(window, document, jQuery);

(function ($) {

	$.fn.infiniteScroll = function (options) {
		var defaults = {
			slideSpeed: 500,
			autoplay: false,
			autoplaySpeed: 5000,
			scrollVisible: true,
			resizeLimit: 1150,
			fitSlideCount: false
			//slideCount:3
			//width:,
			//height:,
		};
		var o = $.extend(defaults, options);

		return this.each(function () {
			var sd, sc, totalChildren;
			var item = $(this);
			var myChildren = item.children();
			var slideInterval;
			var currentItem = 0;
			var totalWidth = 0;
			var childWidthExtras = 0;
			var tstartX, tstartY, tX, tY;

			if (!o.width) {
				o.width = item.width();
			}

			function resetSizes() {
				childrenItems = item.find('.sliderContainer').children();
				childrenItems.css({ 'max-width': '', 'width': '', '-webkit-transition-duration': '0s', '-moz-transition-duration': '0s', 'transition-duration': '0s', '-ms-transition-duration': '0s' });

				if (o.fitSlideCount && sd && sd.children('.sliderContainer').length == 3) {
					sc.children().css('width', '');
					var targetwidth = Math.floor(item.outerWidth() / sc.children().outerWidth());
					var paddingpx = Number(sc.children().css('padding-left').replace('px', '')) + Number(sc.children().css('padding-right').replace('px', ''));
					sd.children().children().css('width', item.outerWidth() / targetwidth - paddingpx);
				}

				updateSizes();
				totalChildren = myChildren.length;
				totalWidth = o.childrenWidth;

				if (!o.height) {
					o.height = 0;
					myChildren.each(function () {
						o.height = Math.max($(this).height(), o.height);
					});
				}
				childrenItems.css({ '-webkit-transition-duration': '', '-moz-transition-duration': '', 'transition-duration': '', '-ms-transition-duration': '' });
			}
			function updateSizes() {
				o.childWidth = 0;
				o.childHeight = 0;
				o.childrenWidth = 0;

				item.find('.sliderContainer').children().each(function () {
					var cItem = $(this);
					if (cItem.outerWidth(true) < o.resizeLimit && cItem.outerWidth(true) < item.width()) {
						o.childrenWidth += cItem.outerWidth(true);
					} else {
						cItem.css('max-width', Math.min(o.resizeLimit, item.width()) - cItem.css('padding-left').replace('px', '') - cItem.css('padding-right').replace('px', ''));
						o.childrenWidth += cItem.outerWidth(true);
					}
					o.childWidth = Math.max(cItem.outerWidth(true), o.childWidth);
					o.childHeight = Math.max(cItem.outerHeight(true), o.childHeight);
					childWidthExtras = cItem.outerWidth(true) - cItem.innerWidth();
				});
			}

			resetSizes();

			if (item.find('img').length > 0) {
				var imglength = item.find('img').length;
				var loadcount = 0;
				item.find('img').each(function () {
					var img = new Image();
					img.onload = function () {
						loadcount++;
						if (loadcount == imglength) {
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
				if (o.buttonholder) {
					$(o.buttonholder).append('<div class="leftarrow"><span></span></div><div class="rightarrow"><span></span></div>');
					sd = item.children('.sliderDiv');
				} else {
					sd = item.prepend('<div class="leftarrow"><span></span></div><div class="rightarrow"><span></span></div>').children('.sliderDiv');
				}
				sc = sd.css({
					width: o.width,
					height: o.height,
					overflow: "hidden",
					position: "relative",
					'text-align': "left"
				}).children().css('position', 'absolute').end().children('.sliderContainer');

				resetSizes();

				sc.css('width', o.childrenWidth);
				sd.append(sc.clone(true).css('left', o.childrenWidth)).append(sc.clone(true).css('left', -o.childrenWidth));

				var slb, srb;
				if (o.buttonholder) {
					slb = $(o.buttonholder).children('.leftarrow');
					srb = $(o.buttonholder).children('.rightarrow');
				} else {
					slb = item.children('.leftarrow');
					srb = item.children('.rightarrow');
				}
				slb.click(function (e) {
					if (slideInterval) {
						clearInterval(slideInterval);
					}
					sliderLeft();
					e.stopPropagation();
					e.preventDefault();
				});
				srb.click(function (e) {
					if (slideInterval) {
						clearInterval(slideInterval);
					}
					sliderRight();
					e.stopPropagation();
					e.preventDefault();
				});

				item.bind('touchstart', function (e) {
					var touch = e.originalEvent.touch || e.originalEvent.touches[0];
					tstartX = touch.pageX;
					tstartY = touch.pageY;
				}).bind('touchmove', function (e) {
					var touch = e.originalEvent.touch || e.originalEvent.touches[0];
					tX = touch.pageX;
					tY = touch.pageY;

					if (tX < tstartX - 10 || tX > tstartX + 10) {
						e.preventDefault();
					}
					e.stopPropagation();
				}).bind('touchend', function (e) {
					if (tstartX && tX) {
						if (tX < tstartX - 20 || tX > tstartX + 20) {
							var origTrans = o.transition;
							if (tX < tstartX - 20) {
								o.transition = "right";
								if (slideInterval) {
									clearInterval(slideInterval);
								}
								sliderRight();
							}
							if (tX > tstartX + 20) {
								o.transition = "left";
								if (slideInterval) {
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

				if (o.autoplay) {
					if (slideInterval) {
						clearInterval(slideInterval);
					}
					slideInterval = setInterval(function () {
						sliderRight();
					}, o.autoplaySpeed);
				}

				sd.children('.sliderContainer').children(':eq(' + currentItem + ')').removeClass('noanim').addClass('activeslide');

				sd.children('.sliderContainer').children().click(function (e) {
					var ti = $(this);
					var ai = sd.find('.activeslide');
					if (!ti.hasClass('notclicked')) {
						sd.addClass('clicked');
						if (ti[0].nodeName == "A" && !ti.hasClass('activeslide') && !ti.hasClass('active')) {
							var steps = ti.index() - ai.index();
							if (ai.offset().left < ti.offset().left) {
								if (steps < 0) {
									steps += sd.children('.sliderContainer:eq(0)').children().length;
								}
								sliderRight(steps);
							} else {
								if (steps > 0) {
									steps -= sd.children('.sliderContainer:eq(0)').children().length;
								}
								sliderLeft(-steps);
							}
						}
						e.stopPropagation();
						e.preventDefault();
					}
				}).find('a').click(function (e) {
					e.stopPropagation();
				});

				$(window).bind('load resize', resizeAndPosition).resize();
			}

			function resizeAndPosition(e, oldactive) {
				item.find('.sliderDiv').css({ width: item.width() });
				sc.children().addClass('noanim');

				resetSizes();

				var as = item.find('.activeslide');
				var fc = as.parent();

				var targetleft = -as.position().left;
				if (o.centerFirst) {
					targetleft = item.width() / 2 - as.outerWidth() / 2 - as.position().left;
				}
				if (oldactive) {
					targetleft = fc.position().left;
				}
				var fcchildwidth = 0;
				fc.children().each(function () {
					fcchildwidth += Math.ceil($(this).outerWidth(true));
				}).end().css({ 'width': fcchildwidth + 1, 'left': targetleft });

				var nextfc = fc.next();
				var nextfcchildwidth = 0;
				if (nextfc.length == 0) {
					nextfc = fc.siblings().first();
				}
				nextfc.children().each(function () {
					nextfcchildwidth += Math.ceil($(this).outerWidth(true));
				}).end().css({ 'width': nextfcchildwidth + 1, 'left': targetleft + fcchildwidth });
				var prevfc = nextfc.next();
				if (prevfc.length == 0) {
					prevfc = nextfc.siblings().first();
				}
				var prevfcchildwidth = 0;
				prevfc.children().each(function () {
					prevfcchildwidth += Math.ceil($(this).outerWidth(true));
				}).end().css({ 'width': prevfcchildwidth + 1, 'left': targetleft - prevfcchildwidth });
				item.find('.sliderDiv').css('height', o.childHeight);
			}

			function sliderLeft(steps) {
				if (typeof steps != "number") {
					if (o.scrollVisible) {
						var stepCount = 0;
						var limitReached = false;
						var lastItem = sd.children('.sliderContainer').children('.activeslide').first();;
						var stepWidth = 0;
						while (!limitReached) {
							var nextItem = lastItem.prev();
							if (nextItem.length == 0) {
								nextItem = lastItem.siblings().last();
							}
							if (stepWidth + nextItem.outerWidth() <= sd.width()) {
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
				if (oas.outerWidth() > 0) {

					if (sd.children('.sliderContainer:animated').length == 0) {
						currentItem -= steps;
						while (currentItem < 0) {
							currentItem += totalChildren;
						}

						var as;
						if (currentItem > oas.index()) {
							if (oas.parent().prev('.sliderContainer').length > 0) {
								as = oas.removeClass('activeslide').parent().prev('.sliderContainer').css('width', '').children(':eq(' + currentItem + ')').addClass('activeslide');
							} else {
								as = oas.removeClass('activeslide').parent().parent().children('.sliderContainer').last().css('width', '').children(':eq(' + currentItem + ')').addClass('activeslide');
							}
						} else {
							as = oas.removeClass('activeslide').parent().children(':eq(' + currentItem + ')').addClass('activeslide');
						}
						as.parent().addClass('activeslider').siblings().removeClass('activeslider');

						resizeAndPosition({}, true);
						var masterslider = as.parent();
						var msleft = masterslider.position().left;

						updateSizes();

						var slideDist = as.offset().left - sd.offset().left;
						if (o.centerFirst) {
							slideDist = as.offset().left - (sd.offset().left + sd.width() / 2 - as.outerWidth() / 2);
						}
						sd.children('.sliderContainer').each(function () {
							var childwidth = 0;
							var slider = $(this);
							slider.children().each(function () {
								childwidth += $(this).outerWidth(true);
							});
							var newwidth = childwidth + slider.children().length;
							slider.width(newwidth);
							var pos = slider.position();

							slider.stop(true).stop(true).animate({ left: pos.left - slideDist }, o.slideSpeed, function () {
								resizeAndPosition();
							});
						});
					}
				}
			}

			function sliderRight(steps) {
				if (typeof steps != "number") {
					if (o.scrollVisible) {
						var stepCount = 1;
						var limitReached = false;
						var lastItem = sd.children('.sliderContainer').children('.activeslide').first();;
						var stepWidth = lastItem.outerWidth(true);
						while (!limitReached) {
							var nextItem = lastItem.next();
							if (nextItem.length == 0) {
								nextItem = lastItem.siblings().first();
							}
							if (stepWidth + nextItem.outerWidth() <= sd.width()) {
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
				if (oas.outerWidth() > 0) {

					if (sd.children('.sliderContainer:animated').length == 0) {
						currentItem += steps;
						while (currentItem >= totalChildren) {
							currentItem -= totalChildren;
						}

						var as;
						if (currentItem < oas.index()) {
							if (oas.parent().next('.sliderContainer').length > 0) {
								as = oas.removeClass('activeslide').parent().next('.sliderContainer').children(':eq(' + currentItem + ')').addClass('activeslide');
							} else {
								as = oas.removeClass('activeslide').parent().parent().children('.sliderContainer').first().children(':eq(' + currentItem + ')').addClass('activeslide');
							}
						} else {
							as = oas.removeClass('activeslide').parent().children(':eq(' + currentItem + ')').addClass('activeslide');
						}

						as.parent().addClass('activeslider').siblings().removeClass('activeslider');

						var masterslider = as.parent();
						var msleft = masterslider.position().left;

						updateSizes();
						var slideDist = as.offset().left - sd.offset().left;
						if (o.centerFirst) {
							slideDist = as.offset().left - (sd.offset().left + sd.width() / 2 - as.outerWidth() / 2);
						}

						sd.children('.sliderContainer').each(function () {
							var childwidth = 0;
							var slider = $(this);
							slider.children().each(function () {
								childwidth += $(this).outerWidth(true);
							});
							var newwidth = childwidth;
							slider.width(newwidth);
							var pos = slider.position();
							if (slider.find('.activeslide').length == 0) {
								if (pos.left < msleft) {
									slider.stop(true).css('left', msleft - newwidth);
								} else {
									slider.stop(true).css('left', msleft + masterslider.outerWidth());
								}
							}
							pos = slider.position();

							if (typeof o.itembuttonsSelector == "string" && $(o.itembuttonsSelector).length > 0) {
								$(o.itembuttonsSelector).find('.itemButton[data-index="' + currentItem + '"]').addClass('activeButton').siblings().removeClass('activeButton');
							}

							slider.stop(true).animate({ left: pos.left - slideDist }, o.slideSpeed, function () {
								resizeAndPosition();
							});
						});
					}
				}
			}
		});
	};
})($);
(function ($) {

	$.fn.imageGallery = function (options) {
		var defaults = {
			width: 'auto',
			height: 'auto',
			itemSelector: '.galleryItem',
			nextPrevButtons: false,
			itemButtons: false,
			playPause: false,
			transition: 'opacity',
			transspeed: '1000',
			speed: '5000',
			reverse: true,
			imgSelector: '',
			autoplay: true,
			resizable: true,
			itembuttonstarget: '',
			callback: function callback() {}
		};

		return this.each(function () {
			var o = $.extend(defaults, options);
			var itemIndex = -1;
			var waitingIndex = -1;
			var reverse = o.reverse;
			var tstartX, tstartY, tX, tY;
			var g = $(this);
			var gi = g.find(o.itemSelector);
			gi.each(function (index, a) {
				var ti = $(this);
				ti.attr('index', index);

				var a = ti.find('img' + o.imgSelector);
				if (a.length > 0) {
					var img = new Image();
					img.onload = img.onerror = function () {
						a.attr('data-loaded', true);
						if (waitingIndex == a.attr('index')) {
							g.find('.loading').remove();
							waitingIndex = -1;
							transitionIn(a.attr('index'));
							checkSizes();
						}
					};
					img.src = a[0].src;
					a.attr('index', index);
					if (a.attr('complete')) {
						a.attr('data-loaded', true);
					}
				}
			});
			var playing = o.autoplay;
			var playTimer;
			g.css({
				'position': 'relative',
				'overflow': 'hidden'
			});
			gi.css({
				'position': 'absolute',
				'top': '0px',
				'left': '0px',
				'width': '100%',
				'height': '100%'
			}).hide();

			g.append('<div class="transitionLayer"></div>');
			var tl = g.children('.transitionLayer').css({
				'position': 'absolute',
				'display': 'none',
				'top': '0px',
				'left': '0px',
				'width': '100%',
				'height': '100%',
				'z-index': 3
			});

			if (o.width != 'auto') {
				g.width(o.width);
			}
			if (o.height != 'auto') {
				g.height(o.height);
			}

			if (o.nextPrevButtons) {
				if (gi.length > 1) {
					g.after('<div class="leftButton"><span></span></div><div class="rightButton"><span></span></div>');
					g.siblings('.leftButton').click(clickLeft);
					g.siblings('.rightButton').click(clickRight);
				}
			}

			gi.bind('touchstart', function (e) {
				var touch = e.originalEvent.touch || e.originalEvent.touches[0];
				tstartX = touch.pageX;
				tstartY = touch.pageY;
				//e.stopPropagation();
			}).bind('touchmove', function (e) {
				var touch = e.originalEvent.touch || e.originalEvent.touches[0];
				tX = touch.pageX;
				tY = touch.pageY;

				/*var swipewidth = $(window).width()/5;
    var swipeheight = $(window).height()/10;
    if((tX < tstartX - swipewidth || tX > tstartX + swipewidth) && tY > tstartY - swipeheight && tY < tstartY + swipeheight) {
    e.preventDefault();
    }
    e.stopPropagation();*/
			}).bind('touchend', function (e) {
				if (tstartX && tX) {
					var swipewidth = $(window).width() / 5;
					var swipeheight = $(window).height() / 10;
					if ((tX < tstartX - swipewidth || tX > tstartX + swipewidth) && tY > tstartY - swipeheight && tY < tstartY + swipeheight) {
						var origTrans = o.transition;
						if (tX < tstartX - swipewidth) {
							o.transition = "left";
							clickRight();
						}
						if (tX > tstartX + swipewidth) {
							o.transition = "left";
							clickLeft();
						}
						o.transition = origTrans;
						e.stopPropagation();
					}
					tstartX = tstartY = tX = tY = false;
				}
			});

			if (o.playPause) {
				g.append('<div class="playpause"></div>');
				g.children('.playpause').click(function () {
					if (playing) {
						playing = false;
						g.children('.playpause').addClass('paused');
						clearTimeout(playTimer);
					} else {
						playing = true;
						g.children('.playpause').removeClass('paused');
						transitionIn();
					}
				});
			}

			if (o.itemButtons) {
				var ib;
				if (o.itembuttonstarget) {
					$(o.itembuttonstarget).append('<div class="itemButtons"></div>');
					ib = $(o.itembuttonstarget).children('.itemButtons');
				} else {
					g.append('<div class="itemButtons"></div>');
					ib = g.children('.itemButtons');
				}

				gi.each(function (i) {
					thisgi = $(this);
					if (thisgi.find('img:first').attr('data-thumb')) {
						ib.append('<div class="itemButton thumbnailButton" data-index="' + i + '"><span></span><img src="' + thisgi.find('img:first').attr('data-thumb') + '" alt="" /></div>');
					} else {
						ib.append('<div class="itemButton" data-index="' + i + '"></div>');
					}
					var nb = ib.children('.itemButton[data-index=' + i + ']');
					nb.click(function (e) {
						playing = false;
						g.children('.playpause').addClass('paused');
						clearTimeout(playTimer);
						ti = $(this);
						if (itemIndex > ti.attr('data-index')) {
							reverse = true;
						}
						ti.siblings().removeClass('activeButton');
						ti.addClass('activeButton');
						transitionIn(parseInt(ti.attr('data-index')));
						e.stopPropagation();
					});
				});
			}

			switch (o.transition) {
				case 'right':
				case 'left':
					$(window).load(function () {
						$(window).resize(function () {
							var ai = gi.filter('.activeItem');
							if (ai.length > 0) {
								ai.siblings(o.itemSelector).css('left', '100%');
							}
						});
					});
					break;
			}

			$(window).resize(function () {
				checkSizes();
			});

			function clickLeft() {
				playing = false;
				clearTimeout(playTimer);
				g.children('.playpause').addClass('paused');
				reverse = true;
				transitionIn(itemIndex - 1);
			}
			function clickRight() {
				playing = false;
				g.children('.playpause').addClass('paused');
				clearTimeout(playTimer);
				transitionIn();
			}

			function checkSizes() {
				g.children(o.itemSelector + ':not(.activeItem)').hide();
				g.css({ 'min-height': '', 'height': '' });
				var minheight = g.children('.activeItem').height();
				//if(g.children('.activeItem').css('display') == "none" || g.children('.activeItem').find('img'+o.imgSelector).height() == 0) {
				var ai = g.children('.activeItem');
				var h = 0;
				var c = ai.children().filter(function () {
					var posi = $(this).css('position');
					var floa = $(this).css('float');
					return posi != 'absolute' && floa == 'none';
				}).each(function () {
					h += $(this).outerHeight();
				});
				var childrenheight = h;

				if (childrenheight > minheight) {
					minheight = childrenheight;
				}
				if (g.find('img' + o.imgSelector).length == 0 && g.width() > 0) {
					g.children(o.itemSelector).width(g.width());
				}
				//}
				if (g.find('img' + o.imgSelector).length > 0) {
					g.css('height', minheight);
				}
				g.css('min-height', minheight);
			}

			transitionIn(0);

			function transitionIn(i) {
				var lastIndex = itemIndex;
				if (!isNaN(i)) {
					itemIndex = parseInt(i);
				} else {
					itemIndex++;
				}

				if (itemIndex < 0) {
					itemIndex += gi.length;
				} else if (itemIndex > gi.length - 1) {
					itemIndex -= gi.length;
				}

				var ni = gi.slice(itemIndex, itemIndex + 1);
				var li = gi.slice(lastIndex, lastIndex + 1);
				ni.stop(true, true).find('div').stop(true, true);
				li.stop(true, true).find('div').stop(true, true);
				if ((ni.find('img' + o.imgSelector).attr('data-loaded') || ni.find('img' + o.imgSelector).length == 0) && !ni.is(':animated') && !li.is(':animated') && !tl.children().is(':animated')) {
					if (li.html() != ni.html()) {

						if (o.resizable && gi.filter('.activeItem').length == 0) {
							var heightcheck = setInterval(function () {
								if (ni.height() > g.height() && ni.height() > 0) {
									g.height(ni.height());
									clearInterval(heightcheck);
								}
							}, 50);
						}

						li.removeClass('activeItem').css('z-index', 1);
						ni.addClass('activeItem').css('z-index', 5);

						if (li.css('display') != 'block') {
							$(window).resize();
						}

						var transition = ni.attr('data-transition') || o.transition;
						var dl = ni.attr('data-display-length') || o.speed;

						if (playing) {
							playTimer = setTimeout(function () {
								transitionIn();
							}, dl);
						}
						if (reverse) {
							switch (transition) {
								case 'right':
									transition = "left";
									break;
								case 'left':
									transition = "right";
									break;
								case 'top':
									transition = "bottom";
									break;
								case 'bottom':
									transition = "top";
									break;
							}
							reverse = false;
						}
						switch (transition) {
							case 'right':
								if (li.css('display') == 'block') {
									ni.css('left', "-" + ni.outerWidth() + "px").show();
									ni.animate({ left: "0px" }, o.transspeed, o.callback);
									li.animate({ left: ni.outerWidth() + "px" }, o.transspeed);
								} else {
									ni.show();
								}
								break;
							case 'left':
								if (li.css('display') == 'block') {
									ni.css('left', ni.outerWidth() + "px").show();
									ni.animate({ left: "0px" }, o.transspeed, o.callback);
									li.animate({ left: "-" + ni.outerWidth() + "px" }, o.transspeed);
								} else {
									ni.show();
								}
								break;
							case 'top':
								if (li.css('display') == 'block') {
									ni.css('top', "-" + ni.outerHeight() + "px").show();
									ni.animate({ top: "0px" }, o.transspeed, o.callback);
									li.animate({ top: ni.outerHeight() + "px" }, o.transspeed);
								} else {
									ni.show();
								}
								break;
							case 'bottom':
								if (li.css('display') == 'block') {
									ni.css('top', ni.outerHeight() + "px").show();
									ni.animate({ top: "0px" }, o.transspeed, o.callback);
									li.animate({ top: "-" + ni.outerHeight() + "px" }, o.transspeed);
								} else {
									ni.show();
								}
								break;
							case 'checkerboard':
								var img = ni.find('img');
								ni.show();
								var sizeX = Math.ceil(ni.width() / 10);
								var sizeY = Math.ceil(ni.height() / 8);
								img.hide();
								tl.html('');
								for (x = 0; x < 10; x++) {
									for (y = 0; y < 8; y++) {
										$("<div />").css({
											width: sizeX,
											height: sizeY,
											left: x * sizeX,
											top: y * sizeY,
											backgroundPosition: "-" + x * sizeX + "px -" + y * sizeY + "px",
											position: 'absolute',
											display: 'none',
											'background-image': 'url(' + img.attr('src') + ')'
										}).appendTo(tl);
									}
								}
								tl.show().children().each(function (a, i) {
									$(this).delay(Math.random() * (o.transspeed * 0.75)).fadeIn(o.transspeed / 4, function () {
										var tb = $(this);
										if (tb.siblings().length == tb.siblings(':visible:not(:animated)').length) {
											tb.parent().siblings('.activeItem').find('img').show();
											tl.hide();
											o.callback();
										}
									});
								});
								break;
							case 'joinV':
								var img = ni.find('img');
								ni.show();
								var sizeX = Math.ceil(ni.width() + ni.width() / 2);
								var sizeY = Math.ceil(ni.height());
								img.hide();
								tl.html('');
								for (x = 0; x < 2; x++) {
									$("<div />").css({
										width: ni.width() / 2,
										height: sizeY,
										left: x * sizeX - ni.width() / 2,
										top: 0,
										backgroundPosition: "-" + x * sizeX + "px 0px",
										position: 'absolute',
										'background-image': 'url(' + img.attr('src') + ')'
									}).appendTo(tl);
								}
								tl.show().children(':eq(0)').animate({ left: 0 + "px" }, o.transspeed).siblings('div').animate({ left: ni.width() / 2 + "px" }, o.transspeed, function () {
									var tb = $(this);
									tb.parent().siblings('.activeItem').find('img').show();
									tl.hide();
									o.callback();
								});
								break;
							case 'joinH':
								var img = ni.find('img');
								ni.show();
								var sizeX = Math.ceil(ni.width());
								var sizeY = Math.ceil(ni.height() + ni.height() / 2);
								img.hide();
								tl.html('');
								for (y = 0; y < 2; y++) {
									$("<div />").css({
										width: sizeX,
										height: ni.height() / 2,
										left: 0,
										top: y * sizeY - ni.height() / 2,
										backgroundPosition: "-0px " + y * sizeY + "px",
										position: 'absolute',
										'background-image': 'url(' + img.attr('src') + ')'
									}).appendTo(tl);
								}
								tl.show().children(':eq(0)').animate({ top: 0 + "px" }, o.transspeed).siblings('div').animate({ top: ni.height() / 2 + "px" }, o.transspeed, function () {
									var tb = $(this);
									tb.parent().siblings('.activeItem').find('img').show();
									tl.hide();
									o.callback();
								});
								break;
							case 'splitV':
								li.css('z-index', 5);
								ni.css('z-index', 1);
								var img = li.find('img');
								li.show();
								ni.show();
								var sizeX = Math.ceil(li.width() / 2);
								var sizeY = Math.ceil(li.height());
								img.hide();
								tl.html('');
								for (x = 0; x < 2; x++) {
									$("<div />").css({
										width: sizeX,
										height: sizeY,
										left: x * sizeX,
										top: 0,
										backgroundPosition: "-" + x * sizeX + "px 0px",
										position: 'absolute',
										'background-image': 'url(' + img.attr('src') + ')'
									}).appendTo(tl);
								}
								tl.show().children(':eq(0)').animate({ left: -sizeX + "px" }, o.transspeed).siblings('div').animate({ left: li.width() + "px" }, o.transspeed, function () {
									var tb = $(this);
									tb.parent().siblings(o.itemSelector).css('z-index', 1).hide().find('img').show();
									tb.parent().siblings('.activeItem').css('z-index', 5).show();
									tl.hide();
									o.callback();
								});
								break;
							case 'splitH':
								li.css('z-index', 5);
								ni.css('z-index', 1);
								var img = li.find('img');
								li.show();
								ni.show();
								var sizeX = Math.ceil(li.width());
								var sizeY = Math.ceil(li.height() / 2);
								img.hide();
								tl.html('');
								for (y = 0; y < 2; y++) {
									$("<div />").css({
										width: sizeX,
										height: sizeY,
										left: 0,
										top: y * sizeY,
										backgroundPosition: "0px -" + y * sizeY + "px",
										position: 'absolute',
										'background-image': 'url(' + img.attr('src') + ')'
									}).appendTo(tl);
								}
								tl.show().children(':eq(0)').animate({ top: -sizeY + "px" }, o.transspeed).siblings('div').animate({ top: li.height() + "px" }, o.transspeed, function () {
									var tb = $(this);
									tb.parent().siblings(o.itemSelector).css('z-index', 1).hide().find('img').show();
									tb.parent().siblings('.activeItem').css('z-index', 5).show();
									tl.hide();
									o.callback();
								});
								break;
							case 'opacity':
							default:
								ni.css('left', '0px').hide().fadeIn(o.transspeed, function () {
									$(this).siblings(o.itemSelector).hide();
									o.callback();
								});
								break;
						}
						if (o.itemButtons) {
							var ib;
							if (o.itembuttonstarget) {
								ib = $(o.itembuttonstarget).children('.itemButtons');
							} else {
								ib = g.children('.itemButtons');
							}
							ib.find('.itemButton').removeClass('activeButton');
							ib.find('.itemButton[data-index="' + ni.attr('index') + '"]').addClass('activeButton');
						}
						if (o.resizable) {
							if (ni.find('img' + o.imgSelector).length > 0) {
								ni.css({ width: '', height: '' });
							}
							ni.css({ height: '' });
							g.siblings('.rightButton, .leftButton').animate({ height: ni.outerHeight() }, 200);
							if (ni.outerWidth() > 0 && ni.outerHeight() > 0) {
								var ato = { height: ni.outerHeight() };
								if (o.width != 'auto') {
									ato.width = ni.outerWidth();
								}
								g.animate(ato, 200);
							}
						}
					}
				} else {
					if (!ni.is(':animated') && !li.is(':animated')) {
						waitingIndex = itemIndex;
						g.prepend('<div class="loading"></div>');
					}
					if (!isNaN(i)) {
						itemIndex = lastIndex;
					}
				}
			}
		});
	};
})($)
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.1
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
;(function (factory) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports !== 'undefined') {
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery);
	}
})(function ($) {
	'use strict';

	var Slick = window.Slick || {};

	Slick = function () {

		var instanceUid = 0;

		function Slick(element, settings) {

			var _ = this,
			    dataSettings;

			_.defaults = {
				accessibility: true,
				adaptiveHeight: false,
				appendArrows: $(element),
				appendDots: $(element),
				arrows: true,
				asNavFor: null,
				prevArrow: '<div class="slick-prev">&nbsp;</div>',
				nextArrow: '<div class="slick-next">&nbsp;</div>',
				autoplay: false,
				autoplaySpeed: 3000,
				centerMode: false,
				centerPadding: '50px',
				cssEase: 'ease',
				customPaging: function customPaging(slider, i) {
					return $('<button type="button" />').text(i + 1);
				},
				dots: false,
				dotsClass: 'slick-dots',
				draggable: true,
				easing: 'linear',
				edgeFriction: 0.35,
				fade: false,
				focusOnSelect: false,
				focusOnChange: false,
				infinite: true,
				initialSlide: 0,
				lazyLoad: 'ondemand',
				mobileFirst: false,
				pauseOnHover: true,
				pauseOnFocus: true,
				pauseOnDotsHover: false,
				respondTo: 'window',
				responsive: null,
				rows: 1,
				rtl: false,
				slide: '',
				slidesPerRow: 1,
				slidesToShow: 1,
				slidesToScroll: 1,
				speed: 500,
				swipe: true,
				swipeToSlide: false,
				touchMove: true,
				touchThreshold: 5,
				useCSS: true,
				useTransform: true,
				variableWidth: false,
				vertical: false,
				verticalSwiping: false,
				waitForAnimate: true,
				zIndex: 1000
			};

			_.initials = {
				animating: false,
				dragging: false,
				autoPlayTimer: null,
				currentDirection: 0,
				currentLeft: null,
				currentSlide: 0,
				direction: 1,
				$dots: null,
				listWidth: null,
				listHeight: null,
				loadIndex: 0,
				$nextArrow: null,
				$prevArrow: null,
				scrolling: false,
				slideCount: null,
				slideWidth: null,
				$slideTrack: null,
				$slides: null,
				sliding: false,
				slideOffset: 0,
				swipeLeft: null,
				swiping: false,
				$list: null,
				touchObject: {},
				transformsEnabled: false,
				unslicked: false
			};

			$.extend(_, _.initials);

			_.activeBreakpoint = null;
			_.animType = null;
			_.animProp = null;
			_.breakpoints = [];
			_.breakpointSettings = [];
			_.cssTransitions = false;
			_.focussed = false;
			_.interrupted = false;
			_.hidden = 'hidden';
			_.paused = true;
			_.positionProp = null;
			_.respondTo = null;
			_.rowCount = 1;
			_.shouldClick = true;
			_.$slider = $(element);
			_.$slidesCache = null;
			_.transformType = null;
			_.transitionType = null;
			_.visibilityChange = 'visibilitychange';
			_.windowWidth = 0;
			_.windowTimer = null;

			dataSettings = $(element).data('slick') || {};

			_.options = $.extend({}, _.defaults, settings, dataSettings);

			_.currentSlide = _.options.initialSlide;

			_.originalSettings = _.options;

			if (typeof document.mozHidden !== 'undefined') {
				_.hidden = 'mozHidden';
				_.visibilityChange = 'mozvisibilitychange';
			} else if (typeof document.webkitHidden !== 'undefined') {
				_.hidden = 'webkitHidden';
				_.visibilityChange = 'webkitvisibilitychange';
			}

			_.autoPlay = $.proxy(_.autoPlay, _);
			_.autoPlayClear = $.proxy(_.autoPlayClear, _);
			_.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
			_.changeSlide = $.proxy(_.changeSlide, _);
			_.clickHandler = $.proxy(_.clickHandler, _);
			_.selectHandler = $.proxy(_.selectHandler, _);
			_.setPosition = $.proxy(_.setPosition, _);
			_.swipeHandler = $.proxy(_.swipeHandler, _);
			_.dragHandler = $.proxy(_.dragHandler, _);
			_.keyHandler = $.proxy(_.keyHandler, _);

			_.instanceUid = instanceUid++;

			// A simple way to check for HTML strings
			// Strict HTML recognition (must start with <)
			// Extracted from jQuery v1.11 source
			_.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;

			_.registerBreakpoints();
			_.init(true);
		}

		return Slick;
	}();

	Slick.prototype.activateADA = function () {
		var _ = this;

		_.$slideTrack.find('.slick-active').attr({
			'aria-hidden': 'false'
		}).find('a, input, button, select').attr({
			'tabindex': '0'
		});
	};

	Slick.prototype.addSlide = Slick.prototype.slickAdd = function (markup, index, addBefore) {

		var _ = this;

		if (typeof index === 'boolean') {
			addBefore = index;
			index = null;
		} else if (index < 0 || index >= _.slideCount) {
			return false;
		}

		_.unload();

		if (typeof index === 'number') {
			if (index === 0 && _.$slides.length === 0) {
				$(markup).appendTo(_.$slideTrack);
			} else if (addBefore) {
				$(markup).insertBefore(_.$slides.eq(index));
			} else {
				$(markup).insertAfter(_.$slides.eq(index));
			}
		} else {
			if (addBefore === true) {
				$(markup).prependTo(_.$slideTrack);
			} else {
				$(markup).appendTo(_.$slideTrack);
			}
		}

		_.$slides = _.$slideTrack.children(this.options.slide);

		_.$slideTrack.children(this.options.slide).detach();

		_.$slideTrack.append(_.$slides);

		_.$slides.each(function (index, element) {
			$(element).attr('data-slick-index', index);
		});

		_.$slidesCache = _.$slides;

		_.reinit();
	};

	Slick.prototype.animateHeight = function () {
		var _ = this;
		if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
			var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
			_.$list.animate({
				height: targetHeight
			}, _.options.speed);
		}
	};

	Slick.prototype.animateSlide = function (targetLeft, callback) {

		var animProps = {},
		    _ = this;

		_.animateHeight();

		if (_.options.rtl === true && _.options.vertical === false) {
			targetLeft = -targetLeft;
		}
		if (_.transformsEnabled === false) {
			if (_.options.vertical === false) {
				_.$slideTrack.animate({
					left: targetLeft
				}, _.options.speed, _.options.easing, callback);
			} else {
				_.$slideTrack.animate({
					top: targetLeft
				}, _.options.speed, _.options.easing, callback);
			}
		} else {

			if (_.cssTransitions === false) {
				if (_.options.rtl === true) {
					_.currentLeft = -_.currentLeft;
				}
				$({
					animStart: _.currentLeft
				}).animate({
					animStart: targetLeft
				}, {
					duration: _.options.speed,
					easing: _.options.easing,
					step: function step(now) {
						now = Math.ceil(now);
						if (_.options.vertical === false) {
							animProps[_.animType] = 'translate(' + now + 'px, 0px)';
							_.$slideTrack.css(animProps);
						} else {
							animProps[_.animType] = 'translate(0px,' + now + 'px)';
							_.$slideTrack.css(animProps);
						}
					},
					complete: function complete() {
						if (callback) {
							callback.call();
						}
					}
				});
			} else {

				_.applyTransition();
				targetLeft = Math.ceil(targetLeft);

				if (_.options.vertical === false) {
					animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
				} else {
					animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
				}
				_.$slideTrack.css(animProps);

				if (callback) {
					setTimeout(function () {

						_.disableTransition();

						callback.call();
					}, _.options.speed);
				}
			}
		}
	};

	Slick.prototype.getNavTarget = function () {

		var _ = this,
		    asNavFor = _.options.asNavFor;

		if (asNavFor && asNavFor !== null) {
			asNavFor = $(asNavFor).not(_.$slider);
		}

		return asNavFor;
	};

	Slick.prototype.asNavFor = function (index) {

		var _ = this,
		    asNavFor = _.getNavTarget();

		if (asNavFor !== null && (typeof asNavFor === 'undefined' ? 'undefined' : _typeof(asNavFor)) === 'object') {
			asNavFor.each(function () {
				var target = $(this).slick('getSlick');
				if (!target.unslicked) {
					target.slideHandler(index, true);
				}
			});
		}
	};

	Slick.prototype.applyTransition = function (slide) {

		var _ = this,
		    transition = {};

		if (_.options.fade === false) {
			transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
		} else {
			transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
		}

		if (_.options.fade === false) {
			_.$slideTrack.css(transition);
		} else {
			_.$slides.eq(slide).css(transition);
		}
	};

	Slick.prototype.autoPlay = function () {

		var _ = this;

		_.autoPlayClear();

		if (_.slideCount > _.options.slidesToShow) {
			_.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed);
		}
	};

	Slick.prototype.autoPlayClear = function () {

		var _ = this;

		if (_.autoPlayTimer) {
			clearInterval(_.autoPlayTimer);
		}
	};

	Slick.prototype.autoPlayIterator = function () {

		var _ = this,
		    slideTo = _.currentSlide + _.options.slidesToScroll;

		if (!_.paused && !_.interrupted && !_.focussed) {

			if (_.options.infinite === false) {

				if (_.direction === 1 && _.currentSlide + 1 === _.slideCount - 1) {
					_.direction = 0;
				} else if (_.direction === 0) {

					slideTo = _.currentSlide - _.options.slidesToScroll;

					if (_.currentSlide - 1 === 0) {
						_.direction = 1;
					}
				}
			}

			_.slideHandler(slideTo);
		}
	};

	Slick.prototype.buildArrows = function () {

		var _ = this;

		if (_.options.arrows === true) {

			_.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
			_.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

			if (_.slideCount > _.options.slidesToShow) {

				_.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
				_.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

				if (_.htmlExpr.test(_.options.prevArrow)) {
					_.$prevArrow.prependTo(_.options.appendArrows);
				}

				if (_.htmlExpr.test(_.options.nextArrow)) {
					_.$nextArrow.appendTo(_.options.appendArrows);
				}

				if (_.options.infinite !== true) {
					_.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
				}
			} else {

				_.$prevArrow.add(_.$nextArrow).addClass('slick-hidden').attr({
					'aria-disabled': 'true',
					'tabindex': '-1'
				});
			}
		}
	};

	Slick.prototype.buildDots = function () {

		var _ = this,
		    i,
		    dot;

		if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

			_.$slider.addClass('slick-dotted');

			dot = $('<ul />').addClass(_.options.dotsClass);

			for (i = 0; i <= _.getDotCount(); i += 1) {
				dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
			}

			_.$dots = dot.appendTo(_.options.appendDots);

			_.$dots.find('li').first().addClass('slick-active');
		}
	};

	Slick.prototype.buildOut = function () {

		var _ = this;

		_.$slides = _.$slider.children(_.options.slide + ':not(.slick-cloned)').addClass('slick-slide');

		_.slideCount = _.$slides.length;

		_.$slides.each(function (index, element) {
			$(element).attr('data-slick-index', index).data('originalStyling', $(element).attr('style') || '');
		});

		_.$slider.addClass('slick-slider');

		_.$slideTrack = _.slideCount === 0 ? $('<div class="slick-track"/>').appendTo(_.$slider) : _.$slides.wrapAll('<div class="slick-track"/>').parent();

		_.$list = _.$slideTrack.wrap('<div class="slick-list"/>').parent();
		_.$slideTrack.css('opacity', 0);

		if (_.options.centerMode === true || _.options.swipeToSlide === true) {
			_.options.slidesToScroll = 1;
		}

		$('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

		_.setupInfinite();

		_.buildArrows();

		_.buildDots();

		_.updateDots();

		_.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

		if (_.options.draggable === true) {
			_.$list.addClass('draggable');
		}
	};

	Slick.prototype.buildRows = function () {

		var _ = this,
		    a,
		    b,
		    c,
		    newSlides,
		    numOfSlides,
		    originalSlides,
		    slidesPerSection;

		newSlides = document.createDocumentFragment();
		originalSlides = _.$slider.children();

		if (_.options.rows > 0) {

			slidesPerSection = _.options.slidesPerRow * _.options.rows;
			numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);

			for (a = 0; a < numOfSlides; a++) {
				var slide = document.createElement('div');
				for (b = 0; b < _.options.rows; b++) {
					var row = document.createElement('div');
					for (c = 0; c < _.options.slidesPerRow; c++) {
						var target = a * slidesPerSection + (b * _.options.slidesPerRow + c);
						if (originalSlides.get(target)) {
							row.appendChild(originalSlides.get(target));
						}
					}
					slide.appendChild(row);
				}
				newSlides.appendChild(slide);
			}

			_.$slider.empty().append(newSlides);
			_.$slider.children().children().children().css({
				'width': 100 / _.options.slidesPerRow + '%',
				'display': 'inline-block'
			});
		}
	};

	Slick.prototype.checkResponsive = function (initial, forceUpdate) {

		var _ = this,
		    breakpoint,
		    targetBreakpoint,
		    respondToWidth,
		    triggerBreakpoint = false;
		var sliderWidth = _.$slider.width();
		var windowWidth = window.innerWidth || $(window).width();

		if (_.respondTo === 'window') {
			respondToWidth = windowWidth;
		} else if (_.respondTo === 'slider') {
			respondToWidth = sliderWidth;
		} else if (_.respondTo === 'min') {
			respondToWidth = Math.min(windowWidth, sliderWidth);
		}

		if (_.options.responsive && _.options.responsive.length && _.options.responsive !== null) {

			targetBreakpoint = null;

			for (breakpoint in _.breakpoints) {
				if (_.breakpoints.hasOwnProperty(breakpoint)) {
					if (_.originalSettings.mobileFirst === false) {
						if (respondToWidth < _.breakpoints[breakpoint]) {
							targetBreakpoint = _.breakpoints[breakpoint];
						}
					} else {
						if (respondToWidth > _.breakpoints[breakpoint]) {
							targetBreakpoint = _.breakpoints[breakpoint];
						}
					}
				}
			}

			if (targetBreakpoint !== null) {
				if (_.activeBreakpoint !== null) {
					if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
						_.activeBreakpoint = targetBreakpoint;
						if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
							_.unslick(targetBreakpoint);
						} else {
							_.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
							if (initial === true) {
								_.currentSlide = _.options.initialSlide;
							}
							_.refresh(initial);
						}
						triggerBreakpoint = targetBreakpoint;
					}
				} else {
					_.activeBreakpoint = targetBreakpoint;
					if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
						_.unslick(targetBreakpoint);
					} else {
						_.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
						if (initial === true) {
							_.currentSlide = _.options.initialSlide;
						}
						_.refresh(initial);
					}
					triggerBreakpoint = targetBreakpoint;
				}
			} else {
				if (_.activeBreakpoint !== null) {
					_.activeBreakpoint = null;
					_.options = _.originalSettings;
					if (initial === true) {
						_.currentSlide = _.options.initialSlide;
					}
					_.refresh(initial);
					triggerBreakpoint = targetBreakpoint;
				}
			}

			// only trigger breakpoints during an actual break. not on initialize.
			if (!initial && triggerBreakpoint !== false) {
				_.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
			}
		}
	};

	Slick.prototype.changeSlide = function (event, dontAnimate) {

		var _ = this,
		    $target = $(event.currentTarget),
		    indexOffset,
		    slideOffset,
		    unevenOffset;

		// If target is a link, prevent default action.
		if ($target.is('a')) {
			event.preventDefault();
		}

		// If target is not the <li> element (ie: a child), find the <li>.
		if (!$target.is('li')) {
			$target = $target.closest('li');
		}

		unevenOffset = _.slideCount % _.options.slidesToScroll !== 0;
		indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

		switch (event.data.message) {

			case 'previous':
				slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
				if (_.slideCount > _.options.slidesToShow) {
					_.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
				}
				break;

			case 'next':
				slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
				if (_.slideCount > _.options.slidesToShow) {
					_.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
				}
				break;

			case 'index':
				var index = event.data.index === 0 ? 0 : event.data.index || $target.index() * _.options.slidesToScroll;

				_.slideHandler(_.checkNavigable(index), false, dontAnimate);
				$target.children().trigger('focus');
				break;

			default:
				return;
		}
	};

	Slick.prototype.checkNavigable = function (index) {

		var _ = this,
		    navigables,
		    prevNavigable;

		navigables = _.getNavigableIndexes();
		prevNavigable = 0;
		if (index > navigables[navigables.length - 1]) {
			index = navigables[navigables.length - 1];
		} else {
			for (var n in navigables) {
				if (index < navigables[n]) {
					index = prevNavigable;
					break;
				}
				prevNavigable = navigables[n];
			}
		}

		return index;
	};

	Slick.prototype.cleanUpEvents = function () {

		var _ = this;

		if (_.options.dots && _.$dots !== null) {

			$('li', _.$dots).off('click.slick', _.changeSlide).off('mouseenter.slick', $.proxy(_.interrupt, _, true)).off('mouseleave.slick', $.proxy(_.interrupt, _, false));

			if (_.options.accessibility === true) {
				_.$dots.off('keydown.slick', _.keyHandler);
			}
		}

		_.$slider.off('focus.slick blur.slick');

		if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
			_.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
			_.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

			if (_.options.accessibility === true) {
				_.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
				_.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
			}
		}

		_.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
		_.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
		_.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
		_.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

		_.$list.off('click.slick', _.clickHandler);

		$(document).off(_.visibilityChange, _.visibility);

		_.cleanUpSlideEvents();

		if (_.options.accessibility === true) {
			_.$list.off('keydown.slick', _.keyHandler);
		}

		if (_.options.focusOnSelect === true) {
			$(_.$slideTrack).children().off('click.slick', _.selectHandler);
		}

		$(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

		$(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

		$('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

		$(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
	};

	Slick.prototype.cleanUpSlideEvents = function () {

		var _ = this;

		_.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
		_.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));
	};

	Slick.prototype.cleanUpRows = function () {

		var _ = this,
		    originalSlides;

		if (_.options.rows > 0) {
			originalSlides = _.$slides.children().children();
			originalSlides.removeAttr('style');
			_.$slider.empty().append(originalSlides);
		}
	};

	Slick.prototype.clickHandler = function (event) {

		var _ = this;

		if (_.shouldClick === false) {
			event.stopImmediatePropagation();
			event.stopPropagation();
			event.preventDefault();
		}
	};

	Slick.prototype.destroy = function (refresh) {

		var _ = this;

		_.autoPlayClear();

		_.touchObject = {};

		_.cleanUpEvents();

		$('.slick-cloned', _.$slider).detach();

		if (_.$dots) {
			_.$dots.remove();
		}

		if (_.$prevArrow && _.$prevArrow.length) {

			_.$prevArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

			if (_.htmlExpr.test(_.options.prevArrow)) {
				_.$prevArrow.remove();
			}
		}

		if (_.$nextArrow && _.$nextArrow.length) {

			_.$nextArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

			if (_.htmlExpr.test(_.options.nextArrow)) {
				_.$nextArrow.remove();
			}
		}

		if (_.$slides) {

			_.$slides.removeClass('slick-slide slick-active slick-center slick-visible slick-current').removeAttr('aria-hidden').removeAttr('data-slick-index').each(function () {
				$(this).attr('style', $(this).data('originalStyling'));
			});

			_.$slideTrack.children(this.options.slide).detach();

			_.$slideTrack.detach();

			_.$list.detach();

			_.$slider.append(_.$slides);
		}

		_.cleanUpRows();

		_.$slider.removeClass('slick-slider');
		_.$slider.removeClass('slick-initialized');
		_.$slider.removeClass('slick-dotted');

		_.unslicked = true;

		if (!refresh) {
			_.$slider.trigger('destroy', [_]);
		}
	};

	Slick.prototype.disableTransition = function (slide) {

		var _ = this,
		    transition = {};

		transition[_.transitionType] = '';

		if (_.options.fade === false) {
			_.$slideTrack.css(transition);
		} else {
			_.$slides.eq(slide).css(transition);
		}
	};

	Slick.prototype.fadeSlide = function (slideIndex, callback) {

		var _ = this;

		if (_.cssTransitions === false) {

			_.$slides.eq(slideIndex).css({
				zIndex: _.options.zIndex
			});

			_.$slides.eq(slideIndex).animate({
				opacity: 1
			}, _.options.speed, _.options.easing, callback);
		} else {

			_.applyTransition(slideIndex);

			_.$slides.eq(slideIndex).css({
				opacity: 1,
				zIndex: _.options.zIndex
			});

			if (callback) {
				setTimeout(function () {

					_.disableTransition(slideIndex);

					callback.call();
				}, _.options.speed);
			}
		}
	};

	Slick.prototype.fadeSlideOut = function (slideIndex) {

		var _ = this;

		if (_.cssTransitions === false) {

			_.$slides.eq(slideIndex).animate({
				opacity: 0,
				zIndex: _.options.zIndex - 2
			}, _.options.speed, _.options.easing);
		} else {

			_.applyTransition(slideIndex);

			_.$slides.eq(slideIndex).css({
				opacity: 0,
				zIndex: _.options.zIndex - 2
			});
		}
	};

	Slick.prototype.filterSlides = Slick.prototype.slickFilter = function (filter) {

		var _ = this;

		if (filter !== null) {

			_.$slidesCache = _.$slides;

			_.unload();

			_.$slideTrack.children(this.options.slide).detach();

			_.$slidesCache.filter(filter).appendTo(_.$slideTrack);

			_.reinit();
		}
	};

	Slick.prototype.focusHandler = function () {

		var _ = this;

		_.$slider.off('focus.slick blur.slick').on('focus.slick blur.slick', '*', function (event) {

			event.stopImmediatePropagation();
			var $sf = $(this);

			setTimeout(function () {

				if (_.options.pauseOnFocus) {
					_.focussed = $sf.is(':focus');
					_.autoPlay();
				}
			}, 0);
		});
	};

	Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function () {

		var _ = this;
		return _.currentSlide;
	};

	Slick.prototype.getDotCount = function () {

		var _ = this;

		var breakPoint = 0;
		var counter = 0;
		var pagerQty = 0;

		if (_.options.infinite === true) {
			if (_.slideCount <= _.options.slidesToShow) {
				++pagerQty;
			} else {
				while (breakPoint < _.slideCount) {
					++pagerQty;
					breakPoint = counter + _.options.slidesToScroll;
					counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
				}
			}
		} else if (_.options.centerMode === true) {
			pagerQty = _.slideCount;
		} else if (!_.options.asNavFor) {
			pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
		} else {
			while (breakPoint < _.slideCount) {
				++pagerQty;
				breakPoint = counter + _.options.slidesToScroll;
				counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
			}
		}

		return pagerQty - 1;
	};

	Slick.prototype.getLeft = function (slideIndex) {

		var _ = this,
		    targetLeft,
		    verticalHeight,
		    verticalOffset = 0,
		    targetSlide,
		    coef;

		_.slideOffset = 0;
		verticalHeight = _.$slides.first().outerHeight(true);

		if (_.options.infinite === true) {
			if (_.slideCount > _.options.slidesToShow) {
				_.slideOffset = _.slideWidth * _.options.slidesToShow * -1;
				coef = -1;

				if (_.options.vertical === true && _.options.centerMode === true) {
					if (_.options.slidesToShow === 2) {
						coef = -1.5;
					} else if (_.options.slidesToShow === 1) {
						coef = -2;
					}
				}
				verticalOffset = verticalHeight * _.options.slidesToShow * coef;
			}
			if (_.slideCount % _.options.slidesToScroll !== 0) {
				if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
					if (slideIndex > _.slideCount) {
						_.slideOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth * -1;
						verticalOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight * -1;
					} else {
						_.slideOffset = _.slideCount % _.options.slidesToScroll * _.slideWidth * -1;
						verticalOffset = _.slideCount % _.options.slidesToScroll * verticalHeight * -1;
					}
				}
			}
		} else {
			if (slideIndex + _.options.slidesToShow > _.slideCount) {
				_.slideOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * _.slideWidth;
				verticalOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * verticalHeight;
			}
		}

		if (_.slideCount <= _.options.slidesToShow) {
			_.slideOffset = 0;
			verticalOffset = 0;
		}

		if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
			_.slideOffset = _.slideWidth * Math.floor(_.options.slidesToShow) / 2 - _.slideWidth * _.slideCount / 2;
		} else if (_.options.centerMode === true && _.options.infinite === true) {
			_.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
		} else if (_.options.centerMode === true) {
			_.slideOffset = 0;
			_.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
		}

		if (_.options.vertical === false) {
			targetLeft = slideIndex * _.slideWidth * -1 + _.slideOffset;
		} else {
			targetLeft = slideIndex * verticalHeight * -1 + verticalOffset;
		}

		if (_.options.variableWidth === true) {

			if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
				targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
			} else {
				targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
			}

			if (_.options.rtl === true) {
				if (targetSlide[0]) {
					targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
				} else {
					targetLeft = 0;
				}
			} else {
				targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
			}

			if (_.options.centerMode === true) {
				if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
					targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
				} else {
					targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
				}

				if (_.options.rtl === true) {
					if (targetSlide[0]) {
						targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
					} else {
						targetLeft = 0;
					}
				} else {
					targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
				}

				targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
			}
		}

		return targetLeft;
	};

	Slick.prototype.getOption = Slick.prototype.slickGetOption = function (option) {

		var _ = this;

		return _.options[option];
	};

	Slick.prototype.getNavigableIndexes = function () {

		var _ = this,
		    breakPoint = 0,
		    counter = 0,
		    indexes = [],
		    max;

		if (_.options.infinite === false) {
			max = _.slideCount;
		} else {
			breakPoint = _.options.slidesToScroll * -1;
			counter = _.options.slidesToScroll * -1;
			max = _.slideCount * 2;
		}

		while (breakPoint < max) {
			indexes.push(breakPoint);
			breakPoint = counter + _.options.slidesToScroll;
			counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
		}

		return indexes;
	};

	Slick.prototype.getSlick = function () {

		return this;
	};

	Slick.prototype.getSlideCount = function () {

		var _ = this,
		    slidesTraversed,
		    swipedSlide,
		    centerOffset;

		centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

		if (_.options.swipeToSlide === true) {
			_.$slideTrack.find('.slick-slide').each(function (index, slide) {
				if (slide.offsetLeft - centerOffset + $(slide).outerWidth() / 2 > _.swipeLeft * -1) {
					swipedSlide = slide;
					return false;
				}
			});

			slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

			return slidesTraversed;
		} else {
			return _.options.slidesToScroll;
		}
	};

	Slick.prototype.goTo = Slick.prototype.slickGoTo = function (slide, dontAnimate) {

		var _ = this;

		_.changeSlide({
			data: {
				message: 'index',
				index: parseInt(slide)
			}
		}, dontAnimate);
	};

	Slick.prototype.init = function (creation) {

		var _ = this;

		if (!$(_.$slider).hasClass('slick-initialized')) {

			$(_.$slider).addClass('slick-initialized');

			_.buildRows();
			_.buildOut();
			_.setProps();
			_.startLoad();
			_.loadSlider();
			_.initializeEvents();
			_.updateArrows();
			_.updateDots();
			_.checkResponsive(true);
			_.focusHandler();
		}

		if (creation) {
			_.$slider.trigger('init', [_]);
		}

		if (_.options.accessibility === true) {
			_.initADA();
		}

		if (_.options.autoplay) {

			_.paused = false;
			_.autoPlay();
		}
	};

	Slick.prototype.initADA = function () {
		var _ = this,
		    numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
		    tabControlIndexes = _.getNavigableIndexes().filter(function (val) {
			return val >= 0 && val < _.slideCount;
		});

		_.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
			'aria-hidden': 'true',
			'tabindex': '-1'
		}).find('a, input, button, select').attr({
			'tabindex': '-1'
		});

		if (_.$dots !== null) {
			_.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function (i) {
				var slideControlIndex = tabControlIndexes.indexOf(i);

				$(this).attr({
					'role': 'tabpanel',
					'id': 'slick-slide' + _.instanceUid + i,
					'tabindex': -1
				});

				if (slideControlIndex !== -1) {
					var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex;
					if ($('#' + ariaButtonControl).length) {
						$(this).attr({
							'aria-describedby': ariaButtonControl
						});
					}
				}
			});

			_.$dots.attr('role', 'tablist').find('li').each(function (i) {
				var mappedSlideIndex = tabControlIndexes[i];

				$(this).attr({
					'role': 'presentation'
				});

				$(this).find('button').first().attr({
					'role': 'tab',
					'id': 'slick-slide-control' + _.instanceUid + i,
					'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
					'aria-label': i + 1 + ' of ' + numDotGroups,
					'aria-selected': null,
					'tabindex': '-1'
				});
			}).eq(_.currentSlide).find('button').attr({
				'aria-selected': 'true',
				'tabindex': '0'
			}).end();
		}

		for (var i = _.currentSlide, max = i + _.options.slidesToShow; i < max; i++) {
			if (_.options.focusOnChange) {
				_.$slides.eq(i).attr({ 'tabindex': '0' });
			} else {
				_.$slides.eq(i).removeAttr('tabindex');
			}
		}

		_.activateADA();
	};

	Slick.prototype.initArrowEvents = function () {

		var _ = this;

		if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
			_.$prevArrow.off('click.slick').on('click.slick', {
				message: 'previous'
			}, _.changeSlide);
			_.$nextArrow.off('click.slick').on('click.slick', {
				message: 'next'
			}, _.changeSlide);

			if (_.options.accessibility === true) {
				_.$prevArrow.on('keydown.slick', _.keyHandler);
				_.$nextArrow.on('keydown.slick', _.keyHandler);
			}
		}
	};

	Slick.prototype.initDotEvents = function () {

		var _ = this;

		if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
			$('li', _.$dots).on('click.slick', {
				message: 'index'
			}, _.changeSlide);

			if (_.options.accessibility === true) {
				_.$dots.on('keydown.slick', _.keyHandler);
			}
		}

		if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {

			$('li', _.$dots).on('mouseenter.slick', $.proxy(_.interrupt, _, true)).on('mouseleave.slick', $.proxy(_.interrupt, _, false));
		}
	};

	Slick.prototype.initSlideEvents = function () {

		var _ = this;

		if (_.options.pauseOnHover) {

			_.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
			_.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));
		}
	};

	Slick.prototype.initializeEvents = function () {

		var _ = this;

		_.initArrowEvents();

		_.initDotEvents();
		_.initSlideEvents();

		_.$list.on('touchstart.slick mousedown.slick', {
			action: 'start'
		}, _.swipeHandler);
		_.$list.on('touchmove.slick mousemove.slick', {
			action: 'move'
		}, _.swipeHandler);
		_.$list.on('touchend.slick mouseup.slick', {
			action: 'end'
		}, _.swipeHandler);
		_.$list.on('touchcancel.slick mouseleave.slick', {
			action: 'end'
		}, _.swipeHandler);

		_.$list.on('click.slick', _.clickHandler);

		$(document).on(_.visibilityChange, $.proxy(_.visibility, _));

		if (_.options.accessibility === true) {
			_.$list.on('keydown.slick', _.keyHandler);
		}

		if (_.options.focusOnSelect === true) {
			$(_.$slideTrack).children().on('click.slick', _.selectHandler);
		}

		$(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

		$(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

		$('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

		$(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
		$(_.setPosition);
	};

	Slick.prototype.initUI = function () {

		var _ = this;

		if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

			_.$prevArrow.show();
			_.$nextArrow.show();
		}

		if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

			_.$dots.show();
		}
	};

	Slick.prototype.keyHandler = function (event) {

		var _ = this;
		//Dont slide if the cursor is inside the form fields and arrow keys are pressed
		if (!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
			if (event.keyCode === 37 && _.options.accessibility === true) {
				_.changeSlide({
					data: {
						message: _.options.rtl === true ? 'next' : 'previous'
					}
				});
			} else if (event.keyCode === 39 && _.options.accessibility === true) {
				_.changeSlide({
					data: {
						message: _.options.rtl === true ? 'previous' : 'next'
					}
				});
			}
		}
	};

	Slick.prototype.lazyLoad = function () {

		var _ = this,
		    loadRange,
		    cloneRange,
		    rangeStart,
		    rangeEnd;

		function loadImages(imagesScope) {

			$('img[data-lazy]', imagesScope).each(function () {

				var image = $(this),
				    imageSource = $(this).attr('data-lazy'),
				    imageSrcSet = $(this).attr('data-srcset'),
				    imageSizes = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
				    imageToLoad = document.createElement('img');

				imageToLoad.onload = function () {

					image.animate({ opacity: 0 }, 100, function () {

						if (imageSrcSet) {
							image.attr('srcset', imageSrcSet);

							if (imageSizes) {
								image.attr('sizes', imageSizes);
							}
						}

						image.attr('src', imageSource).animate({ opacity: 1 }, 200, function () {
							image.removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');
						});
						_.$slider.trigger('lazyLoaded', [_, image, imageSource]);
					});
				};

				imageToLoad.onerror = function () {

					image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

					_.$slider.trigger('lazyLoadError', [_, image, imageSource]);
				};

				imageToLoad.src = imageSource;
			});
		}

		if (_.options.centerMode === true) {
			if (_.options.infinite === true) {
				rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
				rangeEnd = rangeStart + _.options.slidesToShow + 2;
			} else {
				rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
				rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
			}
		} else {
			rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
			rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
			if (_.options.fade === true) {
				if (rangeStart > 0) rangeStart--;
				if (rangeEnd <= _.slideCount) rangeEnd++;
			}
		}

		loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

		if (_.options.lazyLoad === 'anticipated') {
			var prevSlide = rangeStart - 1,
			    nextSlide = rangeEnd,
			    $slides = _.$slider.find('.slick-slide');

			for (var i = 0; i < _.options.slidesToScroll; i++) {
				if (prevSlide < 0) prevSlide = _.slideCount - 1;
				loadRange = loadRange.add($slides.eq(prevSlide));
				loadRange = loadRange.add($slides.eq(nextSlide));
				prevSlide--;
				nextSlide++;
			}
		}

		loadImages(loadRange);

		if (_.slideCount <= _.options.slidesToShow) {
			cloneRange = _.$slider.find('.slick-slide');
			loadImages(cloneRange);
		} else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
			cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
			loadImages(cloneRange);
		} else if (_.currentSlide === 0) {
			cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
			loadImages(cloneRange);
		}
	};

	Slick.prototype.loadSlider = function () {

		var _ = this;

		_.setPosition();

		_.$slideTrack.css({
			opacity: 1
		});

		_.$slider.removeClass('slick-loading');

		_.initUI();

		if (_.options.lazyLoad === 'progressive') {
			_.progressiveLazyLoad();
		}
	};

	Slick.prototype.next = Slick.prototype.slickNext = function () {

		var _ = this;

		_.changeSlide({
			data: {
				message: 'next'
			}
		});
	};

	Slick.prototype.orientationChange = function () {

		var _ = this;

		_.checkResponsive();
		_.setPosition();
	};

	Slick.prototype.pause = Slick.prototype.slickPause = function () {

		var _ = this;

		_.autoPlayClear();
		_.paused = true;
	};

	Slick.prototype.play = Slick.prototype.slickPlay = function () {

		var _ = this;

		_.autoPlay();
		_.options.autoplay = true;
		_.paused = false;
		_.focussed = false;
		_.interrupted = false;
	};

	Slick.prototype.postSlide = function (index) {

		var _ = this;

		if (!_.unslicked) {

			_.$slider.trigger('afterChange', [_, index]);

			_.animating = false;

			if (_.slideCount > _.options.slidesToShow) {
				_.setPosition();
			}

			_.swipeLeft = null;

			if (_.options.autoplay) {
				_.autoPlay();
			}

			if (_.options.accessibility === true) {
				_.initADA();

				if (_.options.focusOnChange) {
					var $currentSlide = $(_.$slides.get(_.currentSlide));
					$currentSlide.attr('tabindex', 0).focus();
				}
			}
		}
	};

	Slick.prototype.prev = Slick.prototype.slickPrev = function () {

		var _ = this;

		_.changeSlide({
			data: {
				message: 'previous'
			}
		});
	};

	Slick.prototype.preventDefault = function (event) {

		event.preventDefault();
	};

	Slick.prototype.progressiveLazyLoad = function (tryCount) {

		tryCount = tryCount || 1;

		var _ = this,
		    $imgsToLoad = $('img[data-lazy]', _.$slider),
		    image,
		    imageSource,
		    imageSrcSet,
		    imageSizes,
		    imageToLoad;

		if ($imgsToLoad.length) {

			image = $imgsToLoad.first();
			imageSource = image.attr('data-lazy');
			imageSrcSet = image.attr('data-srcset');
			imageSizes = image.attr('data-sizes') || _.$slider.attr('data-sizes');
			imageToLoad = document.createElement('img');

			imageToLoad.onload = function () {

				if (imageSrcSet) {
					image.attr('srcset', imageSrcSet);

					if (imageSizes) {
						image.attr('sizes', imageSizes);
					}
				}

				image.attr('src', imageSource).removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');

				if (_.options.adaptiveHeight === true) {
					_.setPosition();
				}

				_.$slider.trigger('lazyLoaded', [_, image, imageSource]);
				_.progressiveLazyLoad();
			};

			imageToLoad.onerror = function () {

				if (tryCount < 3) {

					/**
      * try to load the image 3 times,
      * leave a slight delay so we don't get
      * servers blocking the request.
      */
					setTimeout(function () {
						_.progressiveLazyLoad(tryCount + 1);
					}, 500);
				} else {

					image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

					_.$slider.trigger('lazyLoadError', [_, image, imageSource]);

					_.progressiveLazyLoad();
				}
			};

			imageToLoad.src = imageSource;
		} else {

			_.$slider.trigger('allImagesLoaded', [_]);
		}
	};

	Slick.prototype.refresh = function (initializing) {

		var _ = this,
		    currentSlide,
		    lastVisibleIndex;

		lastVisibleIndex = _.slideCount - _.options.slidesToShow;

		// in non-infinite sliders, we don't want to go past the
		// last visible index.
		if (!_.options.infinite && _.currentSlide > lastVisibleIndex) {
			_.currentSlide = lastVisibleIndex;
		}

		// if less slides than to show, go to start.
		if (_.slideCount <= _.options.slidesToShow) {
			_.currentSlide = 0;
		}

		currentSlide = _.currentSlide;

		_.destroy(true);

		$.extend(_, _.initials, { currentSlide: currentSlide });

		_.init();

		if (!initializing) {

			_.changeSlide({
				data: {
					message: 'index',
					index: currentSlide
				}
			}, false);
		}
	};

	Slick.prototype.registerBreakpoints = function () {

		var _ = this,
		    breakpoint,
		    currentBreakpoint,
		    l,
		    responsiveSettings = _.options.responsive || null;

		if ($.type(responsiveSettings) === 'array' && responsiveSettings.length) {

			_.respondTo = _.options.respondTo || 'window';

			for (breakpoint in responsiveSettings) {

				l = _.breakpoints.length - 1;

				if (responsiveSettings.hasOwnProperty(breakpoint)) {
					currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

					// loop through the breakpoints and cut out any existing
					// ones with the same breakpoint number, we don't want dupes.
					while (l >= 0) {
						if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
							_.breakpoints.splice(l, 1);
						}
						l--;
					}

					_.breakpoints.push(currentBreakpoint);
					_.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
				}
			}

			_.breakpoints.sort(function (a, b) {
				return _.options.mobileFirst ? a - b : b - a;
			});
		}
	};

	Slick.prototype.reinit = function () {

		var _ = this;

		_.$slides = _.$slideTrack.children(_.options.slide).addClass('slick-slide');

		_.slideCount = _.$slides.length;

		if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
			_.currentSlide = _.currentSlide - _.options.slidesToScroll;
		}

		if (_.slideCount <= _.options.slidesToShow) {
			_.currentSlide = 0;
		}

		_.registerBreakpoints();

		_.setProps();
		_.setupInfinite();
		_.buildArrows();
		_.updateArrows();
		_.initArrowEvents();
		_.buildDots();
		_.updateDots();
		_.initDotEvents();
		_.cleanUpSlideEvents();
		_.initSlideEvents();

		_.checkResponsive(false, true);

		if (_.options.focusOnSelect === true) {
			$(_.$slideTrack).children().on('click.slick', _.selectHandler);
		}

		_.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

		_.setPosition();
		_.focusHandler();

		_.paused = !_.options.autoplay;
		_.autoPlay();

		_.$slider.trigger('reInit', [_]);
	};

	Slick.prototype.resize = function () {

		var _ = this;

		if ($(window).width() !== _.windowWidth) {
			clearTimeout(_.windowDelay);
			_.windowDelay = window.setTimeout(function () {
				_.windowWidth = $(window).width();
				_.checkResponsive();
				if (!_.unslicked) {
					_.setPosition();
				}
			}, 50);
		}
	};

	Slick.prototype.removeSlide = Slick.prototype.slickRemove = function (index, removeBefore, removeAll) {

		var _ = this;

		if (typeof index === 'boolean') {
			removeBefore = index;
			index = removeBefore === true ? 0 : _.slideCount - 1;
		} else {
			index = removeBefore === true ? --index : index;
		}

		if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
			return false;
		}

		_.unload();

		if (removeAll === true) {
			_.$slideTrack.children().remove();
		} else {
			_.$slideTrack.children(this.options.slide).eq(index).remove();
		}

		_.$slides = _.$slideTrack.children(this.options.slide);

		_.$slideTrack.children(this.options.slide).detach();

		_.$slideTrack.append(_.$slides);

		_.$slidesCache = _.$slides;

		_.reinit();
	};

	Slick.prototype.setCSS = function (position) {

		var _ = this,
		    positionProps = {},
		    x,
		    y;

		if (_.options.rtl === true) {
			position = -position;
		}
		x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
		y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

		positionProps[_.positionProp] = position;

		if (_.transformsEnabled === false) {
			_.$slideTrack.css(positionProps);
		} else {
			positionProps = {};
			if (_.cssTransitions === false) {
				positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
				_.$slideTrack.css(positionProps);
			} else {
				positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
				_.$slideTrack.css(positionProps);
			}
		}
	};

	Slick.prototype.setDimensions = function () {

		var _ = this;

		if (_.options.vertical === false) {
			if (_.options.centerMode === true) {
				_.$list.css({
					padding: '0px ' + _.options.centerPadding
				});
			}
		} else {
			_.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
			if (_.options.centerMode === true) {
				_.$list.css({
					padding: _.options.centerPadding + ' 0px'
				});
			}
		}

		_.listWidth = _.$list.width();
		_.listHeight = _.$list.height();

		if (_.options.vertical === false && _.options.variableWidth === false) {
			_.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
			_.$slideTrack.width(Math.ceil(_.slideWidth * _.$slideTrack.children('.slick-slide').length));
		} else if (_.options.variableWidth === true) {
			_.$slideTrack.width(5000 * _.slideCount);
		} else {
			_.slideWidth = Math.ceil(_.listWidth);
			_.$slideTrack.height(Math.ceil(_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length));
		}

		var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
		if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);
	};

	Slick.prototype.setFade = function () {

		var _ = this,
		    targetLeft;

		_.$slides.each(function (index, element) {
			targetLeft = _.slideWidth * index * -1;
			if (_.options.rtl === true) {
				$(element).css({
					position: 'relative',
					right: targetLeft,
					top: 0,
					zIndex: _.options.zIndex - 2,
					opacity: 0
				});
			} else {
				$(element).css({
					position: 'relative',
					left: targetLeft,
					top: 0,
					zIndex: _.options.zIndex - 2,
					opacity: 0
				});
			}
		});

		_.$slides.eq(_.currentSlide).css({
			zIndex: _.options.zIndex - 1,
			opacity: 1
		});
	};

	Slick.prototype.setHeight = function () {

		var _ = this;

		if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
			var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
			_.$list.css('height', targetHeight);
		}
	};

	Slick.prototype.setOption = Slick.prototype.slickSetOption = function () {

		/**
   * accepts arguments in format of:
   *
   *  - for changing a single option's value:
   *     .slick("setOption", option, value, refresh )
   *
   *  - for changing a set of responsive options:
   *     .slick("setOption", 'responsive', [{}, ...], refresh )
   *
   *  - for updating multiple values at once (not responsive)
   *     .slick("setOption", { 'option': value, ... }, refresh )
   */

		var _ = this,
		    l,
		    item,
		    option,
		    value,
		    refresh = false,
		    type;

		if ($.type(arguments[0]) === 'object') {

			option = arguments[0];
			refresh = arguments[1];
			type = 'multiple';
		} else if ($.type(arguments[0]) === 'string') {

			option = arguments[0];
			value = arguments[1];
			refresh = arguments[2];

			if (arguments[0] === 'responsive' && $.type(arguments[1]) === 'array') {

				type = 'responsive';
			} else if (typeof arguments[1] !== 'undefined') {

				type = 'single';
			}
		}

		if (type === 'single') {

			_.options[option] = value;
		} else if (type === 'multiple') {

			$.each(option, function (opt, val) {

				_.options[opt] = val;
			});
		} else if (type === 'responsive') {

			for (item in value) {

				if ($.type(_.options.responsive) !== 'array') {

					_.options.responsive = [value[item]];
				} else {

					l = _.options.responsive.length - 1;

					// loop through the responsive object and splice out duplicates.
					while (l >= 0) {

						if (_.options.responsive[l].breakpoint === value[item].breakpoint) {

							_.options.responsive.splice(l, 1);
						}

						l--;
					}

					_.options.responsive.push(value[item]);
				}
			}
		}

		if (refresh) {

			_.unload();
			_.reinit();
		}
	};

	Slick.prototype.setPosition = function () {

		var _ = this;

		_.setDimensions();

		_.setHeight();

		if (_.options.fade === false) {
			_.setCSS(_.getLeft(_.currentSlide));
		} else {
			_.setFade();
		}

		_.$slider.trigger('setPosition', [_]);
	};

	Slick.prototype.setProps = function () {

		var _ = this,
		    bodyStyle = document.body.style;

		_.positionProp = _.options.vertical === true ? 'top' : 'left';

		if (_.positionProp === 'top') {
			_.$slider.addClass('slick-vertical');
		} else {
			_.$slider.removeClass('slick-vertical');
		}

		if (bodyStyle.WebkitTransition !== undefined || bodyStyle.MozTransition !== undefined || bodyStyle.msTransition !== undefined) {
			if (_.options.useCSS === true) {
				_.cssTransitions = true;
			}
		}

		if (_.options.fade) {
			if (typeof _.options.zIndex === 'number') {
				if (_.options.zIndex < 3) {
					_.options.zIndex = 3;
				}
			} else {
				_.options.zIndex = _.defaults.zIndex;
			}
		}

		if (bodyStyle.OTransform !== undefined) {
			_.animType = 'OTransform';
			_.transformType = '-o-transform';
			_.transitionType = 'OTransition';
			if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
		}
		if (bodyStyle.MozTransform !== undefined) {
			_.animType = 'MozTransform';
			_.transformType = '-moz-transform';
			_.transitionType = 'MozTransition';
			if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
		}
		if (bodyStyle.webkitTransform !== undefined) {
			_.animType = 'webkitTransform';
			_.transformType = '-webkit-transform';
			_.transitionType = 'webkitTransition';
			if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
		}
		if (bodyStyle.msTransform !== undefined) {
			_.animType = 'msTransform';
			_.transformType = '-ms-transform';
			_.transitionType = 'msTransition';
			if (bodyStyle.msTransform === undefined) _.animType = false;
		}
		if (bodyStyle.transform !== undefined && _.animType !== false) {
			_.animType = 'transform';
			_.transformType = 'transform';
			_.transitionType = 'transition';
		}
		_.transformsEnabled = _.options.useTransform && _.animType !== null && _.animType !== false;
	};

	Slick.prototype.setSlideClasses = function (index) {

		var _ = this,
		    centerOffset,
		    allSlides,
		    indexOffset,
		    remainder;

		allSlides = _.$slider.find('.slick-slide').removeClass('slick-active slick-center slick-current').attr('aria-hidden', 'true');

		_.$slides.eq(index).addClass('slick-current');

		if (_.options.centerMode === true) {

			var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

			centerOffset = Math.floor(_.options.slidesToShow / 2);

			if (_.options.infinite === true) {

				if (index >= centerOffset && index <= _.slideCount - 1 - centerOffset) {
					_.$slides.slice(index - centerOffset + evenCoef, index + centerOffset + 1).addClass('slick-active').attr('aria-hidden', 'false');
				} else {

					indexOffset = _.options.slidesToShow + index;
					allSlides.slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2).addClass('slick-active').attr('aria-hidden', 'false');
				}

				if (index === 0) {

					allSlides.eq(allSlides.length - 1 - _.options.slidesToShow).addClass('slick-center');
				} else if (index === _.slideCount - 1) {

					allSlides.eq(_.options.slidesToShow).addClass('slick-center');
				}
			}

			_.$slides.eq(index).addClass('slick-center');
		} else {

			if (index >= 0 && index <= _.slideCount - _.options.slidesToShow) {

				_.$slides.slice(index, index + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
			} else if (allSlides.length <= _.options.slidesToShow) {

				allSlides.addClass('slick-active').attr('aria-hidden', 'false');
			} else {

				remainder = _.slideCount % _.options.slidesToShow;
				indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

				if (_.options.slidesToShow == _.options.slidesToScroll && _.slideCount - index < _.options.slidesToShow) {

					allSlides.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder).addClass('slick-active').attr('aria-hidden', 'false');
				} else {

					allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
				}
			}
		}

		if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
			_.lazyLoad();
		}
	};

	Slick.prototype.setupInfinite = function () {

		var _ = this,
		    i,
		    slideIndex,
		    infiniteCount;

		if (_.options.fade === true) {
			_.options.centerMode = false;
		}

		if (_.options.infinite === true && _.options.fade === false) {

			slideIndex = null;

			if (_.slideCount > _.options.slidesToShow) {

				if (_.options.centerMode === true) {
					infiniteCount = _.options.slidesToShow + 1;
				} else {
					infiniteCount = _.options.slidesToShow;
				}

				for (i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) {
					slideIndex = i - 1;
					$(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex - _.slideCount).prependTo(_.$slideTrack).addClass('slick-cloned');
				}
				for (i = 0; i < infiniteCount + _.slideCount; i += 1) {
					slideIndex = i;
					$(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex + _.slideCount).appendTo(_.$slideTrack).addClass('slick-cloned');
				}
				_.$slideTrack.find('.slick-cloned').find('[id]').each(function () {
					$(this).attr('id', '');
				});
			}
		}
	};

	Slick.prototype.interrupt = function (toggle) {

		var _ = this;

		if (!toggle) {
			_.autoPlay();
		}
		_.interrupted = toggle;
	};

	Slick.prototype.selectHandler = function (event) {

		var _ = this;

		var targetElement = $(event.target).is('.slick-slide') ? $(event.target) : $(event.target).parents('.slick-slide');

		var index = parseInt(targetElement.attr('data-slick-index'));

		if (!index) index = 0;

		if (_.slideCount <= _.options.slidesToShow) {

			_.slideHandler(index, false, true);
			return;
		}

		_.slideHandler(index);
	};

	Slick.prototype.slideHandler = function (index, sync, dontAnimate) {

		var targetSlide,
		    animSlide,
		    oldSlide,
		    slideLeft,
		    targetLeft = null,
		    _ = this,
		    navTarget;

		sync = sync || false;

		if (_.animating === true && _.options.waitForAnimate === true) {
			return;
		}

		if (_.options.fade === true && _.currentSlide === index) {
			return;
		}

		if (sync === false) {
			_.asNavFor(index);
		}

		targetSlide = index;
		targetLeft = _.getLeft(targetSlide);
		slideLeft = _.getLeft(_.currentSlide);

		_.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

		if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
			if (_.options.fade === false) {
				targetSlide = _.currentSlide;
				if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
					_.animateSlide(slideLeft, function () {
						_.postSlide(targetSlide);
					});
				} else {
					_.postSlide(targetSlide);
				}
			}
			return;
		} else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > _.slideCount - _.options.slidesToScroll)) {
			if (_.options.fade === false) {
				targetSlide = _.currentSlide;
				if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
					_.animateSlide(slideLeft, function () {
						_.postSlide(targetSlide);
					});
				} else {
					_.postSlide(targetSlide);
				}
			}
			return;
		}

		if (_.options.autoplay) {
			clearInterval(_.autoPlayTimer);
		}

		if (targetSlide < 0) {
			if (_.slideCount % _.options.slidesToScroll !== 0) {
				animSlide = _.slideCount - _.slideCount % _.options.slidesToScroll;
			} else {
				animSlide = _.slideCount + targetSlide;
			}
		} else if (targetSlide >= _.slideCount) {
			if (_.slideCount % _.options.slidesToScroll !== 0) {
				animSlide = 0;
			} else {
				animSlide = targetSlide - _.slideCount;
			}
		} else {
			animSlide = targetSlide;
		}

		_.animating = true;

		_.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

		oldSlide = _.currentSlide;
		_.currentSlide = animSlide;

		_.setSlideClasses(_.currentSlide);

		if (_.options.asNavFor) {

			navTarget = _.getNavTarget();
			navTarget = navTarget.slick('getSlick');

			if (navTarget.slideCount <= navTarget.options.slidesToShow) {
				navTarget.setSlideClasses(_.currentSlide);
			}
		}

		_.updateDots();
		_.updateArrows();

		if (_.options.fade === true) {
			if (dontAnimate !== true) {

				_.fadeSlideOut(oldSlide);

				_.fadeSlide(animSlide, function () {
					_.postSlide(animSlide);
				});
			} else {
				_.postSlide(animSlide);
			}
			_.animateHeight();
			return;
		}

		if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
			_.animateSlide(targetLeft, function () {
				_.postSlide(animSlide);
			});
		} else {
			_.postSlide(animSlide);
		}
	};

	Slick.prototype.startLoad = function () {

		var _ = this;

		if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

			_.$prevArrow.hide();
			_.$nextArrow.hide();
		}

		if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

			_.$dots.hide();
		}

		_.$slider.addClass('slick-loading');
	};

	Slick.prototype.swipeDirection = function () {

		var xDist,
		    yDist,
		    r,
		    swipeAngle,
		    _ = this;

		xDist = _.touchObject.startX - _.touchObject.curX;
		yDist = _.touchObject.startY - _.touchObject.curY;
		r = Math.atan2(yDist, xDist);

		swipeAngle = Math.round(r * 180 / Math.PI);
		if (swipeAngle < 0) {
			swipeAngle = 360 - Math.abs(swipeAngle);
		}

		if (swipeAngle <= 45 && swipeAngle >= 0) {
			return _.options.rtl === false ? 'left' : 'right';
		}
		if (swipeAngle <= 360 && swipeAngle >= 315) {
			return _.options.rtl === false ? 'left' : 'right';
		}
		if (swipeAngle >= 135 && swipeAngle <= 225) {
			return _.options.rtl === false ? 'right' : 'left';
		}
		if (_.options.verticalSwiping === true) {
			if (swipeAngle >= 35 && swipeAngle <= 135) {
				return 'down';
			} else {
				return 'up';
			}
		}

		return 'vertical';
	};

	Slick.prototype.swipeEnd = function (event) {

		var _ = this,
		    slideCount,
		    direction;

		_.dragging = false;
		_.swiping = false;

		if (_.scrolling) {
			_.scrolling = false;
			return false;
		}

		_.interrupted = false;
		_.shouldClick = _.touchObject.swipeLength > 10 ? false : true;

		if (_.touchObject.curX === undefined) {
			return false;
		}

		if (_.touchObject.edgeHit === true) {
			_.$slider.trigger('edge', [_, _.swipeDirection()]);
		}

		if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {

			direction = _.swipeDirection();

			switch (direction) {

				case 'left':
				case 'down':

					slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();

					_.currentDirection = 0;

					break;

				case 'right':
				case 'up':

					slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();

					_.currentDirection = 1;

					break;

				default:

			}

			if (direction != 'vertical') {

				_.slideHandler(slideCount);
				_.touchObject = {};
				_.$slider.trigger('swipe', [_, direction]);
			}
		} else {

			if (_.touchObject.startX !== _.touchObject.curX) {

				_.slideHandler(_.currentSlide);
				_.touchObject = {};
			}
		}
	};

	Slick.prototype.swipeHandler = function (event) {

		var _ = this;

		if (_.options.swipe === false || 'ontouchend' in document && _.options.swipe === false) {
			return;
		} else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
			return;
		}

		_.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ? event.originalEvent.touches.length : 1;

		_.touchObject.minSwipe = _.listWidth / _.options.touchThreshold;

		if (_.options.verticalSwiping === true) {
			_.touchObject.minSwipe = _.listHeight / _.options.touchThreshold;
		}

		switch (event.data.action) {

			case 'start':
				_.swipeStart(event);
				break;

			case 'move':
				_.swipeMove(event);
				break;

			case 'end':
				_.swipeEnd(event);
				break;

		}
	};

	Slick.prototype.swipeMove = function (event) {

		var _ = this,
		    edgeWasHit = false,
		    curLeft,
		    swipeDirection,
		    swipeLength,
		    positionOffset,
		    touches,
		    verticalSwipeLength;

		touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

		if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
			return false;
		}

		curLeft = _.getLeft(_.currentSlide);

		_.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
		_.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

		_.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

		verticalSwipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

		if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
			_.scrolling = true;
			return false;
		}

		if (_.options.verticalSwiping === true) {
			_.touchObject.swipeLength = verticalSwipeLength;
		}

		swipeDirection = _.swipeDirection();

		if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
			_.swiping = true;
			event.preventDefault();
		}

		positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
		if (_.options.verticalSwiping === true) {
			positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
		}

		swipeLength = _.touchObject.swipeLength;

		_.touchObject.edgeHit = false;

		if (_.options.infinite === false) {
			if (_.currentSlide === 0 && swipeDirection === 'right' || _.currentSlide >= _.getDotCount() && swipeDirection === 'left') {
				swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
				_.touchObject.edgeHit = true;
			}
		}

		if (_.options.vertical === false) {
			_.swipeLeft = curLeft + swipeLength * positionOffset;
		} else {
			_.swipeLeft = curLeft + swipeLength * (_.$list.height() / _.listWidth) * positionOffset;
		}
		if (_.options.verticalSwiping === true) {
			_.swipeLeft = curLeft + swipeLength * positionOffset;
		}

		if (_.options.fade === true || _.options.touchMove === false) {
			return false;
		}

		if (_.animating === true) {
			_.swipeLeft = null;
			return false;
		}

		_.setCSS(_.swipeLeft);
	};

	Slick.prototype.swipeStart = function (event) {

		var _ = this,
		    touches;

		_.interrupted = true;

		if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
			_.touchObject = {};
			return false;
		}

		if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
			touches = event.originalEvent.touches[0];
		}

		_.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
		_.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

		_.dragging = true;
	};

	Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function () {

		var _ = this;

		if (_.$slidesCache !== null) {

			_.unload();

			_.$slideTrack.children(this.options.slide).detach();

			_.$slidesCache.appendTo(_.$slideTrack);

			_.reinit();
		}
	};

	Slick.prototype.unload = function () {

		var _ = this;

		$('.slick-cloned', _.$slider).remove();

		if (_.$dots) {
			_.$dots.remove();
		}

		if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
			_.$prevArrow.remove();
		}

		if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
			_.$nextArrow.remove();
		}

		_.$slides.removeClass('slick-slide slick-active slick-visible slick-current').attr('aria-hidden', 'true').css('width', '');
	};

	Slick.prototype.unslick = function (fromBreakpoint) {

		var _ = this;
		_.$slider.trigger('unslick', [_, fromBreakpoint]);
		_.destroy();
	};

	Slick.prototype.updateArrows = function () {

		var _ = this,
		    centerOffset;

		centerOffset = Math.floor(_.options.slidesToShow / 2);

		if (_.options.arrows === true && _.slideCount > _.options.slidesToShow && !_.options.infinite) {

			_.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
			_.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

			if (_.currentSlide === 0) {

				_.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
				_.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
			} else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

				_.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
				_.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
			} else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

				_.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
				_.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
			}
		}
	};

	Slick.prototype.updateDots = function () {

		var _ = this;

		if (_.$dots !== null) {

			_.$dots.find('li').removeClass('slick-active').end();

			_.$dots.find('li').eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass('slick-active');
		}
	};

	Slick.prototype.visibility = function () {

		var _ = this;

		if (_.options.autoplay) {

			if (document[_.hidden]) {

				_.interrupted = true;
			} else {

				_.interrupted = false;
			}
		}
	};

	$.fn.slick = function () {
		var _ = this,
		    opt = arguments[0],
		    args = Array.prototype.slice.call(arguments, 1),
		    l = _.length,
		    i,
		    ret;
		for (i = 0; i < l; i++) {
			if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) == 'object' || typeof opt == 'undefined') _[i].slick = new Slick(_[i], opt);else ret = _[i].slick[opt].apply(_[i].slick, args);
			if (typeof ret != 'undefined') return ret;
		}
		return _;
	};
});

$.fn.equalRowHeight = function (options) {
	var defaults = {};
	var o = $.extend(defaults, options);
	var tallest = [];
	$(this).height('');
	this.each(function (i) {
		if (o.rowLength) {
			tallest[Math.floor(i / o.rowLength)] = Math.max($(this).height(), tallest[Math.floor(i / o.rowLength)] || 0);
		} else {
			var a = $(this);
			var p = a.offset();
			a.data('top', Math.floor(p.top));
			tallest[Math.floor(p.top)] = Math.max($(this).height(), tallest[Math.floor(p.top)] || 0);
		}
	}).each(function (i) {
		if (o.rowLength) {
			if (tallest[Math.floor(i / o.rowLength)] > 0) {
				$(this).css({ "height": tallest[Math.floor(i / o.rowLength)] });
			}
		} else {
			var a = $(this);
			if (tallest[Math.floor(a.data('top'))] > 0) {
				$(this).css({ "height": tallest[Math.floor(a.data('top'))] });
			}
		}
	});
	return this;
};
function validateContactForm(sel) {
	var contactForm = document.querySelectorAll(sel);
	if (contactForm.length > 0) {
		for (var i = 0; i < contactForm.length; i++) {
			contactForm[i].addEventListener('submit', function (evt) {
				var fields = this.querySelectorAll('input,select');
				var invalidFields = {};
				for (var j = 0; j < fields.length; j++) {
					var field = fields[j];
					if (field.previousElementSibling) {
						var lbl = field.previousElementSibling.innerText.replace('*', '');

						if (field.getAttribute('required') && field.value == '') {
							invalidFields[field.name] = {
								label: lbl,
								reason: 'Please enter ' + lbl
							};
						}

						if (field.name.indexOf('email') > -1 && !validEmail(field.value)) {
							invalidFields[field.name] = {
								label: lbl,
								reason: lbl + ' needs to be a valid email address'
							};
						}

						if (field.name.indexOf('phone') > -1 && !validPhone(field.value)) {
							invalidFields[field.name] = {
								label: lbl,
								reason: lbl + ' needs to be a valid phone number'
							};
						}

						if (field.name.indexOf('postcode') > -1 && !validPostcode(field.value)) {
							invalidFields[field.name] = {
								label: lbl,
								reason: lbl + ' needs to be a valid postcode'
							};
						}
					}
				}

				if (Object.keys(invalidFields).length) {
					var errorString = this.dataset.errorText;
					for (var f in invalidFields) {
						errorString += '\n ' + invalidFields[f].reason;
					}
					alert(errorString);
					evt.preventDefault();
				}
			});
		}
	}
};

function validPostcode(val) {
	//Republic of ireland val.toUpperCase().match(/[A-Za-z]\d{2}\s[A-Za-z\d]{4}/)
	return val.toUpperCase().match(/^([A-PR-UWYZ0-9][A-HK-Y0-9][AEHMNPRTVXY0-9]?[ABEHMNPRVWXY0-9]? {1,2}[0-9][ABD-HJLN-UW-Z]{2}|GIR 0AA)$/);
}
function validEmail(val) {
	return val.toUpperCase().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
}
function validPhone(val) {
	return val.toUpperCase().match(/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/);
}
function mobileNav(mobileNavs) {
	$(mobileNavs).each(function (i, a) {
		var $a = $(this);
		if ($a.children('.menu-toggle').length === 0) {
			$a.prepend('<div class="menu-toggle">\n        <span class="menu-toggle__toggleholder">\n          <span class="menu-toggle__line menu-toggle__line1"></span>\n          <span class="menu-toggle__line menu-toggle__line2"></span>\n          <span class="menu-toggle__line menu-toggle__line3"></span>\n        </span>\n        <span class="menu-toggle__text">Menu</span>\n      </div>');
			$a.children('.menu-toggle').off('click').click(mobileMenuDisplay).end().children('div:not(".menu-toggle")').find('.nomobilenav').parent('.selectcontainer').remove().end().remove().end().prepend($('.nomobilenav').clone(true, true).addClass('mobileonly'));

			$('.pageholder, .topsection, .endsection, .footer').off('click').click(function () {
				if ($('.menu-toggle').hasClass('selected')) {
					$('.menu-toggle').removeClass('selected').siblings('div').fadeOut(400);
				}
			});
		}
		if (!$a.children('.menu-toggle').hasClass('selected')) {
			$a.children('div:not(".menu-toggle")').hide();
		}

		switch (this.id) {
			case 'nav':
				$a.find('.tog-menu').text('');
				break;
		}
	});
}

function mobileMenuDisplay(e) {
	var anbtn = $(this);
	if (anbtn.hasClass('selected')) {
		anbtn.removeClass('selected').siblings('div').fadeOut(400);
		$('body').css({ 'overflow': 'auto', 'position': 'static' });
	} else {
		anbtn.addClass('selected').siblings('div:not(.keephidden)').fadeIn(400);
		$('body').css({ 'overflow': 'hidden', 'position': 'fixed' });
	}
	e.stopPropagation();
	e.preventDefault();
}

function removeMobileNav(mobileNavs) {
	$('.menu-toggle').remove();
	$(mobileNavs).children('div:not(".menu-toggle")').show();
}
$(function () {
	$('.smoothscroll').unbind('click').click(function () {
		var $a = $(this);
		var $w = $(window);
		var ahref = $a.attr('href');
		var targetid = ahref.substring(ahref.indexOf('#') + 1, ahref.length);
		scrollToId(targetid);
	});
});

function scrollToId(targetid) {
	var targettop = $('#' + targetid).offset().top;
	$('html, body').animate({ scrollTop: targettop }, 2000);
}
$(function () {

	var prefixAnimationEvent = "webkitAnimationEnd oanimationend oAnimationEnd msAnimationEnd animationend";
	var prefixTransitionEvent = "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";
	var mobileswitchwidth = 975;
	var mobileNavs = '#nav, #smallnav';

	if ($('#contactholder').length > 0 && document.getElementById("contactholder").hasAttribute('data-subject')) {
		$('#contactholder').find('select[name="subject"] option:contains(' + $('#contactholder').data('subject') + ')').prop({ selected: true });
	}

	function windowResize() {
		/*
  if(window.matchMedia(`(max-width: ${mobileswitchwidth}px)`).matches){
  	mobileNav(mobileNavs);
  } else {
  	removeMobileNav(mobileNavs);
  }*/

		if ($('.brochures__listarea--wcontainer').length > 0) {
			$('.brochures__listarea--wcontainer').each(function () {
				var current = $(this);
				if (window.matchMedia('(max-width: 400px)').matches) {
					current.find('.brochures__itemtext').removeAttr('style');
				} else if (window.matchMedia('(max-width: 750px)').matches) {
					current.find('.brochures__itemtext').equalRowHeight({ rowLength: 2 });
				} else {
					current.find('.brochures__itemtext').equalRowHeight({ rowLength: 4 });
				}
			});
		}

		if ($('.pricetable__headings').length > 0) {
			$('.pricetable__headings').each(function () {
				var current = $(this);

				if (current.find('.pricetable__mainheading').length > 0 && current.find('.pricetable__secondaryheading').length > 0) {

					var mainHeading = current.find('.pricetable__mainheading');
					var secondaryHeading = current.find('.pricetable__secondaryheading');

					mainHeading.removeAttr('style');
					secondaryHeading.removeAttr('style');

					if (secondaryHeading.outerHeight() > mainHeading.outerHeight()) {
						mainHeading.css({ 'height': secondaryHeading.outerHeight() + 'px' });
					} else {
						secondaryHeading.css({ 'height': mainHeading.outerHeight() + 'px' });
					}
				}
			});
		}

		if ($('.freeformpanelarea .freeform-row').length > 0) {
			$('.freeformpanelarea .freeform-row').each(function () {
				var current = $(this);
				if (current.children().length == 2) {
					current.addClass('freeform-row--twocol');
				}
			});
		}

		if ($('.propertydetail__linktext').length > 0) {
			$('.propertydetail__linktext').each(function () {
				var current = $(this);
				current.removeAttr('style');
				if (current.outerHeight() < 38) {
					current.css({ 'height': 38 + 'px' });
				}
			});
		}

		if ($('.mooringtable__contentrow').length > 0) {
			$('.mooringtable__contentrow').each(function () {
				var thisRow = $(this);
				thisRow.find('.mooringtable__contentcell').removeAttr('style');
				thisRow.find('.mooringtable__contentcell').css({ 'height': thisRow.height() + 'px' });
			});
		}

		if ($('.mooringtable__headingrow').length > 0) {
			$('.mooringtable__headingrow').each(function () {
				var thisRow = $(this);
				thisRow.find('.mooringtable__headingcellinner').removeAttr('style');
				thisRow.find('.mooringtable__headingcellinner').css({ 'height': thisRow.height() + 'px' });
			});
		}

		if ($('.mooringtable__midheadingrow').length > 0) {
			$('.mooringtable__midheadingrow').each(function () {
				var thisRow = $(this);
				thisRow.find('.mooringtable__midheadingcell').removeAttr('style');
				thisRow.find('.mooringtable__midheadingcell').css({ 'height': thisRow.height() + 'px' });
			});
		}

		if ($('.mappanel__headingbefore').length > 0) {
			var leftSpace = $('.mappanel__heading').offset().left;
			$('.mappanel__headingbefore').css({ 'left': '-' + leftSpace + 'px', 'width': leftSpace + 'px' });
		}

		if ($('.headerarea').length > 0) {
			if ($('.headerarea__background').length > 0 || $('.headerarea__galleryholder').length > 0) {
				$('.headerarea').css({ 'min-height': $(window).height() + 'px' });
				setTimeout(function () {
					// slight pause
					if ($('.headerarea__scrollholder').length > 0) {
						$('.headerarea__scrollholder').addClass('headerarea__scrollholder--show');
					}
					if ($('.headerarea__form').length > 0) {
						$('.headerarea__form').addClass('headerarea__form--show');
					}
				}, 200);
			}
		}

		if ($('.salespanels__item').length > 0) {
			if (!window.matchMedia('(max-width: 600px)').matches) {
				$('.salespanels__item').equalRowHeight({ rowLength: 2 });
			}
		}

		if ($('.blogslist__itemcontent--equals').length > 0) {
			$('.blogslist__itemcontent--equals').equalRowHeight({ rowLength: 2 });
		}

		if ($('.optionboxes__imgarea').length > 0) {
			$('.optionboxes__imgarea').equalRowHeight();
		}

		if ($('.properties__enditemimage').length > 0) {
			$('.properties__enditemimage').css({ 'height': $('.properties__enditemcontent').outerHeight() + 'px' });
		}

		if ($('.popup__back').length > 0 && $('.popup__back').is(':visible')) {
			$('.popup__back').each(function () {
				var current = $(this);
				var thisPop = current.closest('.popup');
				var thisAreaHeight = thisPop.find('.popup__box').outerHeight() + parseInt(thisPop.css('padding-top')) + parseInt(thisPop.css('padding-bottom'));
				current.removeAttr('style');
				current.css({ 'height': thisAreaHeight + 'px' });
			});
		}

		if ($('.section__half--imgside').length > 0) {
			$('.section__half--imgside').each(function () {
				var current = $(this);
				var thisContainer = current.closest('.container');
				if (current.hasClass('section__half--alignright')) {
					// same level as content
					current.removeAttr('style');
					current.css({ 'min-height': thisContainer.find('.section__half--contentside').outerHeight() + 'px' });
				} else {
					current.removeAttr('style');
					current.css({ 'min-height': thisContainer.find('.section__half--contentside').outerHeight() + (parseInt(thisContainer.find('.section__half--contentside').css('margin-top')) - parseInt(current.css('margin-top'))) + 'px' });
				}
			});
		}

		if ($('.popup__topexpand').length > 0 && $('.popup__aboveformheading').length > 0 && $('.popup__formexpandarea').length > 0) {
			$('.popup').each(function () {
				var current = $(this);
				var topArea = false;
				var headingArea = false;
				var formArea = false;
				if (current.find('.popup__topexpand').length > 0) {
					topArea = current.find('.popup__topexpand');
				}
				if (current.find('.popup__aboveformheading').length > 0) {
					headingArea = current.find('.popup__aboveformheading');
				}
				if (current.find('.popup__formexpandarea').length > 0) {
					formArea = current.find('.popup__formexpandarea');
				}
				if (topArea != false && headingArea != false && formArea != false) {
					if (window.matchMedia('(max-width: 400px)').matches) {
						if (!(headingArea.hasClass('popup__aboveformheading--formopen') || headingArea.hasClass('popup__aboveformheading--formclosed'))) {
							headingArea.addClass('popup__aboveformheading--formclosed');
							formArea.slideUp().promise().done(function () {
								$(window).trigger('resize');
							});
						}
					} else {
						if (headingArea.hasClass('popup__aboveformheading--formopen') || headingArea.hasClass('popup__aboveformheading--formclosed')) {
							topArea.removeAttr('style');
							formArea.removeAttr('style');
							current.find('.popup__content').removeClass('popup__content--notopspacing');
							headingArea.removeClass('popup__aboveformheading--formopen popup__aboveformheading--formclosed');
						}
					}
				}
			});
		}

		if ($('.section__listingstopright').length > 0 && $('.section__listingstopleft').length > 0) {
			if ($('.section__listingstopleft').width() + $('.section__listingstopright').width() < $('.section__listingstopinner').width()) {
				var listingsLeftHeight = $('.section__listingstopleft').height();
				var listingsRightHeight = $('.section__listingstopright').height();
				var listingsDiff = listingsLeftHeight - listingsRightHeight;
				if (listingsDiff > 0) {
					$('.section__listingstopright').css({ 'margin-top': listingsDiff + 'px' });
				}
			} else {
				$('.section__listingstopright').removeAttr('style');
			}
		}

		if ($('.properties__itemimgsideinner').length > 0) {
			$('.properties__itemimgsideinner').each(function () {
				var current = $(this);
				var thisItem = current.closest('.properties__item');
				var imgSide = thisItem.find('.properties__itemimgsideinner');
				var contentSide = thisItem.find('.properties__itemcontentside');

				imgSide.removeAttr('style');
				contentSide.removeAttr('style');

				if (!window.matchMedia('(max-width: 700px)').matches) {
					var sideImgCheck = function sideImgCheck() {
						if (thisItem.find('.properties__itemimg').height() > 0) {
							clearInterval(checkImg);
							var thisImageHeight = thisItem.find('.properties__itemimg').height();
							var thisContentHeight = thisItem.find('.properties__itemcontentside').outerHeight();

							var imgTopMargin = (thisContentHeight - thisImageHeight) / 2;
							if (imgTopMargin > 0) {
								imgSide.css({ 'margin-top': imgTopMargin + 'px' });
							} else {
								var contentTopMargin = (thisImageHeight - thisContentHeight) / 2;
								if (contentTopMargin > 0) {
									contentSide.css({ 'margin-top': contentTopMargin + 'px' });
								}
							}
						}
					};

					var checkImg = setInterval(sideImgCheck, 200);
				}
			});
		}

		if ($('.membership').length > 0) {
			if (!window.matchMedia('(max-width: 1100px)').matches) {
				$('.membership').each(function () {
					var current = $(this);
					var name = current.find('.membership__name');
					var options = current.find('.membership__options');
					var endText = current.find('.membership__enddetail');
					name.removeAttr('style');
					options.removeAttr('style');
					endText.removeAttr('style');
					var nameHeight = parseFloat(name.outerHeight());
					var optionsHeight = parseFloat(options.outerHeight());
					var endTextHeight = parseFloat(endText.outerHeight());

					if (nameHeight >= optionsHeight && nameHeight >= endTextHeight) {
						options.css({ 'height': nameHeight + 'px' });
						endText.css({ 'height': nameHeight + 'px' });
					} else if (optionsHeight >= nameHeight && optionsHeight >= endTextHeight) {
						name.css({ 'height': optionsHeight + 'px' });
						endText.css({ 'height': optionsHeight + 'px' });
					} else if (endTextHeight >= optionsHeight && endTextHeight >= nameHeight) {
						name.css({ 'height': endTextHeight + 'px' });
						options.css({ 'height': endTextHeight + 'px' });
					}
				});
			} else {
				$('.membership__name').removeAttr('style');
				$('.membership__enddetail').removeAttr('style');
				$('.membership__options').removeAttr('style');
			}
		}

		if ($('.menutable__3colequaltitle').length > 0) {
			$('.menutable__3colequaltitle').equalRowHeight({ rowLength: 3 });
		}

		if ($('.galleryarea__img').length > 0) {
			var fifthWindowWidth = Math.ceil($(window).width() / 100 * 20);
			if ($('.galleryarea__img--short').length > 0) {
				$('.galleryarea__img--short').css({ 'height': fifthWindowWidth + 'px' });
			}
			if ($('.galleryarea__img--tall').length > 0) {
				$('.galleryarea__img--tall').css({ 'height': fifthWindowWidth * 2 + 'px' });
			}
		}

		if ($('.events__itemimg').length > 0 && !window.matchMedia('(max-width: 670px)').matches) {
			$('.events__itemimg').each(function () {
				var current = $(this);
				var thisHeight = current.next('.events__itemcontent').outerHeight();
				current.css({ 'height': thisHeight + 'px' });
			});
		}

		if ($('.section__equalsides').length > 0) {
			$('.section__equalsides').equalRowHeight({ rowLength: 2 });
		}

		if ($('.articles__item--equal').length > 0) {
			$('.articles__item--equal').equalRowHeight({ rowLength: 2 });
		}

		if ($('.headerarea__scrollholder').length > 0 && $('.headerarea__form').length == 0) {
			$('.headerarea__scrollholder').addClass('headerarea__scrollholder--noform');
		}

		if ($('.headerarea__form').length > 0) {
			var extraSpace = 0;
			if ($('.headerarea__financeholder').length > 0) {
				extraSpace = $('.headerarea__financeholder').outerHeight();
			}
			var announceSpace = 0;
			if ($('.announcement').length > 0) {
				announceSpace = $('.announcement').outerHeight();
			}
			var takenSpace = $(window).height() - ($('.headerarea__top').outerHeight() + $('.headerarea__scrollholder').outerHeight() + $('.headerarea__form').outerHeight() + announceSpace + extraSpace);
			if (takenSpace > 0) {
				$('.headerarea__form').css({ 'margin-top': takenSpace + 'px' });
			}
		}

		if ($('.headerarea__financeholder').length > 0) {
			if ($('.headerarea__form').height() == 0) {
				$('.headerarea__form').addClass('headerarea__form--none');
				var announceSpace = 0;
				if ($('.announcement').length > 0) {
					announceSpace = $('.announcement').outerHeight();
				}
				var takenSpace = $(window).height() - ($('.headerarea__top').outerHeight() + $('.headerarea__scrollholder').outerHeight() + $('.headerarea__financeholder').outerHeight() + announceSpace);
				$('.headerarea__financeholder').css({ 'margin-top': takenSpace + 'px' });
			} else {
				$('.headerarea__form').removeClass('headerarea__form--none');
				$('.headerarea__financeholder').removeAttr('style');
			}
		}

		scrollMarkers('.scrolldots__dot', 'scrolldots__dot--active', 'section');

		$('.socialfeeds__item').css({ 'min-height': $('.socialfeeds__item').width() + 'px' });

		$('.socialfeeds__itemcontent').equalRowHeight({ rowLength: 12 });

		$('.socialfeeds__itemcaption').each(function () {
			var current = $(this);
			var panelWidth = current.outerWidth();
			var thisHeight = current.find('.socialfeeds__itemcaptioninner').height();
			var bottomSpace = $('.socialfeeds__itemtype').height() + parseInt($('.socialfeeds__itemtype').css('bottom')) * 2;
			current.css({ 'padding-top': panelWidth / 2 - thisHeight / 2 + 'px', 'padding-bottom': bottomSpace + 'px' });
		});

		if ($('.menutable__title--right').length > 0) {
			$('.menutable__title--right').each(function () {
				var current = $(this);
				var outerTable = current.closest('.menutable');
				var thisTable = outerTable.find('.menutable__table');
				var firstTdWidth = thisTable.find('td:first-child').outerWidth();
				var lastTdWidth = thisTable.find('td:last-child').outerWidth();
				var numRight = 1;
				var addExtra = 0;
				if (current.hasClass('menutable__title--rightthreecol')) {
					numRight = 2;
				}
				if (current.hasClass('menutable__title--rightthreemid')) {
					addExtra = 1;
				}
				current.css({ 'width': (lastTdWidth + firstTdWidth - firstTdWidth + (outerTable.outerWidth() - (lastTdWidth + firstTdWidth))) / numRight + addExtra + 'px' });
			});
		}
		/*
  $('.menutable__title--right').css({'width': ($('.menutable__table td:last-child').outerWidth() + $('.menutable__table td:first-child').outerWidth()) - $('.menutable__table td:first-child').outerWidth() + ($('.menutable').outerWidth() - ($('.menutable__table td:last-child').outerWidth() + $('.menutable__table td:first-child').outerWidth())) + 'px'});
  */
		if ($('.imgopts__imgopt').length > 0) {
			setTimeout(function () {
				$('.imgopts__imgopt').on('click', function () {
					var current = $(this);
					$('.imgopts__imgopt').removeClass('imgopts__imgopt--active');
					current.addClass('imgopts__imgopt--active');
					var img = current.find('img').attr('src');
					$('.headerarea__background').css({ 'background-image': 'url(' + img + ')' });
				});
			}, 300);
		}
	}

	if ($('.freeformpanelarea .freeform-row .freeform-column select.freeform-input').length > 0) {
		$('.freeformpanelarea .freeform-row .freeform-column select.freeform-input').wrap('<div class="freeformpanelarea__fieldholder freeformpanelarea__fieldholder--arrow"></div>');
	}

	if ($('.freeformpanelarea .freeform-row .freeform-column .freeform-input.form-date-time-field').length > 0) {
		$('.freeformpanelarea .freeform-row .freeform-column .freeform-input.form-date-time-field').wrap('<div class="freeformpanelarea__fieldholder freeformpanelarea__fieldholder--date"></div>');
	}

	if ($('.popuplink').length > 0) {
		$('.popuplink').click(function (e) {
			e.preventDefault();
			var current = $(this);
			var thisPopup = current.data('popup');
			$('.popup[data-popup="' + thisPopup + '"]').fadeIn();
			$('body,html').css({ 'overflow': 'hidden', /*'height':'100%', */'position': 'relative' });
			$(window).trigger('resize');
			if (thisPopup == 'newsletter-signup') {
				$('#mce-EMAIL').val($('.newsletter__input').val());
			}
		});
		$('.popup__back, .popup__close').click(function () {
			$(this).closest('.popup').fadeOut();
			$('body,html').removeAttr('style');
		});
		if ($('.freeform-form-has-errors').length > 0) {
			$('.freeform-form-has-errors').closest('.popup').fadeIn();
			$('body,html').css({ 'overflow': 'hidden', /*'height':'100%', */'position': 'relative' });
			$(window).trigger('resize');
		}
	}

	if ($('.popup__topexpand').length > 0 && $('.popup__aboveformheading').length > 0 && $('.popup__formexpandarea').length > 0) {
		$('.popup__aboveformheading').click(function () {
			var thisHeading = $(this);
			if (window.matchMedia('(max-width: 400px)').matches) {
				var thisPop = thisHeading.closest('.popup');
				if (thisPop.find('.popup__topexpand').length > 0 && thisPop.find('.popup__formexpandarea').length > 0) {
					var thisTopArea = thisPop.find('.popup__topexpand');
					var thisFormArea = thisPop.find('.popup__formexpandarea');
					if (thisHeading.hasClass('popup__aboveformheading--formopen')) {
						thisHeading.removeClass('popup__aboveformheading--formopen').addClass('popup__aboveformheading--formclosed');
						thisPop.find('.popup__content').removeClass('popup__content--notopspacing');
						thisTopArea.slideDown();
						thisFormArea.slideUp().promise().done(function () {
							$(window).trigger('resize');
						});;
					} else if (thisHeading.hasClass('popup__aboveformheading--formclosed')) {
						thisHeading.addClass('popup__aboveformheading--formopen').removeClass('popup__aboveformheading--formclosed');
						thisPop.find('.popup__content').addClass('popup__content--notopspacing');
						thisFormArea.slideDown();
						thisTopArea.slideUp().promise().done(function () {
							$(window).trigger('resize');
						});;
					}
				}
			}
		});
	}

	validateContactForm('.contact__form');

	if ($('.articles__details').length > 0) {
		$('.articles__item').hover(function () {
			var current = $(this).find('.articles__details');
			current.css({ 'visibility': 'visible' });
			setTimeout(function () {
				current.css({ 'opacity': 1 });
			}, 50);
		}, function () {
			var current = $(this).find('.articles__details');
			current.css({ 'opacity': 0 });
			setTimeout(function () {
				current.css({ 'visibility': 'hidden' });
			}, 350);
		});
	}

	if ($('.faqs__answer').length > 0) {
		$('.faqs__answer').hide();
		$('.faqs__question').click(function () {
			var current = $(this);
			if (current.hasClass('faqs__question--active')) {
				current.removeClass('faqs__question--active');
				current.next().slideUp();
			} else {
				current.addClass('faqs__question--active');
				current.next().slideDown();
			}
		});
	}

	$('.mobiletopsearch__btn').on('click', function () {
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

	$(window).scroll(function () {

		overlapColour($('.section--white'), $('.scrolldots__dot'), 'scrolldots__dot--grey');

		scrollMarkers('.scrolldots__dot', 'scrolldots__dot--active', 'section');
	});

	if ($('.endgallery__opts').length > 0) {
		$('.endgallery__opts').slick({
			dots: false,
			infinite: false,
			slidesToShow: 6,
			slidesToScroll: 1,
			arrows: false,
			asNavFor: '.endgallery__lrgopts',
			focusOnSelect: true,
			responsive: [{
				breakpoint: 1550,
				settings: {
					slidesToShow: 5
				}
			}, {
				breakpoint: 1150,
				settings: {
					slidesToShow: 4
				}
			}, {
				breakpoint: 930,
				settings: {
					slidesToShow: 3
				}
			}, {
				breakpoint: 730,
				settings: {
					slidesToShow: 2
				}
			}, {
				breakpoint: 601,
				settings: {
					slidesToShow: 3
				}
			}]
		});
		$('.endgallery__lrgopts').slick({
			dots: false,
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			focusOnSelect: true,
			asNavFor: '.endgallery__opts'
		});
	}

	if ($('.scrollproperties__scroll').length > 0) {
		$('.scrollproperties__scroll').slick({
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 3,
			dots: true,
			arrows: true,
			responsive: [{
				breakpoint: 851,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}, {
				breakpoint: 601,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}]
		});
	}

	if ($('.imgopts').length > 0) {

		$('.imgopts__inner').slick({
			dots: false,
			infinite: false,
			slidesToShow: 6,
			slidesToScroll: 2,
			arrows: false,
			responsive: [{
				breakpoint: 900,
				settings: {
					slidesToShow: 5
				}
			}, {
				breakpoint: 760,
				settings: {
					slidesToShow: 4
				}
			}, {
				breakpoint: 550,
				settings: {
					slidesToShow: 3
				}
			}, {
				breakpoint: 400,
				settings: {
					slidesToShow: 2
				}
			}]
		});

		var galleryLoadClick = setInterval(function () {
			if ($('.headerarea__background').css('background-image') == 'none') {
				if ($('.imgopts__imgopt').length > 0) {
					if ($('.headerarea__background').css('background-image') == 'none') {
						$('.slick-slide:first-child .imgopts__imgopt').click();
					}
				}
			} else {
				clearInterval(galleryLoadClick);
			}
		}, 200);
	}

	if ($('#socialfeedtemplate').length > 0) {
		var thisSite = $('#socialfeed').data('site');
		$.getJSON('assets/js/' + thisSite + '/socialwall.php', function (data) {
			var feedtemplate = $('#socialfeedtemplate')[0].innerHTML;
			var feedhtml = '';

			var imgs = [];
			var imgscount = data.length;
			var imgsloadedcount = 0;

			for (var n in data) {
				var img = new Image();
				img.onload = function () {
					imgsloadedcount++;
					if (imgsloadedcount == imgscount) {
						$(window).resize();
					}
				};

				img.src = data[n].url;
				feedhtml += applyTemplate(feedtemplate, data[n]);
			}
			$('#socialfeed').html(feedhtml);
		}).done(function (json) {
			$(window).trigger('resize');
			if ($('.socialfeeds__item').length < 8) {
				$('.socialfeeds__info').addClass('socialfeeds__info--static');
			}
		}).fail(function (jqxhr, textStatus, error) {
			var err = textStatus + ", " + error;
			console.log("Request Failed: " + err);
			$('.socialfeeds__info').addClass('socialfeeds__info--static');
		});
	}

	//$(window).resize(throttle(windowResize,100));


	$(".swipebox").swipebox({ selector: '.swipebox' });

	$(window).resize(windowResize);

	$(window).on('load', function () {
		$(window).trigger('resize');
	});
});

function scrollMarkers(dotClass, activeClass, dataName) {

	var ids = [];
	//get ids
	$(dotClass).each(function () {
		var current = $(this);
		var thisId = current.data(dataName);
		ids.push(thisId);
	});

	var sections = [];
	//get location of each section
	for (var i = 0; i < ids.length; i++) {
		var thisSection = $('#' + ids[i]);
		var thisId = ids[i];
		if (thisSection.height() > 0) {
			var top = thisSection.offset().top;
			var end = thisSection.offset().top + thisSection.outerHeight();
			sections.push([top, end, thisId]);
		}
	}

	// scroll location
	var screenTop = $(window).scrollTop();
	var screenBottom = $(window).scrollTop() + $(window).height();

	var visibleEls = [];
	// which sections are visible currently?
	for (var i = 0; i < sections.length; i++) {
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
		if (top < screenTop) {
			topBeforeScreenTop = true;
		} else if (top > screenBottom) {
			topAfterScreenBottom = true;
		} else {
			topOnScreen = true;
		}
		if (bottom < screenTop) {
			bottomBeforeScreenTop = true;
		} else if (bottom > screenBottom) {
			bottomAfterScreenBottom = true;
		} else {
			bottomOnScreen = true;
		}
		// section location
		if (topOnScreen && bottomOnScreen) {
			withinBoundaries = true;
		} else if (topBeforeScreenTop && bottomAfterScreenBottom) {
			middleVisible = true;
		} else if (topBeforeScreenTop && bottomOnScreen) {
			topBeforeBottomOn = true;
		} else if (topOnScreen && bottomAfterScreenBottom) {
			topOnBottomAfter = true;
		} else {
			offScreen = true;
		}

		// pixels visible
		if (withinBoundaries) {
			pixels = bottom - top;
		} else if (middleVisible) {
			pixels = screenBottom - screenTop;
		} else if (topBeforeBottomOn) {
			pixels = bottom - screenTop;
		} else if (topOnBottomAfter) {
			pixels = screenBottom - top;
		}
		// set array with all visible elements 
		if (!offScreen) {
			var thisId = sections[i][2];
			visibleEls.push([thisId, pixels]);
		}
	}

	var currentTallest = 0;
	var tallestId;
	// find tallest
	for (var i = 0; i < visibleEls.length; i++) {
		var id = visibleEls[i][0];
		var pixels = visibleEls[i][1];
		if (pixels > currentTallest) {
			currentTallest = pixels;
			tallestId = id;
		}
	}

	// set active dot
	$(dotClass).removeClass(activeClass);
	$(dotClass + '[data-' + dataName + '=' + tallestId + ']').addClass(activeClass);
}

function overlapColour(overlappedEl, movingEl, newColourClass) {
	var whiteAreas = [];
	overlappedEl.each(function () {
		var top = $(this).offset().top;
		var end = $(this).offset().top + $(this).outerHeight();
		whiteAreas.push([top, end]);
	});

	movingEl.each(function () {
		var current = $(this);
		var thisTop = current.offset().top;
		var currentHeight = current.outerHeight();
		var overlapping = false;
		for (var i = 0; i < whiteAreas.length; i++) {
			var top = whiteAreas[i][0];
			var end = whiteAreas[i][1];
			if (thisTop > top && thisTop + currentHeight < end) {
				overlapping = true;
				current.addClass(newColourClass);
			}
		}
		if (overlapping === false) {
			current.removeClass(newColourClass);
		}
	});
}

/* Twitter Feed */
var Twitter = {};

Twitter.getUserTimeline = function (screenName, callback) {
	var url = "/assets/js/gettweets.php?screen_name=" + encodeURIComponent(screenName);
	$.getJSON(url, callback);
};

var shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function shortMonthIndex(monthText) {
	var myIndex;
	$.each(shortMonths, function (i, a) {
		if (a == monthText) {
			myIndex = i;
		}
	});
	return myIndex;
}
function showTweets(screenName, selector) {
	Twitter.getUserTimeline(screenName, function (timeline) {
		var index = 0;
		var nextTimeout;
		var $d = $(document.createElement("div"));
		$(selector).empty();
		$(selector).append($d).append('<div class="controls"><a class="nextTweet"></a><a class="prevTweet"></a></div>');

		$(selector).children('.controls').children('.nextTweet').click(function () {
			update();
		}).end().children('.prevTweet').click(function () {
			index -= 4;
			if (index < 0) {
				index += timeline.length;
			}
			update();
		});

		function update() {
			$d.fadeOut(500, function () {
				if (timeline) {
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
			var v = tweet.created_at.split(/\s+/);
			var created = new Date(Date.parse(v[1] + " " + v[2] + ", " + v[5] + " " + v[3] + " UTC"));
			var e = (now.getTime() - created.getTime()) / 1000;
			var f;
			if (e < 60) {
				f = e + " seconds ago";
			} else if (e < 120) {
				f = "a minute ago";
			} else if (e < 45 * 60) {
				f = parseInt(e / 60, 10).toString() + " minutes ago";
			} else if (e < 2 * 60 * 60) {
				f = "an hour ago";
			} else if (e < 24 * 60 * 60) {
				f = "" + parseInt(e / 3600, 10).toString() + " hours ago";
			} else if (e < 48 * 60 * 60) {
				f = "a day ago";
			} else {
				f = parseInt(e / 86400, 10).toString() + " days ago";
			}
			a.href = "https://twitter.com/#!/" + screenName + "/status/" + tweet.id_str;
			$(a).append('<span class="colour">' + screenName + '</span> ' + tweet.text);

			setTimeout(function () {
				var $a = $(a);
				$a.attr('target', '_blank');
			});
			tdiv = $('<div class="tweet"></div>').append(a);
			return tdiv;
		}

		function schedNextUpdate() {
			if (nextTimeout) {
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
	for (var i = 0; i < timeouts.length; i++) {
		if (timeouts[i]) {
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
	$.get(url, function (data) {
		var dir = url.match(/(.*)\/.*$/)[1];

		var gal = $("document > gallery", data);
		var itemwidth = gal.attr('width');
		var itemheight = gal.attr('height');

		slideshow.html('');
		$("document > gallery > photo", data).each(function () {
			var caption = this.getAttribute("caption");
			if (!caption) {
				caption = "";
			} else {
				if (caption.indexOf('"bottom"') > -1) {
					caption = '<div class="galleryText bottom"><div class="holder"><div class="back">' + caption + '</div></div></div>';
				} else {
					caption = '<div class="galleryText"><div class="holder"><div class="back">' + caption + '</div></div></div>';
				}
			}
			if (this.getAttribute("href")) {
				slideshow.append('<div class="galleryItem" style="background-image:url(' + dir + '/' + this.getAttribute("src") + ')"><div class="imgholder"><a href="' + this.getAttribute("href") + '"><img class="img" src="' + dir + '/' + this.getAttribute("src") + '" alt="" /></a></div>' + caption + '</div>');
			} else {
				slideshow.append('<div class="galleryItem" style="background-image:url(' + dir + '/' + this.getAttribute("src") + ')"><div class="imgholder"><img class="img" src="' + dir + '/' + this.getAttribute("src") + '" alt="" width="' + itemwidth + '" height="' + itemheight + '" /></div>' + caption + '</div>');
			}
		});
		callback();
	});
}

function applyTemplate(temp, data) {
	var newText = temp;
	for (var nme in data) {
		var newtext = data[nme] || "";
		if (typeof newtext == 'function') {
			newtext = '';
		}
		newText = newText.replace(new RegExp('{{' + nme + '}}', 'g'), newtext);
	}
	return newText;
}

(function ($) {

	$.fn.selectBox = function (options) {
		var defaults = {
			nooptsText: 'Any',
			includeLabel: false,
			setWidth: false
		};
		var o = $.extend(defaults, options);

		return this.each(function () {
			if (this.nodeName == 'SELECT') {
				var showDrop = function showDrop(e) {
					d.stop(true, true).slideDown();
					$('html').click().click(hideDrop).bind('keydown', keyActions);
					e.stopPropagation();
					l.addClass('active');
					la.blur();
				};

				var hideDrop = function hideDrop() {
					$('html').unbind('click', hideDrop).unbind('keydown', keyActions);
					d.stop(true, true).slideUp();
					charmem = "";
					l.removeClass('active');
					la.focus();
				};

				var ensureonscreen = function ensureonscreen(hov) {
					var hovpos = hov.position();
					if (hovpos.top + hov.outerHeight() > d.scrollTop() + d.height()) {
						d.scrollTop(hovpos.top + hov.outerHeight() - d.height());
					} else if (hovpos.top < d.scrollTop()) {
						d.scrollTop(hovpos.top);
					}
					var hovpos = hov.offset();
					if (hovpos.top + hov.outerHeight() > $('body').scrollTop() + $(window).height()) {
						$('html,body').scrollTop(hovpos.top + hov.outerHeight() - $(window).height());
					} else if (hovpos.top < $('body').scrollTop()) {
						$('html,body').scrollTop(hovpos.top);
					}
				};

				var keyActions = function keyActions(e) {
					var charCode = typeof e.which == "number" ? e.which : e.keyCode;
					switch (charCode) {
						case 38:
							highlighted--;
							if (highlighted < 0) {
								highlighted += oc.children().length;
							}
							var hov = oc.children().removeClass('hovered').filter(':eq(' + highlighted + ')').addClass('hovered');
							ensureonscreen(hov);
							break;
						case 40:
							highlighted++;
							if (highlighted >= oc.children().length) {
								highlighted -= oc.children().length;
							}
							var hov = oc.children().removeClass('hovered').filter(':eq(' + highlighted + ')').addClass('hovered');
							var hovpos = hov.position();
							ensureonscreen(hov);
							break;
						case 13:
							if (multi) {
								hideDrop();
							} else {
								oc.children(':eq(' + highlighted + ')').click();
							}
							break;
						case 32:
							oc.children(':eq(' + highlighted + ')').click();
							break;
					}
					if (charCode >= 65 && charCode <= 90) {
						var charregex = new RegExp("^" + charmem + String.fromCharCode(charCode), "i");
						var hov = oc.children().filter(function () {
							var c = this.textContent || this.innerText;
							return charregex.test(c);
						}).first();
						charmem += String.fromCharCode(charCode);
						if (hov.length == 0) {
							var first = true;
							while (hov.length == 0 && charCode >= 65) {
								charmem = "";
								var hov = oc.children().filter(function () {
									var c = this.textContent || this.innerText;
									return c.indexOf(String.fromCharCode(charCode)) === 0;
								});
								if (first) {
									hov = hov.first();
									charmem = String.fromCharCode(charCode);
								} else {
									hov = hov.last();
								}
								first = false;
								charCode--;
							}
						}
						if (hov.length > 0) {
							oc.children().removeClass('hovered');
							hov.addClass('hovered');
							highlighted = hov.index();
							ensureonscreen(hov);
						}
					}
					return false;
				};

				var populateLabel = function populateLabel() {
					l.children().html('');
					$s.find('option').each(function (i) {
						var opt = this;
						var itemText = $(opt).html();
						if ($(opt).data('image')) {
							itemText = '<img src="' + $(opt).data('image') + '" alt="' + itemText + '" />' + itemText;
						}
						if (opt.selected) {
							if (multi) {
								if (l.children().text() != "") {
									l.children().append(', ');
								}
								l.children().append('<span class="selectedLabel"><span class="icon"></span>' + itemText + '</span>');
							} else {
								highlighted = i;
								l.children().html('<span class="icon"></span>' + itemText);
							}
						}
					});
					if (l.children().text() == '') {
						l.children().html(o.nooptsText);
					}
					if (o.includeLabel) {
						l.children().prepend('<strong>' + labeltext + '</strong> ');
					}
				};

				var s = this;
				var $s = $(s);
				var label = $('label[for="' + s.id + '"]');
				var labeltext = "";
				if (label.length > 0) {
					if (o.includeLabel) {
						label.hide();
					}
					labeltext = label.html();
				}
				var highlighted = 0;
				if ($.inArray($s.parent().css('position'), ['relative', 'absolute'])) {
					$s.wrap('<span class="selectcontainer"></span>');
				}
				$s.next('.selectLabel').remove();
				$s.next('.selectOpts').remove();
				var charmem = '';

				var l = $('<div class="selectLabel"><a class="back" href="javascript:;"><span class="icon"></span></a></div>');
				var la = l.children('a').bind('keydown', function (e) {
					switch (e.keyCode) {
						case 32:
						case 38:
						case 40:
							$(this).blur().parent().click();
							return false;
							break;
					}
				});
				var cssopts = { display: $s.css('display') };

				l.css(cssopts);
				var d = $('<div class="selectOpts"><div class="optcontainer"></div></div>');
				d.hide();
				var oc = d.children().css({ position: 'relative' });

				$(window).resize(function () {
					$s.show();
					if ($s.outerWidth() > 10 && o.setWidth) {
						l.css({ width: $s.outerWidth() });
					}
					$s.hide();
				}).resize();

				l.click(function (e) {
					if (d.filter(":visible").length == 0) {
						showDrop(e);
					}
				});
				var multi = s.multiple;
				$s.find('option').each(function () {
					var opt = this;
					var itemText = $(opt).html();
					if ($(opt).data('image')) {
						itemText = '<img src="' + $(opt).data('image') + '" alt="' + itemText + '" />' + itemText;
					}
					var $opt = $('<div class="opt">' + itemText + '</div>');
					if (opt.selected) {
						$opt.addClass('selected');
					}

					$opt.click(function optionClicked(e) {
						if (multi) {
							opt.selected = !opt.selected;
							if (opt.selected) {
								$opt.addClass('selected');
							} else {
								$opt.removeClass('selected');
							}
						} else {
							opt.selected = true;
							$opt.addClass('selected').siblings().removeClass('selected');
						}
						$s.change();
						if (!multi) {
							hideDrop();
						}
						populateLabel();
						e.stopPropagation();
					});
					oc.append($opt);
				});
				populateLabel();
				$s.after(d).after(l).hide();
			}
		});
	};
})($);