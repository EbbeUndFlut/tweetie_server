const aws = require("aws-sdk");
const {randomBytes} = require('crypto')
const region = "eu-central-1";
const bucketName = "tweetie";
const accessKeyId = "AKIAQOTBFH6HAK2GT7XU";
const secretAccessKey = "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";

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
