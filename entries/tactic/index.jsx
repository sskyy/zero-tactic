'use strict'
var React = require('react')
var Roof = require('roof-zeroql')
var Sidebar= require('./components/Sidebar.jsx')
var ReactRouter = require('react-router')
var Router = ReactRouter.Router
var Route = ReactRouter.Route
var Link = ReactRouter.Link
var NoMatch = require('./components/NoMatch.jsx')
var Processing= require('./components/Processing.jsx')


require('./index.less')

var RootContainer = Roof.createRootContainer({
  backend : '/taurus/tactic/query',
  types : [
    require('../../common/types/user.js'),
    require('../../common/types/task.js')
  ],
  events : [
    require('./events/client.js')
  ],
  render: function(){
    return <div className='container'>
      <Sidebar />
      {this.props.children}
    </div>
  }
})


if( typeof window !== 'undefined' ){
  window.Entry = React.createClass({
    render : function(){
      console.log('should only render once')
      return <Router>
        <Route path="/" component={RootContainer}>
          <Route path="/processing" component={Processing}/>
          <Route path="*" component={NoMatch}/>
        </Route>
      </Router>
    }
  })
}