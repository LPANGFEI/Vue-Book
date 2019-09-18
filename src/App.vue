<template>
    <div id="app">
        <router-view :key="$route.fullPath" />
        <div class="vc-tigger" @click="toggleVc"></div>
    </div>
</template>

<script>
export default {
    name: "APP",
    data: () => ({
        lastClickTime: 0,
        count: 0
    }),
    methods: {
        hasClass(obj, cls) {
            return obj.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
        },
        addClass(obj, cls) {
            if (!this.hasClass(obj, cls)) obj.className += " " + cls;
        },
        toggleClass(obj, cls) {
            if (this.hasClass(obj, cls)) {
                this.removeClass(obj, cls);
            } else {
                this.addClass(obj, cls);
            }
        },
        removeClass(obj, cls) {
            if (this.hasClass(obj, cls)) {
                var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
                obj.className = obj.className.replace(reg, " ");
            }
        },
        toggleVc() {
            const nowTime = new Date().getTime();
            if (nowTime - this.lastClickTime < 3000) {
                this.count++;
            } else {
                this.count = 0;
            }
            this.lastClickTime = nowTime;
            if (this.count >= 10) {
                let vconDom = document.getElementById("__vconsole");
                this.toggleClass(vconDom, "show");
                this.count = 0;
            }
        }
    }
};
</script>

<style lang="scss">
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    max-width: 500px;
    height: 100vh;
    margin: 0 auto;
}
#__vconsole {
    display: none;
}
</style>
