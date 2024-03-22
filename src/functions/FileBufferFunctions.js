class FileBufferFunctions {
    static generateAndAutomaticDownloadFileText ({ data, fileName }) {
        let blob = new Blob([data], {type: 'text/plain'});
        const linkDynamic = document.createElement('a');
        linkDynamic.download = fileName + '.txt';
        linkDynamic.href = URL.createObjectURL(blob);
        linkDynamic.target = '_blank';

        linkDynamic.click();

        URL.revokeObjectURL(linkDynamic.href)

    }
}

export default FileBufferFunctions