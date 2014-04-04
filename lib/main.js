module.exports = function() {

  // utility functions
  var isNull = function(obj) {
    return (obj === null || typeof obj === 'undefined');
  };

  var isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  // Option Class
  var Option = function(data) {
    if (isNull(data) === true) { throw new Error('Initilization data empty.'); }
    if (isNull(data.content) === true) { throw new Error('Option body is required.'); }

    this._content = content;
    this._type = 'option';
    return this;
  };

  // static methods
  Option.is = function(obj) {
    if (isNull(obj) === true) { return false; }
    return obj._type === 'option';
  };

  // methods
  Option.getClass = function() {
    return this._type;
  };

  /* ================================ */

  // Question Class
  var Question = function(data) {
    if (isNull(data) === true) { throw new Error('Initilization data empty.'); }
    if (isNull(data.content) === true) { throw new Error('Question body is required.'); }
    if (isArray(data.options) === false) { throw new Error('Options should be provided as array.'); }
    
    for (var key in data.options) {
      if (Option.is(data.options[key]) === false) {
        throw new Error('Option Type Error');
      }
    }

    this._content = data.content;
    this._options = data.options;
    this._type = 'question';
    return this;
  };

  // static methods
  Question.is = function(obj) {
    if (isNull(obj) === true) { return false; }
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

  /* ================================ */

  // Survey Class
  var Survey = function(data) {
    if (isNull(data) === true) { throw new Error('Initilization data empty.'); }
    if (isNull(data.questions) === true) { throw new Error('Questions is required.'); }
    if (isArray(data.questions) === false) { throw new Error('Questions should be provided as array.'); }

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
      _options.push(new Option({'content': data.options[key].content}));
    }

    return new Question({
      content: data.content,
      options: _options
    });
  };

  // methods
  Survey.prototype.getQuestions = function() {
    return this._questions;
  };

  Survey.prototype.getClass = function() {
    return this._type;
  };

  return Survey;
};