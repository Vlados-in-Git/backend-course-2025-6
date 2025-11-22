const express = require('express');
const { program } = require('commander');
const fs = require('fs').promises;
const fss = require('fs');
const path = require('path');
const multer = require('multer');

program
  .requiredOption('-h, --host <host>', 'адреса сервера')
  .requiredOption('-p, --port <port>', 'порт сервера')
  .requiredOption('-c, --cache <path>', 'шлях до директорії з кешом');

program.parse(process.argv);
const options = program.opts();
const host = options.host;
const port = options.port;
const cacheDir = path.resolve(options.cache);

if (!fss.existsSync(cacheDir)) {
  console.log(`Директорія кешу не існує. Створюємо: ${cacheDir}`);
  try {
      fss.mkdirSync(cacheDir, { recursive: true });
  } catch (err) {
      console.error(`Помилка створення директорії: ${err.message}`);
      process.exit(1);
  }
} else {
  console.log(`Директорія кешу існує: ${cacheDir}`);
}


let inventory = []; 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, cacheDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/RegisterForm.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'RegisterForm.html'));
});

app.get('/SearchForm.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'SearchForm.html'));
});

app.get('/inventory', (req, res) => {
    res.status(200).json(inventory);
});


app.get('/inventory/:id', (req, res) => {
    const item = inventory.find(i => i.id === req.params.id);
    if (!item) return res.status(404).send('Not Found');
    res.json(item);
});


app.get('/inventory/:id/photo', (req, res) => {
    const item = inventory.find(i => i.id === req.params.id);
    if (!item || !item.photo) return res.status(404).send('Not Found');
    
    const photoPath = path.join(cacheDir, item.photo);
    if (!fss.existsSync(photoPath)) return res.status(404).send('Photo file missing');
    
    res.sendFile(photoPath);
});


app.post('/register', upload.single('photo'), (req, res) => {
    const { inventory_name, description } = req.body;
    if (!inventory_name) return res.status(400).send('Bad Request: inventory_name is required');

    const newItem = {
        id: Date.now().toString(),
        name: inventory_name,
        description: description || '',
        photo: req.file ? req.file.originalname : null
    };

    inventory.push(newItem);
    console.log(`Додано: ${newItem.name} (ID: ${newItem.id})`);
    res.status(201).send(`Item created with ID: ${newItem.id}`);
});


app.post('/search', (req, res) => {
    const { id, has_photo } = req.body;
    const item = inventory.find(i => i.id === id);
    if (!item) return res.status(404).send('Not Found');
    
    const responseItem = { ...item };
    if (has_photo === 'yes' && item.photo) {
        responseItem.description += ` (Посилання на фото: /inventory/${item.id}/photo)`;
    }
    res.status(200).json(responseItem);
});


app.put('/inventory/:id', (req, res) => {
    const item = inventory.find(i => i.id === req.params.id);
    if (!item) return res.status(404).send('Not Found');

    const { name, description } = req.body;
    

    if (name) item.name = name;
    if (description) item.description = description;

    res.json(item);
});


app.put('/inventory/:id/photo', upload.single('photo'), (req, res) => {
    const item = inventory.find(i => i.id === req.params.id);
    if (!item) return res.status(404).send('Not Found');

    if (!req.file) return res.status(400).send('No file uploaded');


    item.photo = req.file.originalname;
    
    res.send('Photo updated');
});


app.delete('/inventory/:id', (req, res) => {
    const index = inventory.findIndex(i => i.id === req.params.id);
    if (index === -1) return res.status(404).send('Not Found');


    inventory.splice(index, 1);
    
    res.send('Item deleted');
});


app.all('/inventory*', (req, res) => {

     res.status(405).send('Method Not Allowed');
});



app.get('/', (req, res) => {
    res.send(`
        <h1>Сервіс Інвентаризації</h1>
        <ul>
            <li><a href="/RegisterForm.html">Зареєструвати річ</a></li>
            <li><a href="/SearchForm.html">Знайти річ за ID</a></li>
            <li><a href="/inventory">Список всіх речей (JSON)</a></li>
        </ul>
    `);
});

app.listen(port, host, () => {
  console.log(`Сервер запущено на http://${host}:${port}`);
});
