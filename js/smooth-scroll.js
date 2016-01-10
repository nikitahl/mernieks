(function(){

  var toggleTop = {
    toTopBtn: document.querySelector(".uptop"),
    hideToTopBtn: function() {
      this.toTopBtn.classList.add("is-hidden-btn");
    },
    showToTopBtn: function() {
      var _this = this;
      window.onscroll = function () {
        var documentBody = document.body;
        if ( documentBody.scrollTop > 500 ) {
          _this.toTopBtn.classList.remove("is-hidden-btn");
        } else {
          _this.toTopBtn.classList.add("is-hidden-btn");
        }
      }
    },
    init: function() {
      this.hideToTopBtn();
      this.showToTopBtn();
    }
  }
  toggleTop.init();

  var SmoothScroll = function() {
    var el = document.querySelectorAll('a[href^="#"]'), // select all elements with hash link
        el = Array.prototype.slice.call(el), // convert nodelist to array
        scrollY = 0,
      	distance = 40, //amount of pixels being scrolled during animation
      	speed = 25;

    for (i = 0; i < el.length; i++ ) { //assign every link an event with function
      el[i].addEventListener( "click", function(e){
        console.dir(e);
        e.preventDefault();
        scrollToEl.call(this);
      }
       );
    }

    function scrollToEl() {
      var trigger = this.getAttribute("href"),
        targetEl = document.querySelector(trigger);
        function performScroll() {
          var currentY = window.pageYOffset, //returns the pixels the current document has been scrolled
            targetY = targetEl.offsetTop, //returns the distance of the current element relative to the top of the offsetParent node.
            bodyHeight = document.body.offsetHeight, //returns the viewable height of an element (body) in pixels
            yPos = currentY + window.innerHeight, //returns currentY + the inner height of a window's content area
            animator;
            if (yPos > bodyHeight) { //check if scroll is larger than the page height
              clearTimeout(animator);
            } else {
              if (currentY < targetY - distance) {
                scrollY = currentY + distance;
                console.log('scrollY:' + scrollY);
                window.scroll(0, scrollY);
                animator = setTimeout(performScroll, speed);
              } else {
                 clearTimeout(animator);
              }
            }
        }
        performScroll();
      }
  }
  SmoothScroll();

})()
