var Roof = require('roof-zeroql')
var Task = require('./Task.jsx')
var Pagination = require('./Pagination.jsx')

module.exports = Roof.createContainer({
  name : 'Tasks',
  rootQueries : {
    tasks: `
      Task(_total:true,_orderBy:'id DESC',_limit:5) {
        ${Task.getQuery('task')},
      }
    `
  },
  gotoPage : function( page ){
    this.props.tasks.query.setAttr('_offset', (page-1) * 5)
  },
  render : function(){
    return <div>
        {this.props.tasks.map(function(task){
          return <Task key={task.get('id')} task={task}></Task>
        })}


    </div>
  }
})