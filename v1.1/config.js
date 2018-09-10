const mysql = require('mysql2')
const marked = require('marked')

module.exports = {
    database: mysql.createPool({
        host: '',
        port: 3306,
        database: '',
        user: '',
        password: '',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }),
    myMarked: function() {
        marked.setOptions({
            renderer: marked.Renderer(),
            highlight: function(code) {
                return require('highlight.js').highlightAuto(code).value
            },
            pedantic: false,
            gfm: true,
            tables: true,
            breaks: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            xhtml: false
        })
        return marked
    }
}