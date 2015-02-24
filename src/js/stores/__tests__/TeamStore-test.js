/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore-test
 */

jest.dontMock('../../constants/TeamConstants');
jest.dontMock('../TeamStore');
jest.dontMock('object-assign');

describe('TeamStore', function() {

  var TeamConstants = require('../../constants/TeamConstants');
  var AppDispatcher;
  var TeamStore;
  var callback;

  // mock actions
  var actionTodoCreate = {
    actionType: TeamConstants.TODO_CREATE,
    text: 'foo'
  };
  var actionTodoDestroy = {
    actionType: TeamConstants.TODO_DESTROY,
    id: 'replace me in test'
  };

  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    TeamStore = require('../TeamStore');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should initialize with no to-do items', function() {
    var all = TeamStore.getAll();
    expect(all).toEqual({});
  });

  it('creates a to-do item', function() {
    callback(actionTodoCreate);
    var all = TeamStore.getAll();
    var keys = Object.keys(all);
    expect(keys.length).toBe(1);
    expect(all[keys[0]].text).toEqual('foo');
  });

  it('destroys a to-do item', function() {
    callback(actionTodoCreate);
    var all = TeamStore.getAll();
    var keys = Object.keys(all);
    expect(keys.length).toBe(1);
    actionTodoDestroy.id = keys[0];
    callback(actionTodoDestroy);
    expect(all[keys[0]]).toBeUndefined();
  });

  it('can determine whether all to-do items are complete', function() {
    var i = 0;
    for (; i < 3; i++) {
      callback(actionTodoCreate);
    }
    expect(Object.keys(TeamStore.getAll()).length).toBe(3);
    expect(TeamStore.areAllComplete()).toBe(false);

    var all = TeamStore.getAll();
    for (key in all) {
      callback({
        actionType: TeamConstants.TODO_COMPLETE,
        id: key
      });
    }
    expect(TeamStore.areAllComplete()).toBe(true);

    callback({
      actionType: TeamConstants.TODO_UNDO_COMPLETE,
      id: key
    });
    expect(TeamStore.areAllComplete()).toBe(false);
  });

});
