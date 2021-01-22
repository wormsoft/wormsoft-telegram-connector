import { ConfigCreator } from '../lib/config/ConfigCreator';

const checkBotConfig = process.env.TELEGRAM_BOT_CONFIG || require('mockconfig.json');
const preparedConfig = (new ConfigCreator).createFromJsonString(checkBotConfig);

export default preparedConfig;
