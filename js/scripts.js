// Слайдер с избранными товарами

var sliderItems = document.querySelectorAll(".slider__item");
var sliderControls = Array.prototype.slice.call(document.querySelectorAll(".slider__controls-btn"));

sliderControls.forEach(function(element, i) {
  element.addEventListener("click", function() {
    for (var j = 0; j < sliderControls.length; j++) {
      sliderControls[j].classList.remove("slider__controls-btn--active");
      sliderItems[j].classList.remove("slider__item--visible");
    }
    sliderControls[i].classList.add("slider__controls-btn--active");
    sliderItems[i].classList.add("slider__item--visible");
  });
});


// Преимущества

var featuresTabs = Array.prototype.slice.call(document.querySelectorAll(".features__tabs-item"));
var featuresTabsBtn = document.querySelectorAll(".features__tabs-btn");
var featuresSlides = document.querySelectorAll(".features__slider-item");

featuresTabs.forEach(function(element, i) {
  element.addEventListener("click", function() {
    for (var j = 0; j < featuresTabs.length; j++) {
      featuresTabs[j].classList.remove("features__tabs-item--current");
      featuresTabsBtn[j].classList.remove("features__tabs-btn--active");
      featuresSlides[j].classList.remove("features__slider-item--visible");
    }
    featuresTabs[i].classList.add("features__tabs-item--current");
    featuresTabsBtn[i].classList.add("features__tabs-btn--active");
    featuresSlides[i].classList.add("features__slider-item--visible");
  });
});


// Модальные окна
// Карта

var contactsMap = document.querySelector(".contacts__map");
var modalMap = document.querySelector(".modal-map");

contactsMap.addEventListener("click", function(evt) {
  evt.preventDefault();
  modalMap.classList.add("modal--visible");
});

// Форма

var contactsForm = document.querySelector(".contacts__btn");
var modalForm = document.querySelector(".modal-form");

var form = modalForm.querySelector(".modal-form__form");
var formName = form.querySelector("[name=name]");
var formEmail = form.querySelector("[name=email]");
var formText = form.querySelector("[name=text]");

var isStorageSupport = true;
var storageName, storageEmail;

try {
  storageName = localStorage.getItem("name");
  storageEmail = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

contactsForm.addEventListener("click", function(evt) {
  evt.preventDefault();
  modalForm.classList.add("modal--visible");

  if (storageName || storageEmail) {
    formName.value = storageName;
    formEmail.value = storageEmail;
  }

  formName.focus();
})

// валидация формы
form.addEventListener("submit", function(evt) {
  if (!formName.value || !formEmail.value || !formText.value) {
    evt.preventDefault();
    modalForm.classList.remove("modal--invalid");
    modalForm.offsetWidth = modalForm.offsetWidth;
    modalForm.classList.add("modal--invalid");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("name", formName.value);
      localStorage.setItem("email", formEmail.value);
    }
  }
});

// закрытие окна кнопкой

var closeMapBtn = document.querySelector(".modal__close-btn--map");

closeMapBtn.addEventListener("click", function() {
  modalMap.classList.remove("modal--visible");
});

var closeFormBtn = document.querySelector(".modal__close-btn--form");

closeFormBtn.addEventListener("click", function() {
  modalForm.classList.remove("modal--visible");

  if (modalForm.classList.contains("modal--invalid")) {
    modalForm.classList.remove("modal--invalid");
  }
});

//  закрытие окна клавишей ESC

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode == 27) {
    if (modalMap.classList.contains("modal--visible")) {
      modalMap.classList.remove("modal--visible");
    }
    if (modalForm.classList.contains("modal--visible")) {
      modalForm.classList.remove("modal--visible");
      if (modalForm.classList.contains("modal--invalid")) {
        modalForm.classList.remove("modal--invalid");
      }
    }
  }
});