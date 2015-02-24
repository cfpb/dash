/** @jsx React.DOM */

jest.dontMock('../TeamList.jsx')
    .dontMock('jquery');

describe('List of teams', function () {
    it('should contain some teams', function () {
        var React = require('react/addons');
        var TeamList = require('../TeamList.jsx');
        var TestUtils = React.addons.TestUtils;

        var teams = [
                { "name": "foo1",
                    "roles": {
                        "member": {
                            "members": [
                                "c7a9d8c1c0516c0910f7b2013e004675",
                                "c7a9d8c1c0516c0910f7b2013e00d518",
                                "c7a9d8c1c0516c0910f7b2013e02bd9d"]
                        }
                    }
                },
                {"name": "foo2",
                    "roles": {
                        "member": {
                            "members": [
                                "c7a9d8c1c0516c0910f7b2013e004675",
                                "c7a9d8c1c0516c0910f7b2013e00d518",
                                "c7a9d8c1c0516c0910f7b2013e02bd9d"]
                        }
                    }
                }
            ],
            users = [
                { "name": "c7a9d8c1c0516c0910f7b2013e0019e7", "data": {"username": "agarwalan"}}
            ];

        var teamList = TestUtils.renderIntoDocument(
            <TeamList teams={teams} users={users} />
        );

        var numTeams = TestUtils.scryRenderedDOMComponentsWithClass(teamList, 'team-item').length;
        expect(numTeams).toEqual(2);

    });
});