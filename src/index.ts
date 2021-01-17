import { WSTelegramConfig } from './lib/config/config';
import { MainTelegramBrain } from './lib/brain';
import { SceneContext } from 'telegraf/typings/scenes';
import { WSTContext } from './lib/global/context';
import { Telegraf } from 'telegraf';
import { WSTelegramConnector } from './lib/connector';

export class WSTelegramHandler {
    public async initBrains(config: WSTelegramConfig): Promise<MainTelegramBrain[]> {
        const bots = config.botConfigs;
        let i = 0;
        const brains: MainTelegramBrain[] = [];
        for (const bot of bots) {
            i++;
            if (bot.token) {
                brains.push(new MainTelegramBrain(bot));
            } else {
                throw new Error('There is no bot token for telegram');
            }
        }
        return Promise
            .all(brains.map(b => b.initConnectors()))
            .then(() => {
                return Promise.all(brains.map(b => b.initHandler()));
            })
            .then(() => {
                return brains;
            });
    }
}
