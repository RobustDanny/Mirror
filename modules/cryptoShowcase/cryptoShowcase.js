Module.register("cryptoShowcase", {

    getStyles() {
        return ["cryptoShowcase.css"]
    },

    start() {
        this.symbols_data = []
        this.loaded = false

        this.sendSocketNotification("CRYPTO_INIT", "BTC + XRP + RED + SIGN + ONDO + ATOM")

        setInterval(() => {
            this.sendSocketNotification("CRYPTO_INIT", "BTC + XRP + RED + SIGN + ONDO + ATOM")
        }, 30000)
    },

    socketNotificationReceived(notification, payload) {
        if (notification === "CRYPTO_DATA") {
            this.symbols_data = payload
            this.loaded = true
            this.updateDom()
        }

        if (notification === "CRYPTO_ERROR") {
            console.error("Crypto error:", payload)
        }
    },

    getDom() {
        const wrapper = document.createElement("div")
        wrapper.className = "cards_mesh"

        if (!this.loaded) {
            wrapper.innerHTML = "Loading crypto data..."
            return wrapper
        }

        if (!this.symbols_data.length) {
            wrapper.innerHTML = "No data received"
            return wrapper
        }

        for (const item of this.symbols_data) {
            const row = document.createElement("div")
            row.className = "card_container"

            row.innerHTML = `
        <div class="stats shadow">
          <div class="stat">
            <div class="stat-title">${item.symbol}</div>
            <div class="stat-value">${item.last_price}</div>
            <div class="stat-desc ${item.daily_change < 0 ? 'text-red-500' : 'text-green-500'}">
              ${item.daily_change}
            </div>
          </div>
        </div>
      `

            wrapper.appendChild(row)
        }

        return wrapper
    }
})