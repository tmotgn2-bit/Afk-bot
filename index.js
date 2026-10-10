const Mineflayer = require('mineflayer');
const http = require('http');

// Render-ийг унтуулахгүй байх хуурамч вэб сервер
http.createServer((req, res) => {
  res.write("Бот амжилттай ажиллаж байна!");
  res.end();
}).listen(process.env.PORT || 3000);

// Ботын үндсэн тохиргоо
const bot = Mineflayer.createBot({
  host: 'flaxsmp.mcsh.io', // Таны серверийн IP
  port: 25565,             // Порт
  username: 'Flax_AFK_Bot', // Бот серверт орох нэр
  version: '1.21.1',
  auth: 'offline'
});

bot.on('spawn', () => {
  console.log('Бот сервер рүү амжилттай орлоо!');
  
  // Sonar Anti-Bot-ыг хуурахын тулд 4 секунд тутамд бага зэрэг хөдөлгөөн хийнэ
  setInterval(() => {
    if (!bot || !bot.entity) return;
    
    // Санамсаргүй байдлаар урагшаа эсвэл хойшоо нэг алхах
    const directions = ['forward', 'back', 'left', 'right'];
    const randomDir = directions[Math.floor(Math.random() * directions.length)];
    
    bot.setControlState(randomDir, true);
    setTimeout(() => {
      bot.clearControlStates();
    }, 300); // 0.3 секунд алхаад зогсоно
    
    // Толгойгоо бага зэрэг эргүүлж жинхэнэ хүн шиг харагдуулах
    const yaw = (Math.random() - 0.5) * 2;
    const pitch = (Math.random() - 0.5) * 2;
    bot.look(yaw, pitch);
    
  }, 4000); // 4 секунд тутамд давтагдана
});

// Хэрэв Sonar чат дээр ямар нэгэн тушаал бичихийг шаардвал автоматаар чат бичих үйлдэл
bot.on('message', (jsonMsg) => {
  const message = jsonMsg.toString();
  console.log(`[Чат]: ${message}`);
  
  // Хэрэв серверт нэвтрэхэд нууц үг (AuthMe) нэмэлтээр шаарддаг бол доорх хэсгийг ашиглана:
  // Жишээ нь: чат дээр /register гэж гарч ирвэл
  if (message.includes('/register')) {
    bot.chat('/register MyPassword123 MyPassword123');
  }
  if (message.includes('/login')) {
    bot.chat('/login MyPassword123');
  }
});

bot.on('end', (reason) => {
  console.log(`Бот серверээс гарлаа (${reason}). 15 секундын дараа дахин холбогдоно...`);
  setTimeout(() => {
    process.exit(1); // Render ботыг дахин автоматаар ажиллуулна
  }, 15000);
});

bot.on('error', (err) => console.log('Алдаа гарлаа:', err));
