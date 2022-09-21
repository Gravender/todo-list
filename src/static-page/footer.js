function loadFooter(){
    const body = document.querySelector('body');

    const footer = document.createElement('footer');
    const para = document.createElement('p');
    const link = document.createElement('a');

    para.textContent  = "Made by: ";

    link.setAttribute('href', "https://github.com/Gravender");
    link.textContent = 'Gravender';

    footer.appendChild(para);
    footer.appendChild(link);
    return footer;
}

export default loadFooter;