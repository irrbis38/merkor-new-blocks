$(document).ready(function () {
	Fancybox.bind('[data-fancybox]', {
		Hash: false,
	});

	$('[data-scroll]').click(function (e) {
		// e.preventDefault();
		// let target = $(this).data("scroll");
		// let to = $(target).offset().top - 70;
		// $("html, body").animate({ scrollTop: to }, 500);
	});

	$('.search input').keyup(function (e) {
		if ($('.search input').val().length > 2) {
			var query = $('.search input').val();

			$.ajax({
				type: 'POST',
				url: '/ajaxer.php?x=search',
				data: {
					query: query,
				},
				dataType: 'json',
				success: function (result) {
					$('.search-results').html(result.html);
				},
				complete: function () {
					$('.search-results').addClass('active');
				},
			});
		} else {
			$('.search-results').removeClass('active');
		}
	});

	$('.main-search-input input').on('keydown', function (e) {
		if (e.keyCode == 13) {
			window.location.href = '/search?query=' + $(this).val();
		}
	});

	$('.js-service-link').click(function (e) {
		e.preventDefault();
		$(this).siblings('.menu-services').toggleClass('active');
	});

	$('body').mouseup(function (e) {
		let div = $('body').find('.search');
		if (!div.is(e.target) && div.has(e.target).length === 0) {
			if ($('.search-results').hasClass('active')) {
				$('.search-results').removeClass('active');
				$('.search').removeClass('is-active');
				$('.header').removeClass('header-mini3');
				$('.search-icon-mobile').removeClass('is-active');
				$('body').removeClass('modal-open');
			}
		}

		let div2 = $('body').find('.menu-services');
		if (!div2.is(e.target) && div2.has(e.target).length === 0) {
			$('.menu-services').removeClass('active');
		}

		let div3 = $('body').find('.color-picker');
		if (!div3.is(e.target) && div3.has(e.target).length === 0) {
			$('.color-picker').removeClass('active');
		}
	});

	$('.burger').click(function () {
		if (!$(this).hasClass('is-active')) {
			$(this).addClass('is-active');
			$('body').addClass('modal-open');
			$('.mobile-info').addClass('is-active');
			$('.header').addClass('header-mini2');
			$('.search').removeClass('is-active');
			$('.header').removeClass('header-mini3');
			$('.search-icon-mobile').removeClass('is-active');
		} else {
			$(this).removeClass('is-active');
			$('body').removeClass('modal-open');
			$('.mobile-info').removeClass('is-active');
			$('.header').removeClass('header-mini2');
		}
	});

	$('.search-icon-mobile').click(function () {
		if (!$(this).hasClass('is-active')) {
			$(this).addClass('is-active');
			$('body').addClass('modal-open');
			$('.search').addClass('is-active');
			$('.header').addClass('header-mini3');
			setTimeout(() => $('.search input').focus(), 300);
		} else {
			$(this).removeClass('is-active');
			$('body').removeClass('modal-open');
			$('.search').removeClass('is-active');
			$('.header').removeClass('header-mini3');
		}
	});

	var sctop = $(window).scrollTop();
	if (!$('body').hasClass('modal-open')) {
		if (sctop < 100) {
			$('.header').removeClass('spy header-mini');
		} else {
			$('.header').addClass('header-mini');
		}
	}

	$('.table-block-title').click(function () {
		$(this).parent().toggleClass('active');
		$(this).parent().find('.table-block-content').slideToggle(300);
	});

	$('.ral-rulon > div:not(.ral-row)').click(function () {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$('.ral-rulon div').removeClass('active row-active');
			$(this).addClass('active');
		}
	});

	$('.ral-rulon .ral-row div').click(function () {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).parents('.ral-row').removeClass('row-active');
		} else {
			$('.ral-rulon div').removeClass('active row-active');
			$(this).parents('.ral-row').addClass('row-active');
			$(this).addClass('active');
		}
	});

	$('.color-picker-value').click(function (e) {
		e.preventDefault();
		$(this).parent().toggleClass('active');
	});

	$('.color-picker-colors > div').click(function (e) {
		e.preventDefault();
		$('.color-picker').removeClass('active');
		let color = $(this).data('color');
		let colorName = $(this).data('color-name');
		let colorCode = $(this).data('color-code');
		let colorText = $(this).find('span').html();

		$('.color-picker-colors > div').removeClass('active');
		$(this).addClass('active');

		$('.js-calc input[name="color"]').val(color);
		$('.color-picker-value-color').css('background-color', colorCode);
		$('.color-picker-value-text').html(`${colorName}, ${colorText}`);

		$('.js-color-text').html(colorName);

		calc();
	});

	if ($('.js-calc').length) {
		calc();
	}

	$(
		'.js-calc input[name="profile_type"], .js-calc input.dop_select, .js-calc input[name="material"], .js-calc input[name="tol"], .js-calc input[name="panel_type"], .js-calc input[name="panel_type"], .js-calc input[name="color"]'
	).change(function () {
		calc();
	});

	$('.js-quant').on('change', function (e) {
		e.preventDefault();
		let currentVal = $('.js-quant').val();
		if (currentVal == '') {
			$('.js-quant').val(1);
		}
	});

	$('.calc-quantity .minus').click(function (e) {
		e.preventDefault();
		let currentVal = parseInt($('.js-quant').val());

		if (currentVal > 1) {
			$('.js-quant').val(currentVal - 1);
		}
	});

	$('.calc-quantity .plus').click(function (e) {
		e.preventDefault();
		$('.js-quant').val(parseInt($('.js-quant').val()) + 1);
	});

	if ($('#oCarousel').length) {
		const container = document.getElementById('oCarousel');
		const options = {
			infinite: false,
			Dots: false,
			center: false,
			Thumbs: {
				type: 'classic',
			},
		};

		new Carousel(container, options, { Thumbs });
	}

	if ($('.features--mobile').length) {
		let featuresSlide = new Swiper('.features-main .swiper-container', {
			slidesPerView: 1,
			effect: 'slide',
			loop: false,
			spaceBetween: 0,
			autoHeight: true,
		});

		let iconsSlide = new Swiper('.features-icons .swiper-container', {
			slidesPerView: 'auto',
			effect: 'slide',
			loop: false,
			spaceBetween: 90,
			centeredSlides: true,
			navigation: {
				nextEl: '.features-icons .next',
				prevEl: '.features-icons .prev',
			},
		});

		iconsSlide.on('slideChange', function () {
			featuresSlide.slideTo(iconsSlide.activeIndex);
		});

		featuresSlide.on('slideChange', function () {
			iconsSlide.slideTo(featuresSlide.activeIndex);
		});
	}

	if ($('.reviews').length) {
		let rSlide = new Swiper('.reviews-content .swiper-container', {
			slidesPerView: 1,
			effect: 'slide',
			loop: false,
			spaceBetween: 0,
			autoHeight: true,
		});

		let r2Slide = new Swiper('.reviews-titles .swiper-container', {
			slidesPerView: 'auto',
			effect: 'slide',
			loop: false,
			spaceBetween: 16,
			centeredSlides: true,
			direction: 'vertical',
			navigation: {
				nextEl: '.reviews-titles .next',
				prevEl: '.reviews-titles .prev',
			},
			breakpoints: {
				900: {
					direction: 'horizontal',
				},
			},
		});

		rSlide.on('slideChange', function () {
			r2Slide.slideTo(rSlide.activeIndex);
		});

		r2Slide.on('slideChange', function () {
			rSlide.slideTo(r2Slide.activeIndex);
		});
	}

	if ($('.docs').length) {
		let featuresSlide = new Swiper('.docs .swiper-container', {
			slidesPerView: 3,
			effect: 'slide',
			loop: true,
			spaceBetween: 0,
			autoHeight: false,
			centeredSlides: true,
			navigation: {
				nextEl: '.docs .next',
				prevEl: '.docs .prev',
			},
		});
	}

	if ($('.letters').length) {
		let lettersSlide = new Swiper('.letters .swiper-container', {
			slidesPerView: 'auto',
			effect: 'slide',
			loop: true,
			spaceBetween: 30,
			autoHeight: false,
			centeredSlides: true,
		});
	}

	if ($('.about-slide').length) {
		let aboutSlide = new Swiper('.about-slide .swiper-container', {
			slidesPerView: 1,
			effect: 'slide',
			loop: true,
			spaceBetween: 0,
			autoHeight: false,
			navigation: {
				nextEl: '.about-slide .next',
				prevEl: '.about-slide .prev',
			},
			pagination: {
				el: '.about-slide .slide-pagination',
				clickable: true,
			},
			autoplay: {
				delay: 10000,
				disableOnInteraction: false,
			},
		});
	}

	if ($('.object-list').length) {
		let objectSlide = new Swiper('.object-list .swiper-container', {
			slidesPerView: 3,
			effect: 'slide',
			loop: true,
			spaceBetween: 30,
			navigation: {
				nextEl: '.object-list .next',
				prevEl: '.object-list .prev',
			},
			breakpoints: {
				900: {
					slidesPerView: 2,
					centeredSlides: true,
				},
			},
		});
	}
});

$(window).scroll(function () {
	var sctop = $(window).scrollTop();
	if (!$('body').hasClass('modal-open')) {
		if (sctop < 100) {
			$('.header').removeClass('spy header-mini');
		} else {
			$('.header').addClass('header-mini');
		}
	}
});
$(window).on('wheel', function (e) {
	var sctop = $(window).scrollTop();
	var delta = e.originalEvent.deltaY;
	if (document.body.scrollHeight > window.innerHeight && !$('body').hasClass('modal-open')) {
		if (delta > 0 && sctop > 500) {
			$('.header').addClass('spy');
		} else {
			$('.header').removeClass('spy');
		}
	}
});
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
	xDown = evt.touches[0].clientX;
	yDown = evt.touches[0].clientY;
}
function handleTouchMove(evt) {
	if (!xDown || !yDown) {
		return;
	}

	var xUp = evt.touches[0].clientX;
	var yUp = evt.touches[0].clientY;
	var xDiff = xDown - xUp;
	var yDiff = yDown - yUp;

	if (Math.abs(xDiff) > Math.abs(yDiff)) {
		if (xDiff > 0) {
		} else {
			/* right swipe */
		}
	} else {
		if (document.body.scrollHeight > window.innerHeight && !$('body').hasClass('modal-open')) {
			if (yDiff > 0) {
				/* up swipe */
				var sctop = $(window).scrollTop();
				if (sctop > 100) {
					$('.header').addClass('spy');
				} else {
				}
			} else {
				/* down swipe */
				$('.header').removeClass('spy');
			}
		}
	}
	/* reset values */
	xDown = null;
	yDown = null;
}

var clearHeaderByResize = () => {
	var header = document.querySelector('.header');
	var mobileInfo = document.querySelector('.mobile-info');
	var burger = document.querySelector('.burger');

	if (!header || !mobileInfo || !burger) return;

	var mq1228 = window.matchMedia('(max-width: 1228px)');

	var handleMQ = (e) => {
		if (!e.matches) {
			document.body.classList.remove('modal-open');
			header.classList.remove('spy');
			header.classList.remove('header-mini');
			header.classList.remove('header-mini2');
			header.classList.remove('header-mini3');
			mobileInfo.classList.remove('is-active');
			burger.classList.remove('is-active');
		}
	};

	mq1228.addEventListener('change', handleMQ);
};

document.addEventListener('DOMContentLoaded', () => {
	clearHeaderByResize();
});
