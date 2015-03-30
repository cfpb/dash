var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants');
var assign = require('object-assign');
var common = require('../utils/common');

var CHANGE_EVENT = 'change';

var UserStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return common.getAllUsers();
  },
  getCurrentUser: function(){
    return common.getCurrentUserInfo();
  }
  //,
  //copy and paste shame, not being used right now
  //emitChange: function() {
  //  this.emit(CHANGE_EVENT);
  //},
  //
  //addChangeListener: function(callback) {
  //  this.on(CHANGE_EVENT, callback);
  //},

  /**
   * @param {function} callback
   */
  //removeChangeListener: function(callback) {
  //  this.removeListener(CHANGE_EVENT, callback);
  //}
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

//this is copy and paste
  //switch (action.actionType) {
  //  case '':
  //    break;
  //}

});

module.exports = UserStore;
