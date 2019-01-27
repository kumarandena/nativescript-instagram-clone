import { Injectable } from "@angular/core";
import * as fs from "file-system";
let documents = fs.knownFolders.currentApp();

@Injectable()
export class FileReaderService {

    constructor() { }

    readJSON(path: string): Promise<Object> {
        let jsonFile = documents.getFile(path);
        return new Promise<Object>((resolve, reject) => {
            jsonFile.readText().then((content: string) => {
                let data = <Array<Object>>JSON.parse(content);
                resolve(data);
            })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}
