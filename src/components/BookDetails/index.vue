<template>
    <!-- 书籍详情 -->
    <section class="book-details" @click="goToDetail(datas)">
        <img v-lazy="'//statics.zhuishushenqi.com'+datas.cover" />
        <div class="desc">
            <p class="title">{{datas.title}}</p>
            <p class="tag">
                {{datas.majorCate}}
                <span>|</span>
                {{datas.minorCate}}
            </p>
            <p class="msg">{{datas.shortIntro}}</p>
            <p class="tip">
                <span>{{datas.latelyFollower}}</span>人气
                |
                <span>{{datas.retentionRatio}}%</span>读者留存
            </p>
        </div>
    </section>
</template>

<script>
export default {
    name: "BookDetails",
    props: {
        datas: {
            type: Object,
            require: true
        }
    },
    methods: {
        goToDetail(datas) {
            let { title, _id } = datas;
            this.$emit("jump", { title, _id });
        }
    }
};
</script>

<style lang='scss' scoped>
.book-details {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    height: 90px;
    padding: 10px 0;
    img {
        flex: 0 0 55px;
        display: block;
        width: 55px;
        height: 70px;
    }
    .desc {
        flex: 1;
        padding-left: 10px;
        .title {
            margin-bottom: 4px;
            font-size: 14px;
            font-weight: bold;
            color: #333;
        }
        .tag {
            font-size: 12px;
            color: #999;
        }
        .msg {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            margin: 4px 0;
            font-size: 12px;
            color: #999;
        }
        .tip {
            font-size: 12px;
            color: #444;
            span {
                color: #b93321;
            }
        }
    }
}
</style>
