//Константы вариантов ответов
const option1 = document.querySelector('.option1'),
	  option2 = document.querySelector('.option2'),
	  option3 = document.querySelector('.option3'),
	  option4 = document.querySelector('.option4');

//Массив div options с его элементами
const optionElements = document.querySelectorAll('.option');

//Константа заданого вопроса
const question = document.getElementById('question');

//Константы количества вопросов и какой по счету идет вопрос
const numberOfQuestion = document.getElementById('number-of-question'),
	  numberOfAllQuestions = document.getElementById('number-of-all-questions');

// переменные страницы и вопроса
let indexOfQuestion,
	indexOfPage = 0;

//Константа просмотра количества вопросов, и правильных или не правельных ответов
const answersTracker = document.getElementById('answers-tracker');

//Кнопка перехода к следующему вопросу
const btnNext = document.getElementById('btn-next');

//Переменная правильных ответов
let score = 0;

// количество правильных ответов и кнопка "начать заново"
const correctAnswer = document.getElementById('correct-answer'),
	  numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),
	  btnTryAgain = document.getElementById('btn-try-again');

//Массив вопросов и вариантов ответа
const questions = [
	{
		question: 'Сколько месяцев в году имеет 28 дней?',
		options: [
			'1',
			'2',
			'12',
			'10',
		],
		rightAnswer: 2
	},
	{
		question: 'Кто спит с открытыми глазами?',
		options: [
			'Лошади',
			'Зайцы',
			'Воробьи',
			'Рыбы',
		],
		rightAnswer: 3
	},
	{
		question: 'Уличный термометр показывает 15 градусов. Сколько градусов покажут два таких термометра?',
		options: [
			'30',
			'15',
			'0',
			'7',
		],
		rightAnswer: 1
	},
	{
		question: 'Какие существа жуют желудком?',
		options: [
			'Раки',
			'Кошки',
			'Куры',
			'Псы',
		],
		rightAnswer: 0
	},
	{
		question: 'Какие часы показывают правильное время только два раза в сутки?',
		options: [
			'Песочные',
			'Сломанные',
			'Биг-Бэн',
			'Солнечные',
		],
		rightAnswer: 1
	},
	{
		question: 'Что теряют космонавты во время полёта?',
		options: [
			'Сознание',
			'Сон',
			'Вес',
			'Память',
		],
		rightAnswer: 2
	},
	{
		question: 'Что из этого изобрели раньше?',
		options: [
			'Часы',
			'Противогаз',
			'Термометр',
			'Телефон',
		],
		rightAnswer: 0
	},
	{
		question: 'Сколько прапрабабушек может быть у человека?',
		options: [
			'10',
			'4',
			'6',
			'8',
		],
		rightAnswer: 3
	}
];

numberOfAllQuestions.innerHTML = questions.length; // Выводим количество вопросов

// Функция подставляет в indexOfQuestion значение из массива qestions 
// и заполняет строки вопроса и вариантов ответа
const load = () => {
	question.innerHTML = questions[indexOfQuestion].question;// Сам вопрос

	option1.innerHTML = questions[indexOfQuestion].options[0];
	option2.innerHTML = questions[indexOfQuestion].options[1];
	option3.innerHTML = questions[indexOfQuestion].options[2];
	option4.innerHTML = questions[indexOfQuestion].options[3];

	numberOfQuestion.innerHTML = indexOfPage + 1;// Установка номера текущей страницы
	indexOfPage++;// Увеличение индекса
}

const completedAnswers = [];// Массив для уже заданых вопросов

//Функция геренирует случайное число для случайного вопроса
const randomQuestion = () => {
	let randomNumber = Math.floor(Math.random() * questions.length);//Math.random генерирует - рандомное число, Math.floor - делает число целым
	let hitDuplicate = false; // Якорь для проверки одинаковых вопросов

	if (indexOfPage == questions.length) {
		quizOver() //если количество indexOfPage(страниц) равно questions.length(колличеству вопросов) функция выдает конец игры
	} else {
		if(completedAnswers.length > 0) {
			completedAnswers.forEach(item => {
				if(item == randomNumber){
					hitDuplicate = true;
				}//Функция перебирает завершенные ответы и не дает им повторяться
			}); 
			if(hitDuplicate){
				randomQuestion();//Если число уже было функция запускается снова и генерирует другое число
			}else {
				indexOfQuestion = randomNumber;	
				load(); //Если номер вопроса равен индексу и не повторялся функция load подставляет значения массива
			}
		}
		if(completedAnswers.length == 0) {
			indexOfQuestion = randomNumber;
			load();//Если еще не был дан ни один ответ функция load подставляет значения массива
		}
	}
	completedAnswers.push(indexOfQuestion);// push - Заполнение массива
} 

//Функция добавляет класс к правильному или не правильному ответу
const checkAnswer = el => {
	if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
		el.target.classList.add('correct');
		updateAnswerTracker('correct');
		score++;
	} else {
		el.target.classList.add('wrong');
		updateAnswerTracker('wrong');
	}
	disabledOptions();
}

//просматривает событие клика на варианты ответов
for(option of optionElements){
	option.addEventListener('click', e => checkAnswer(e));
}

// Функция блокирует нажатие кнопки после первого нажатия и подсвечивает правильный ответ
const disabledOptions = () => {
	optionElements.forEach(item =>{
		item.classList.add('disabled');
		if(item.dataset.id == questions[indexOfQuestion].rightAnswer){
			item.classList.add('correct');
		}
	})
}

//Функция удаляет все классы для новой страницы
const enableQptions = () => {
	optionElements.forEach(item =>{
		item.classList.remove('disabled','correct','wrong');
	})
}

//Функция создания трекеров (нижних кружков)
const answerTracker = () => {
	questions.forEach(() =>{
		//document.createElement('div') - создает в нутри документа елемент 
		const div = document.createElement('div');
		//Добавляем созданный элемент в div как дочерний
		answersTracker.appendChild(div);
	})
}

//Функция добавления функционала цвета к трекерам
const updateAnswerTracker = status => {
	answersTracker.children[indexOfPage - 1].classList.add(`${status}`);// Обращаемся ко всем дочерним элементам и добовляем им класс который получили из ответа
}

//Функция которая не дает пройти дальше если ответ не выбран
const validate = () => {
	if(!optionElements[0].classList.contains('disabled')){
		alert('Введите вариант ответа');
	} else {
		randomQuestion();
		enableQptions();
	}
}

//Функция выполняется когда количество ответов совпало с количеством вопросов
const quizOver = () => {
	document.querySelector('.quiz-over-modal').classList.add('active');//добавляем класс к модальному окну
	correctAnswer.innerHTML = score; //innerHTML свойство что б положить во внутрь какое-то значение, score - правильные ответы
	numberOfAllQuestions2.innerHTML = questions.length;// вставляем количесто вопросов через questions.length
}

// Функция которая возвращает нас на начало опросника
const tryAgain = () => {
	window.location.reload();// Перезагружает страницу HTML
}

//Добавляем событие при нажатии на кнопку
btnTryAgain.addEventListener('click', () => {
	tryAgain();
})

//Добовляет событие что при нажатии на кнопку будет работать функция переходящая к другому вопросу
btnNext.addEventListener('click', () => {
	validate();
})

//Значение которое позволяет в начале загрузить всю информацию и потом начать функцию
window.addEventListener('load', () => {
	randomQuestion();
	answerTracker();
})

