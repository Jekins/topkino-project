(function() {
	'use strict';

	var themes,
		selectedThemeIndex,
		deck;

	function init() {
		deck = bespoke.from('.bespoke-carousel');
		initThemeSwitching();
	}

	init();

	function initThemeSwitching() {
		themes = [
			'coverflow',
		];

		selectedThemeIndex = 0;

		initKeys();
		initSlideGestures();

		selectTheme(0);
	}


	function initKeys() {
		if (/Firefox/.test(navigator.userAgent)) {
			document.addEventListener('keydown', function(e) {
				if (e.which >= 37 && e.which <= 40) {
					e.preventDefault();
				}
			});
		}

		document.addEventListener('keydown', function(e) {
			var key = e.which;

			key === 37 && deck.prev();
			(key === 32 || key === 39) && deck.next();
		});
	}

	function initSlideGestures() {
		var main = document.getElementById('bespoke-carousel-init'),
			startPosition,
			delta,

			singleTouch = function(fn, preventDefault) {
				return function(e) {
					if (preventDefault) {
						e.preventDefault();
					}
					e.touches.length === 1 && fn(e.touches[0].pageX);
				};
			},

			touchstart = singleTouch(function(position) {
				startPosition = position;
				delta = 0;
			}),

			touchmove = singleTouch(function(position) {
				delta = position - startPosition;
			}, true),

			touchend = function() {
				if (Math.abs(delta) < 50) {
					return;
				}

				delta > 0 ? deck.prev() : deck.next();
			};

		main.addEventListener('touchstart', touchstart);
		main.addEventListener('touchmove', touchmove);
		main.addEventListener('touchend', touchend);
	}
}());