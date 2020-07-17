'use strict';

const translate = () => {
  const form = document.querySelector('.form');
  const block = document.querySelector('.block');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = form.querySelector('.text').value;

    if (text) {
      let lang = '';

      if (text.match(/^[а-яё ]*$/gi)) {
        lang = 'ru-en';
        formTranslate(text, lang);
      } else if (text.match(/^[a-z ]*$/gi)) {
        lang = 'en-ru';
        formTranslate(text, lang);
      } else {
        block.textContent = 'Такой текст не подойдет! Используйте либо русские, либо английские буквы';
      }
    }
  });

  const formTranslate = (text, lang) => {
    const key = 'trnsl.1.1.20190225T091515Z.06bde7bd52a8c1a7.0749f827a8a0474bf52a18b3b47f827f339c781a';
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${text}&lang=${lang}`;

    getData(url)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('status network not 200');
        }
        return response.json();
      })
      .then((data) => {
        block.textContent = data.text;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getData = (url) => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  };
};

translate();


