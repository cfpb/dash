jest.dontMock('../UserActions')
  .dontMock('flux');

describe('UserActions', function() {
  var AppDispatcher,
    UserActions;

  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/AppDispatcher.js');
    UserActions = require('../UserActions');
    spyOn(AppDispatcher, 'dispatch')
  });

  it('should dipatch user data action', function() {
    var opts = {
      path: 'foo',
      data: 'bar',
      id: '123'
    };
    UserActions.userData(opts);
    opts.actionType = 'USER_DATA';
    expect(AppDispatcher.dispatch).toHaveBeenCalledWith(opts);
  });
});
