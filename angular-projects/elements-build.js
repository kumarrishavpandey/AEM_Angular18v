const fs = require('fs');
const path = require('path');

// Define source and destination directories
const sourceDir = path.join(__dirname, 'dist', 'angular-projects');
const destDir = path.join(__dirname, '..', 'ui.apps', 'src', 'main', 'content', 'jcr_root', 'apps', 'myai', 'clientlibs', 'clientlib-angular');

// Function to copy files from source to destination
function copyFiles(source, destination) {
    // Check if the source directory exists
    if (!fs.existsSync(source)) {
        console.error(`Source directory does not exist: ${source}`);
        return;
    }

    // Create the destination directory if it doesn't exist
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }

    // Read the contents of the source directory
    fs.readdir(source, (err, files) => {
        if (err) {
            console.error(`Error reading source directory: ${err}`);
            return;
        }

        // Copy each file to the destination directory
        files.forEach(file => {
            const srcFile = path.join(source, file);
            const destFile = path.join(destination, file);

            // Check if the current item is a directory or a file
            fs.stat(srcFile, (err, stats) => {
                if (err) {
                    console.error(`Error stating file: ${err}`);
                    return;
                }

                if (stats.isDirectory()) {
                    // Recursively copy the directory
                    copyFiles(srcFile, destFile);
                } else {
                    // Copy the file
                    fs.copyFile(srcFile, destFile, (err) => {
                        if (err) {
                            console.error(`Error copying file: ${err}`);
                        } else {
                            console.log(`Copied ${srcFile} to ${destFile}`);
                        }
                    });
                }
            });
        });
    });
}

// Execute the copy function
copyFiles(sourceDir, destDir);