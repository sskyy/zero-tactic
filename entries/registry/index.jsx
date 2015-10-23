'use strict'

var React = require("react")
var Roof = require('roof-zeroql')
var Register = require('./components/Register.jsx')
var Login = require('./components/Login.jsx')

require('./index.less')

var exports = Roof.createRootContainer({
  backend : '/taurus/tactic/query',
  types : [
    require('../../common/types/user.js'),
  ],
  events : [
    require('./events/client.js')
  ],
  render: function(){
    return <div className='container'>
      <Register />
      <Login />
    </div>
  }
})


if( typeof window !== undefined ){
  window.Entry = exports
}

module.exports = exports