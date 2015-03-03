var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TeamConstants = require('../constants/TeamConstants');
var assign = require('object-assign');
var common = require('../utils/common');

var CHANGE_EVENT = 'change';

var _teams = {};

/**
 * Create a Team item.
 * @param  {string} text The content of the TODO
 */
function create(text) {

}

function destroy(id) {
  delete _teams[id];
}

function addUser(userId) {
  var userPromise = common.addUser(userId);
  userPromise.done();
}

function removeUser(opts) {
  console.log('store', opts);
  var userPromise = common.removeUser(opts);
  userPromise.done();
}

var TeamStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return common.getAllTeams();
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch (action.actionType) {
    case TeamConstants.TEAM_CREATE:
      create();
      TeamStore.emitChange();
      break;

    case TeamConstants.TEAM_DESTROY:
      destroy();
      TeamStore.emitChange();
      break;

    case TeamConstants.TEAM_ADD_USER_START:
      addUser();
      TeamStore.emitChange();
      break;

    case TeamConstants.TEAM_REMOVE_USER_START:
      console.log('action', action);
      removeUser(action.payload);
      TeamStore.emitChange();
      break;
    default:
    // no op
  }
});

module.exports = TeamStore;
