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
  username: 'Flax_AFK_Bot', 
  version: '1.21.1',
  auth: 'offline'
});

bot.on('spawn', () => {
  console.log('Бот сервер рүү амжилттай орлоо!');
  
  // Хэрэв бот серверт анх удаа орж байгаа бол шууд бүртгүүлнэ (Уг команд 2 секундын дараа ажиллана)
  setTimeout(() => {
    bot.chat('/register FlaxBot1234 FlaxBot1234');
  }, 2000);

  // Хэрэв өмнө нь бүртгүүлчихсэн бол шууд нэвтэрнэ (Уг команд 3 секундын дараа ажиллана)
  setTimeout(() => {
    bot.chat('/login FlaxBot1234');
  }, 3000);

  // 1.21.1 хувилбарын хөдөлгөөн хуурах систем (5 секунд тутамд)
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

// Хэрэв AuthMe чат дээр заавар харуулбал түүнийг хянах
bot.on('message', (jsonMsg) => {
  const message = jsonMsg.toString();
  console.log(`[Чат]: ${message}`);
});

bot.on('end', (reason) => {
  console.log(`Бот холболт тасарлаа (${reason}). 15 секундын дараа дахин оролдоно...`);
  setTimeout(() => {
    process.exit(1); // Render ботыг дахин автоматаар ажиллуулна
  }, 15000);
});

bot.on('error', (err) => console.log('Алдаа гарлаа:', err));
