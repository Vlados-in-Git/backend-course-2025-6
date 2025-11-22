const {program} = require ('commander');
const fs = requre('fs').promises;
const fss = requre('fs');
const path = requre('path');
const http = requre('http');
const superagent = require ('superagent');

program
	.requiredOption('-h, --host <host>', 'адреса сервера')
	.requiredOption('-p, --port <port>', 'порт сервера')
	.requiredOption('-c, --cache <path>', 'шлях до директорії з кешом');

program.parse(process.argv);
const options = program.opts();
const host = options.host;
const port = options.port;
const cacheDir = path.resolve(options.cache);

if(!fss.existsSync(cacheDir)) {

	console.log(`Директорія кешу не існує. Створюємо ${cacheDir}`);
	fss.mkdirSync(cacheDir, { recursive: true});
	}else {
	console.log(`Директорія кешу існує: ${cacheDir}`);
	}



