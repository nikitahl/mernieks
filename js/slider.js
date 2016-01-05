var slider = {
  el: document.querySelectorAll(".slide"),
  prevBtn: document.querySelector(".arrow-prev"),
  nextBtn: document.querySelector(".arrow-next"),
  thumbBtn: document.querySelectorAll(".nav-thumbs"),
  activeSlideIndex: null,
  lastSlideIndex: function() {
    var _this = this;
    for ( i = 0; i < _this.el.length; i++ ) {
      var arrayLastElement = _this.el[_this.el.length - 1];
      if ( _this.el[i] === arrayLastElement ) {
        return i;
      }
    }
  },
  searchForClass: function () {  // search for element with class name "is-active-slde"
    var _this = this;
    for ( i = 0; i < _this.el.length; i++ ) {
      var checkForClass = _this.el[i].classList;
      if ( checkForClass.contains("is-active-slide") ) {
        this.activeSlideIndex = i; //store index of current element with the class "is-active-slide";
        return _this.el[i];  //returns current element with class name "is-active-slide"
      }
    }
  },
  showNextAuto: function() {
    var _this = this;
    if ( _this.searchForClass ) {
      var nextElement = _this.searchForClass().nextElementSibling; //select next element after active class
      if ( _this.activeSlideIndex === _this.lastSlideIndex() ) { // execute if last slide
        _this.showFirst();
      } else {
        _this.searchForClass().classList.remove("is-active-slide");
        nextElement.classList.add("is-active-slide");
      }
    }
    this.searchForClass();
    this.activeIndex();
  },
  showNext: function() {
    var _this = this;
    this.nextBtn.onclick = function() {
      _this.showNextAuto();
      // console.log(slider.activeSlideIndex);
    };
  },
  showPrev: function() {
    var _this = this;
    this.prevBtn.onclick = function () {
      if ( _this.searchForClass ) {
        //select element previous to active class
        var prevElement = _this.searchForClass().previousElementSibling;
        if ( _this.activeSlideIndex === 0 ) { // execute if first slide
          _this.showLast();
        } else {
          _this.searchForClass().classList.remove("is-active-slide");
          prevElement = prevElement.className += " " + "is-active-slide";
        }
      }
      _this.searchForClass();
      _this.activeIndex();
      // console.log(slider.activeSlideIndex);
    }
  },
  showFirst: function() {
    //remove active class from existing element
    this.searchForClass().classList.remove("is-active-slide");
    //add class to the first element in array
    this.el[0].className += " " + "is-active-slide";
  },
  showLast: function() {
    //remove active class from existing element
    this.searchForClass().classList.remove("is-active-slide");
    //add class to the last element in array
    this.el[this.lastSlideIndex()].className += " " + "is-active-slide";
  },
  autoPlay: function() {
    var _this = this,
    play = setInterval(function() {
      _this.showNextAuto()
    }, 5000);
  },
  activeIndex: function() {
    var _this = this;
    for ( i = 0; i < slider.thumbBtn.length; i++ ) {
      if ( i === this.activeSlideIndex ) {
        if ( _this.storeActiveThumb === null ) {
          _this.storeActiveThumb = slider.thumbBtn[i++];
          _this.storeActiveThumb.className += " " + "is-active-thumb";
        } else if ( _this.checkThumbClass() ) {
          _this.storeActiveThumb.classList.remove("is-active-thumb");
          _this.storeActiveThumb = slider.thumbBtn[i];
          _this.storeActiveThumb.className += " " + "is-active-thumb";
        }
      }

    }
  },
  storeActiveThumb: null,
  checkThumbClass: function () {
   return (" " + this.storeActiveThumb.className + " " ).indexOf( " "+"is-active-thumb"+" " ) > -1;
  },
  showByIndex: function() {
    var _this = this;
    for (var i = 0; i < this.thumbBtn.length; i++) { //closure to find clicked thumb
     (function(index){
       _this.thumbBtn[i].onclick = function(){
         for ( j = 0; j < _this.el.length; j++ ) {
           if ( index === j ) { //compare if clicked thumb index is equal to slide index
            //  console.log(_this.el[j])  ;
             _this.searchForClass().classList.remove("is-active-slide");
             _this.el[j].className += " " + "is-active-slide";
             _this.activeSlideIndex = index;
             _this.activeIndex();
            //  console.log(_this.activeSlideIndex)  ;
           }
         }
       }
     })(i);
    }
  },
  initPages: function () {
    this.lastSlideIndex();
    this.searchForClass();
    this.showNext();
    this.showPrev();
    this.showByIndex();
    this.activeIndex();
    this.autoPlay();
  }

}

slider.initPages();
