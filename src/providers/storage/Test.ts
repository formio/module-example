import NativePromise from 'native-promise-only';
export default class Test {
  public static title = 'Test';

  public uploadFile(file, fileName) {
    return new NativePromise((resolve, reject) => {
      resolve({
        storage: 'test',
        name: fileName,
        url: file.url,
        size: file.size,
        type: file.type,
      });
    });
  }

  public downloadfile(file) {
    return NativePromise.resolve(file);
  }
}
