class Lampa {
    constructor(id, allapot, szuloElem) {
        this.id = id;
        this.allapot = allapot;
        this.divElem = document.createElement('div');
        this.divElem.classList.add('lampa');
        this.divElem.addEventListener('click', () => this.kattintasTrigger());
        szuloElem.appendChild(this.divElem);
        this.szinBeallit();
    }

    setAllapot() {
        this.allapot = !this.allapot;
        this.szinBeallit();
    }

    szinBeallit() {
        if (this.allapot) {
            this.divElem.style.backgroundColor = 'yellow'; // 'sárga' in Hungarian
        } else {
            this.divElem.style.backgroundColor = 'green'; // 'zöld' in Hungarian
        }
    }

    kattintasTrigger() {
        const event = new CustomEvent('kapcsolas', { detail: { id: this.id } });
        window.dispatchEvent(event);
    }
}

class JatekTer {
    constructor(meret) {
        this.meret = meret;
        this.lepes = 0;
        this.db = 0;
        this.allapotLista = [];
        this.lampak = [];
        this.init();
    }

    setAllapotLista() {
        this.allapotLista = Array(this.meret * this.meret).fill(false).map(() => Math.random() < 0.2);
        this.db = this.allapotLista.filter(allapot => allapot).length;
    }

    szomszedokKeresese(id) {
        const meret = this.meret;
        const x = id % meret;
        const y = Math.floor(id / meret);
        const szomszedok = [];

        if (x > 0) szomszedok.push(id - 1);        // left
        if (x < meret - 1) szomszedok.push(id + 1); // right
        if (y > 0) szomszedok.push(id - meret);    // up
        if (y < meret - 1) szomszedok.push(id + meret); // down

        return szomszedok;
    }

    init() {
        const jatekTerElem = document.querySelector('#jatekter');
        jatekTerElem.innerHTML = '';
        this.setAllapotLista();
        for (let i = 0; i < this.meret * this.meret; i++) {
            const lampa = new Lampa(i, this.allapotLista[i], jatekTerElem);
            this.lampak.push(lampa);
        }
        window.addEventListener('kapcsolas', (e) => {
            this.lepes++;
            const id = e.detail.id;
            this.lampak[id].setAllapot();
            this.allapotLista[id] = this.lampak[id].allapot;
            const szomszedok = this.szomszedokKeresese(id);
            szomszedok.forEach(szomszedId => {
                this.lampak[szomszedId].setAllapot();
                this.allapotLista[szomszedId] = this.lampak[szomszedId].allapot;
            });
            this.db = this.allapotLista.filter(allapot => allapot).length;
            this.ellenorzes();
        });
    }

    ellenorzes() {
        if (this.db === 0) {
            alert(`Gratulálunk! ${this.lepes} lépésben sikerült lekapcsolni az összes lámpát.`);
        }
    }
}

export default JatekTer;