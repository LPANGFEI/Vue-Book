<template>
    <section class="classification">
        <Spin v-show="isLoading" />
        <BookHeader title="分类" />
        <div class="wrapper" ref="wrapper">
            <div class="container">
                <Sorts />
                <div class="blank"></div>
            </div>
        </div>
    </section>
</template>

<script>
import BScroll from "better-scroll";
import Sorts from "../components/Sorts";
export default {
    name: "Classification",
    data: () => ({
        isLoading: true,
        bScroll: null,
        classifications: {}
    }),
    components: {
        Sorts
    },
    methods: {
        initLoading() {
            setTimeout(() => {
                this.isLoading = false;
            }, 1000);
        },
        initBScroll() {
            if (this.bScroll) {
                this.bScroll.refresh();
            } else {
                this.bScroll = new BScroll(this.$refs.wrapper, {
                    probeType: 3,
                    click: true
                });
            }
        }
    },
    created() {},
    mounted() {
        this.initLoading();
        this.initBScroll();
    },
    beforeDestroy() {
        this.bScroll.destroy();
        this.bScroll = null;
    }
};
</script>

<style lang="scss" scoped>
.classification {
    width: 100vw;
    .wrapper {
        width: 100%;
        height: 100vh;
        overflow: hidden;
        .container {
            width: 100%;
            padding: 0 10px;
        }
    }
    .blank {
        height: 40px !important;
    }
}
</style>
