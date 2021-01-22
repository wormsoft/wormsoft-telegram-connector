import { Context } from 'telegraf';
import { SceneContext, SceneSession, SceneSessionData } from 'telegraf/typings/scenes';
import SceneContextScene from 'telegraf/typings/scenes/context';

export class WSTContext extends Context implements SceneContext {
    public appHandler: any;
    // @ts-ignore
    scene: SceneContextScene<this>;
    // @ts-ignore
    session: any;
}
