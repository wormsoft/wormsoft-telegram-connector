import preparedConfig from './initConfig';
import { Scenes } from 'telegraf';
import { WSTContext } from '../lib/global/context';
import { WSTelegramHandler } from '../index';

preparedConfig.map(config => {
    config.brainInit = (brain) => {
        let bot = brain.connector.telegraf;
        bot.on('message', (ctx) => {
            ctx.reply("reply");
        });
        let baseScene = new Scenes.BaseScene<any>('support');
        baseScene.enter((ctx) => {
            ctx.reply('lolkek');
        });
        const stage = new Scenes.Stage([
            baseScene
        ]);
        bot.use(stage.middleware());
        bot.command('support', (ctx) => {
            return ctx.scene.enter('support');
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
