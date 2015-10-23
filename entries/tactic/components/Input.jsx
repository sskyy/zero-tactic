var Roof = require('roof-zeroql')

module.exports = Roof.createContainer({
  onChange : function(e){
    this.setState({content : e.target.value})
  },
  onKeyUp : function(e){
    if(e.which !== 13) return

    var task = {content:this.state.content }
    this.bus.fire('task.create',task).then(function(){
      //alert('post created.')
    }).catch(function(e){
      console.error(e)
      if( e.code === 403 ){
        window.location.href='/tactic/registry.html'
      }else{
        alert('task failed.')
      }
    })

  },
  render: function () {
    return <div className='task-input'>
      <input onKeyUp={this.onKeyUp} onChange = {this.onChange} placeholder="What's new today?"/>
    </div>
  }
})
