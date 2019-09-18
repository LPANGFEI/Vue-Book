<template>
    <section class="ranking">
        <!-- loading -->
        <Spin v-show="isLoading" />
        <!-- 顶部栏 -->
        <BookHeader title="排行榜" />
        <!-- 导航 -->
        <nav class="nav">
            <span
                v-for="(ranking, index) in rankings"
                :key="index"
                :class="['tab',{active:activeIndex===index}]"
                @click="goToRanking(index)"
            >{{index | toUpperCase}}</span>
        </nav>
        <!-- 内容 -->
        <div class="container">
            <!-- 侧边栏 -->
            <div class="book-menu" ref="menu">
                <div>
                    <div
                        :class="['menu',{active:currentIndex===index}]"
                        v-for="(menu,index) in menus"
                        :key="index"
                        @click="scrollToCurrentBook(index)"
                    >{{menu.shortTitle}}</div>
                    <div class="blank"></div>
                </div>
            </div>
            <!-- 排行列表 -->
            <div class="book-list" ref="list">
                <div>
                    <div class="list" v-for="(book,index) in books" :key="index" ref="bookList">
                        <!-- 榜单名 -->
                        <div class="title">
                            <img v-lazy="`//statics.zhuishushenqi.com${book.cover}`" />
                            <span>{{book.title}}</span>
                        </div>
                        <!-- 内容 -->
                        <BookDetails
                            v-for="data in book.books"
                            :key="data._id"
                            :datas="data"
                            @jump="goToDetail"
                        />
                        <div class="none" v-show="!book.books.length">
                            <p>空</p>
                        </div>
                    </div>
                    <div class="blank"></div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { setTimeout } from "timers";
import BScroll from "better-scroll";
import BookDetails from "../components/BookDetails";
export default {
    name: "Ranking",
    data: () => ({
        isLoading: true,
        rankings: {},
        menuBScroll: null,
        listBScroll: null,
        menus: [],
        lists: [],
        books: [],
        booksHeight: [0],
        currentIndex: 0,
        activeIndex: null
    }),
    components: {
        BookDetails
    },
    filters: {
        toUpperCase(value) {
            return value.toUpperCase();
        }
    },
    methods: {
        async getRankingMenu() {
            let res = await this.$http("/ranking/gender");
            res = res.data;
            this.$delete(res, "ok");
            this.rankings = res;
            let { index } = this.$route.query;
            if (index === undefined) {
                for (let i in res) {
                    index = i;
                    break;
                }
            }
            this.activeIndex = index;
            this.menus = res[index];
            for (let i of this.menus) {
                this.getRankingList(i._id);
            }
            // 加载动画
            this.$nextTick(() => {
                this.initLoading();
            });
        },
        // 列表
        async getRankingList(id) {
            let res = await this.$http(`/ranking/${id}`);
            res = res.data.ranking;
            this.lists = res;
            this.books.push(this.lists);
            this.$nextTick(() => {
                this.calculationHeight();
            });
        },
        initLoading() {
            setTimeout(() => {
                this.isLoading = false;
            }, 1000);
        },
        initBScroll() {
            if (this.menuBScroll) {
                this.menuBScroll.refresh();
            } else {
                this.menuBScroll = new BScroll(this.$refs.menu, {
                    probeType: 3,
                    click: true
                });
            }
            if (this.listBScroll) {
                this.listBScroll.refresh();
            } else {
                this.listBScroll = new BScroll(this.$refs.list, {
                    probeType: 2,
                    click: true
                });
                this.listBScroll.on("scroll", this.booksWrapperScroll);
            }
        },
        // 跳转排行榜
        goToRanking(index) {
            let title = this.$route.query.index;
            if (title !== index) {
                this.$router.replace({
                    path: "/ranking",
                    query: {
                        index
                    }
                });
            }
        },
        // 跳转详情页
        goToDetail(item) {
            this.$router.push({
                path: "/bookdetail",
                query: {
                    title: item.title,
                    id: item._id
                }
            });
        },
        // 计算列表高度
        calculationHeight() {
            let height = 0;
            let books = this.$refs.bookList;
            books.forEach(item => {
                height += item.clientHeight;
            });
            this.booksHeight.push(height);
        },
        // 点击菜单滑动列表
        scrollToCurrentBook(index) {
            this.currentIndex = index;
            let offsetY = -this.booksHeight[index];
            this.listBScroll.scrollTo(0, offsetY, 300);
        },
        // 滑动列表切换菜单
        booksWrapperScroll({ y }) {
            // 页面滑动后触发的滑动偏移量,与菜单栏哪一个应该高亮的对应函数
            let num = parseInt(y);
            if (num > 0) {
                this.currentIndex = 0;
            } else {
                num = Math.abs(num); // 滑动页面向下滑动偏移量是负数
                for (var i = 0; i < this.booksHeight.length - 1; i++) {
                    let h1 = this.booksHeight[i];
                    let h2 = this.booksHeight[i + 1];
                    if (num >= h1 && num < h2) {
                        this.currentIndex = i;
                        break;
                    }
                }
            }
        }
    },
    created() {
        this.getRankingMenu();
    },
    mounted() {
        this.initBScroll();
    },
    beforeDestroy() {
        this.menuBScroll.destroy();
        this.listBScroll.destroy();
        this.menuBScroll = null;
        this.listBScroll = null;
    }
};
</script>

<style lang="scss" scoped>
.ranking {
    width: 100%;
    overflow: hidden;
    .nav {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        border-bottom: 1px solid #eee;
        .tab {
            display: inline-block;
            flex: 1;
            text-align: center;
            font-size: 14px;
            line-height: 40px;
            color: #8a8a8f;
            &.active {
                border-bottom: 1px solid #b83320;
                font-weight: bold;
                color: #b83320;
            }
        }
    }
    .container {
        display: flex;
        width: 100%;
        height: 100vh;
        .blank {
            height: 80px !important;
        }
    }
}
.book-menu {
    flex: 0 0 80px;
    width: 80px;
    height: 100vh;
    padding: 0 10px;
    overflow: hidden;
    .menu {
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #eee;
        font-size: 13px;
        text-align: center;
        line-height: 50px;
        color: #8a8a8f;
        &.active {
            font-weight: bold;
            color: #b83320;
        }
    }
}
.book-list {
    flex: 1;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    .list {
        width: 100%;
        padding: 10px;
        border-bottom: 1px solid #eee;
        .title {
            display: flex;
            // justify-content: center;
            // align-items: center;
            width: 100%;
            img {
                display: block;
                width: 20px;
                height: 20px;
            }
            span {
                flex: 1;
                width: 100%;
                height: 20px;
                padding-left: 10px;
                font-size: 14px;
                line-height: 20px;
            }
        }
        .none {
            width: 100%;
            height: 20px;
            p {
                margin: 10px 0;
                font-size: 14px;
                line-height: 20px;
                text-align: center;
                color: #ccc;
            }
        }
    }
}
</style>
