;
$.fn.tableWithFixedHeader = function() {
	function _init(t) {
		var ws = [];
		var mIndex = 0;
		$.each($('tr', t), function(i, o) {
			$.each($('th,td', o), function(ii, oo) {
				var w = $(oo).width();
				ws[ii] = (ws[ii] === void 0) ? 0 : ws[ii];
				ws[ii] = (ws[ii] > w) ? ws[ii] : w;
				mIndex = (ws[ii] > ws[mIndex]) ? ii : mIndex;
			});
		});
		var shiftValue = 0;
		for (var j = 0; j < 2; j++) {
			$.each($('thead tr', t), function(i, o) {
				var tds = $('th', o);
				for (var ii = 0; ii < tds.length; ii++) {
					var shift = 0;
					if (ii == tds.length - 1) {
						shift += shiftValue;
					}
					$(tds[ii]).css('width', ws[ii] + shift);
				}
			});
			$.each($('tbody tr', t), function(i, o) {
				var tds = $('td', o);
				for (var ii = 0; ii < tds.length; ii++) {
					var shift = 0;
					if (ii == mIndex) {
						shift += shiftValue;
					}
					$(tds[ii]).css('width', ws[ii] + shift);
				}
			});
			var a = $('thead tr th:nth-child(' + (mIndex + 1) + ')', t).outerWidth();
			var b = $('tbody tr:first td:nth-child(' + (mIndex + 1) + ')', t).outerWidth();
			if (a > b) {
				shiftValue = a - b;
			} else {
				if (j == 0) {
					shiftValue = 0;
					var a = $('tbody', t).get(0).clientHeight
					var b = $('tbody', t).get(0).offsetHeight
					ws[ws.length - 1] += b - a;
				}
			}
		}
	}
	$.each(this, function(i, o) {
		_init(o)
	});
}
