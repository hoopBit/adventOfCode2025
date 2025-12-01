import * as fs from 'fs';

export default function useFileReader() {

    /**
     * Reads a text file and returns its content as a string
     * @param filePath - The path to the file to read
     * @returns The file content as a string
     */
    function readFile(filePath: string): string {
        return fs.readFileSync(filePath, 'utf-8');
    }

    /**
     * Reads a text file and returns its content as an array of lines
     * @param filePath - The path to the file to read
     * @returns Array of lines from the file
     */
    function readFileLines(filePath: string): string[] {
        const content = readFile(filePath);
        return content.split(/\r?\n/).filter(line => line.length > 0);
    }

    return {
        readFile,
        readFileLines
    }

}