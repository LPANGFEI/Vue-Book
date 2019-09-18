<template>
    <!-- 书籍简介 -->
    <section class="book-brief">
        <img v-lazy="`//statics.zhuishushenqi.com${datas.cover}`" />
        <div class="desc" @click="goToDetail(datas)">
            <p class="title">{{datas.title}}</p>
            <p class="msg">
                <span class="author">{{datas.author}}&nbsp;</span>
                |
                <span>&nbsp;{{datas.cat}}&nbsp;</span>
            </p>
            <p class="count">
                <span>章节数：{{datas.chaptersCount}}&nbsp;</span>
                |
                <span>&nbsp;{{datas.wordCount | changeNumber}}字</span>
            </p>
            <!-- <p class="catalog">
                <span>当前阅读至：第{{catalog}}章</span>
            </p>-->
            <p class="catalog">
                <span>当前阅读至：第{{catalog}}章</span>
            </p>
        </div>
        <div class="btns" v-if="bookShelf">
            <p @click="remove(datas)">撤出</p>
            <p class="read" @click="beginRead(datas)">阅读</p>
        </div>
    </section>
</template>

<script>
import { mapGetters } from "vuex";
import { REMOVE_BOOK } from "../../store/mutation-types";
export default {
    name: "BookBrief",
    data: () => ({
        lists: []
    }),
    props: {
        datas: {
            type: Object,
            require: true
        },
        bookShelf: {
            type: Boolean,
            default: false
        },
        id: {
            type: String,
            require: true
        }
    },
    computed: {
        catalog() {
            let read = this.getReading.find(read => read.id === this.id);
            if (read) {
                return read.index + 1;
            } else {
                return 0;
            }
        },
        ...mapGetters(["getReading"])
    },
    methods: {
        goToDetail(datas) {
            let { title, _id } = datas;
            this.$emit("jump", { title, _id });
        },
        remove(datas) {
            this.$store.commit(REMOVE_BOOK, datas);
        },
        beginRead(item) {
            this.$router.push({
                path: "/reading",
                query: {
                    id: item._id,
                    title: item.title,
                    view: "chapters"
                }
            });
        }
    }
};
</script>

<style lang='scss' scoped>
.book-brief {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    height: 100px;
    padding: 10px 0;
    img {
        flex: 0 0 60px;
        display: block;
        width: 60px;
        height: 100%;
    }
    .desc {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        width: 100%;
        padding-left: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        p {
            font-size: 12px;
            line-height: 25px;
            color: #999;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .title {
            height: 25px;
            font-size: 16px;
            font-weight: 400;
            color: #222;
        }
        .msg {
            height: 25px;
            .author {
                color: #b93321;
            }
        }
    }
    .btns {
        flex: 0 0 80px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 80px;
        height: 80px;
        padding-left: 10px;
        text-align: center;
        p {
            padding: 5px;
            border: 1px solid #b93321;
            border-radius: 2px;
            font-size: 16px;
            text-align: center;
            line-height: 20px;
            color: #b93321;
        }
        .read {
            color: #fff;
            background-color: #b93321;
        }
    }
}
</style>
