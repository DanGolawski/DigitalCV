class ContentItem extends HTMLElement {

    data = null;

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        
    }

    async getContent(moduleName, moduleElement) {
        const jsonObj = await fetch('./content.json');
        const content = await jsonObj.json();
        return content[moduleName][moduleElement];
    }

    setTemplate(moduleJson) {
        const templateContentItem = document.createElement('template');
        templateContentItem.innerHTML = `
        <link rel="stylesheet" href="content-item.css">
        <div id="container">
            <div id="image-part">
                <div id="item-img" style="background-image: url('${moduleJson.image}');"></div>
            </div>
            <div id="text-part">
                <h3 id="item-title">${moduleJson.title}</h3>
                ${this.createTextElement(moduleJson.time, 'item-time', true)}
                ${this.createTextElement(moduleJson.description, 'item-text', false)}
                ${this.createLink(moduleJson.link)}
            </div>
        </div>
        <div class="divider"></div>
        `
        this.shadowRoot.appendChild(templateContentItem.content.cloneNode(true));
    }

    createTextElement(text, elemId, paragraph) {
        if (paragraph) {
            return text?.length ? `<p id="${elemId}">${text}</p>` : '';
        } else {
            return text?.length ? `<span id="${elemId}">${text}</span>` : '';
        }
    }

    createLink(link) {
        if (link.length) {
            return `<a href="${link}">LINK</a>`;
        } else {
            return '';
        }
    }


}

window.customElements.define('content-item', ContentItem);



