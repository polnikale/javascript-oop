"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var quiz_1 = require("./quiz");
var question_1 = require("./question");
var questions = [
    {
        text: 'Какой способ создает объект?',
        answers: [
            'new { x = 1, y = 2 }',
            '{ x: 1, y: 2 }',
            '{ x = 1, y = 2 }',
            'new { x: 1, y: 2 }'
        ],
        correctAnswer: 1
    },
    {
        text: 'Какой из способов создает копию массива?',
        answers: [
            'let newArray = oldArray;',
            'let newArray = oldArray.slice(0);',
            'let newArray = [oldArray];',
            'let newArray = new Array(oldArray);'
        ],
        correctAnswer: 1
    },
    {
        text: 'Что отобразится в консоле?<br><br>console.log(typeof [1,2])',
        answers: [
            'string',
            'array',
            'object',
            'number'
        ],
        correctAnswer: 2
    },
    {
        text: 'Что будет результатом выражения?<br><br>new Boolean(new Boolean(false)).valueOf()',
        answers: [
            'true',
            'false',
            'undefined'
        ],
        correctAnswer: 0
    },
    {
        text: 'Что такое замыкание?',
        answers: [
            'Совокупность объекта, функции и переменной в локальной области видимости.',
            'Совокупность объекта, функции и переменной в глобальной области видимости.',
            'Способ определения длительности жизни переменной',
            'Совокупность функции и лексичесокй среды в который функция была объявлена.',
            'ХЗ 0_o'
        ],
        correctAnswer: 3
    }
];
var root = document.querySelector('#app');
var quiz = new quiz_1.Quiz('JS Quiz', questions.map(function (q) { return new question_1.Question(q.text, q.answers, q.correctAnswer); }));
var app = new app_1.default(root, quiz);
app.displayNext();
