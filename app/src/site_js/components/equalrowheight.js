$.fn.equalRowHeight = function(options) {
  var defaults = {

  };
  var o = $.extend(defaults, options);
  var tallest = [];
  $(this).height('');
  this.each(function(i) {
    if(o.rowLength) {
      tallest[Math.floor(i/o.rowLength)] = Math.max($(this).height(), tallest[Math.floor(i/o.rowLength)] || 0);
    } else {
      var a = $(this);
      var p = a.offset();
      a.data('top',Math.floor(p.top))
      tallest[Math.floor(p.top)] = Math.max($(this).height(), tallest[Math.floor(p.top)] || 0);
    }
  }).each(function(i) {
    if(o.rowLength) {
            if(tallest[Math.floor(i/o.rowLength)] > 0) {
                $(this).css({"height": tallest[Math.floor(i/o.rowLength)]});
            }
    } else {
      var a = $(this);
            if(tallest[Math.floor(a.data('top'))] > 0) {
                $(this).css({"height": tallest[Math.floor(a.data('top'))]});
            }
    }
  });
  return this;
};