const NodeHelper = require("node_helper")
const {
    FreeCryptoAPI
} = require("./freecryptoapi.js")

const api = new FreeCryptoAPI("kp1sg3ome55ari30s62z")

module.exports = NodeHelper.create({

    start() {
        console.log("CryptoShowcase node_helper started")
    },

    socketNotificationReceived(notification, payload) {
        console.log("NODE HELPER GOT:", notification, payload)
        if (notification === "CRYPTO_INIT") {
            this.fetchData(payload)
        }
    },

    async fetchData(symbol) {
        try {
            const data = await api.getData(symbol)

            if (!data.symbols) {
                this.sendSocketNotification("CRYPTO_ERROR", "No symbols")
                return
            }

            const formatted = data.symbols.map(s => ({
                symbol: s.symbol,
                last_price: s.last,
                daily_change: s.daily_change_percentage
            }))

            this.sendSocketNotification("CRYPTO_DATA", formatted)

        } catch (err) {
            console.error(err)
            this.sendSocketNotification("CRYPTO_ERROR", err.message)
        }
    }
})