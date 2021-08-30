"use strict"

//<Прокрутка при клике>==============================================

const menuLinks = document.querySelectorAll('.menu__link[data-goto], .btn_scroll[data-goto]');
if (menuLinks.length > 0) {
   menuLinks.forEach(menuLink => {
      menuLink.addEventListener("click", onMenuLinkClick);
   });

   function onMenuLinkClick(e) {
      const menuLink = e.target;
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
         const gotoBlock = document.querySelector(menuLink.dataset.goto);
         const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

         window.scrollTo ({
            top: gotoBlockValue,
            behavior: "smooth"
         });
         e.preventDefault();
      }
   }
}

//</Прокрутка при клике>==============================================

//<Фильтрация>==============================================

$('.menu__item').click(function(event) {
      var i=$(this).data('filter');
   if (i==1) {
      $('.portfolio__column').show();
   }else{
      $('.portfolio__column').hide();
      $('.portfolio__column.f_'+i).show();
   }
   $('.menu__item').removeClass('active');
   $(this).addClass('active');

   return false;
});

//</Фильтрация>==============================================
