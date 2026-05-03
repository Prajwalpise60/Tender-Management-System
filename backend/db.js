const oracledb = require('oracledb');

oracledb.autoCommit = true;

async function getConnection() {
  try {
    const connection = await oracledb.getConnection({
      user: 'hr',                        // Oracle username
      password: 'hr',                      // Oracle password
      connectString: 'localhost:3000/XE'     // hostname:port/service_name
    });

    console.log('✅ Oracle DB Connected Successfully');
    return connection;

  } catch (err) {
    console.error('❌ Connection Error:', err);
    throw err;
  }
}

module.exports = getConnection;
