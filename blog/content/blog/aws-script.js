/**
 * Quiz : 1
 */

{
    // for udemy course quiz 
// https://www.udemy.com/course/aws-certified-developer-associate-dva-c01/learn/quiz/5348848#overview

const getQuestion = () => {
    const questionNum = document.querySelector('[data-testid*=mc] > span').textContent;
    const question = document.querySelector('#question-prompt > p').textContent;
    const getQuestionHtml = (q, num) => `<h4>${num} ${q} </h4>`;
    return getQuestionHtml(question, questionNum);
}
const getAnswerText = () => {
    const answerText = document.querySelector('[data-purpose="safely-set-inner-html:rich-text-viewer:html"]').textContent
}
const getAnswers = () => {
    const isCorrect = (li) => {
        if (li.firstChild.firstChild.checked === true) {
            return `<p><span class="correct">Correct ${getAnswerText() ? getAnswerText() : ''}</span>  </p>`
        }
        return `<p>False</p>`
    }
    const answers = [...document.querySelectorAll('[class*=mc-quiz-question--answer--]')].map(item => {
        return `<details>
   <summary>${item.textContent}</summary>
   ${isCorrect(item)}
</details>`

    }
    );
    return `${answers.join('')}`

}

const question = getQuestion()

const answers = getAnswers()

const everything = `${question} ${answers}`

copy(everything);

}



/**
 * Quiz:  2
 */

{
    //For the udemy course practice questions: https://www.udemy.com/course/aws-certified-developer-associate-practice-tests-dva-c01/learn/quiz/4540356/test#overview

const getQuestion = () => {
    const questionNumber = `Question: !@`
    const question = document.querySelector('#question-prompt').textContent;
    const createQuestionHeading = () => (`<h4> ${questionNumber} ${question} </h4>
    `)
    return createQuestionHeading();
}

const getAnswerHTML = (ans, explaination, bool) => {
    const incorrect = (ans) => `<p><span class="incorrect">Incorrect </span> </p>`
    const correct = (ans) => `<p><span class="correct">Correct:</span> ${explaination} </p>`
    return `
  <details>
  <summary>${ans}</summary>
  ${bool ? correct(ans) : incorrect(ans)}
  </details>
  `
}
const getAnswers = () => {
    const explaination = document.querySelector('[class*=overall-explanation-pane--overall-explanation]').textContent
    const correctAnswer = document.querySelector('[class*="result-pane--answer"]:has(> [class*="-correct"])').textContent;
const cleanupAnswer = correctAnswer.replace(/Correct answer|Your answer is correct|Correct selection|Your selection is correct/i, '').replace(/Explain this further\s*$/i, '');
    const answers = [...document.querySelectorAll('#answer-text')].map(i => i.textContent);
    return answers.map(answer => {
        const isCorrect = answer === cleanupAnswer;

        return getAnswerHTML(answer, explaination, isCorrect);

    }
    ).join('');

}

const result = `${getQuestion()}${getAnswers()}`
copy(result)
}