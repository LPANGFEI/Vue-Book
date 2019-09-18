<template>
    <!-- 排行榜书单内容 -->
    <section class="more-book">
        <Spin v-show="isLoading" />
        <BookHeader :title="title" />
        <div class="wrapper" ref="wrapper">
            <div class="container">
                <BookDetails
                    v-for="data in datas"
                    :key="data._id"
                    @jump="goToDetail"
                    :datas="data"
                />
                <div class="not">没有更多“{{title}}”书籍</div>
                <div class="blank"></div>
            </div>
        </div>
    </section>
</template>

<script>
import BScroll from "better-scroll";
import { setTimeout } from "timers";
import BookDetails from "../components/BookDetails";
export default {
    name: "BookMroe",
    data: () => ({
        isLoading: true,
        bScroll: null,
        title: "",
        rankings: [],
        fuzzySearchs: [],
        books: []
    }),
    components: {
        BookDetails
    },
    computed: {
        datas() {
            let type = this.$route.query.type;
            if (type === "more") {
                return this.rankings;
            } else if (type === "sort") {
                return this.books;
            } else {
                return this.fuzzySearchs;
            }
        }
    },
    methods: {
        // 查看更多
        async getRanking(id) {
            let res = await this.$http(`/ranking/${id}`);
            res = res.data;
            this.rankings = res.ranking.books;
            this.$nextTick(() => {
                this.initLoading();
            });
        },
        // 模糊搜索
        async getFuzzySearch(title) {
            let res = await this.$http(`/book/fuzzy-search?query=${title}`);
            res = res.data;
            this.fuzzySearchs = res.books;
            this.$nextTick(() => {
                this.initLoading();
            });
        },
        // 分类
        async getClassification(name) {
            let res = await this.$http(`/book/by-categories?major=${name}`);
            res = res.data;
            this.books = res.books;
            console.log(this.books.length);
            this.$nextTick(() => {
                this.initLoading();
            });
        },
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
        },
        goToDetail(item) {
            this.$router.push({
                path: "/bookdetail",
                query: {
                    title: item.title,
                    id: item._id
                }
            });
        }
    },
    created() {
        let query = this.$route.query;
        console.log(query);
        this.title = query.title;
        if (query.type === "more") {
            this.getRanking(query.id);
        } else if (query.type === "sort") {
            this.getClassification(query.title);
        } else {
            this.title = `跟“${query.title}”有关的书籍`;
            this.getFuzzySearch(query.title);
        }
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
.more-book {
    width: 100%;
    .wrapper {
        width: 100%;
        height: 100vh;
        overflow: hidden;
        .container {
            width: 100%;
            padding: 0 10px;
        }
        .not {
            width: 100%;
            height: 60px;
            padding: 20px 0;
            border-bottom: 1px solid #eee;
            line-height: 20px;
            text-align: center;
            font-size: 16px;
            color: #ccc;
        }
        .blank {
            height: 40px !important;
        }
    }
}
.text {
    position: relative;
    box-sizing: border-box;
    padding-left: 10px;
    padding-top: 5px;
    line-height: 30px;
    font-size: 18px;
    font-weight: 500;
    color: #000;
    &::after {
        content: "";
        position: absolute;
        left: 4px;
        top: 50%;
        width: 2px;
        height: 20px;
        background-color: #d43c33;
        transform: translateY(-50%);
    }
}
</style>
