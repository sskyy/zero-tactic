'use strict';

var pbkdf2 = require('pbkdf2-sha256')
var randomString = require('randomstring')
var _ = require('lodash')


module.exports = function (galaxies) {
  return {
    'user.signup' : function *saveUser(data){

      if( data.password === undefined || data.name === undefined){
        return this.error(400,{msg:'name or password can not be empty'})
      }

      var User = galaxies.getNodeClass('user')
      if( yield User.exist({name:data.name})){
        return this.error(406,{msg :'name has been occupied'})
      }

      data.salt = randomString.generate(10)
      data.password = pbkdf2(data.password, data.salt, 1, 64).toString('hex');

      var user = new User(data)

      yield user.push()
      this.data.set('createdUser', user.toObject())
    },

    'user.signin': function *userLogin( data ) {
      console.log('trying to login', data, this.req.session)
      if( data.password === undefined || data.name === undefined){
        return this.error(400,{msg:'name or password can not be empty'})
      }

      var User = galaxies.getNodeClass('User')
      var candidate = yield User.from({name:data.name})

      if( !candidate){
        return this.error(406, {msg: 'wrong password or name.'})
      }


      if( pbkdf2(data.password, candidate.get('salt'), 1, 64).toString('hex') === candidate.get('password') ){

      }else{
        return this.error(406, {msg: 'wrong password or name.'})
      }

      this.req.session.user = _.without(candidate, 'password')
      console.log('set session', this.req.session)
      this.data.set('user.login.result', this.req.session.user)
    }
  }
};

