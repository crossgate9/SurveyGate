var should = require('should'),
    survey = require('../lib/main')();

describe('survey', function() {
  describe('initialization', function() {
    it('init with empty questions', function() {
      var entity = new survey({'questions': []});
      entity.getClass().should.eql('survey');
    });

    it('init with null obj', function() {
      (function() {
        var entity = new survey(null);
      }).should.throw('Initilization data empty.');
    });

    it('init with displace object', function() {
      (function() {
        var entity = new survey({'q': []});
      }).should.throw('Questions is required.');
    });

    it('init with questions, not array', function() {
      (function() {
        var entity = new survey({'questions': 'abc'});
      }).should.throw('Questions should be provided as array.');
    });

    it('init with questions, question type error', function() {
      (function() {
        var entity = new survey({'questions': ['abc', 'def']});
      }).should.throw('Question Type Error');
    });

    it('init with questions, correctly', function() {
      var entity = new survey({
            'questions': [
              survey.createQuestion({
                'content': 'This is first question'
              })
            ]
          }),
          questions = entity.getQuestions();

      entity.getClass().should.eql('survey');
      questions.length.should.eql(1);
      for (var key in questions) {
        var question = questions[key];
        question.getClass().should.eql('question');
        question.getContent().should.eql('This is first question');
        question.getOptions().should.eql([]);
      }
    });
  });
});