import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

type ReadFileType = (filePath: string, filename: string) => Promise<string>;
type WriteFileType = (filePath: string, filename: string, data: string) => Promise<void>;

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const read: ReadFileType = async (filePath: string, filename: string): Promise<string> => {
    const file: string = path.join(__dirname, filePath) + filename;

    return await readFile(file, 'utf-8');
}

const write: WriteFileType = async (filePath: string, filename: string, data: string): Promise<void> => {
    const file: string = path.join(__dirname, filePath) + filename;

    await writeFile(file, data);
}

export { read, write };