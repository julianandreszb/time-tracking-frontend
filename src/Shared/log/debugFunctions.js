function logMessage(...messages) {
    this.isDebugEnabled && console.log(messages);
}

export {logMessage}
