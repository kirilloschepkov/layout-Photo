"use strict";document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelector(".search__opening");document.querySelector(".search__open").addEventListener("click",(function(){e.classList.add("search__opening--active")})),document.querySelector(".search__exit").addEventListener("click",(function(){e.classList.remove("search__opening--active")})),new JustValidate(".about-us__form").addField(".about-us__input-email",[{rule:"required",errorMessage:"Вы не ввели e-mail"},{rule:"email",errorMessage:"Недопустимый формат"}]),new JustValidate(".contacts__form").addField(".contacts-form__input-name",[{rule:"required",errorMessage:"Вы не ввели имя"},{rule:"minLength",value:2,errorMessage:"Подозрительно короткое имя"},{rule:"maxLength",value:20,errorMessage:"Подозрительно длинное имя"}]).addField(".contacts-form__input-email",[{rule:"required",errorMessage:"Вы не ввели e-mail"},{rule:"email",errorMessage:"Недопустимый формат"}]).addField(".contacts-form__input-message",[{rule:"required",errorMessage:"Вы не ввели комментарий"}]);var r=document.querySelector(".header__burger"),t=document.querySelector(".nav__exit"),a=document.querySelector(".header__nav"),s=document.querySelectorAll(".header__nav .nav__link");r.addEventListener("click",(function(){a.classList.add("header__nav--active"),document.body.classList.add("stop-scroll")})),t.addEventListener("click",(function(){a.classList.remove("header__nav--active"),document.body.classList.remove("stop-scroll")})),s.forEach((function(e){e.addEventListener("click",(function(){a.classList.remove("header__nav--active"),document.body.classList.remove("stop-scroll")}))}))}));
//# sourceMappingURL=main.js.map