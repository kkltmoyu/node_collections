// add.test.js
var add = require('../my_modules/mocha/add.js');
var expect = require('chai').expect;

describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  });
  it('random test',function(){
  	// expect(true).to.be.not.equal(false);
  	// expect(false).to.be.not.ok;
  	// expect('test').to.be.a('string');
  	// expect({foo:'123'}).to.be.an('object');
  	// expect('haha').to.be.not.a('number');
  	// expect('haha').to.be.a('string');
  	// expect([1,2,3]).to.include(2);
  	// expect([]).to.be.empty;
  })
});