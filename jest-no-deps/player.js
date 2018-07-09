/** @format */

module.exports = {
    getHuman: () => {
        return {
            superhuman: this.superhuman,
            isLost: this.isLost,
            name: this.name
        };
    },

    setSuperHuman: isSuperHuman => {
        this.superhuman = isSuperHuman;
    },

    setLost: isLost => {
        this.isLost = isLost;
    },

    setName: name => {
        this.name = name;
    }
};
