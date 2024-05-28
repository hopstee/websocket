const fs = require("fs");

class FileHelper {
    readFile(fileName) {
        try {
            return JSON.parse(fs.readFileSync(fileName));
        } catch (error) { }
        
        return [];
    }

    writeFile(fileName, data) {
        try {
            fs.writeFileSync(fileName, JSON.stringify(data), { flag: 'w+' });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

const fileHelper = new FileHelper();
module.exports = fileHelper;