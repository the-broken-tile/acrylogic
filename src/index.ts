import App from './Component/App'
import Store from './Store'
import LevelManager from './LevelManager';
import GameHistory from './GameHistory';

const app = new App(
    window.document.getElementById('app') as HTMLDivElement,
    new LevelManager(new Store(window.localStorage)),
    new GameHistory(),
)

app.init()
