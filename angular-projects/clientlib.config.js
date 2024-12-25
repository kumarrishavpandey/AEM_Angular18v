const path = require('path');
const fs = require('fs-extra');

const BUILD_DIR = path.join(__dirname, 'dist');
const CLIENTLIB_DIR = path.join(
  __dirname,
  '..',
  'ui.apps',
  'src',
  'main',
  'content',
  'jcr_root',
  'apps',
  'myai',
  'clientlibs',
  'clientlib-angular'
);

// Create the clientlib-angular directory
fs.ensureDirSync(CLIENTLIB_DIR);

// Create .content.xml file
const contentXml = `<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="cq:ClientLibraryFolder"
    categories="[myai.angular]"
    allowProxy="{Boolean}true"/>`;

fs.writeFileSync(path.join(CLIENTLIB_DIR, '.content.xml'), contentXml);

// Existing configuration for clientlib
const libsBaseConfig = {
  allowProxy: true,
  serializationFormat: 'xml',
  cssProcessor: ['default:none', 'min:none'],
  jsProcessor: ['default:none', 'min:none']
};

// Config for `aem-clientlib-generator`
module.exports = {
  context: BUILD_DIR,
  clientLibRoot: CLIENTLIB_DIR,
  libs: [
    {
      ...libsBaseConfig,
      name: 'clientlib-angular',
      categories: ['myai.angular']
    }
  ]
};