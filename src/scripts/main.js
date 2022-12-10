document.addEventListener('DOMContentLoaded', () => {

    // search
    let opening = document.querySelector('.search__opening')
    document.querySelector('.search__open').addEventListener('click', function () {
        opening.classList.add('search__opening--active')
    })

    document.querySelector('.search__exit').addEventListener('click', function () {
        opening.classList.remove('search__opening--active')
    })

    // about us form
    new JustValidate('.about-us__form')
        .addField('.about-us__input-email', [
            {
                rule: 'required',
                errorMessage: 'Вы не ввели e-mail',
            },
            {
                rule: 'email',
                errorMessage: 'Недопустимый формат',
            }
        ]);

    // contacts form
    new JustValidate('.contacts__form')
        .addField('.contacts-form__input-name', [
            {
                rule: 'required',
                errorMessage: 'Вы не ввели имя'
            },
            {
                rule: 'minLength',
                value: 2,
                errorMessage: 'Подозрительно короткое имя'
            },
            {
                rule: 'maxLength',
                value: 20,
                errorMessage: 'Подозрительно длинное имя'
            }
        ])
        .addField('.contacts-form__input-email', [
            {
                rule: 'required',
                errorMessage: 'Вы не ввели e-mail',
            },
            {
                rule: 'email',
                errorMessage: 'Недопустимый формат',
            }
        ])
        .addField('.contacts-form__input-message', [
            {
                rule: 'required',
                errorMessage: 'Вы не ввели комментарий',
            }
        ]);

    // burger
    let open = document.querySelector('.header__burger'),
        close = document.querySelector('.nav__exit'),
        menu = document.querySelector('.header__nav'),
        menuLink = document.querySelectorAll('.header__nav .nav__link');

    open.addEventListener('click', () => {
        menu.classList.add('header__nav--active');
        document.body.classList.add('stop-scroll');
    })

    close.addEventListener('click', () => {
        menu.classList.remove('header__nav--active');
        document.body.classList.remove('stop-scroll');
    })

    menuLink.forEach(e => {
        e.addEventListener('click', () => {
            menu.classList.remove('header__nav--active');
            document.body.classList.remove('stop-scroll');
        })
    })
})