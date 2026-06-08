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

    // ОБЩИЙ ОБРАБОТЧИК КЛИКОВ НА КОНТЕЙНЕРЕ
    quizContainer.addEventListener('click', (event) => {
      const allSteps = quizContainer.querySelectorAll('.djc-squeeze__step-box');

      // 2. КЛИК НА КНОПКУ "ДАЛЕЕ" / "РАССЧИТАТЬ СТОИМОСТЬ"
      if (event.target && event.target.classList.contains('djc-squeeze__further-btn')) {
        const currentButton = event.target;

        // Переходим, только если кнопка уже активна (пользователь выбрал радиокнопку)
        if (currentButton.classList.contains('active')) {
          const currentStep = currentButton.closest('.djc-squeeze__step-box');
          const currentIndex = Array.from(allSteps).indexOf(currentStep);
          const nextStep = allSteps[currentIndex + 1];

          if (nextStep) {
            allSteps.forEach(step => step.classList.remove('active'));
            nextStep.classList.add('active');
          }
        }
      }

      // 3. ДОБАВЛЕНО: КЛИК НА КНОПКУ "НАЗАД"
      if (event.target && event.target.classList.contains('djc-squeeze__further-back')) {
        const currentStep = event.target.closest('.djc-squeeze__step-box');
        const currentIndex = Array.from(allSteps).indexOf(currentStep);
        const prevStep = allSteps[currentIndex - 1];

        // Проверяем, существует ли предыдущий шаг
        if (prevStep) {
          allSteps.forEach(step => step.classList.remove('active'));
          prevStep.classList.add('active');
        }
      }

      // 4. КЛИК НА КНОПКУ "РАССЧИТАТЬ ЗАНОВО"
      if (event.target && event.target.classList.contains('djc-squeeze__reset')) {
        // Удаляем класс active у абсолютно всех шагов
        allSteps.forEach(step => step.classList.remove('active'));

        // Сбрасываем все выбранные радиокнопки и деактивируем кнопки "Далее"
        quizContainer.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
        quizContainer.querySelectorAll('.djc-squeeze__further-btn').forEach(btn => btn.classList.remove('active'));

        // Добавляем класс active самому первому шагу квиза
        if (allSteps.length > 0) {
          allSteps[0].classList.add('active');
        }
      }
    });
  }

})();
