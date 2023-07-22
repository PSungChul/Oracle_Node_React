module.exports = {
    user          : process.env.NODE_ORACLEDB_USER || 'cyworld',
    password      : process.env.NODE_ORACLEDB_PASSWORD || 'cyworld',
    connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || 'localhost:1521/xe',
    externalAuth  : false
};