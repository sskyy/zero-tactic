var Tasks = require('./Tasks.jsx')
var Input = require('./Input.jsx')
var Roof = require('roof-zeroql')

module.exports = Roof.createContainer({
  render : function(){
    return <div className='container-main'>
      <Input />
      <Tasks />
    </div>
  }
})