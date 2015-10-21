module.exports ={
  type : 'Task',
  primary : 'id',
  fields : {
    content : 'varchar',
    root: 'int',
    path: 'varchar',
    isCompleted:{
      type : 'int',
      defaultValue : 0
    },
    createdAt : {
      type : 'char',
      size: 10
    },
    updatedAt : {
      type : 'char',
      size: 10
    },
    point : 'int'
  },
  relations : [{
    name : 'created',
    reverse : true,
    to : 'User'
  }]
}
