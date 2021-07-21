class Dialog {
    constructor(data) {
        this.title = data.title;
        this.text = data.text;
        this.isOpen = data.isOpen;
    }

    setTitle(title) {
        this.title = title
    }

    setText(text) {
        this.text = text
    }

    open() {
        this.isOpen = true;
    }

    close() {
        this.isOpen = false;
    }
}

export default Dialog
