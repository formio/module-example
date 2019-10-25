"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const native_promise_only_1 = require("native-promise-only");
class Test {
    uploadFile(file, fileName) {
        return new native_promise_only_1.default((resolve, reject) => {
            resolve({
                storage: 'test',
                name: fileName,
                url: file.url,
                size: file.size,
                type: file.type,
            });
        });
    }
    downloadfile(file) {
        return native_promise_only_1.default.resolve(file);
    }
}
exports.default = Test;
Test.title = 'Test';
