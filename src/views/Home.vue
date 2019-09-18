<template>
    <section class="home">
        <!-- loading -->
        <Spin v-show="isLoading" />
        <BookHeader :back="false" />
        <div class="wrapper" ref="wrapper">
            <div class="container">
                <!-- 顶部 -->
                <Message />

                <!-- 搜索 -->
                <Search />
                <Message />

                <!-- 走马灯 -->
                <Carousel />
                <!-- 导航 -->
                <BookNav />
                <!-- 留白 -->
                <Message />
                <!-- 追书最热 -->
                <Recommend v-if="isShow" :title="rankings[2].title" :id="rankings[2]._id" />
                <!-- 留白 -->
                <Message />
                <!-- 追书完结榜 -->
                <Recommend v-if="isShow" :title="rankings[1].title" :id="rankings[1]._id" />
                <!-- 留白 -->
                <Message />
                <!-- 读者留存率 -->
                <Recommend v-if="isShow" :title="rankings[3].title" :id="rankings[3]._id" />
                <!-- 留白 -->
                <Message />
                <!-- 底部 -->
                <BookFooter />
                <div class="blank"></div>
            </div>
        </div>
    </section>
</template>

<script>
import Search from "../components/Search";
import Carousel from "../components/Carousel";
import BookNav from "../components/BookNav";
import Recommend from "../components/Recommend";
import BookFooter from "../components/BookFooter";
import { setTimeout } from "timers";
import BScroll from "better-scroll";
export default {
    name: "Home",
    data: () => ({
        isLoading: true,
        bScroll: null,
        rankings: [],
        isShow: false
    }),
    components: {
        Search,
        Carousel,
        BookNav,
        Recommend,
        BookFooter
    },
    methods: {
        initLoading() {
            setTimeout(() => {
                this.isLoading = false;
            }, 1000);
        },
        // 排行榜
        async getRanking() {
            let res = await this.$http("/ranking/gender");
            res = res.data;
            this.rankings = res.female;
            this.$nextTick(() => {
                this.isShow = true;
                this.initLoading();
            });
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
    created() {
        this.getRanking();
    },
    mounted() {
        this.initBScroll();
    },
    beforeDestroy() {
        this.bScroll.destroy();
        this.bScroll = null;
    }
};
</script>


<style lang="scss" scoped>
.home {
    width: 100%;
    height: 100vh;
    background-color: #fff;
    .wrapper {
        width: 100%;
        overflow: hidden;
        height: 100vh;
    }
    .blank {
        height: 40px !important;
    }
}
</style>
