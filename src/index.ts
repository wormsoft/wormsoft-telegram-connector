import { SimpleConfig as BSimpleConfig, WSTelegramConfig } from './lib/config';
import { MainTelegramBrain } from './lib/brain';
import { ConfigCreator as BaseConfigCreator } from './lib/config/ConfigCreator';

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

export class ConfigCreator extends BaseConfigCreator {}
export interface SimpleConfig extends BSimpleConfig {}
