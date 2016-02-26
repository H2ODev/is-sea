//import chai from 'chai';
//import isSEA from '../lib/isSEA.js';

chai.expect();

const expect = chai.expect;

var sea;

describe('Given an instance of isSEA', function () {
  before(function () {
    sea = new isSEA();
  });
  describe('when I need the name', function () {
    it('should return the name', function () {
      expect(sea.cookieName).to.be.equal('isSEA');
    });
  });
});