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

    
  });
});