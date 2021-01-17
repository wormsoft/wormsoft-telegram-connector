import { SimpleConfig } from './config';

export class ConfigCreator {
    public createFromJsonString(str: string): SimpleConfig[] {
        const object = JSON.parse(str);
        return this.createFromObject(object);
    }

    public createFromObject(object: any): SimpleConfig[] {
        return object;
    }
}
