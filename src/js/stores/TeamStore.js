var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TeamConstants = require('../constants/TeamConstants');
var assign = require('object-assign');
var common = require('../utils/common');

var CHANGE_EVENT = 'change';

var _teams = {};

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(text) {

}
function destroy(id) {
    delete _teams[id];
}
function addUser(userId){
 var userPromise=common.addUser(userId);
 userPromise.done(

 )
}

var TeamStore = assign({}, EventEmitter.prototype, {

    getAll: function () {
        return common.getAllTeams();
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function (action) {
    var text;

    switch (action.actionType) {
        case TeamConstants.TEAM_CREATE:
            create(teamName);
            TeamStore.emitChange();
            break;

        case TeamStore.TEAM_DESTROY:
            destroy(teamId);
            TeamStore.emitChange();
            break;

        case TeamStore.TEAM_ADD_USER_START:
            addUser(userId);
            TeamStore.emitChange();
            break;

        default:
        // no op
    }
});

module.exports = TeamStore;
