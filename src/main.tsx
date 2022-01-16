//node_modulesから 'react-dom'をimport
import ReactDOM from 'react-dom';

//React処理を書いているIndex.tsxを読み込んでいる
import { Index } from './Index';

//index.htmlのid='root'の<div>要素内にAppを描画
ReactDOM.render(<Index />, document.getElementById('root'));
