'use strict';

module.exports = function (galaxies) {
  return {
    'task.create' : function *createTask(taskData){
      var User = galaxies.getNodeClass('User')
      var Task = galaxies.getNodeClass('Task')

      if( !this.req.session.user || !this.req.session.user.id ) {
        return this.error(403,{msg:'you are not logged in'})
      }

      var creator = yield User.from({id : this.req.session.user.id})
      if( !creator )  return this.error(406,{msg:'cannot find current user'})

      //尝试优化性能,有主键的实例就可以代表当前实例了

      var task = new Task(taskData)
      task.relate( creator, 'created', true)
      return task.push()
    },
    'task.update'  : function *updateTask( taskData ){
      var Task = galaxies.getNodeClass('Task')
      var task = yield Task.from(`Task(id:${taskData.id}){ User created{id}}`)

      if( this.req.session.user.id !== task.getRelative('created').get('id') ){
        return this.error('406',{msg:'you are not authorized to update this task.'})
      }

      task.set('content',taskData.content)
      return task.push()
    },
    'task.remove'  : function *removeTask( id ){
      var Task = galaxies.getNodeClass('Task')
      var task = yield Task.from(`Task(id:${taskData.id}){ User created{id}}`)

      if( this.req.session.user.id !== task.getRelative('created').get('id') ){
        return this.error('406',{msg:'you are not authorized to update this task.'})
      }

      task.destroy()
      return task.push()
    }
  }
};

