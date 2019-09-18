<template>
    <section class="book-detail">
        <Spin v-show="isLoading" />
        <BookHeader title="书籍详情" />
        <div class="wrapper" ref="wrapper">
            <div class="container">
                <!-- 书籍 -->
                <BookBrief v-if="detail" :datas="detail" :id="$route.query.id" />
                <!-- 按钮 -->
                <div class="btn">
                    <button
                        :class="['join',{isJoin}]"
                        @click="joinBookShelf(detail)"
                        ref="join"
                    >{{msg}}</button>
                    <button class="read" @click="beginRead(detail)">开始阅读</button>
                </div>
                <!-- 人气+留存 -->
                <div class="data">
                    <div class="follower">
                        <p>追书总人气</p>
                        <p class="num">{{detail.totalFollower}}</p>
                    </div>
                    <div class="retention">
                        <p>读者保留率</p>
                        <p class="num">{{detail.retentionRatio}}%</p>
                    </div>
                    <div class="serialize">
                        <p>日更新字数/天</p>
                        <p class="num">{{detail.serializeWordCount}}</p>
                    </div>
                </div>
                <!-- 简介 -->
                <div class="content" @click="showText">
                    <div :class="['text',{active}]">
                        <p>{{detail.longIntro}}</p>
                    </div>
                    <span :class="['icon',{active}]"></span>
                </div>
                <!-- 分类 -->
                <div class="cate">
                    <span class="tag">分类</span>
                    <span
                        v-if="detail.majorCate"
                        @click="goToBookMore(detail.majorCate)"
                    >{{detail.majorCate}}</span>
                    <span
                        v-if="detail.majorCateV2"
                        @click="goToBookMore(detail.majorCateV2)"
                    >{{detail.majorCateV2}}</span>
                    <span
                        v-if="detail.minorCate"
                        @click="goToBookMore(detail.minorCate)"
                    >{{detail.minorCate}}</span>
                    <span
                        v-if="detail.minorCateV2"
                        @click="goToBookMore(detail.minorCateV2)"
                    >{{detail.minorCateV2}}</span>
                </div>
                <!-- 目录 -->
                <div class="catalog" @click="goToCatalog(detail)">
                    <span class="num">目录</span>
                    <span class="text">{{detail.lastChapter}}</span>
                    <span class="icon"></span>
                </div>
                <!-- 可能感兴趣 -->
                <div class="interest">
                    <h1 class="text">你可能感兴趣</h1>
                    <div class="pic" ref="interest" v-if="detail">
                        <ul ref="bookUl">
                            <li
                                class="pic-li"
                                v-for="fuzzy in fuzzys"
                                :key="fuzzy._id"
                                @click="goToDetail(fuzzy)"
                            >
                                <img v-lazy="'//statics.zhuishushenqi.com'+fuzzy.cover" alt />
                                <p class="name">{{fuzzy.title}}</p>
                            </li>
                        </ul>
                        <div class="blank"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import BScroll from "better-scroll";
import { setTimeout } from "timers";
import BookBrief from "../components/BookBrief";
import { mapState, maoGeyyets, mapGetters } from "vuex";
import { ADD_BOOK, REMOVE_BOOK, ADD_READ } from "../store/mutation-types";

export default {
    name: "BookDetail",
    data: () => ({
        isLoading: true,
        bScroll: null,
        bookScroll: null,
        detail: {},
        active: false,
        fuzzys: [],
        chapters: [],
        isJoin: false,
        index: 0
    }),
    computed: {
        msg() {
            return this.isJoin ? "撤出书架" : "加入书架";
        },
        // ...mapState(["bookShelf"])
        ...mapGetters(["getBookShelf", "getReading"])
    },
    components: {
        BookBrief
    },
    methods: {
        // 小说详情
        async getBookDetail(id) {
            let res = await this.$http("/book/" + id);
            res = res.data;
            this.detail = res;
            this.$nextTick(() => {
                this.initLoading();
                this.initBookBScroll();
            });
        },
        // 模糊搜索
        async getFuzzySearch(id) {
            let res = await this.$http("/book/fuzzy-search?query=" + id);
            res = res.data;
            this.fuzzys = res.books;
            this.$nextTick(() => {
                this.initLoading();
                this.initBookBScroll();
            });
        },
        // 获取小说内容
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
        initBookBScroll() {
            let offsetWidth = this.fuzzys.length * 80 - 20;
            this.$refs.bookUl.style.width = offsetWidth + "px";
            if (this.bookScroll) {
                this.bookScroll.refresh();
            } else {
                this.bookScroll = new BScroll(this.$refs.interest, {
                    scrollX: true,
                    probeType: 3
                });
            }
        },
        showText() {
            this.active = !this.active;
        },
        goToDetail(item) {
            console.log(item.title, item._id);
            this.$router.push({
                path: "/bookdetail",
                query: {
                    title: item.title,
                    id: item._id
                }
            });
        },
        goToBookMore(title) {
            this.$router.push({
                path: "/bookmore",
                query: {
                    title,
                    type: "sort"
                }
            });
        },
        // 开始阅读
        beginRead(item) {
            this.$router.push({
                path: "/reading",
                query: {
                    id: item._id,
                    title: item.title
                    // view: "chapters"
                }
            });
            this.read(item._id);
        },
        // 判断是否阅读过
        read(id) {
            let read = this.getReading.find(read => read.id === id);
            if (read === undefined) {
                this.$store.commit(ADD_READ, {
                    id,
                    index: 0
                });
            } else {
                this.$store.commit(ADD_READ, read);
            }
        },
        // 加入撤出书架
        joinBookShelf(item) {
            this.isJoin = !this.isJoin;
            if (this.isJoin) {
                // 这个才是加入书架
                this.$store.commit(ADD_BOOK, item);
            } else {
                // 这个才是撤出书架
                this.$store.commit(REMOVE_BOOK, item);
            }
        },
        // 跳转到书籍目录
        goToCatalog(item) {
            this.$router.push({
                path: "/catalog",
                query: {
                    id: item._id,
                    title: item.title
                }
            });
        }
    },
    created() {
        let { title, id } = this.$route.query;
        this.title = title;
        this.getBookDetail(id);
        this.getFuzzySearch(title);
        this.$nextTick(() => {
            for (let i of this.getBookShelf) {
                if (i._id === id) {
                    this.isJoin = true;
                    this.$refs.join.innerText = "撤出书架";
                }
            }
        });
    },
    mounted() {
        this.initBScroll();
    },
    beforeDestroy() {
        this.bScroll.destroy();
        this.bookScroll.destroy();
        this.bScroll = null;
        this.bookScroll = null;
    }
};
</script>

<style lang="scss" scoped>
.book-detail {
    width: 100%;
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
        height: 20px !important;
    }
}
.btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    margin-top: 10px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
    button {
        width: 45%;
        height: 40px;
        font-size: 20px;
        outline: none;
        border-width: 1px;
        border-style: solid;
        border-color: #b93321;
        border-radius: 2px;
        background-color: #fff;
    }
    .join {
        color: #b93321;
        &.isJoin {
            border: none;
            color: #fff;
            background-color: #999;
        }
    }
    .read {
        color: #fff;
        background-color: #b93321;
    }
}
.data {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    div {
        width: 33.33%;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        color: #999;
        .num {
            margin-top: 4px;
            font-size: 16px;
            color: #222;
        }
    }
}
.content {
    position: relative;
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    .text {
        -webkit-line-clamp: 4;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        white-space: normal;
        font-size: 13px;
        line-height: 20px;
        text-indent: 2em;
        color: #333;
        &.active {
            -webkit-line-clamp: 100;
            overflow: inherit;
        }
    }
    .icon {
        position: absolute;
        bottom: 0px;
        right: 0;
        z-index: 3;
        width: 20px;
        height: 20px;
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: 12px auto;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAANCAQAAAAZZWZbAAAAkElEQVR4AY2RtQEDMQxFX+D4RsgA6cN4XGr/cQJyEzD9yvCeZIAVWxbEJKNhDQ3CiUUE3iE0UNAjnFniS674nVQnqlw8iiHuJN/+hQRbzBluJP8tryQWfLAXy2j/61Aa3H7clOb7pJSMFtyipABUip/9T55yR2hIqZnifihRpVX8aMGtyg1BODAnMglHdnb8CYQbEwGgBxiKAAAAAElFTkSuQmCC);
        &.active {
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAANCAQAAAAZZWZbAAAAlElEQVR4AY2ShQ1CMRBA33efgSgD4B/3aPdfhwsO1Vdvz1OMZCwYExNIzhYlbUocJr5DybjKPPOrFHfxLRndXWVO7Bbfo9iQIdBykdOCBAslBxRrMgS/yl2cFRnfNHeVnkQXP97FU/6pOcvL8vel4nS/NEdbc/oxdr/Q3eoGV2Qvl3piusrxWRCPuJ4lg+BfU7JneAOq9xL9utncPAAAAABJRU5ErkJggg==);
        }
    }
}
.cate {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    line-height: 20px;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    span {
        // flex: 1;
        display: inline-block;
        font-size: 12px;
        color: #999;
    }
    .tag {
        font-size: 14px;
        color: #333;
    }
}
.catalog {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    line-height: 20px;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: #333;
    .num {
        flex: 0 0 60px;
        width: 60px;
    }
    .text {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 12px;
        text-align: right;
        color: #999;
    }
    .icon {
        flex: 0 0 20px;
        width: 20px;
        height: 12px;
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: 12px auto;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAANCAQAAAAZZWZbAAAAkElEQVR4AY2RtQEDMQxFX+D4RsgA6cN4XGr/cQJyEzD9yvCeZIAVWxbEJKNhDQ3CiUUE3iE0UNAjnFniS674nVQnqlw8iiHuJN/+hQRbzBluJP8tryQWfLAXy2j/61Aa3H7clOb7pJSMFtyipABUip/9T55yR2hIqZnifihRpVX8aMGtyg1BODAnMglHdnb8CYQbEwGgBxiKAAAAAElFTkSuQmCC);
        transform: rotate(-90deg);
    }
}
.interest {
    width: 100%;
    padding: 20px 0;
    .text {
        position: relative;
        box-sizing: border-box;
        padding-left: 10px;
        margin-bottom: 10px;
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
    .pic {
        width: 100%;
        overflow: hidden;
        ul {
            white-space: nowrap;
            .pic-li {
                display: inline-block;
                margin-right: 20px;
                width: 60px;
                height: 80px;

                &:last-child {
                    margin-right: 0;
                }
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
                p {
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    font-size: 10px;
                    line-height: 30px;
                    color: #333;
                }
            }
        }
    }
}
</style>
