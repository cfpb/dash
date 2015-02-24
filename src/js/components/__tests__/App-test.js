// __tests__/App-test.js

/** @jsx React.DOM */
jest.dontMock('../../utils/common');

describe('Get all teams method', function () {
    it('should call a callback', function () {

        var common = require('../../utils/common'),
            $ = require('jquery');

        common.getAllTeams();

        expect($.get).toBeCalledWith('/dummy-data/teams.json');
    });
});
