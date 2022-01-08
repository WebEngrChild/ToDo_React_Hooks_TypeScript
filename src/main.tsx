//node_modulesから 'react-dom'をimport
import ReactDOM from 'react-dom';

//React処理を書いているApp.tsxを読み込んでいる
import { App } from './Index';

//index.htmlのid='root'の<div>要素内にAppを描画
ReactDOM.render(<App />, document.getElementById('root'));
