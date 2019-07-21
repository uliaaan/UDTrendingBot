const Telegraf = require('telegraf');
const SocksAgent = require('socks5-https-client/lib/Agent');
const udTrendings = require('./ud');

const socksAgent = new SocksAgent({
  socksHost: process.env.SOCKS_HOST,
  socksPort: process.env.SOCKS_PORT,
  socksUsername: process.env.SOCKS_USERNAME,
  socksPassword: process.env.SOCKS_PASSWORD
});

const fs = require('fs');
const path = require('path');
const fsConfig = { flags: 'a' };

const writeStreamStart = fs.createWriteStream(`./telegramStart.txt`, fsConfig);

const bot = new Telegraf(
  process.env.NODE_ENV === 'production'
    ? process.env.BOT_TOKEN
    : process.env.BOT_TOKEN,
  {
    telegram: { agent: socksAgent }
  }
);

const optionalParams = {
  parse_mode: 'HTML'
};

bot.start(ctx => {
  writeStreamStart.write(
    `${new Date().toLocaleString('ru')} - /start - ${JSON.stringify(
      ctx.chat
    )}\n`
  );
});

bot.command('test', async ctx => {
  const answer = `${Telegraf.textLink('qwe', () => console.log(1))}`;
  ctx.reply(answer, {
    parse_mode: 'Markdown'
  });
});

bot.command('trending', async ctx => {
  const list = await udTrendings();
  list.forEach(item => {
    const answer = `<b>${item.word}</b>

<b>ℹ️ Definition</b> 
${item.definition}

<b>📌 Example</b>
${item.example}
`;
    ctx.reply(answer, optionalParams);
  });
});

bot.launch();
