//  MultipleChoiceQuestion is a class with a build method
class MultipleChoiceQuestion {
    constructor() {
        this.keyword = null;
        this.question = null;
        this.answer = null;
        this.category = null;
        this.choices = null;
    }
  
    build(keyword, question, answer, category, choices) {
        this.keyword = keyword;
        this.question = question;
        this.answer = answer;
        this.category = category;
        this.choices = Array.from(choices);
    }
  }

var extractQuestion = exports.extractQuestion = function(keyword, category, generatedResponse) {

  let questionDoc = new MultipleChoiceQuestion();
  let answerParts = generatedResponse.split("\n");
  let question = answerParts[0].trim();

  const questionTok = "?";
  for (let i = 0; i < answerParts.length - 2; i++) {
      if (answerParts[i].includes(questionTok)) {
          question = answerParts[i].trim();
          break;
      }
  }
  let i = 0;
  if (question !== "") {
      let choices = new Set();

      const answerTok = "Answer:";
      for (i = 1; i < answerParts.length - 2; i++) {
          if (answerParts[i] !== "" && answerParts[i].includes(")") && !answerParts[i].includes(questionTok)
                  && !answerParts[i].includes(answerTok)) {
              choices.add(answerParts[i].trim());
          }
          if (answerParts[i].includes(answerTok)) {
              break;
          }
      }

      let answer = "";
      for (let a = i; a < answerParts.length; a++) {
          if (answerParts[a] !== "" && answerParts[a].includes(")")
                  && !answerParts[a].includes(questionTok)) {
              answer = answerParts[a];
              console.log("Answer: " + answer);
              let answerStartPos = answer.indexOf(":");
              answer = answer.substring(answerStartPos + 1).trim();
              break;
          }
      }
      if (answer === "") {
          return questionDoc;
      }
      questionDoc.build(keyword, question, answer, category, choices);
  }
  return questionDoc;
}


