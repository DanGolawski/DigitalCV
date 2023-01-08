const template = document.createElement('template');

template.innerHTML = `
    <link rel="stylesheet" href="left-menu.css">
    <div id="left-menu">
        
    </div>

`

{/* <p class="menu-btn" module="experience">Doświadczenie</p>
        <p class="menu-btn" module="">Technologie</p>
        <p class="menu-btn" module="">Projekty Własne</p>
        <p class="menu-btn" module="">Inne doświadczenia</p>
        <p class="menu-btn" module="">Zainteresowania</p>
        <p class="menu-btn" module="">Studia</p>
        <p class="menu-btn" module="">Social Media</p>
        <p class="menu-btn" module="">Więcej o mnie</p>
        <p class="menu-btn" module="">Dane kontaktowe</p>
        <p class="menu-btn" module="">Zgoda RODO</p> */}

class LeftMenu extends HTMLElement {

    menu = null;
    contentContainer = null;

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.menu = this.shadowRoot.querySelector('#left-menu');
        this.contentContainer = document.querySelector('#content-container');
        this.fillMenu();
    }

    async fillMenu() {
        const json = await this.getJsonObject();
        const items = Object.keys(json);
        items.forEach(itemName => {
            this.menu.innerHTML += `<p class="menu-btn" module="${itemName}">${json[itemName].title}</p>`;
        });
        this.handleBtnsClick();
    }

    async getJsonObject() {
        const filename = this.getFileName();
        const jsonObj = await fetch(filename);
        const content = await jsonObj.json();
        return content;
    }

    getFileName() {
        let params = (new URL(document.location)).searchParams;
        let technologyField = params.get('tech') ?? 'frontend';
        return `./content/${technologyField}.json`;
    }

    handleBtnsClick() {
        this.menu.querySelectorAll('.menu-btn').forEach(btn => {
            btn.addEventListener('click', () => this.handleSingleClick(btn))
        })
    }

    async handleSingleClick(btn) {
        const moduleName = btn.getAttribute('module');
        this.setModuleItems(moduleName);
    }

    async setModuleItems(contextName) {
        const jsonObj = await this.getJsonObject();
        const modules = jsonObj[contextName].modules;
        this.hideContentContainer();
        setTimeout(() => {
            this.createContent(modules);
            this.showContentContainer();
        }, 1500);
    }

    createContent(modules) {
        modules.forEach(module => {
            const newElement = document.createElement('content-item');
            newElement.setTemplate(module);
            this.contentContainer.appendChild(newElement);
        });
    }

    showContentContainer() {
        this.contentContainer.style.opacity = 1;
        this.contentContainer.style.transform = 'translateY(0)';
    }

    hideContentContainer() {
        this.contentContainer.style.opacity = 0;
        this.contentContainer.style.transform = 'translateY(20%)';
        setTimeout(() => this.contentContainer.innerHTML = '', 1000);
    }

}

window.customElements.define('left-menu', LeftMenu);