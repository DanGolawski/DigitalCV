window.onload = () => {
    const mainController = new MainController();
    mainController.handleButtonClick();
}

class MainController {
    
    mask = null;
    nameHeader = null;
    photo = null;
    startButton = null;

    constructor() {
        this.mask = document.querySelector('#mask');
        this.nameHeader = document.querySelector('#name');
        this.photo = document.querySelector('#profile-photo');
        this.startButton = document.querySelector('#start-button');
    }

    handleButtonClick() {
        document.querySelector('#start-button').addEventListener('click', () => this.start());
    }

    start() {
        this.mask.style.width = '30%';
        this.changeHeaderStyle();
        this.changePhotoStyle();
        this.startButton.style.visibility = 'hidden';
        document.querySelector('#left-menu-container').style.opacity = 1;
        document.querySelector('#left-menu-container').style.transform = 'translate(0)';
    }

    changeHeaderStyle() {
        this.nameHeader.style.marginTop = '20px';
        this.nameHeader.style.width = '70%';
        this.nameHeader.style.marginLeft = '30%';
        this.nameHeader.style.fontSize = '250%';
    }

    changePhotoStyle() {
        this.photo.style.width = '20%';
        this.photo.style.height = 0;
        this.photo.style.paddingBottom = '20%';
        this.photo.style.marginLeft = '5%';
        this.photo.style.marginTop = '5%';
        this.photo.style.transform = 'translateX(0)';
    }
}