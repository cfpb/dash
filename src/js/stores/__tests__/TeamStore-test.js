jest.dontMock('../../constants/TeamConstants');
jest.dontMock('../TeamStore');
jest.dontMock('object-assign');

describe('TeamStore', function() {

  var TeamStore,
      common;

  beforeEach(function() {
    TeamStore = require('../TeamStore');
    common = require('../../utils/common');
  });

  it('should call common to get all teams', function() {
    TeamStore.getAll();
    expect(common.getAllTeams).toBeCalled();
  });

});
