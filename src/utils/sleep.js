module.exports = (miliseconds) =>
    new Promise((resolve) => {
        setTimeout(() => resolve(), miliseconds);
    });
