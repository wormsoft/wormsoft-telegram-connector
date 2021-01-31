import { ConfigCreator } from '../lib/config/ConfigCreator';

const checkBotConfig = '[{"token":"token_1","adminSupportChat":-123,"appName":"App 1"},{"token":"token_2","adminSupportChat":-321,"appName":"App 2"}]';


test("Creating Config", () => {
    const creator = new ConfigCreator();
    const config = creator.createFromJsonString(checkBotConfig);
    expect(config.length).toEqual(2);
})
