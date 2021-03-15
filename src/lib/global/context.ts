import { Context } from 'telegraf';
import { Scenes } from 'telegraf';

export interface WSTContext extends Context {
    scene: Scenes.SceneContextScene<WSTContext>;
}
