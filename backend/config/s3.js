const aws = require("aws-sdk");
const {randomBytes} = require('crypto')
const region = process.env.AWS_BUCKET_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new aws.S3({
	region,
	accessKeyId,
	secretAccessKey,
	signatureVersion: "v4",
});

const generateURL = async (name) => {
	const imageName = name;
	const buf = randomBytes(64)
	const key = buf.toString('hex')+imageName

	const params = {
		Bucket: bucketName,
		Key: key,
		Expires: 60,
	};

	const uploadURL = await s3.getSignedUrlPromise("putObject", params);
	return uploadURL;
};
module.exports = {
	generateURL,
};
