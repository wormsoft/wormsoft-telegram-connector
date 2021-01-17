import * as TT from 'telegram-typings';
import { MainTelegramBrain } from '../brain';

export interface SimpleConfig {
    adminSupportChat: number;
    token: string;
    appName: string;
    botInfo: TT.User;
    brainInit: (brain: MainTelegramBrain) => void;
    appConfig: any
}

export interface WSTelegramConfig {
    botConfigs: SimpleConfig[];
}
