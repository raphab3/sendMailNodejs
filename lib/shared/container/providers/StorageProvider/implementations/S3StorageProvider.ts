const promises = require('fs').promises
import path from 'path';
var AWS = require("aws-sdk");
import mime from 'mime';

import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';
import { S3 } from 'aws-sdk';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new AWS.S3({
      region: 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    // const ContentType = mime.getType(originalPath);

    // if (!ContentType) {
    //   throw Error('File not found');
    // }

    const fileContent = await promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        // ContentType,
      })
      .promise();

    await promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}

export default S3StorageProvider;
