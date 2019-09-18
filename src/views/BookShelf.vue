<template>
    <section class="book-shelf">
        <Spin v-show="isLoading" />
        <BookHeader title="我的书架" />
        <div class="wrapper" ref="wrapper">
            <div class="container" v-if="bookShelf.length">
                <BookBrief
                    v-for="book in bookShelf"
                    :key="book._id"
                    :datas="book"
                    :bookShelf="true"
                    :id="$route.query.id"
                    @jump="goToDetail"
                />
            </div>
            <div class="none" v-if="!bookShelf.length">
                <p>赶快去添加书籍吧~</p>
            </div>
        </div>
    </section>
</template>

<script>
import { setTimeout } from "timers";
import BScroll from "better-scroll";
import BookBrief from "../components/BookBrief";
import { mapState, mapGetters } from "vuex";
export default {
    name: "BookShelf",
    data: () => ({
        isLoading: true,
        bScroll: null
    }),
    computed: {
        bookShelf() {
            return this.getBookShelf;
        },
        ...mapGetters(["getBookShelf"])
    },
    components: {
        BookBrief
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
        },
        goToDetail(item) {
            console.log(item);
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
        this.initLoading();
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
.book-shelf {
    width: 100%;
    height: 100vh;
    .wrapper {
        width: 100%;
        height: 100vh;
        overflow: hidden;
        .container {
            width: 100%;
            padding: 0 10px;
        }
    }
    .none {
        width: 100%;
        height: 60px;
        padding: 20px 10px;
        p {
            font-size: 16px;
            line-height: 20px;
            text-align: center;
            color: #ddd;
        }
    }
}
</style>
