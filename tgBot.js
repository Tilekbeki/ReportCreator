const TelegramBot = require('node-telegram-bot-api');
const createWord = require('./wordCreater'); 
// replace the value below with the Telegram token you receive from @BotFather
const token = '7043958952:AAHHKEZAuKWVRy6b-JwSxTA3KU4Nsvxv_do';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });



// Listen for any kind of message. There are different kinds of messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Получил твое сообщение');
});

// Handle file uploads
// Handle file uploads
bot.on('document', (msg) => {
    const chatId = msg.chat.id;
  
    const fileId = msg.document.file_id;
  
    // Download the file
    bot.downloadFile(fileId, './downloads/').then((filePath) => {
      // Process the downloaded file as needed
      // For example, you can read the content or perform any other actions
  
      // Respond to the user
      bot.sendMessage(chatId, 'File received and saved.');
      const inputFileName = filePath;
          const outputFileName = './downloads/' + 'processed_' + msg.document.file_name;
  
          const resultFileName = createWord(inputFileName, outputFileName);
      bot.sendDocument(chatId, resultFileName, { caption: 'Вот ваш измененный файл!:' })
      // If needed, you can delete the downloaded file
      // fs.unlinkSync(downloadPath);
    }).catch((error) => {
      console.error('Error downloading file:', error);
    });
  });