import * as fs from 'fs';

export function save(folder: string, filename: string, value: string) {
    if(!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }

    fs.writeFileSync(`${folder}/${filename}`, value);
}


export function openLastCreatedFromFolder(path: string): {
    file: string, 
    content: string 
} {
    const files = fs.readdirSync(path).sort(function(a, b) {
        return fs.statSync(path +'/'+ a).mtime.getTime() - 
               fs.statSync(path +'/'+ b).mtime.getTime();
    });

    const last = files[files.length - 1];

    return {
        file: last, 
        content: fs.readFileSync(`${path}/${last}`).toString() 
    };
}

