var api = require('../API.js');
api.addUser({id: 'brian', name:'brian c'});

var uri = 'https://blistering-inferno-2653.firebaseio.com/';

function _ref(path) {
  return new Firebase(uri + path);
}

function _uid() {
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var uid = [];
  var n = 16;
  while (n--) {
    uid.push(chars[Math.random() * chars.length | 0]);
  }
  return uid.join('');
}

// jest.dontMock('../API');

describe('API', function() {
  it('expects tests to run.', function() {});

  describe('addUser', function() {

    var testUser = {
      id: _uid(),
      name: _uid(),
    };
    var callbackUser;
    var called = false;
    _ref('users').on('value', function(data) {
      callbackUser = data.val();
      called = true;
    });

    it('expects API object to be defined.', function() {
      expect(api).toBeDefined();
    });

    it('expects api.addUser to be defined', function() {
      expect(api.addUser).toBeDefined();
    });

    it('expects added user to be findable in database.', function() {
      runs(function() {
        console.log('runs addUser', testUser);
        api.addUser(testUser);
      });

      waitsFor(function() {
        return called;
      }, 2000);

      runs(function() {
        expect(callbackUser).toEqual(testUser);
      });
    });
  });
  describe('addThread', function() {});
  describe('sendMessage', function() {});
});
