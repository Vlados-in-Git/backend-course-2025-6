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

// --- БАЗА ДАНИХ ---
const inventory = []; 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, cacheDir);
  },
  filename: function (req, file, cb) {
    // Зберігаємо оригінальне ім'я файлу
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- HTML ФОРМИ ---
app.get('/RegisterForm.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'RegisterForm.html'));
});

app.get('/SearchForm.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'SearchForm.html'));
});

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

// --- БАЗА ДАНИХ (В пам'яті) ---
// Тут ми будемо зберігати всі наші речі
const inventory = []; 

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

// --- МАРШРУТИ ДЛЯ HTML ФОРМ ---

// Віддаємо форму реєстрації
app.get('/RegisterForm.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'RegisterForm.html'));
});

cost express = require('express');
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

app.listen(port, host, () => {
  console.log(`Сервер запущено на http://${host}:${port}`);
});
cost express = require('express');
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

app.listen(port, host, () => {
  console.log(`Сервер запущено на http://${host}:${port}`);
});
cost express = require('express');
const { program } = require('commander');
const fs = require('fs').promises;
const fss = require('fs');
const path = require('path');
const multer = require('multer');

program
  .requiredOption('-h, --host <host>', 'адреса сервера')
  .requiredOption('-p, --port <port>', 'порт сервера')

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


app.get('/inventory', (req, res) => {
    res.status(200).json(inventory);
});

// 2. Реєстрація нового пристрою (POST /register)
// upload.single('photo') обробляє файл з поля "photo" форми
app.post('/register', upload.single('photo'), (req, res) => {
    const { inventory_name, description } = req.body;

    // Валідація: ім'я обов'язкове 
    if (!inventory_name) {
        return res.status(400).send('Bad Request: inventory_name is required');
    }

    // Створення об'єкта нової речі
    const newItem = {
        id: Date.now().toString(), // Генеруємо унікальний ID (часова мітка)
        name: inventory_name,
        description: description || '',
        photo: req.file ? req.file.originalname : null // Зберігаємо назву файлу, якщо він є
    };

    // Додавання в "базу"
    inventory.push(newItem);

    console.log(`Додано нову річ: ${newItem.name} (ID: ${newItem.id})`);
    
   
    res.status(201).send(`Item created with ID: ${newItem.id}`);
});

// Головна сторінка
app.get('/', (req, res) => {
    res.send(`
        <h1>Сервіс Інвентаризації</h1>
        <p><a href="/RegisterForm.html">Зареєструвати річ</a></p>
        <p><a href="/SearchForm.html">Знайти річ</a></p>
        <p><a href="/inventory">Переглянути JSON список (GET /inventory)</a></p>
    `);
});

app.listen(port, host, () => {
  console.log(`Сервер запущено на http://${host}:${port}`);
});
