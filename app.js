!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s=0)}([function(e,t){function r(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return n(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var o=0,i=function(){};return{s:i,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,a=!0,d=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return a=e.done,e},e:function(e){d=!0,c=e},f:function(){try{a||null==r.return||r.return()}finally{if(d)throw c}}}}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelector(".back-to-top"),t=document.querySelector("body"),n=document.querySelector(".card-grid"),o=document.querySelectorAll(".card-grid__item"),i=document.querySelectorAll(".filter__button"),c=document.getElementById("filterButtonDefault"),a=document.getElementById("filterButtonPinned"),d=document.getElementById("filterButtonProjects"),l=document.getElementById("filterButtonRecent"),u=document.getElementById("filterButtonTeams"),s=document.getElementsByClassName("card-grid__item"),f=document.getElementById("dialog"),m=document.querySelector(".modal__content"),v=document.querySelector(".navbar"),y=document.querySelector(".search-form__button"),g=document.querySelector(".search-form__input"),b=document.querySelectorAll(".filter__button--unfiltered");function p(e){for(var t=0;t<s.length;t++)s[t].classList.remove("card-grid__item--hidden")}filterCards=function(e,t){for(var r=0;r<s.length;r++)s[r].dataset.tags.includes(t)?s[r].classList.remove("card-grid__item--hidden"):s[r].classList.add("card-grid__item--hidden")};var h,_=r(b);try{for(_.s();!(h=_.n()).done;){h.value.addEventListener("click",p)}}catch(e){_.e(e)}finally{_.f()}function L(e){i.forEach((function(t){t.classList.remove("filter__button--active"),e.currentTarget.classList.add("filter__button--active"),e.currentTarget==l?n.classList.add("card-grid--recent"):n.classList.remove("card-grid--recent"),e.currentTarget==c||e.currentTarget==l?n.classList.add("card-grid--unfiltered"):n.classList.remove("card-grid--unfiltered")}))}a.addEventListener("click",(function(e){return filterCards(e,"pinned")})),d.addEventListener("click",(function(e){return filterCards(e,"project")})),u.addEventListener("click",(function(e){return filterCards(e,"team")}));var E,S=r(i);try{for(S.s();!(E=S.n()).done;){E.value.addEventListener("click",L)}}catch(e){S.e(e)}finally{S.f()}function w(){var e=document.querySelector(".empty-state");0!==n.scrollHeight||e||n.insertAdjacentHTML("beforebegin",'<p class="empty-state">No matching projects or teams.</p>'),0!=n.scrollHeight&&e&&e.remove()}g.addEventListener("keyup",(function(){""==g.value?y.setAttribute("disabled",""):y.removeAttribute("disabled","");var e=new RegExp("\\b"+this.value,"gi");o.forEach((function(t){t.classList.toggle("card-grid__item--hidden",!t.querySelector(".card__content").innerText.match(e))})),w()})),"function"!=typeof f.showModal&&(f.hidden=!0),document.addEventListener("keydown",(function(e){74!==e.keyCode||!e.ctrlKey&&!e.metaKey||e.shiftKey||e.altKey||"function"==typeof f.showModal&&(f.showModal(),t.classList.add("u-overflow-hidden"))})),f.addEventListener("click",(function(){f.close()}),!1),m.addEventListener("click",(function(e){e.stopPropagation()}),!1),f.addEventListener("close",(function(e){t.classList.remove("u-overflow-hidden")})),document.addEventListener("scroll",(function(t){0!==window.scrollY?v.classList.add("navbar--scrolled"):v.classList.remove("navbar--scrolled"),window.scrollY>400?e.classList.add("back-to-top--visible"):e.classList.remove("back-to-top--visible")})),y.addEventListener("click",(function(){g.value="",o.forEach((function(e){e.classList.remove("card-grid__item--hidden")})),y.setAttribute("disabled",""),w()}));var A=Array.prototype.slice.call(o);(A=A.slice(6)).forEach((function(e){e.classList.add("card-grid__item--hide-mobile")})),buttonShowAll.addEventListener("click",(function(){n.classList.add("card-grid--expanded"),buttonShowAll.remove()}))}),!1)}]);