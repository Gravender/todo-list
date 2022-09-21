import _ from 'lodash';
import './css/style.css';
import renderStaticPages from './static-page/staticPages';

function component() {
    const element = document.createElement('content');

    element.setAttribute("id", `content`);
    return element;
}
document.body.appendChild(component());

const content = document.querySelector('#content');
renderStaticPages(content);
