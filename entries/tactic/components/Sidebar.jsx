var React = require('react')
var ReactRouter = require('react-router')
var Link = ReactRouter.Link


module.exports = React.createClass({
  render(){
    return <div className='container-sidebar'>
      <div className='logo'>Tactic</div>
      <div>
        <ul>
          <li>
            <Link to='/processing'>进行中</Link>
          </li>
          <li>已完成</li>
        </ul>
      </div>
    </div>
  }
})