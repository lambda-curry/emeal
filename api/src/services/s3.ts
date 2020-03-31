import S3 from 'aws-sdk/clients/s3';

const S3_BUCKET_NAME = 'emeal-public';
const s3 = new S3({ region: 'us-east-1' });

export async function uploadFile(file: Buffer, mimeType: string, key: string) {
  await s3
    .putObject({
      Bucket: S3_BUCKET_NAME,
      Key: key,
      ACL: 'public-read',
      Body: file,
      ContentType: mimeType
    })
    .promise();
}
