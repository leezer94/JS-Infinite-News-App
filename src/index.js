import { App } from './App.js';
import { $ } from './common/utils.js';

//  samesite Cookie issue
document.cookie = 'safeCookie1foo; SameSite=Lax';

document.cookie = 'safeCookie1foo';

document.cookie = 'crossCookie=bar; SameSite=None; Secure';

new App($('#root'));
