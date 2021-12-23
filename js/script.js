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

         window.scrollTo({
            top: gotoBlockValue,
            behavior: "smooth"
         });
         e.preventDefault();
      }
   }
}

//</Прокрутка при клике>==============================================

//<Фильтрация>==============================================

$('.menu__item').click(function (event) {
   var i = $(this).data('filter');
   if (i == 1) {
      $('.portfolio__column').show();
   } else {
      $('.portfolio__column').hide();
      $('.portfolio__column.f_' + i).show();
   }
   $('.menu__item').removeClass('active');
   $(this).addClass('active');

   return false;
});

//</Фильтрация>==============================================

//<Смена темы>==============================================

const itemMainblock = document.querySelector('.mainblock');
const itemMenu = document.querySelector('.menu');
const itemAbout = document.querySelector('.about');
const itemPortfolio = document.querySelector('.portfolio');
const itemContact = document.querySelector('.contact');



document.addEventListener('click', themeChange);

function themeChange(event) {
   if (event.target.closest('.menu__themes-button')) {
      itemMainblock.classList.toggle('_dark-theme');
      itemMenu.classList.toggle('_dark-theme');
      itemAbout.classList.toggle('_dark-theme');
      itemPortfolio.classList.toggle('_dark-theme');
      itemContact.classList.toggle('_dark-theme');
   };
};

//</Смена темы>==============================================

//<Menu-burger>==============================================

const iconMenu = document.querySelector('.menu__icon');
const linkMenu = document.querySelectorAll('.menu__link');
if (iconMenu) {
   const menuBody = document.querySelector('.menu__body');
   iconMenu.addEventListener("click", function (e) {
      document.body.classList.toggle('_lock');
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
   });
   for (const item of linkMenu) {
      item.addEventListener("click", function (e) {
         document.body.classList.remove('_lock');
         iconMenu.classList.remove('_active');
         menuBody.classList.remove('_active');
      });
   }
};

//</Menu-burger>===========================================

//<Отправка формы>==============================================

document.addEventListener("DOMContentLoaded", function () {
   const form = document.getElementById('form');
   form.addEventListener('submit', formSend);

   async function formSend(e) {
      e.preventDefault();

      let error = formValidate(form);

      let formData = new FormData(form);
      formData.append('image', formImage.files[0]);

      if (error === 0) {
         form.classList.add('_sending');
         let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
         });
         if (response.ok) {
            let result = await response.json();
            alert(result.message);
            formPreview.innerHTML = '';
            form.reset();
            form.classList.remove('_sending');
         } else {
            alert('Ошибка!');
            form.classList.remove('_sending');
         }
      } else {
         alert('Заполните все обязательные поля!')
      }
   }


   function formValidate(form) {
      let error = 0;
      let formReq = document.querySelectorAll('._req');
      for (let index = 0; index < formReq.length; index++) {
         const input = formReq[index];
         formRemoveError(input);

         if (input.classList.contains('_email')) {
            if (emailTest(input)) {
               formAddError(input);
               error++;
            }
         } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
            formAddError(input);
            error++;
         } else {
            if (input.value === '') {
               formAddError(input);
               error++;
            }
         }
      }
      return error;
   }

   function formAddError(input) {
      input.parentElement.classList.add('_error');
      input.classList.add('_error');
   }
   function formRemoveError(input) {
      input.parentElement.classList.remove('_error');
      input.classList.remove('_error');
   }
   function emailTest(input) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);

   }

   const formImage = document.getElementById('formImage');
   const formPreview = document.getElementById('formPreview');
   formImage.addEventListener('change', () => {
      uploadFile(formImage.files[0]);
   });
   function uploadFile(file) {
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
         alert('Разрешены только изображения!');
         formImage.value = '';
         return;
      }
      if (file.size > 2 * 1024 * 1024) {
         alert('Файл должен быть менее 2 Мб!');
         return;
      }
      var reader = new FileReader();
      reader.onload = function (e) {
         formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
      };
      reader.onerror = function (e) {
         alert('Ошибка');
      };
      reader.readAsDataURL(file);
   }
});

//</Отправка формы>==============================================
