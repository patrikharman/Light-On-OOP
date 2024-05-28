import JatekTer from './Jatekter.js';

class InfoPanel {
    constructor() {
        this.divElem = document.createElement('div');
        this.divElem.classList.add('info-panel');
        document.body.appendChild(this.divElem);
    }

    updateInfo(lepes) {
        this.divElem.innerHTML = `Lépések száma: ${lepes}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const meret = 3;  // 3x3 grid
    const jatekTer = new JatekTer(meret);
    const infoPanel = new InfoPanel();

    window.addEventListener('kapcsolas', () => {
        infoPanel.updateInfo(jatekTer.lepes);
    });
});