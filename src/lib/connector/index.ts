import { Telegraf } from 'telegraf';
import { WSTContext } from '../global/context';
import * as TT from 'telegram-typings';

export class WSTelegramConnector {
    get me(): TT.User | undefined {
        return this._me;
    }

    get username(): string {
        return this._username || '';
    }

    get telegraf(): Telegraf<WSTContext> {
        return this._telegraf;
    }

    private _telegraf: Telegraf<WSTContext>;

    private _username?: string;

    private _me?: TT.User;

    constructor(
        telegraf: Telegraf<any>
    ) {
        this._telegraf = telegraf;
    }

    public async loadInfo(): Promise<TT.User> {
        this._me = await this.getMe();
        this._username = await this.getUsername();
        return this._me;
    }

    private async getMe(): Promise<TT.User> {
        if (!this._me) {
            this._me = await this.telegraf.telegram.getMe();
        }

        return this._me;
    }

    private async getUsername(): Promise<string> {
        if (!this._username) {
            const info = await this.getMe();
            this._username = info.username;
        }
        return this.username;
    }
}
