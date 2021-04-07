import * as fs from 'fs';

const read = async (filename) => {
    let result: string;

    await fs.readFile(filename, (error: NodeJS.ErrnoException, data: Buffer) => {
        if (error) {
            result = 'Error reading file';
        }

        result = data.toString();
    });

    return result;
}

const write = async (filename, data) => {
    let result: string;

    await fs.writeFile(filename, data, (error: NodeJS.ErrnoException) => {
        if (error) {
            result = 'Error writing file';
        }

        result = 'Successfully written file';
    });

    return result;
}

export { read, write };