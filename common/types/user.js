module.exports ={
  type : 'User',
  primary : 'id',
  fields : {
    name : {
      type : 'varchar',
      allowNull : false
    },
    password : {
      type : 'char',
      size : 64,
      allowNull : false
    },
    salt : {
      type : 'char',
      size : 10,
      allowNull : false
    },
    points : {
      type : 'int',
      defaultValue : 0
    }
  }
}
