const quizStudyBox = document.querySelector('#quiz-practice');
const mainBox = document.querySelector('#main-box');
const mainCharText = document.querySelector('#main-char');
const secondaryCharText = document.querySelector('#optional-char');
const answersBox = document.querySelector('.answers');
const skipButt = document.querySelector('.skip');
const swapButt = document.querySelector('.swap');
const flashBox = document.querySelector('.flashBox');
const flashBox2 = document.querySelector('.flashBox2');
const flashBox3 = document.querySelector('.flashBox3');
const pageHeader = document.querySelector('.title');
const buttBox = document.querySelector('.bottom-buttons');
let kanjiArray = [];
let wordsArray = [];
let kanaArray = [];
let hiraganaArray = [];
let katakanaArray = [];
let meaningsArray = [];
let lessonArray = [];
let konoKanji;
let trueAnswer;
let selectedAnswer;
let secretMessage = "";
let answersArray = [];
let randoNumber = 69;
let numberArray = [];
let initNumber = 0;

pageHeader.addEventListener('click', function () {
    location.reload()
});
// universal functions
function clearAll() {
    kanjiArray = [];
    wordsArray = [];
    kanaArray = [];
    hiraganaArray = [];
    katakanaArray = [];
    meaningsArray = [];
    lessonArray = [];
    removeAllChildren(flashBox);
    removeAllChildren(flashBox2);
    removeAllChildren(flashBox3);
    removeAllChildren(answersBox);
    removeAllChildren(buttBox);
    konoKanji = "";
    trueAnswer = "";
    secretMessage = "";
    mainCharText.textContent = "";
    secondaryCharText.textContent = "";
    pageHeader.textContent = "";
    pageHeader.textContent = "日本語を勉強しましょう";
    quizStudyBox.classList.remove('hidden');
}
function makeButtons(swapEvent, skipEvent) {
    removeAllChildren(buttBox);
    let secret = document.createElement('p');
    secret.classList.add('secret-message')
    secret.textContent = "";
    let skipButt = document.createElement('button');
    skipButt.textContent = "skip";
    skipButt.classList.add("skip");
    skipButt.classList.add("butt");
    let swapButt = document.createElement('button');
    swapButt.textContent = "swap quiz style";
    swapButt.classList.add("swap");
    swapButt.classList.add("butt");
    skipButt.addEventListener('click', skipEvent);
    swapButt.addEventListener('click', swapEvent);
    buttBox.append(swapButt);
    buttBox.append(secret);
    buttBox.append(skipButt);
    secretMessage = document.querySelector('.secret-message');
}
function handleAnswerClick(timeoutFunction, event, time) {
    console.log(event.target);
    selectedAnswer = event.target.textContent;
    // console.log("you chose:", selectedAnswer, " correct answer is: ", trueAnswer)
    if (selectedAnswer === trueAnswer) {
        secretMessage.textContent = '. * nice! * .';
        mainCharText.append(" = ", selectedAnswer);
        setTimeout(() => {
            timeoutFunction();
            secretMessage.textContent = '';
        }, time);
    } else {
        secretMessage.textContent = 'try again.';
        setTimeout(() => {
            secretMessage.textContent = '';
        }, 1000);
    }
};
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};
function removeAllChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};
//data loading functions
function loadKana() {
    for (var [hiragana, value] of Object.entries(dataKana)) {
        hiraganaArray.push(hiragana);
        meaningsArray.push(value.english);
        katakanaArray.push(value.katakana);
    };
}
function loadNouns() {
    for (var [word, value] of Object.entries(nouns)) {
        wordsArray.push(word);
        meaningsArray.push(value.meaning);
        kanaArray.push(value.kana);
    };
}
function loadGenkiWords() {
    genkiWordList.forEach(function (word) {
        let thisword;
        if (word.Kanji === "") {
            thisword = word.Kana
        } else thisword = word.Kanji;
        wordsArray.push(thisword);
        kanaArray.push(word.Kana);
        meaningsArray.push(word.Meaning);
        lessonArray.push(word.Lesson);
    });
}
function loadKanaFlashcards() {
    clearAll();
    quizStudyBox.classList.add('hidden');
    loadKana();
    hiraganaArray.forEach((kana, index) => {
        let mainKanji = kana;
        let translation = meaningsArray[index];
        let katakana = katakanaArray[index];
        let kanjiBox = document.createElement('div');
        let wordBox = document.createElement('div');
        let infoBox = document.createElement('div');
        let kanjiBoxTit = document.createElement('h1');
        let kanjiBoxTit2 = document.createElement('h1');
        kanjiBoxTit.textContent = mainKanji;
        kanjiBoxTit2.textContent = katakana;
        kanjiBox.classList.add('kanaFlashcards');
        infoBox.classList.add('infoBox');
        infoBox.classList.add('semifaded');
        infoBox.classList.add('opacity');
        wordBox.append(translation);
        infoBox.append(wordBox);
        kanjiBox.append(kanjiBoxTit, kanjiBoxTit2);
        kanjiBox.append(infoBox);
        // kanjiBox.addEventListener('click', toggleEnglish);
        flashBox.append(kanjiBox);
        // function toggleEnglish() {
        //     infoBox.classList.toggle('opacity');
        // }
    });
}
function loadBasicWordFlashcards() {
    clearAll();
    quizStudyBox.classList.add('hidden');
    loadNouns();
    wordsArray.forEach((word, index) => {
        let mainKanji = word;
        let translation = meaningsArray[index];
        let kana = kanaArray[index];
        let kanjiBox = document.createElement('div');
        let wordBox = document.createElement('div');
        let infoBox = document.createElement('div');
        let kanjiBoxTit = document.createElement('h1');
        let kanjiBoxTit2 = document.createElement('h2');
        kanjiBoxTit.textContent = mainKanji;
        kanjiBoxTit2.textContent = kana;
        kanjiBox.classList.add('Flashcards');
        infoBox.classList.add('infoBox');
        wordBox.append(translation);
        infoBox.append(wordBox);
        kanjiBox.append(kanjiBoxTit, kanjiBoxTit2);
        kanjiBox.append(infoBox);
        flashBox.append(kanjiBox);
    });
}
function loadGenkiFlashcards() {
    clearAll();
    quizStudyBox.classList.add('hidden');
    loadGenkiWords();
    wordsArray.forEach((word, index) => {
        let mainKanji = word;
        let translation = meaningsArray[index];
        let kana = kanaArray[index];
        let kanjiBox = document.createElement('div');
        let wordBox = document.createElement('div');
        let infoBox = document.createElement('div');
        let kanjiBoxTit = document.createElement('h1');
        let kanjiBoxTit2 = document.createElement('h2');
        kanjiBoxTit.textContent = mainKanji;
        kanjiBoxTit2.textContent = kana;
        kanjiBox.classList.add('Flashcards');
        infoBox.classList.add('infoBox');
        wordBox.append(translation);
        infoBox.append(wordBox);
        kanjiBox.append(kanjiBoxTit, kanjiBoxTit2);
        kanjiBox.append(infoBox);
        flashBox.append(kanjiBox);
    });
}
// quiz functions
function loadHiraganaQuiz() {
    clearAll();
    loadKana();
    pageHeader.textContent = "";
    pageHeader.textContent = "ひらがな";
    makeButtons(loadHiraganaQuizSwap, loadHiraganaQuiz);
    randoNumber = Math.floor(Math.random() * hiraganaArray.length);
    konoKanji = hiraganaArray[randoNumber];
    mainCharText.textContent = konoKanji;
    secondaryCharText.textContent = "";
    let answersArray = [];
    trueAnswer = meaningsArray[randoNumber];
    answersArray.push(trueAnswer);
    for (let i = 0; i < 8; i++) {
        let nuRandoNum = Math.floor(Math.random() * hiraganaArray.length);
        let randoAnswer = meaningsArray[nuRandoNum];
        answersArray.push(randoAnswer);
    }
    shuffleArray(answersArray);
    answersArray.forEach(answer => {
        let newDiv = document.createElement('div');
        newDiv.textContent = answer;
        newDiv.addEventListener('click', (e) => {
            handleAnswerClick(loadHiraganaQuiz, e, 1000)
        })
        newDiv.classList.add('answer');
        answersBox.append(newDiv);
    });
}
function loadHiraganaQuizSwap() {
    clearAll();
    loadKana();
    pageHeader.textContent = "";
    pageHeader.textContent = "ひらがな";
    makeButtons(loadHiraganaQuiz, loadHiraganaQuizSwap);
    randoNumber = Math.floor(Math.random() * hiraganaArray.length);
    konoKanji = meaningsArray[randoNumber];
    mainCharText.textContent = konoKanji;
    secondaryCharText.textContent = "";
    let answersArray = [];
    trueAnswer = hiraganaArray[randoNumber];
    answersArray.push(trueAnswer);
    for (let i = 0; i < 8; i++) {
        let nuRandoNum = Math.floor(Math.random() * hiraganaArray.length);
        let randoAnswer = hiraganaArray[nuRandoNum];
        answersArray.push(randoAnswer);
    }
    shuffleArray(answersArray);
    answersArray.forEach(answer => {
        let newDiv = document.createElement('div');
        newDiv.textContent = answer;
        newDiv.addEventListener('click', (e) => {
            handleAnswerClick(loadHiraganaQuizSwap, e, 1000)
        })
        newDiv.classList.add('answer');
        newDiv.classList.add('med');
        answersBox.append(newDiv);
    });
}
function loadKatakanaQuiz() {
    clearAll();
    loadKana();
    pageHeader.textContent = "";
    pageHeader.textContent = "カタカナ";
    makeButtons(loadKatakanaQuizSwap, loadKatakanaQuiz);
    randoNumber = Math.floor(Math.random() * katakanaArray.length);
    konoKanji = katakanaArray[randoNumber];
    mainCharText.textContent = konoKanji;
    secondaryCharText.textContent = "";
    let answersArray = [];
    trueAnswer = meaningsArray[randoNumber];
    answersArray.push(trueAnswer);
    for (let i = 0; i < 8; i++) {
        let nuRandoNum = Math.floor(Math.random() * katakanaArray.length);
        let randoAnswer = meaningsArray[nuRandoNum];
        answersArray.push(randoAnswer);
    }
    shuffleArray(answersArray);
    answersArray.forEach(answer => {
        let newDiv = document.createElement('div');
        newDiv.textContent = answer;
        newDiv.addEventListener('click', (e) => {
            handleAnswerClick(loadKatakanaQuiz, e, 1000)
        })
        newDiv.classList.add('answer');
        answersBox.append(newDiv);
    });
}
function loadKatakanaQuizSwap() {
    clearAll();
    loadKana();
    pageHeader.textContent = "";
    pageHeader.textContent = "カタカナ";
    makeButtons(loadKatakanaQuiz, loadKatakanaQuizSwap);
    randoNumber = Math.floor(Math.random() * katakanaArray.length);
    konoKanji = meaningsArray[randoNumber];
    mainCharText.textContent = konoKanji;
    secondaryCharText.textContent = "";
    let answersArray = [];
    trueAnswer = katakanaArray[randoNumber];
    answersArray.push(trueAnswer);
    for (let i = 0; i < 8; i++) {
        let nuRandoNum = Math.floor(Math.random() * katakanaArray.length);
        let randoAnswer = katakanaArray[nuRandoNum];
        answersArray.push(randoAnswer);
    }
    shuffleArray(answersArray);
    answersArray.forEach(answer => {
        let newDiv = document.createElement('div');
        newDiv.textContent = answer;
        newDiv.addEventListener('click', (e) => {
            handleAnswerClick(loadKatakanaQuizSwap, e, 1000)
        })
        newDiv.classList.add('answer');
        newDiv.classList.add('med');
        answersBox.append(newDiv);
    });
}
function loadKanaQuiz() {
    clearAll();
    loadKana();
    pageHeader.textContent = "";
    pageHeader.textContent = "ひらカタ";
    makeButtons(loadKanaQuizSwap, loadKanaQuiz);
    randoNumber = Math.floor(Math.random() * katakanaArray.length);
    konoKanji = hiraganaArray[randoNumber];
    mainCharText.textContent = konoKanji;
    secondaryCharText.textContent = "";
    let answersArray = [];
    trueAnswer = katakanaArray[randoNumber];
    answersArray.push(trueAnswer);
    for (let i = 0; i < 8; i++) {
        let nuRandoNum = Math.floor(Math.random() * katakanaArray.length);
        let randoAnswer = katakanaArray[nuRandoNum];
        answersArray.push(randoAnswer);
    }
    shuffleArray(answersArray);
    answersArray.forEach(answer => {
        let newDiv = document.createElement('div');
        newDiv.textContent = answer;
        newDiv.addEventListener('click', (e) => {
            handleAnswerClick(loadKanaQuiz, e, 1000)
        })
        newDiv.classList.add('answer');
        newDiv.classList.add('med');
        answersBox.append(newDiv);
    });
}
function loadKanaQuizSwap() {
    clearAll();
    loadKana();
    pageHeader.textContent = "";
    pageHeader.textContent = "カタひら";
    makeButtons(loadKanaQuiz, loadKanaQuizSwap);
    randoNumber = Math.floor(Math.random() * katakanaArray.length);
    konoKanji = katakanaArray[randoNumber];
    mainCharText.textContent = konoKanji;
    secondaryCharText.textContent = "";
    let answersArray = [];
    trueAnswer = hiraganaArray[randoNumber];
    answersArray.push(trueAnswer);
    for (let i = 0; i < 8; i++) {
        let nuRandoNum = Math.floor(Math.random() * katakanaArray.length);
        let randoAnswer = hiraganaArray[nuRandoNum];
        answersArray.push(randoAnswer);
    }
    shuffleArray(answersArray);
    answersArray.forEach(answer => {
        let newDiv = document.createElement('div');
        newDiv.textContent = answer;
        newDiv.addEventListener('click', (e) => {
            handleAnswerClick(loadKanaQuizSwap, e, 1000)
        })
        newDiv.classList.add('answer');
        newDiv.classList.add('med');
        answersBox.append(newDiv);
    });
}
function loadWordsFamiliQuiz() {
    clearAll();
    clearAll();
    loadNouns();
    pageHeader.textContent = "";
    pageHeader.textContent = "basic nouns";
    makeButtons(loadWordsFamiliQuizSwap, loadWordsFamiliQuiz);
    konoKanji = wordsArray[initNumber];
    mainCharText.textContent = konoKanji;
    secondaryCharText.textContent = kanaArray[initNumber];
    let answersArray = [];
    trueAnswer = meaningsArray[initNumber];
    answersArray.push(trueAnswer);
    if (initNumber === wordsArray.length - 1) {
        initNumber = 0;
    } else initNumber++;
    for (let i = 0; i < 8; i++) {
        let nuRandoNum = Math.floor(Math.random() * wordsArray.length);
        let randoAnswer = meaningsArray[nuRandoNum];
        answersArray.push(randoAnswer);
    }
    shuffleArray(answersArray);
    answersArray.forEach(answer => {
        let newDiv = document.createElement('div');
        newDiv.textContent = answer;
        newDiv.addEventListener('click', (e) => {
            handleAnswerClick(loadWordsFamiliQuiz, e, 1000)
        })
        newDiv.classList.add('answer');
        answersBox.append(newDiv);
    });
}
function loadWordsFamiliQuizSwap() {
    clearAll();
    clearAll();
    loadNouns();
    pageHeader.textContent = "";
    pageHeader.textContent = "basic nouns";
    makeButtons(loadWordsFamiliQuiz, loadWordsFamiliQuizSwap);
    konoKanji = meaningsArray[initNumber];
    mainCharText.textContent = konoKanji;
    secondaryCharText.textContent = kanaArray[initNumber];
    let answersArray = [];
    trueAnswer = wordsArray[initNumber];
    answersArray.push(trueAnswer);
    if (initNumber === wordsArray.length - 1) {
        initNumber = 0;
    } else initNumber++;
    for (let i = 0; i < 8; i++) {
        let nuRandoNum = Math.floor(Math.random() * wordsArray.length);
        let randoAnswer = wordsArray[nuRandoNum];
        answersArray.push(randoAnswer);
    }
    shuffleArray(answersArray);
    answersArray.forEach(answer => {
        let newDiv = document.createElement('div');
        newDiv.textContent = answer;
        newDiv.addEventListener('click', (e) => {
            handleAnswerClick(loadWordsFamiliQuizSwap, e, 1000)
        })
        newDiv.classList.add('answer');
        newDiv.classList.add('med');
        answersBox.append(newDiv);
    });
}
function loadWordsMeaningsQuiz() {
    clearAll();
    loadNouns();
    pageHeader.textContent = "";
    pageHeader.textContent = "basic nouns";
    makeButtons(loadWordsMeaningsQuizSwap, loadWordsMeaningsQuiz);
    randoNumber = Math.floor(Math.random() * wordsArray.length);
    konoKanji = wordsArray[randoNumber];
    mainCharText.textContent = konoKanji;
    secondaryCharText.textContent = kanaArray[randoNumber];
    let answersArray = [];
    trueAnswer = meaningsArray[randoNumber];
    answersArray.push(trueAnswer);
    for (let i = 0; i < 8; i++) {
        let nuRandoNum = Math.floor(Math.random() * wordsArray.length);
        let randoAnswer = meaningsArray[nuRandoNum];
        answersArray.push(randoAnswer);
    }
    shuffleArray(answersArray);
    answersArray.forEach(answer => {
        let newDiv = document.createElement('div');
        newDiv.textContent = answer;
        newDiv.addEventListener('click', (e) => {
            handleAnswerClick(loadWordsMeaningsQuiz, e, 1000)
        })
        newDiv.classList.add('answer');
        answersBox.append(newDiv);
    });
}
function loadWordsMeaningsQuizSwap() {
    clearAll();
    loadNouns();
    pageHeader.textContent = "";
    pageHeader.textContent = "basic nouns";
    makeButtons(loadWordsMeaningsQuiz, loadWordsMeaningsQuizSwap);
    randoNumber = Math.floor(Math.random() * wordsArray.length);
    konoKanji = meaningsArray[randoNumber];
    mainCharText.textContent = konoKanji;
    secondaryCharText.textContent = kanaArray[randoNumber];
    let answersArray = [];
    trueAnswer = wordsArray[randoNumber];
    answersArray.push(trueAnswer);
    for (let i = 0; i < 8; i++) {
        let nuRandoNum = Math.floor(Math.random() * wordsArray.length);
        let randoAnswer = wordsArray[nuRandoNum];
        answersArray.push(randoAnswer);
    }
    shuffleArray(answersArray);
    answersArray.forEach(answer => {
        let newDiv = document.createElement('div');
        newDiv.textContent = answer;
        newDiv.addEventListener('click', (e) => {
            handleAnswerClick(loadWordsMeaningsQuizSwap, e, 1000)
        })
        newDiv.classList.add('answer');
        newDiv.classList.add('med');
        answersBox.append(newDiv);
    });
}
function loadWordsReadingQuiz() {
    clearAll();
    loadNouns();
    pageHeader.textContent = "";
    pageHeader.textContent = "basic nouns";
    makeButtons(loadWordsReadingQuizSwap, loadWordsReadingQuiz);
    randoNumber = Math.floor(Math.random() * wordsArray.length);
    konoKanji = wordsArray[randoNumber];
    mainCharText.textContent = konoKanji;
    let answersArray = [];
    trueAnswer = kanaArray[randoNumber];
    answersArray.push(trueAnswer);
    for (let i = 0; i < 8; i++) {
        let nuRandoNum = Math.floor(Math.random() * wordsArray.length);
        let randoAnswer = kanaArray[nuRandoNum];
        answersArray.push(randoAnswer);
    }
    shuffleArray(answersArray);
    answersArray.forEach(answer => {
        let newDiv = document.createElement('div');
        newDiv.textContent = answer;
        newDiv.addEventListener('click', (e) => {
            handleAnswerClick(loadWordsReadingQuiz, e, 1000)
        })
        newDiv.classList.add('answer');
        newDiv.classList.add('med');
        answersBox.append(newDiv);
    });
}
function loadWordsReadingQuizSwap() {
    clearAll();
    loadNouns();
    pageHeader.textContent = "";
    pageHeader.textContent = "basic nouns";
    makeButtons(loadWordsReadingQuiz, loadWordsReadingQuizSwap);
    randoNumber = Math.floor(Math.random() * wordsArray.length);
    konoKanji = kanaArray[randoNumber];
    mainCharText.textContent = konoKanji;
    let answersArray = [];
    trueAnswer = wordsArray[randoNumber];
    answersArray.push(trueAnswer);
    for (let i = 0; i < 8; i++) {
        let nuRandoNum = Math.floor(Math.random() * wordsArray.length);
        let randoAnswer = wordsArray[nuRandoNum];
        answersArray.push(randoAnswer);
    }
    shuffleArray(answersArray);
    answersArray.forEach(answer => {
        let newDiv = document.createElement('div');
        newDiv.textContent = answer;
        newDiv.addEventListener('click', (e) => {
            handleAnswerClick(loadWordsReadingQuizSwap, e, 1000)
        })
        newDiv.classList.add('answer');
        newDiv.classList.add('med');
        answersBox.append(newDiv);
    });
}
function loadGenkiFamiliQuiz() {
    clearAll();
    loadGenkiWords();
    pageHeader.textContent = "";
    pageHeader.textContent = "Textbook Words";
    makeButtons(loadGenkiFamiliQuizSwap, loadGenkiFamiliQuiz);
    konoKanji = wordsArray[initNumber];
    mainCharText.textContent = konoKanji;
    secondaryCharText.textContent = kanaArray[initNumber];
    let answersArray = [];
    trueAnswer = meaningsArray[initNumber];
    answersArray.push(trueAnswer);
    if (initNumber === wordsArray.length - 1) {
        initNumber = 0;
    } else initNumber++;
    for (let i = 0; i < 8; i++) {
        let nuRandoNum = Math.floor(Math.random() * wordsArray.length);
        let randoAnswer = meaningsArray[nuRandoNum];
        answersArray.push(randoAnswer);
    }
    shuffleArray(answersArray);
    answersArray.forEach(answer => {
        let newDiv = document.createElement('div');
        newDiv.textContent = answer;
        newDiv.addEventListener('click', (e) => {
            handleAnswerClick(loadGenkiFamiliQuiz, e, 1000)
        })
        newDiv.classList.add('answer');
        answersBox.append(newDiv);
    });
}
function loadGenkiFamiliQuizSwap() {
    clearAll();
    loadGenkiWords();
    pageHeader.textContent = "";
    pageHeader.textContent = "Textbook Words";
    makeButtons(loadGenkiFamiliQuiz, loadGenkiFamiliQuizSwap);
    konoKanji = meaningsArray[initNumber];
    mainCharText.textContent = konoKanji;
    secondaryCharText.textContent = kanaArray[initNumber];
    let answersArray = [];
    trueAnswer = wordsArray[initNumber];
    answersArray.push(trueAnswer);
    if (initNumber === wordsArray.length - 1) {
        initNumber = 0;
    } else initNumber++;
    for (let i = 0; i < 8; i++) {
        let nuRandoNum = Math.floor(Math.random() * wordsArray.length);
        let randoAnswer = wordsArray[nuRandoNum];
        answersArray.push(randoAnswer);
    }
    shuffleArray(answersArray);
    answersArray.forEach(answer => {
        let newDiv = document.createElement('div');
        newDiv.textContent = answer;
        newDiv.addEventListener('click', (e) => {
            handleAnswerClick(loadGenkiFamiliQuizSwap, e, 1000)
        })
        newDiv.classList.add('answer');
        newDiv.classList.add('med');
        answersBox.append(newDiv);
    });
}
function loadGenkiMeaningsQuiz() {
    clearAll();
    loadGenkiWords();
    pageHeader.textContent = "";
    pageHeader.textContent = "Textbook Words";
    makeButtons(loadGenkiMeaningsQuizSwap, loadGenkiMeaningsQuiz);
    randoNumber = Math.floor(Math.random() * wordsArray.length);
    konoKanji = wordsArray[randoNumber];
    mainCharText.textContent = konoKanji;
    secondaryCharText.textContent = kanaArray[randoNumber];
    let answersArray = [];
    trueAnswer = meaningsArray[randoNumber];
    answersArray.push(trueAnswer);
    for (let i = 0; i < 8; i++) {
        let nuRandoNum = Math.floor(Math.random() * wordsArray.length);
        let randoAnswer = meaningsArray[nuRandoNum];
        answersArray.push(randoAnswer);
    }
    shuffleArray(answersArray);
    answersArray.forEach(answer => {
        let newDiv = document.createElement('div');
        newDiv.textContent = answer;
        newDiv.addEventListener('click', (e) => {
            handleAnswerClick(loadGenkiMeaningsQuiz, e, 1000)
        })
        newDiv.classList.add('answer');
        answersBox.append(newDiv);
    });
}
function loadGenkiMeaningsQuizSwap() {
    clearAll();
    loadGenkiWords();
    pageHeader.textContent = "";
    pageHeader.textContent = "Textbook Words";
    makeButtons(loadGenkiMeaningsQuiz, loadGenkiMeaningsQuizSwap);
    randoNumber = Math.floor(Math.random() * wordsArray.length);
    konoKanji = meainingsArray[randoNumber];
    mainCharText.textContent = konoKanji;
    secondaryCharText.textContent = kanaArray[randoNumber];
    let answersArray = [];
    trueAnswer = wordsArray[randoNumber];
    answersArray.push(trueAnswer);
    for (let i = 0; i < 8; i++) {
        let nuRandoNum = Math.floor(Math.random() * wordsArray.length);
        let randoAnswer = wordsArray[nuRandoNum];
        answersArray.push(randoAnswer);
    }
    shuffleArray(answersArray);
    answersArray.forEach(answer => {
        let newDiv = document.createElement('div');
        newDiv.textContent = answer;
        newDiv.addEventListener('click', (e) => {
            handleAnswerClick(loadGenkiMeaningsQuizSwap, e, 1000)
        })
        newDiv.classList.add('answer');
        answersBox.append(newDiv);
    });
}
function loadGenkiReadingQuiz() {
    clearAll();
    loadGenkiWords();
    pageHeader.textContent = "";
    pageHeader.textContent = "Textbook Words";
    makeButtons(loadGenkiReadingQuizSwap, loadGenkiReadingQuiz);
    randoNumber = Math.floor(Math.random() * wordsArray.length);
    konoKanji = wordsArray[randoNumber];
    mainCharText.textContent = konoKanji;
    let answersArray = [];
    trueAnswer = kanaArray[randoNumber];
    answersArray.push(trueAnswer);
    for (let i = 0; i < 8; i++) {
        let nuRandoNum = Math.floor(Math.random() * wordsArray.length);
        let randoAnswer = kanaArray[nuRandoNum];
        answersArray.push(randoAnswer);
    }
    shuffleArray(answersArray);
    answersArray.forEach(answer => {
        let newDiv = document.createElement('div');
        newDiv.textContent = answer;
        newDiv.addEventListener('click', (e) => {
            handleAnswerClick(loadGenkiReadingQuiz, e, 1000)
        })
        newDiv.classList.add('answer');
        newDiv.classList.add('med');
        answersBox.append(newDiv);
    });
}
function loadGenkiReadingQuizSwap() {
    clearAll();
    loadGenkiWords();
    pageHeader.textContent = "";
    pageHeader.textContent = "Textbook Words";
    makeButtons(loadGenkiReadingQuiz, loadGenkiReadingQuizSwap);
    randoNumber = Math.floor(Math.random() * wordsArray.length);
    konoKanji = kanaArray[randoNumber];
    mainCharText.textContent = konoKanji;
    let answersArray = [];
    trueAnswer = wordsArray[randoNumber];
    answersArray.push(trueAnswer);
    for (let i = 0; i < 8; i++) {
        let nuRandoNum = Math.floor(Math.random() * wordsArray.length);
        let randoAnswer = wordsArray[nuRandoNum];
        answersArray.push(randoAnswer);
    }
    shuffleArray(answersArray);
    answersArray.forEach(answer => {
        let newDiv = document.createElement('div');
        newDiv.textContent = answer;
        newDiv.addEventListener('click', (e) => {
            handleAnswerClick(loadGenkiReadingQuizSwap, e, 1000)
        })
        newDiv.classList.add('answer');
        newDiv.classList.add('med');
        answersBox.append(newDiv);
    });
}

//menu funtions
const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");
const items = document.querySelectorAll(".item");
const finals = document.querySelectorAll(".final");

/* Toggle mobile menu */
function toggleMenu() {
    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        toggle.querySelector("a").innerHTML = "Study ▼";
    } else {
        menu.classList.add("active");
        toggle.querySelector("a").innerHTML = "✖";
    }
}

/* Activate Submenu */
function toggleItem() {
    if (this.classList.contains("submenu-active")) {
        this.classList.remove("submenu-active");
    } else if (menu.querySelector(".submenu-active")) {
        menu.querySelector(".submenu-active").classList.remove("submenu-active");
        this.classList.add("submenu-active");
    } else {
        this.classList.add("submenu-active");
    }
}

/* Close Submenu From Anywhere */
function closeSubmenu(e) {
    let isClickInside = menu.contains(e.target);

    if (!isClickInside && menu.querySelector(".submenu-active")) {
        menu.querySelector(".submenu-active").classList.remove("submenu-active");
    }
}
/* Event Listeners */
toggle.addEventListener("click", toggleMenu, false);
for (let item of items) {
    if (item.querySelector(".submenu")) {
        item.addEventListener("click", toggleItem, false);
    }
    item.addEventListener("keypress", toggleItem, false);
}
for (let item of finals) {
    item.addEventListener('click', toggleMenu, false)
}
document.addEventListener("click", closeSubmenu, false);