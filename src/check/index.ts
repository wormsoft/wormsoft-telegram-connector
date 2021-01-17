import { WSTelegramHandler } from '../';
import { ConfigCreator } from '../lib/config/ConfigCreator';

const checkBotConfig = process.env.TELEGRAM_BOT_CONFIG || '[{"token":"token_1","adminSupportChat":-123,"appName":"App 1"},{"token":"token_2","adminSupportChat":-321,"appName":"App 2"}]';
const preparedConfig = (new ConfigCreator).createFromJsonString(checkBotConfig);
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
    .then(brains =>
        brains.forEach((b) =>
            b.connector.telegraf.launch()
        )
    );
