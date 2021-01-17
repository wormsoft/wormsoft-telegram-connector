import { WSTelegramConnector } from '../connector';
import { SimpleConfig } from '../config/config';
import { Telegraf } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { WSTContext } from '../global/context';

export class MainTelegramBrain {
    get connector(): WSTelegramConnector {
        return this._connector;
    }

    private _connector: WSTelegramConnector;

    constructor(
        private config: SimpleConfig
    ) {
        const telegraf = new Telegraf<SceneContext<WSTContext>>(this.config.token);
        this._connector = new WSTelegramConnector(telegraf);
    }

    public async initConnectors(): Promise<void> {
        return this._connector.loadInfo()
            .then((user) => {
                if (user) {
                    if (!this.config.appName && user.username) {
                        this.config.appName = user.username;
                    }
                    if (!this.config.botInfo && user) {
                        this.config.botInfo = user;
                    }
                }
            });
    }

    public async initHandler(): Promise<void> {
        if (this.config.brainInit) {
            await this.config.brainInit(this);
        }
    }
}
