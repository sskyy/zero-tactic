require('node-jsx').install({extension: '.jsx'})
var path = require('path')

module.exports = {
  entries : {
    path : path.join(__dirname, 'entries'),
    container : require('./Page.jsx'),
    spec : {
      registry : {
        serverEvents :  [
          require('./entries/registry/events/server')
        ],
        types : [
          require('./common/types/user.js')
        ]
      },
      tactic : {
        serverEvents : [
          require('./entries/tactic/events/server')
        ],
        types : [
          require('./common/types/user.js'),
          require('./common/types/task.js')
        ],
        context: function(){
          return { user :  (this.session && this.session.user)||{} }
        }
      }
    }
  },
  assets : [{
    path :  path.join(__dirname, 'public')
  }],
  connection: {
    host: 'localhost',
    user: 'root',
    socketPath: '/tmp/mysql.sock',
    database: 'tactic'
  }
}
