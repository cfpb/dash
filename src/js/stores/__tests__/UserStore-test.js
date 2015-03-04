jest.dontMock('../../constants/UserConstants');
jest.dontMock('../UserStore');
jest.dontMock('object-assign');

describe('UserStore', function() {

  var UserStore;

  beforeEach(function() {
    UserStore = require('../UserStore');
  });

  it('should call common to get all teams', function() {
    var common = require('../../utils/common'),
        resources = require('../../utils/resources');
    UserStore.getAll();
    expect(common.getAllUsers).toBeCalled();
  });

});
