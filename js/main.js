(() => {

  // Инициализация превью (нижний)
  const swiperThumbs = new Swiper(".swiper-small", {
    spaceBetween: 10,
    slidesPerView: "auto", // Показываем 4 превью
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      1600: {
        spaceBetween: 10,
      },
      1460: {
        spaceBetween: 10,
      },
    },
  });

  // Инициализация основного (верхний)
  const swiperMain = new Swiper(".swiper-big", {
    spaceBetween: 10,
    navigation: {
      nextEl: ".arrows__right",
      prevEl: ".arrows__left",
    },
    thumbs: {
      swiper: swiperThumbs, // Связываем с нижним
    },
  });


})();

(() => {


  // Находим главный контейнер всего квиза
  const quizContainer = document.querySelector('.djc-squeeze__step');

  if (quizContainer) {
    // 1. ОТСЛЕЖИВАНИЕ ВЫБОРА РАДИОКНОПОК (Активация кнопок "Далее" / "Рассчитать стоимость")
    quizContainer.addEventListener('change', (event) => {
      if (event.target && event.target.type === 'radio') {
        const currentStep = event.target.closest('.djc-squeeze__step-box');
        if (currentStep) {
          // Находим кнопку перехода (это может быть и "Далее", и "Рассчитать стоимость")
          const nextButton = currentStep.querySelector('.djc-squeeze__further-btn');
          if (nextButton) {
            nextButton.classList.add('active');
          }
        }
      }
    });

    // 2. КЛИК НА КНОПКУ "ДАЛЕЕ" / "РАССЧИТАТЬ СТОИМОСТЬ"
    quizContainer.addEventListener('click', (event) => {
      if (event.target && event.target.classList.contains('djc-squeeze__further-btn')) {
        const currentButton = event.target;

        // Переходим, только если кнопка уже активна (пользователь выбрал радиокнопку)
        if (currentButton.classList.contains('active')) {
          const allSteps = quizContainer.querySelectorAll('.djc-squeeze__step-box');
          const currentStep = currentButton.closest('.djc-squeeze__step-box');

          // Находим индекс текущего шага
          const currentIndex = Array.from(allSteps).indexOf(currentStep);
          // Определяем следующий шаг
          const nextStep = allSteps[currentIndex + 1];

          if (nextStep) {
            // Удаляем active у всех шагов
            allSteps.forEach(step => step.classList.remove('active'));
            // Добавляем active следующему шагу
            nextStep.classList.add('active');
          }
        }
      }

      // 3. КЛИК НА КНОПКУ "РАССЧИТАТЬ ЗАНОВО"
      if (event.target && event.target.classList.contains('djc-squeeze__reset')) {
        const allSteps = quizContainer.querySelectorAll('.djc-squeeze__step-box');

        // Удаляем класс active у абсолютно всех шагов
        allSteps.forEach(step => step.classList.remove('active'));

        // Сбрасываем все выбранные радиокнопки и деактивируем кнопки "Далее"
        quizContainer.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
        quizContainer.querySelectorAll('.djc-squeeze__further-btn').forEach(btn => btn.classList.remove('active'));

        // ИСПРАВЛЕНО: Добавляем класс active самому первому шагу квиза через classList
        if (allSteps.length > 0) {
          allSteps[0].classList.add('active');
        }
      }
    });
  }

})();