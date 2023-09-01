var scrollEventHandler = function()
{
  window.scroll(0, window.pageYOffset)
}

window.addEventListener("scroll", scrollEventHandler, false);

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');

	// Scrolly links.
		$('.scrolly').scrolly({
			speed: 2000
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350
		});

	// Nav.

		
		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Parallax.
	// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
		if (browser.name == 'ie'
		||	browser.mobile) {

			$.fn._parallax = function() {

				return $(this);

			};

		}
		else {

			$.fn._parallax = function() {

				$(this).each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						$this
							.css('background-position', 'center 0px');

						$window
							.on('scroll._parallax', function() {

								var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

								$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

							});

					};

					off = function() {

						$this
							.css('background-position', '');

						$window
							.off('scroll._parallax');

					};

					breakpoints.on('<=medium', off);
					breakpoints.on('>medium', on);

				});

				return $(this);

			};

			$window
				.on('load resize', function() {
					$window.trigger('scroll');
				});

		}

	// Spotlights.
		var $spotlights = $('.spotlight');

		$spotlights
			._parallax()
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					var top, bottom, mode;

					// Use main <img>'s src as this spotlight's background.
						$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

					// Side-specific scrollex tweaks.
						if ($this.hasClass('top')) {

							mode = 'top';
							top = '-20%';
							bottom = 0;

						}
						else if ($this.hasClass('bottom')) {

							mode = 'bottom-only';
							top = 0;
							bottom = '20%';

						}
						else {

							mode = 'middle';
							top = 0;
							bottom = 0;

						}

					// Add scrollex.
						$this.scrollex({
							mode:		mode,
							top:		top,
							bottom:		bottom,
							initialize:	function(t) { $this.addClass('inactive'); },
							terminate:	function(t) { $this.removeClass('inactive'); },
							enter:		function(t) { $this.removeClass('inactive'); },

							// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

							//leave:	function(t) { $this.addClass('inactive'); },

						});

				};

				off = function() {

					// Clear spotlight's background.
						$this.css('background-image', '');

					// Remove scrollex.
						$this.unscrollex();

				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Wrappers.
		var $wrappers = $('.wrapper');

		$wrappers
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					$this.scrollex({
						top:		250,
						bottom:		0,
						initialize:	function(t) { $this.addClass('inactive'); },
						terminate:	function(t) { $this.removeClass('inactive'); },
						enter:		function(t) { $this.removeClass('inactive'); },

						// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

						//leave:	function(t) { $this.addClass('inactive'); },

					});

				};

				off = function() {
					$this.unscrollex();
				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Banner.
		var $banner = $('#banner');

		$banner
			._parallax();

})(jQuery);


$('.slider').each(function() {
	var $this = $(this);
	var $group = $this.find('.slide_group');
	var $slides = $this.find('.slide');
	var bulletArray = [];
	var currentIndex = 0;
	var timeout;
	
	function move(newIndex) {
	  var animateLeft, slideLeft;
	  
	  advance();
	  
	  if ($group.is(':animated') || currentIndex === newIndex) {
		return;
	  }
	  
	  bulletArray[currentIndex].removeClass('active');
	  bulletArray[newIndex].addClass('active');
	  
	  if (newIndex > currentIndex) {
		slideLeft = '100%';
		animateLeft = '-100%';
	  } else {
		slideLeft = '-100%';
		animateLeft = '100%';
	  }
	  
	  $slides.eq(newIndex).css({
		display: 'block',
		left: slideLeft
	  });
	  $group.animate({
		left: animateLeft
	  }, function() {
		$slides.eq(currentIndex).css({
		  display: 'none'
		});
		$slides.eq(newIndex).css({
		  left: 0
		});
		$group.css({
		  left: 0
		});
		currentIndex = newIndex;
	  });
	}
	
	function advance() {
	  clearTimeout(timeout);
	  timeout = setTimeout(function() {
		if (currentIndex < ($slides.length - 1)) {
		  move(currentIndex + 1);
		} else {
		  move(0);
		}
	  }, 4000);
	}
	
	$('.next_btn').on('click', function() {
	  if (currentIndex < ($slides.length - 1)) {
		move(currentIndex + 1);
	  } else {
		move(0);
	  }
	});
	
	$('.previous_btn').on('click', function() {
	  if (currentIndex !== 0) {
		move(currentIndex - 1);
	  } else {
		move(3);
	  }
	});
	
	$.each($slides, function(index) {
	  var $button = $('<a class="slide_btn">&bull;</a>');
	  
	  if (index === currentIndex) {
		$button.addClass('active');
	  }
	  $button.on('click', function() {
		move(index);
	  }).appendTo('.slide_buttons');
	  bulletArray.push($button);
	});
	
	advance();
  });


  const reviewWrap = document.getElementById("reviewWrap");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const imgDiv = document.getElementById("imgDiv");
// const personName = document.getElementById("personName");
const profession = document.getElementById("profession");
const description = document.getElementById("description");
const chicken = document.querySelector(".chicken");

let isChickenVisible;

let people = [
	{
		photo:
			'url("https://cdn.pixabay.com/photo/2018/03/06/22/57/portrait-3204843_960_720.jpg")',
		
		profession: "Revenova",
		description:
			"“We work with Road Scholar to transport product for delivery to our most important customers from Boston to Miami, and all points in between - Chi Town Shuttle coming soon!!! The Team at Road Scholar designed solutions for problems that no other carrier was able to solve, and as a result we've experienced great growth in our customer relationships, and our sales!”\n Chris Burge National Facilities Director / Corporate Compliance & Safety Officer iGourmet"

	},

	{
		photo:
			"url('https://cdn.pixabay.com/photo/2019/02/11/20/20/woman-3990680_960_720.jpg')",
		
		profession: "Langham Logistics",
		description:
			"“We continue to work with Road Scholar Transport for their great communication, friendly staff, and truck availability. Their tracking team always gives us prompt updates. They have a lot of capacity in the Northeast and will find us a truck if we are in a bind. Customer service team and drivers are always friendly to talk to over email or on the phone.” \n Stephanie Long \n Langham Logistics"
	},

	{
		photo:
			"url('https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg')",
		profession: "Adhesives and Chemicals",
		description:
			"“The customer service people are great, friendly and respond quickly to emails. Love the drivers, always friendly and courteous. I know one of them for about 25 years!!” \n Dianne Mierau \n General Manager \n Precision Adhesives and Chemicals \n DBA Adhesives and Chemicals"
	},

	{
		photo:
			"url('https://cdn.pixabay.com/photo/2014/10/30/17/32/boy-509488_960_720.jpg')",
		
		profession: "VAI",
		description:
			"“We use Road Scholar for a number of different things – and have for years – for the simple fact that they are dependable. Being the largest cocoa company in the world, we have frequent production line changes and are needing either drums or pallets within the day, and RST comes through for us, so the plant can continue running flawlessly.” \n Marlene \n Sr. Coordinator, Logistics"

	},
	{
		photo:
			"url('https://cdn.pixabay.com/photo/2014/10/30/17/32/boy-509488_960_720.jpg')",
		
		profession: "",
		description:
			"““Talk about Top Class Service!” \n -Max Logistics Manager"

	}


];

imgDiv.style.backgroundImage = people[0].photo;

profession.innerText = people[0].profession;
description.innerText = people[0].description;
let currentPerson = 0;

//Select the side where you want to slide
function slide(whichSide, personNumber) {
	let reviewWrapWidth = reviewWrap.offsetWidth + "px";
	let descriptionHeight = description.offsetHeight + "px";
	//(+ or -)
	let side1symbol = whichSide === "left" ? "" : "-";
	let side2symbol = whichSide === "left" ? "-" : "";

	let tl = gsap.timeline();

	if (isChickenVisible) {
		tl.to(chicken, {
			duration: 0.4,
			opacity: 0
		});
	}

	tl.to(reviewWrap, {
		duration: 0.4,
		opacity: 0,
		translateX: `${side1symbol + reviewWrapWidth}`
	});

	tl.to(reviewWrap, {
		duration: 0,
		translateX: `${side2symbol + reviewWrapWidth}`
	});

	setTimeout(() => {
		imgDiv.style.backgroundImage = people[personNumber].photo;
	}, 400);
	setTimeout(() => {
		description.style.height = descriptionHeight;
	}, 400);
	setTimeout(() => {
		personName.innerText = people[personNumber].name;
	}, 400);
	setTimeout(() => {
		profession.innerText = people[personNumber].profession;
	}, 400);
	setTimeout(() => {
		description.innerText = people[personNumber].description;
	}, 400);

	tl.to(reviewWrap, {
		duration: 0.4,
		opacity: 1,
		translateX: 0
	});

	if (isChickenVisible) {
		tl.to(chicken, {
			duration: 0.4,
			opacity: 1
		});
	}
}

function setNextCardLeft() {
	if (currentPerson === 3) {
		currentPerson = 0;
		slide("left", currentPerson);
	} else {
		currentPerson++;
	}

	slide("left", currentPerson);
}

function setNextCardRight() {
	if (currentPerson === 0) {
		currentPerson = 3;
		slide("right", currentPerson);
	} else {
		currentPerson--;
	}

	slide("right", currentPerson);
}

leftArrow.addEventListener("click", setNextCardLeft);
rightArrow.addEventListener("click", setNextCardRight);

surpriseMeBtn.addEventListener("click", () => {
	if (chicken.style.opacity === "0") {
		chicken.style.opacity = "1";
		imgDiv.classList.add("move-head");
		surpriseMeBtn.innerText = "Remove the chicken";
		surpriseMeBtn.classList.remove("surprise-me-btn");
		surpriseMeBtn.classList.add("hide-chicken-btn");
		isChickenVisible = true;
	} else if (chicken.style.opacity === "1") {
		chicken.style.opacity = "0";
		imgDiv.classList.remove("move-head");
		surpriseMeBtn.innerText = "Surprise me";
		surpriseMeBtn.classList.add("surprise-me-btn");
		surpriseMeBtn.classList.remove("hide-chicken-btn");
		isChickenVisible = false;
	}
});

window.addEventListener("resize", () => {
	description.style.height = "100%";
});


// var ticking = false,
//   currSlide = 0,
//   maxSlides = document.querySelectorAll(".scrollsec-item").length,
//   scrollSensitivitySetting = 30,
//   scrollPos = 0,
//   slideDurationSetting = 600;
var r="html,body{overflow:auto !important;}"; 
var s=document.createElement("style"); 
s.type="text/css"; 
s.appendChild(document.createTextNode(r)); 
document.body.appendChild(s); 
void 0;
createObserver();

function createObserver() {
  let observer;

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: []
  };
  
  var thresholdSet = [[0.0, 0.1, 0.2, 0.3, 0.4, 0.5]];
  
  for (let i=0; i<=1.0; i+= 0.01) {
    thresholdSet.push(i);
  }
  
  options.threshold = thresholdSet[0];

  observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(document.querySelector(".scrollsec"));
}

function handleIntersect(entries) {

  if (entries[0].intersectionRatio <= 0) {
    return;
  }
  
  if (entries[0].intersectionRatio >= 0.5) {

        document.addEventListener("touchmove", function(e) {
          e.preventDefault();
        });

        document.addEventListener("wheel", scrollPanels);
        document.addEventListener('keydown', logKey);

        document.getElementsByTagName("body")[0].style.overflow = "hidden";
        
        TweenLite.to(window, 0.7, {scrollTo:{y:".scrollsec"}});
        
   }
}

//window.addEventListener("scroll", theScroll, false);

function scrollPanels(evt) {
 
  delta = evt.wheelDelta;

  if (!ticking) {
    if (delta <= -scrollSensitivitySetting) {
      //Down scroll
      downScroll();
    }
    if (delta >= scrollSensitivitySetting) {
      //Up scroll
      upScroll();
    }
  }
}

function downScroll() {
  ticking = true;
  if (currSlide !== maxSlides) {
    currSlide++;
    nextItem();
  } else {
    disable("down");
  }
  slideDurationTimeout(slideDurationSetting);
}

function upScroll() {
  ticking = true;
  if (currSlide !== 0) {
    currSlide--;
    previousItem();
  } else {
    disable("up");
  }
  slideDurationTimeout(slideDurationSetting);
}

function nextItem() {
  document.querySelectorAll('.scrollsec-item').forEach(function(item) { item.classList.remove('is-active') });
  document.querySelectorAll('.scrollsec-item')[currSlide-1].classList.add('is-active');
}

function previousItem() {
  document.querySelectorAll('.scrollsec-item').forEach(function(item) { item.classList.remove('is-active') });
  document.querySelectorAll('.scrollsec-item')[currSlide].classList.add('is-active');
}

function logKey(e) {
  switch (e.keyCode) {
        //up
        case 38:
        case 33:
            upScroll();
            break;

        //down
        case 40:
        case 34:
            downScroll();
            break;

    }
}

function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
  }, slideDuration);
}

// function disable(direction) {
//   if (direction === "up") {
//     TweenLite.to(window, 0.7, {scrollTo:{y:".title"}});
//   } else {
//     TweenLite.to(window, 0.7, {scrollTo:{y:".footer"}});
//   }

//   enableScroll();
// }


function enableScroll() {
  document.removeEventListener("touchmove", function(e) {
    e.preventDefault();
  });
  document.removeEventListener("wheel", scrollPanels);
  document.removeEventListener("keydown", logKey);
  document.getElementsByTagName("body")[0].style.overflow = "auto";
  document.querySelectorAll('.scrollsec-item').forEach(function(item) { item.classList.remove('is-active') });
  ticking = false;
}

var prevButton = '<button type="button" data-role="none" class="slick-prev" aria-label="prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" version="1.1"><path fill="#FFFFFF" d="M 16,16.46 11.415,11.875 16,7.29 14.585,5.875 l -6,6 6,6 z" /></svg></button>',
    nextButton = '<button type="button" data-role="none" class="slick-next" aria-label="next"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#FFFFFF" d="M8.585 16.46l4.585-4.585-4.585-4.585 1.415-1.415 6 6-6 6z"></path></svg></button>';

$('.single-item').slick({
  infinite: true,
  dots: true,
  autoplay: true,
  autoplaySpeed: 4000,
  speed: 1000,
  cssEase: 'ease-in-out',
  prevArrow: prevButton,
  nextArrow: nextButton
});

$('.quote-container').mousedown(function(){
  $('.single-item').addClass('dragging');
});
$('.quote-container').mouseup(function(){
  $('.single-item').removeClass('dragging');
});