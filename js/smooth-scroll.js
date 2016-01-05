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
      	speed = 5000;

    for (i = 0; i < el.length; i++ ) { //assign every link an event with function
      el[i].addEventListener( "click", scrollToEl );
    }

    function scrollToEl() {
      var trigger = this.getAttribute("href"),
        targetEl = document.querySelector(trigger);
        function performScroll() {
          var currentY = window.pageYOffset, //returns the pixels the current document has been scrolled
            targetY = targetEl.offsetTop, //returns the distance of the current element relative to the top of the offsetParent node.
            bodyHeight = document.body.offsetHeight, //returns the viewable height of an element (body) in pixels
            yPos = currentY + window.innerHeight, //returns currentY + the inner height of a window's content area
            animator = setTimeout(performScroll, speed);

            console.log('------------------');
            console.log('targetY:' + targetY);
            console.log('currentY:' + currentY);
            console.log('bodyHeight:' + bodyHeight);
            console.log('yPos:' + yPos);
            console.log('distance:' + distance);

            // console.log(targetY);
            //console.log(yPos);
            if (yPos > bodyHeight) { //check if scroll is larger than the page height
              clearTimeout(animator);
            } else {
              if (currentY < targetY - distance) {
                // console.log(currentY);
                // console.log(targetY);
                // console.log(targetY - distance);
                scrollY = currentY + distance;
                console.log('scrollY:' + scrollY);
                window.scrollTo(0, scrollY);
              } else {
                 clearTimeout(animator);
              }
            }
            console.log('===================');
            // console.log("---------------------");
            // console.log(currentY);
        }
        performScroll();
        return false;
      }
  }
  SmoothScroll();

})()

// var go = function() {
//   setTimeout(this.go, 90);
//   window.scrollBy(0, -100);
//   el.offsetTop
//
// }
//
// go();
