$(window).on('load',function(){
  gsap.to('#loader',1,{y:"-100%"});
  gsap.to('#loader',1,{opacity:0});
  gsap.to('#loader',0,{display:"none",delay:1});
  gsap.to('#header',0,{display:"block",delay:1})
  gsap.to('#navigation-content',0,{display:"none"});
  gsap.to('#navigation-content',0,{display:"flex",delay:1});
})
$(function(){
  $('.color-panel').on("click",function(e) {
    e.preventDefault();
    $('.color-changer').toggleClass('color-changer-active');
});
$('.colors a').on("click",function(e) {
  e.preventDefault();
  var attr = $(this).attr("title");
  console.log(attr);
  $('head').append('<link rel="stylesheet" href="css/'+attr+'.css">');
});
});
$(function(){
     $('.menubar').on('click',function(){
         gsap.to('#navigation-content',.6,{y:0});
     })
     $('.navigation-close').on('click',function(){
        gsap.to('#navigation-content',.6,{y:"-100%"});
    });
   }); 

$(function(){
    var TxtRotate = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
      };
      
      TxtRotate.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];
      
        if (this.isDeleting) {
          this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
          this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
      
        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
      
        var that = this;
        var delta = 200 - Math.random() * 100;
      
        if (this.isDeleting) { delta /= 2; }
      
        if (!this.isDeleting && this.txt === fullTxt) {
          delta = this.period;
          this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
          this.isDeleting = false;
          this.loopNum++;
          delta = 100;
        }
      
        setTimeout(function() {
          that.tick();
        }, delta);
      };
      
      window.onload = function() {
        var elements = document.getElementsByClassName('txt-rotate');
        for (var i=0; i<elements.length; i++) {
          var toRotate = elements[i].getAttribute('data-rotate');
          var period = elements[i].getAttribute('data-period');
          if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
          }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".txt-rotate > .wrap { border-right: 0em solid #666 ; }";
        document.body.appendChild(css);
      };
})
$(function(){

    $('#about-link').on('click', function() {
      gsap.to('#navigation-content', { duration: 0.5, display: "none", y: '-100%', ease: "power2.inOut" });
      gsap.to('#header', { duration: 0.5, display: "none", ease: "power2.inOut" });
      gsap.to('#blog, #portfolio, #contact', { duration: 0.5, display: "none", ease: "power2.inOut" });
      gsap.to('#about', { duration: 0.5, display: "block", ease: "power2.inOut" });
      gsap.to('#navigation-content', { duration: 0.5, display: 'flex', ease: "power2.inOut" });
    });

    $('#contact-link').on('click', function() {
      gsap.to('#navigation-content', { duration: 0.5, display: "none", y: '-100%', ease: "power2.inOut" });
      gsap.to('#header, #about, #blog, #portfolio', { duration: 0.5, display: "none", ease: "power2.inOut" });
      gsap.to('#contact', { duration: 0.5, display: "block", ease: "power2.inOut" });
      gsap.to('#navigation-content', { duration: 0.5, display: 'flex', ease: "power2.inOut" });
    });

    $('#portfolio-link').on('click', function() {
      gsap.to('#navigation-content', { duration: 0.5, display: "none", y: '-100%', ease: "power2.inOut" });
      gsap.to('#header, #about, #contact, #blog', { duration: 0.5, display: "none", ease: "power2.inOut" });
      gsap.to('#portfolio', { duration: 0.5, display: "block", ease: "power2.inOut" });
      gsap.to('#navigation-content', { duration: 0.5, display: 'flex', ease: "power2.inOut" });
    });

    $('#blog-link').on('click', function() {
      gsap.to('#navigation-content', { duration: 0.5, display: "none", y: '-100%', ease: "power2.inOut" });
      gsap.to('#header, #about, #portfolio, #contact', { duration: 0.5, display: "none", ease: "power2.inOut" });
      gsap.to('#blog', { duration: 0.5, display: "block", ease: "power2.inOut" });
      gsap.to('#navigation-content', { duration: 0.5, display: 'flex', ease: "power2.inOut" });
    });

    $('#home-link').on('click', function() {
      gsap.to('#navigation-content', { duration: 0.5, display: "none", y: '-100%', ease: "power2.inOut" });
      gsap.to('#header, #about, #portfolio, #contact, #blog', { duration: 0.5, display: "none", ease: "power2.inOut" });
      gsap.to('#header', { duration: 0.5, display: "block", ease: "power2.inOut" });
      gsap.to('#navigation-content', { duration: 0.5, display: 'flex', ease: "power2.inOut" });
    });

})
$(function(){
 var body =  document.querySelector('body');
 var $cursor = $('.cursor')
   function cursormover(e){
    
    gsap.to( $cursor, {
      x : e.clientX ,
      y : e.clientY,
      stagger:.002
     })
   }
   function cursorhover(e){
    gsap.to( $cursor,{
     scale:1.4,
     opacity:1
    })
    
  }
  function cursor(e){
    gsap.to( $cursor, {
     scale:1,
     opacity:.6
    }) 
  }
  $(window).on('mousemove',cursormover);
  $('.menubar').hover(cursorhover,cursor);
  $('a').hover(cursorhover,cursor);
  $('.navigation-close').hover(cursorhover,cursor);

})

function changePage() {
  const currentPage = document.querySelector('.page.active');
  const nextPage = currentPage.nextElementSibling || document.querySelector('.page:first-child');

  currentPage.classList.remove('active');
  nextPage.classList.add('active');
}

// JavaScript para detectar el scroll y ocultar o mostrar el menú
document.addEventListener("DOMContentLoaded", function() {
  var lastScrollTop = 0;
  var menubar = document.querySelector('.menubar',);

  window.addEventListener("scroll", function() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
          // Bajando la página
          menubar.style.opacity = '0';
          menubar.style.transition = 'opacity 0.5s ease-in-out';
      } else if (scrollTop === 0) {
          // Al llegar al tope de arriba del scroll
          menubar.style.opacity = '0.8';
          menubar.style.transition = 'opacity 0.1s ease-in-out';
      }
      lastScrollTop = scrollTop;
  });
});

$(function(){
    $('#home-link').on('click', function() {
        $('#header').show();
        $('#about, #blog, #portfolio, #contact').hide();
    });

    $('#about-link').on('click', function() {
        $('#about').show();
        $('#header, #blog, #portfolio, #contact').hide();
    });

    $('#blog-link').on('click', function() {
        $('#blog').show();
        $('#header, #about, #portfolio, #contact').hide();
    });

    $('#portfolio-link').on('click', function() {
        $('#portfolio').show();
        $('#header, #about, #blog, #contact').hide();
    });

    $('#contact-link').on('click', function() {
        $('#contact').show();
        $('#header, #about, #blog, #portfolio').hide();
    });
});

// En el archivo js/index.js
// Detectar el scroll y agregar clase al logo del header al hacer scroll
document.addEventListener("scroll", function() {
  var logo = document.querySelector('#navigation-bar img');
  if (window.scrollY > 0) {
      logo.classList.add('scrolled');
  } else {
      logo.classList.remove('scrolled');
  }
});

