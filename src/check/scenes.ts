import preparedConfig from './initConfig';
import { Scenes, session } from 'telegraf';
import { WSTelegramHandler } from '../index';
import { WSTContext } from '../lib/global/context';

preparedConfig.map(config => {
    config.brainInit = (brain) => {
        let bot = brain.connector.telegraf;

        let baseScene = new Scenes.BaseScene<WSTContext>('support');
        baseScene.enter((ctx) => {
            ctx.reply('lolkek');
        });
        const stage = new Scenes.Stage([baseScene]);
        bot.use(session());
        bot.use(stage.middleware());

        bot.command('support', (ctx) => {
            ctx.scene.enter('support');
            // return ctx.scene.enter('support');
        });
        // bot.on('message', (ctx) => {
        //     ctx.reply("reply");
        // });
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
