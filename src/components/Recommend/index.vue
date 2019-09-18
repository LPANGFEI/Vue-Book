<template>
    <section class="recommend">
        <h1 class="text">{{title}}</h1>
        <BookDetails
            v-for="ranking in rankings"
            :key="ranking._id"
            :datas="ranking"
            @jump="goToDetail"
        />
        <div class="more" @click="goToMore(title,id)">
            <p>查看更多</p>
        </div>
    </section>
</template>

<script>
import BookDetails from "../BookDetails";
export default {
    name: "Recommend",
    data: () => ({
        rankings: []
    }),
    props: {
        title: {
            type: String,
            require: true
        },
        id: {
            type: String,
            require: true
        }
    },
    components: {
        BookDetails
    },
    methods: {
        // 具体排行榜
        async getRanking(id) {
            let res = await this.$http("/ranking/" + id);
            res = res.data;
            this.rankings = res.ranking.books.slice(0, 5);
        },
        goToMore(title, id) {
            this.$router.push({
                path: "/bookmore",
                query: {
                    title,
                    id,
                    type: "more"
                }
            });
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
        this.getRanking(this.id);
    }
};
</script>

<style lang="scss" scoped>
.recommend {
    width: 100%;
    padding: 0 12px;
    background-color: #fff;
    .text {
        position: relative;
        box-sizing: border-box;
        padding-left: 10px;
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
    .more {
        // width: 100%;
        height: 40px;
        text-align: center;
        border-top: 1px solid #ddd;

        p {
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-size: 12px;
            color: #b93321;
        }
    }
}
</style>
