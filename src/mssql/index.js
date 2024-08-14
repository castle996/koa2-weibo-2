const sql = require('mssql')
const config = {
    user: 'BessRam72',
    password: 'JosFle1018',
    server: 'buildersaccess.com',
    port:2870,
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
    database: 'builder_web',
}

sql.connect(config).then(() => {
    return sql.query`select top 10 * from project`
}).then(result => {
    console.dir(result)
}).catch(err => {
    console.log(err)
})

sql.on('error', err => {
    console.log(err)
})