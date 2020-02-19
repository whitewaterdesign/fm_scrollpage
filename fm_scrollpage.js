$( document ).ready(function() {
    (function ( $ ) {

    $.fn.fm_scrollpage = function(options) {

        // Create max height
        // How many children?
        var childcount = $(this).children().length;

        // Get height of first child element
        if(options.height) {
            if(options.height.includes("px")) {
                options.units = "px";
            } else if (options.height.includes("%")) {
                options.units = "%";
            } 
            options.height = parseInt(options.height);
        } 
        else {
            options.height = 696;
            options.units = "px";
        }

        var step = 0 - options.height;
        var maxStep = childcount;
        --maxStep;
        var currentTransform = 0;
        var timeOut = 1000;
        var sTimeOut = 1000;
        var shortTimeOut = 300;
        var parent = $(this);
        var minWidth = 992;
        this.find(".section").eq(0).addClass("active");

        if(options.lastslide) {
            var lastSlideClass = options.lastslide;
        } else {
            var lastSlideClass = "";
        }

        if(options.changeLastSlide) {
            lastSlideClass += " scrollpage_end";
        }

        var myData = {
            "translate":0,
            "step":0,
            "active":false,
            "timeOut": 750,
            "sTimeOut": 500,
            "lastslide": lastSlideClass,
            removeClassLastSlide() {
                $('body').removeClass(this.lastslide);
                $('#main_content').removeClass();
                $('#main_content').addClass("step" + this.step);
            },
            addClassLastSlide() {
                $('body').addClass(this.lastslide);
                $('#main_content').removeClass();
                $("#main_content").addClass("step" + this.step);
            },
            setLastSlide() {
                if(this.lastslide) {
                    if(this.isLastSlide()) {
                        this.addClassLastSlide();
                    } else {
                        this.removeClassLastSlide();
                    }
                }
            },
            up() {
                ++this.step;
            },
            down() {
                --this.step;
            },
            top() {
                this.step = 0;
            },
            bottom() {
                this.step = maxStep;
            },
            calc() {
                return step * this.step;
            },
            max() {
                return this.step<maxStep;
            },
            min() {
                return this.step>0;
            },
            translateY() {
                var a = "translateY(";
                var b = "px)"
                return a.concat(this.calc(),b);
            },
            activate() {
                this.active = true;
            },
            deactivate() {
                this.active = false;
            },
            setDeactivate(delay = timeOut) {
                var proxyMyData = this;
                proxyMyData.active = true;
                var delay = 
                setTimeout(function(){proxyMyData.active = false},timeOut);
            },
            setDeactivateS() {
                var proxyMyData = this;
                proxyMyData.active = true;
                setTimeout(function(){proxyMyData.active = false},sTimeOut);
            },
            transform(type) {
                if(type=="up") {
                    ++this.step;
                } else if(type=="top") {
                    this.step=0;
                } else if(type=="bottom") {
                    this.step=maxStep;
                } else if(type=="down") {
                    --this.step;
                }
                parent.css('transform',myData.translateY());
                $(".section.active").removeClass("active");
                parent.find(".section").eq(this.step).addClass("active");

            },
            eventDown(event) {
                if(this.max()) {
                    event.preventDefault();
                    this.transform("up");
                }
            },
            eventUp(event) {
                if(this.min()) {
                    event.preventDefault();
                    this.transform("down");
                }
            },
            isLastSlide() {
                if(maxStep==this.step) {return true;} else {return false;}
            },
            isBottom(dir) {
                if(dir == "down") {
                    return $(window).scrollTop() + $(window).height() + 500 >= $(document).height() && !myData.active;
                } else {
                    return $(window).scrollTop() + $(window).height() + 100 >= $(document).height() && !myData.active;
                }
                
            }
        };
        
        parent.data(myData);
        
       // console.log(myData.transform());
        $('body').keydown(function(event) {
            if(window.innerWidth > minWidth){
            
                if (event.metaKey && event.which == 38) {
                    //page up
                    myData.transform("top");
                    myData.removeClassLastSlide();
                    console.log('page up');
                } 
                else if (event.which == 224 && event.which == 38) {
                    //page up
                    myData.transform("top");
                    myData.removeClassLastSlide();
                    console.log('page up');
                }
                else if (event.metaKey && event.which == 40) {
                    //page down
                    myData.transform("bottom");
                    myData.addClassLastSlide();
                    console.log('page down');
                }
                else if (event.which == 40 && event.which == 224) {
                    //page down
                    myData.transform("bottom");
                    myData.addClassLastSlide();
                    console.log('page down');
                }
                else if(event.which == 40) {
                    // down
                myData.eventDown(event);

                } else if(event.which == 38) {
                    // up
                    myData.eventUp(event);
                }
                else if(event.which == 33) {
                    //page up
                }
                else if(event.which == 34) {
                    //page down
                }
                if(myData.lastslide) {
                    if(myData.isLastSlide()) {
                        console.log('islastslide');
                        myData.addClassLastSlide();
                    } else {
                        console.log('removeclass');
                        myData.removeClassLastSlide();
                    }
                }   
            } 
            else if (event.which == 40 && event.metaKey) { // cmd - down
                myData.addClassLastSlide();
            }
            else if (event.which == 38 && event.metaKey) { // cmd - up
                myData.removeClassLastSlide();
            }
            else if (event.which == 40 && myData.isBottom('down')) {
                myData.addClassLastSlide();
            } 
            else if (event.which == 38 && myData.isBottom()) {
                myData.addClassLastSlide();
            }
            else if (event.which == 40 || event.which == 38) {
                myData.removeClassLastSlide();
            }
        });

        $('.scroll-notice.up').click(function(event){
            event.preventDefault();
            if(window.innerWidth > minWidth){
                myData.transform("top");
            } else { 
                event.preventDefault();
                $("html, body").animate({ scrollTop: 0 });
            }
            myData.removeClassLastSlide();
        });

        $('.scroll-notice.down').click(function(event){
            event.preventDefault();
            if(window.innerWidth > minWidth){
                myData.transform("up");
            } else { 
                $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
            } 
            if(myData.lastslide) {
                if(myData.isLastSlide()) {
                    console.log('islastslide');
                    myData.addClassLastSlide();
                } else {
                    console.log('removeclass');
                    myData.removeClassLastSlide();
                }
            } 
        });

        parent.on('mousewheel DOMMouseScroll', function(e){

            if(!myData.active && window.innerWidth > minWidth) {

                if(typeof e.originalEvent.detail == 'number' && e.originalEvent.detail !== 0) {

                    if(e.originalEvent.detail > 0) {
                        // Down
                        if(myData.step<maxStep) {
                            //myData.up();
                            myData.transform("up");
                            myData.setDeactivate();
                            console.log(myData.step);
                        }                        
                    } else if(e.originalEvent.detail < 0){
                        // Up
                        if(myData.step>0) {
                            myData.transform("down");
                            myData.setDeactivate();
                            console.log(myData.step);
                        }
                    }
                } else if (typeof e.originalEvent.wheelDelta == 'number') {
                    if(e.originalEvent.wheelDelta < 0) {
                        // Down
                        if(myData.step<maxStep) {
                            myData.transform("up");
                            setTimeout(function(){myData.active=false},sTimeOut);
                            console.log(myData.step);
                        }
                        
                    } else if(e.originalEvent.wheelDelta > 0) {
                        //Up
                        if(myData.step>0) {
                            myData.transform("down");
                            myData.setDeactivateS();
                            console.log(myData.step);
                        }
                    }
                }

                if(myData.lastslide) {
                    if(myData.isLastSlide()) {
                        console.log('islastslide');
                        myData.addClassLastSlide();
                    } else {
                        console.log('removeclass');
                        myData.removeClassLastSlide();
                    }
                }
            } 
            else if (!myData.active) {
                if(elementInViewport2($('.recommendation'))) {
                    myData.setDeactivate(shortTimeOut);
                    myData.addClassLastSlide();
                } else {
                    myData.setDeactivate(shortTimeOut);
                    myData.removeClassLastSlide();
                }
            }

            $( window ).resize(function() {
                if(window.innerWidth < minWidth) {
                    parent.css('transform','translateY(0)');
                }
            });
            
        });
    };

    function translateY(num) {
        var a = "translateY(";
        var b = "px)"
        return a.concat(num,b);
    }

    function makeActive() {
        myData.active = true;
        setTimeout(function(){myData.active=false},timeOut);
    }

    function elementInViewport2(el) {
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }

        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;
      
        while(el.offsetParent) {
          el = el.offsetParent;
          top += el.offsetTop;
          left += el.offsetLeft;
        }
      
        return (
          top < (window.pageYOffset + window.innerHeight) &&
          left < (window.pageXOffset + window.innerWidth) &&
          (top + height) > window.pageYOffset &&
          (left + width) > window.pageXOffset
        );
      }

}( jQuery ));
});