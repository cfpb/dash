/** @jsx React.DOM */

// __tests__/TeamItem-test.js

jest.dontMock('../TeamItem.jsx');

describe('Individual team item', function () {
    it('should load a div', function () {
        var React = require('react/addons');
        var TeamItem = require('../TeamItem.jsx');
        var TestUtils = React.addons.TestUtils;

        var name = 'foo',
            users = [
                { "name": "c7a9d8c1c0516c0910f7b2013e010194", 
                    "data": {"username": "dezzie"}},
                { "name": "c7a9d8c1c0516c0910f7b2013e01500e",
                    "data": {"username": "errosica"}}
                ];

        var teamItem = TestUtils.renderIntoDocument(
            <TeamItem name={name} users={users} key={name} />
        );

        expect(teamItem.getDOMNode().className).toEqual('team-item');
    });
});