function getDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today = yyyy + '/' + mm + '/' + dd;
  return today;
}

let nowDate = getDate();
let thisDate = new Date(nowDate);
let dateYear = thisDate.getFullYear();
birthday.max = new Date(thisDate.getFullYear() - 18, thisDate.getMonth(), thisDate.getDay() + 15).toISOString().split("T")[0];
studystart.max = thisDate.getFullYear();

const validation = new JustValidate('#form');
validation
  .addField('#name', [
    {
      rule: 'required',
      errorMessage: 'Поле обязательно к заполнению'
    }
  ])
  .addField('#surname', [
    {
      rule: 'required',
      errorMessage: 'Поле обязательно к заполнению'
    }
  ])
  .addField('#fathername', [
    {
      rule: 'required',
      errorMessage: 'Поле обязательно к заполнению'
    }
  ])
  .addField('#birthday', [
    {
      rule: 'required',
      errorMessage: 'Поле обязательно к заполнению'
    }
  ])
  .addField('#studystart', [
    {
      rule: 'minNumber',
      value: 2000,
      errorMessage: 'Укажите год в диапозоне от 2000 до сегодняшнего'
    },
    {
      rule: 'maxNumber',
      value: dateYear,
      errorMessage: 'Укажите год в диапозоне от 2000 до сегодняшнего1'
    },
    {
      rule: 'required',
      errorMessage: 'Поле обязательно к заполнению'
    }
  ])
  .addField('#faculty', [
    {
      rule: 'required',
      errorMessage: 'Поле обязательно к заполнению'
    }
  ]);


function rebuildStudentList(array, inputFilter = '', inputField = null) {
  bottom__list2.innerHTML = '';

  array.forEach(element => {

    //filter block
    if (inputField !== null) {
      if (inputField === 'NameFilter' && inputFilter !== '' && element.name.indexOf(inputFilter) === -1) {
        return;
      }

      if (inputField === 'FacFilter' && inputFilter !== '' && element.fac.indexOf(inputFilter) === -1) {
        return;
      }

      if (inputField === 'BDFilter' && inputFilter !== '' && element.bd.indexOf(inputFilter) === -1) {
        return;
      }

      if (inputField === 'StartStudyFilter' && inputFilter !== '' && element.year.indexOf(inputFilter) === -1) {
        return;
      }
    }

    const item = document.createElement('li');
    const itemBlock1 = document.createElement('div');
    const itemBlock2 = document.createElement('div');
    const itemBlock3 = document.createElement('div');
    const itemBlock4 = document.createElement('div');

    item.classList.add('bottom__item');
    itemBlock1.classList.add('bottom__item--subtitle');
    itemBlock2.classList.add('bottom__item--subtitle');
    itemBlock3.classList.add('bottom__item--subtitle');
    itemBlock4.classList.add('bottom__item--subtitle');

    itemBlock1.textContent = element.name;
    itemBlock2.textContent = element.fac;
    itemBlock3.textContent = element.bd;
    itemBlock4.textContent = element.year;

    item.append(itemBlock1);
    item.append(itemBlock2);
    item.append(itemBlock3);
    item.append(itemBlock4);
    bottom__list2.append(item);
  });
}

// * Создаём инфу для блока с ФИО
function createNameAttribute() {
  let inputName = document.getElementById('name');
  let inputSurname = document.getElementById('surname');
  let inputFathername = document.getElementById('fathername');
  return inputName.value + ' ' + inputSurname.value + ' ' + inputFathername.value;
}

// *Создаём инфу для блока с Факультетом:
function createFacultyAttribute() {
  let inputFaculty = document.getElementById('faculty');
  return inputFaculty.value;
}

// *Создаём инфу для блока с Датой ДР и возрастом:

function createBirthdayAttribute() {
  let inputBirthday = document.getElementById('birthday');
  let dateClassic = inputBirthday.value;
  let date1 = new Date(dateClassic);
  let date2 = new Date(nowDate);
  let age;
  let ageResult;
  if (date1.getMonth() < date2.getMonth()) {
    age = date2.getFullYear() - date1.getFullYear();
    ageResult = dateClassic + ' ' + '(' + age + ' лет)';
    return ageResult;
  } else {
    if (date1.getMonth() == date2.getMonth()) {
      if (date1.getFullYear() == date2.getFullYear()) {
        ageResult = 'Вы слишком малы, чтоб быть студентом, я поставлю ограничения позже :)'
        return ageResult
      } if (date1.getDay() < date2.getDay()) {
        age = date2.getFullYear() - date1.getFullYear() - '1';
        ageResult = dateClassic + ' ' + '(' + age + ' лет)';
        return ageResult;
      }
      if (date1.getDay() >= date2.getDay()) {
        age = date2.getFullYear() - date1.getFullYear();
        ageResult = dateClassic + ' ' + '(' + age + ' лет)';
        return ageResult;
      }
    }
    if (date1.getMonth() > date2.getMonth()) {
      age = date2.getFullYear() - date1.getFullYear() - '1';
      ageResult = dateClassic + ' ' + '(' + age + ' лет)';
      return ageResult;
    }
  }
}

// *Создаём инфу для блока с Годами обучения и номером курса:

function createStudyStartAttribute() {
  let inputStudy = document.getElementById('studystart');
  let inputStudyStart = inputStudy.value;
  let studyNowYear = thisDate.getFullYear();
  let studyNowMonth = thisDate.getMonth();
  let studyResult;

  if (studyNowYear - inputStudyStart > 3) {
    studyResult = 'Закончил';
    return studyResult;
  } if (studyNowYear - inputStudyStart == 3 && studyNowMonth > 8) {
    studyResult = 'Закончил';
    return studyResult;
  } if (studyNowYear - inputStudyStart == 3 && studyNowMonth < 8) {
    studyResult = inputStudyStart + '' + '-' + (Number(inputStudyStart) + 4) + '' + ' (' + (studyNowYear - inputStudyStart) + ' курс)';
    return studyResult;
  } else {
    if (studyNowYear - inputStudyStart < 3 && studyNowMonth > 8) {
      studyResult = inputStudyStart + '' + '-' + (Number(inputStudyStart) + 4) + '' + ' (' + (studyNowYear - inputStudyStart + 1) + ' курс)';

      return studyResult;
    }
    if (studyNowYear - inputStudyStart == 0 && studyNowMonth <= 8) {
      studyResult = 'Учебный год ещё не начался, приходи позже :)';
      return studyResult;
    }
    if (studyNowYear - inputStudyStart < 0) {
      studyResult = 'Оу... да ты из будущего $_$'
      return studyResult;
    }
    if (studyNowYear - inputStudyStart < 3 && studyNowMonth <= 8) {
      studyResult = inputStudyStart + '' + '-' + (Number(inputStudyStart) + 4) + '' + ' (' + (studyNowYear - inputStudyStart) + ' курс)';

      return studyResult;
    }
  }
}

let array = [];

let filter = document.querySelector('#NameFilter');
let filter2 = document.querySelector('#FacultyFilter');
let filter3 = document.querySelector('#BDFilter');
let filter4 = document.querySelector('#StartStudyFilter');

filter.addEventListener('input', () => {
  let inputFilter = filter.value;
  rebuildStudentList(array, inputFilter, 'NameFilter');
})

filter2.addEventListener('input', () => {
  let inputFilter = filter2.value;
  rebuildStudentList(array, inputFilter, 'FacFilter');
})

filter3.addEventListener('input', () => {
  let inputFilter = filter3.value;
  rebuildStudentList(array, inputFilter, 'BDFilter');
})

filter4.addEventListener('input', () => {
  let inputFilter = filter4.value;
  rebuildStudentList(array, inputFilter, 'StartStudyFilter');
})

let submitBtn = document.querySelector('.top__inputlist--btn');


submitBtn.addEventListener('click', () => {
  let inputName = document.getElementById('name');
  let inputSurname = document.getElementById('surname');
  let inputFathername = document.getElementById('fathername');
  let inputBirthday = document.getElementById('birthday');
  let dateClassic = inputBirthday.value;
  let date1 = new Date(dateClassic);
  let date2 = new Date(nowDate);
  let inputStudy = document.getElementById('studystart');
  let inputStudyStart = inputStudy.value;
  let inputFaculty = document.getElementById('faculty');

  if (inputName.value != '' &&
    inputSurname.value != '' &&
    inputFathername.vale != '' &&
    1900 <= date1.getFullYear() &&
    date1 < date2 &&
    inputStudyStart >= 2000 &&
    inputStudyStart <= date2.getFullYear() &&
    inputFaculty.value != '') {
    array.push({ name: createNameAttribute(), fac: createFacultyAttribute(), bd: createBirthdayAttribute(), year: createStudyStartAttribute() });
    inputName.value = '';
    inputSurname.value = '';
    inputFathername.value = '';
    inputBirthday.value = '';
    inputStudy.value = '';
    inputFaculty.value = '';
  }

  rebuildStudentList(array);
});

let subtitle1 = document.getElementById('subtitle1');
let subtitle2 = document.getElementById('subtitle2');
let subtitle3 = document.getElementById('subtitle3');
let subtitle4 = document.getElementById('subtitle4');

function sortArrayByName(array) {
  array.sort((a, b) => a.name > b.name ? 1 : -1);
}

function sortArrayByFac(array) {
  array.sort((a, b) => a.fac > b.fac ? 1 : -1);
}

function sortArrayByBD(array) {
  array.sort((a, b) => a.bd < b.bd ? 1 : -1);
}

function sortArrayByYear(array) {
  array.sort((a, b) => a.year < b.year ? 1 : -1);
}

subtitle1.addEventListener('click', () => {
  sortArrayByName(array);
  rebuildStudentList(array);
});

subtitle2.addEventListener('click', () => {
  sortArrayByFac(array);
  rebuildStudentList(array);
});

subtitle3.addEventListener('click', () => {
  sortArrayByBD(array);
  rebuildStudentList(array);
});

subtitle4.addEventListener('click', () => {
  sortArrayByYear(array);
  rebuildStudentList(array);
});







