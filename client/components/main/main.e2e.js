'use strict';

describe('Main View', function() {
  beforeEach(function() {
    browser.get('/');
  });

  it('should include jumbotron with correct data', function() {
    var jumbotronEl = element(by.css('.jumbotron'));
    var h1El = jumbotronEl.element(by.css('h1'));
    var imgEl = jumbotronEl.element(by.css('img'));
    var anchorEl = jumbotronEl.element(by.css('a'));

    expect(h1El.getText()).toBe('\'Allo, \'Allo!');
    expect(imgEl.getAttribute('src')).toMatch(/\/images\/yeoman.png$/);
    expect(imgEl.getAttribute('alt')).toBe('I\'m Yeoman');
    expect(anchorEl.getText()).toBe('Splendid!');
  });

  it('should render awesomeThings', function() {
    var repeater = by.repeater('thing in awesomeThings');
    var firstAwesomeThingNameEl = element(repeater.row(0).column('{{thing.name}}'));
    var awesomeThingsCount = element.all(repeater).count();

    expect(firstAwesomeThingNameEl.getText()).toBe('HTML5 Boilerplate');
    awesomeThingsCount.then(function(count) {
      expect(count).toBe(5);
    });
  });
});