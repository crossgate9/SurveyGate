module.exports = function() {

  var utility = require('js-utility')();
  
  // Option Class
  var Option = function(data) {
    if (utility.basic.isNull(data) === true) { throw new Error('Initilization data empty.'); }
    if (utility.basic.isNull(data.content) === true) { throw new Error('Option body is required.'); }

    this._content = data.content;
    this._point = data.point;
    this._type = 'option';
    return this;
  };

  // static methods
  Option.is = function(obj) {
    if (utility.basic.isNull(obj) === true) { return false; }
    return obj._type === 'option';
  };

  // methods
  Option.prototype.getContent = function() {
    return this._content;
  };

  Option.prototype.getPoint = function() {
    return this._point;
  };

  Option.prototype.getClass = function() {
    return this._type;
  };

  /* ================================ */

  // Question Class
  var Question = function(data) {
    if (utility.basic.isNull(data) === true) { throw new Error('Initilization data empty.'); }
    if (utility.basic.isNull(data.content) === true) { throw new Error('Question body is required.'); }
    if (utility.basic.isArray(data.options) === false) { throw new Error('Options should be provided as array.'); }
    
    for (var key in data.options) {
      if (Option.is(data.options[key]) === false) {
        throw new Error('Option Type Error');
      }
    }

    this._content = data.content;
    this._options = data.options;
    this._answer = null;
    this._type = 'question';
    return this;
  };

  // static methods
  Question.is = function(obj) {
    if (utility.basic.isNull(obj) === true) { return false; }
    return obj._type === 'question';
  };

  // methods
  Question.prototype.getContent = function() {
    return this._content;
  };

  Question.prototype.getOptions = function() {
    return this._options;
  };

  Question.prototype.getClass = function() {
    return this._type;
  };

  Question.prototype.answer = function(option) {
    if (utility.basic.isNumber(option) === false) { throw new Error('Answer index error'); }
    if (option >= this._options.length) { throw new Error('Answer index error'); }
    this._answer = option;
  };

  Question.prototype.getAnswer = function() {
    if (this._answer === null) { return null; }
    return this._options[this._answer].getContent();
  };

  Question.prototype.evaluate = function() {
    if (this._answer === null) { return null; }
    return this._options[this._answer].getPoint();
  };

  /* ================================ */

  // Survey Class
  var Survey = function(data) {
    if (utility.basic.isNull(data) === true) { throw new Error('Initilization data empty.'); }
    if (utility.basic.isNull(data.questions) === true) { throw new Error('Questions is required.'); }
    if (utility.basic.isArray(data.questions) === false) { throw new Error('Questions should be provided as array.'); }

    for (var key in data.questions) {
      if (Question.is(data.questions[key]) === false) {
        throw new Error('Question Type Error');
      }
    }

    this._questions = data.questions;
    this._type = 'survey';

    return this;
  };

  // static methods
  Survey.createQuestion = function(data) {
    var _options = [];

    for (var key in data.options) {
      _options.push(
        new Option({
          'content': data.options[key].content,
          'point': utility.basic.isNull(data.options[key].point) ? 0 : data.options[key].point
        })
      );
    }

    return new Question({
      content: data.content,
      options: _options
    });
  };

  // methods
  Survey.prototype.getQuestionCount = function() {
    return this._questions.length;
  };

  Survey.prototype.getQuestions = function() {
    return this._questions;
  };

  Survey.prototype.getFirstQuestion = function() {
    return this._questions[0];
  };

  Survey.prototype.getQuestion = function(idx) {
    if (idx >= this._questions.length) { throw new Error('Index Exceed'); }
  };

  Survey.prototype.getClass = function() {
    return this._type;
  };

  Survey.prototype.evaluate = function() {
    var point = 0;
    for (var key in this._questions) {
      var question = this._questions[key];
      point += question.evaluate();
    }
    return point;
  };

  return Survey;
};