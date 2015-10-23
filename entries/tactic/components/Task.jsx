var Roof = require('roof-zeroql')

module.exports = Roof.createContainer({
  name : 'Task',
  queries : {
    task : `
      Task{
        content,
        User created{
          name
        }
      }
    `
  },
  getInitialState : function(){
    return {
      updateMode : false
    }
  },
  updateMode : function(){
    this.setState({updateMode:true})
  },
  remove : function(){
    if( ! confirm('确定删除?') ) return false

    this.bus.fire('task.remove', this.props.task.get('id')).catch(e=>{
      console.log(e)
      alert('删除失败')
    })
  },
  saveUpdate : function(e){
    if( e.which !== 13) return

    this.bus.fire('task.update',{
      id: this.props.task.get('id'),
      content : this.refs.updateInput.getDOMNode().value
    }).then(()=>{
      this.setState({updateMode:false})
    }).catch(e=>{
      console.log(e)
      alert('更新失败')
    })

  },
  render : function(){
    var actionNodes = []
    if( context.user && context.user.id === this.props.task.getRelative('created').get('id')){
      actionNodes.push(<a onClick={this.updateMode}>update</a>)
      actionNodes.push(<a onClick={this.remove.bind(this,this.props.task.get('id'))}>remove</a>)
    }

    var contentNode = this.state.updateMode ?
      <input onKeyUp = {this.saveUpdate} placeholder={this.props.task.get('content')} ref='updateInput'/> :
      this.props.task.get('content')

    return <div className='task'>
    <div className='content'>
      {contentNode}
      </div>
      <div className='actions'>
        {actionNodes}
      </div>
    </div>
  }
})