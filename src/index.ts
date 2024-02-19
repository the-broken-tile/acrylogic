import App from './Component/App'
import Store from './Store'
import Renderer from './Component/Renderer';
import LevelManager from './LevelManager';
import GameHistory from './GameHistory';

const app = new App(
    window.document.getElementById('app') as HTMLDivElement,
    new LevelManager(new Store(window.localStorage)),
    new Renderer(),
    new GameHistory(),
)

app.init()
