import { WSTelegramHandler } from '../';
import { ConfigCreator } from '../lib/config/ConfigCreator';
import preparedConfig from './initConfig';

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
