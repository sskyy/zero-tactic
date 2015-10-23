var React = require('react')
var ReactRouter = require('react-router')
var Link = ReactRouter.Link


module.exports = React.createClass({
  render(){
    return <div className='container-sidebar'>
      <ul className='nav'>
        <li className='nav-item'>
          <Link activeClassName='active' to='/processing'>进行中</Link>
        </li>
        <li className='nav-item'>
          <Link activeClassName='active' to='/completed'>已完成</Link>
        </li>
      </ul>
    </div>
  }
})