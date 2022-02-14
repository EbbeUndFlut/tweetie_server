const { MongoClient, MongoClient } = require("mongodb");

let _db;

async function getDb() {
	if (_db) {
		return _db;
	} else {
		const client = new MongoClient(process.env.MONGO_URL);
		await client.connect();
		_db = client.db(process.env.DBNAME);
		return _db;
	}
}

module.exports = {
	getDb,
};
