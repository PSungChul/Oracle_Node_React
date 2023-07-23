module.exports = {
    user          : process.env.NODE_ORACLEDB_USER || 'test',
    password      : process.env.NODE_ORACLEDB_PASSWORD || 'test',
    connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || 'localhost:1521/xe',
    externalAuth  : false
};