import { WSTelegramHandler } from '../';
import { ConfigCreator } from '../lib/config/ConfigCreator';
import preparedConfig from './initConfig';
import { WSTContext } from '../lib/global/context';
import { Markup, Telegraf } from 'telegraf';

preparedConfig.map(config => {
    config.brainInit = (brain) => {
        brain.connector.telegraf.on('message', (ctx) => {
            ctx.reply("reply");
        });
    };
});
const handler = new WSTelegramHandler();
handler.initBrains({
    botConfigs: preparedConfig
})
    .then(async ([brain]) => {
            let telegraf = brain.connector.telegraf;
            console.log(telegraf);
            await telegraf.telegram.sendMessage(51817529, 'test',
                {
                    reply_markup: {
                        inline_keyboard: [
                            [{text: "delfi", callback_data: "DL"}, {text: "еще текст", callback_data: "KK"}],
                            [{text: "кнопка 3", callback_data: "LL"}]
                        ]
                    }
                });
            telegraf.action('LL', (ctx) => {
                ctx.reply('кнопка 3 была нажата');
            })
            brain.connector.telegraf.launch();
        }
    );
