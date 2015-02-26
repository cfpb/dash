jest.dontMock('../../constants/TeamConstants');
jest.dontMock('../TeamStore');
jest.dontMock('object-assign');

describe('TeamStore', function() {

  var TeamStore;

  beforeEach(function() {
     TeamStore = require('../TeamStore');
  });

  it('should call common to get all teams', function(){
    var common = require('../../utils/common');
    TeamStore.getAll();
    expect(common.getAllTeams).toBeCalled();
  });

});
