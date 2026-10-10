const Mineflayer = require('mineflayer');
const http = require('http');

// Render-ийг унтуулахгүй байх хуурамч вэб сервер
http.createServer((req, res) => {
  res.write("Бот амжилттай ажиллаж байна!");
  res.end();
}).listen(process.env.PORT || 3000);

// Ботын үндсэн тохиргоо
const bot = Mineflayer.createBot({
  host: 'flaxsmp.mcsh.io',
  port: 25565,
  username: 'FlaxBot247', // Шинэ, хэзээ ч орж байгаагүй цоо шинэ нэр
  version: '1.21.1',
  auth: 'offline'
});

bot.on('spawn', () => {
  console.log('Бот сервер рүү амжилттай орлоо!');
  
  // FlexLoginUI-д зориулж оронгуут нь шууд бүртгүүлэх команд (1.5 секундын дараа)
  setTimeout(() => {
    bot.chat('/register FlaxPass247 FlaxPass247');
  }, 1500);

  // Хэрэв өмнө нь бүртгүүлсэн бол шууд нэвтрэх команд (2.5 секундын дараа)
  setTimeout(() => {
    bot.chat('/login FlaxPass247');
  }, 2550);

  // Хөдөлгөөн хийж Anticheat болон унтахаас сэргийлэх (5 секунд тутамд)
  setInterval(() => {
    if (!bot || !bot.entity) return;
    const directions = ['forward', 'back', 'left', 'right'];
    const randomDir = directions[Math.floor(Math.random() * directions.length)];
    bot.setControlState(randomDir, true);
    setTimeout(() => { bot.clearControlStates(); }, 300);
    
    const yaw = (Math.random() - 0.5) * 2;
    const pitch = (Math.random() - 0.5) * 2;
    bot.look(yaw, pitch);
  }, 5000);
});

bot.on('message', (jsonMsg) => {
  console.log(`[Чат]: ${jsonMsg.toString()}`);
});

bot.on('end', (reason) => {
  console.log(`Бот холболт тасарлаа (${reason}). 15 секундын дараа дахин оролдоно...`);
  setTimeout(() => { process.exit(1); }, 15000);
});

bot.on('error', (err) => console.log('Алдаа гарлаа:', err));
