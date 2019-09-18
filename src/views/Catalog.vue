<template>
    <section class="catalog">
        <Spin v-show="isLoading" />
        <BookHeader title="优质书源" />
        <div class="wrapper" ref="wrapper">
            <div class="container">
                <div class="heade">
                    <span class="span1">目录</span>
                    <span>共{{this.catalogs.length}}章</span>
                    <span class="span2" @click="changeMode">{{msg}}</span>
                </div>
                <div class="catalogs">
                    <ul>
                        <li
                            v-for="(catalog, index) in catalogs"
                            :key="index"
                            @click="goToReading(index)"
                        >{{catalog}}</li>
                    </ul>
                </div>
                <div class="blank"></div>
            </div>
        </div>
    </section>
</template>

<script>
import { setTimeout } from "timers";
import BScroll from "better-scroll";
export default {
    name: "Catalog",
    data: () => ({
        isLoading: true,
        bScroll: null,
        catalogs: [],
        mode: false
    }),
    computed: {
        msg() {
            return this.mode ? "倒序" : "正序";
        }
    },
    methods: {
        async getCatalogs(id) {
            let res = await this.$http(`/mix-atoc/${id}`);
            res = res.data.mixToc.chapters;
            for (let i of res) {
                let { title } = i;
                this.catalogs.push(title);
            }
            this.$nextTick(() => {
                this.initLoading();
            });
        },
        initLoading() {
            setTimeout(() => {
                this.isLoading = false;
            }, 300);
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
        },
        changeMode() {
            this.mode = !this.mode;
            this.catalogs.reverse();
        },
        goToReading(index) {
            let { id, title } = this.$route.query;
            this.$router.push({
                path: "/reading",
                query: {
                    id,
                    title,
                    index,
                    type: "catalog"
                }
            });
        }
    },
    created() {
        let { id } = this.$route.query;
        this.getCatalogs(id);
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
.catalog {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-size: 12px;
    color: #999;
    .wrapper {
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }
}
.container {
    width: 100%;
    padding: 0 20px;
    .heade {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 10px 0;
        .span1 {
            font-size: 14px;
            font-weight: bold;
            color: #222;
        }
        .span2 {
            font-size: 14px;
            color: #222;
        }
    }
    .catalogs {
        width: 100%;
        li {
            width: 100%;
            height: 40px;
            border-top: 1px solid #eee;
            line-height: 40px;
            &:last-child {
                border-bottom: 1px solid #eee;
            }
        }
    }
    .blank {
        height: 40px !important;
    }
}
</style>
