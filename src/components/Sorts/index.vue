<template>
    <!-- 分类 -->
    <section class="sorts">
        <!-- 分类 -->
        <div class="group" v-for="(classification, index) in classifications" :key="index">
            <!-- 类目 -->
            <h1 class="title">{{index | toUpperCase}}</h1>
            <!-- 具体分类 -->
            <div
                class="content"
                v-for="(item, index) in classification"
                :key="index"
                @click="goToBookMore(item.name)"
            >
                <!-- 类名 -->
                <p class="name">{{item.name}}</p>
                <!-- 总数 -->
                <p class="num">{{item.bookCount}}</p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Sorts",
    data: () => ({
        classifications: {}
    }),
    methods: {
        async getClassification() {
            let res = await this.$http("/cats/lv2/statistics");
            res = res.data;
            this.classifications = res;
            this.$delete(this.classifications, "ok");
        },
        goToBookMore(title) {
            this.$router.push({
                path: "/bookmore",
                query: {
                    title,
                    type: "sort"
                }
            });
        }
    },
    filters: {
        toUpperCase(value) {
            return value.toUpperCase();
        }
    },
    created() {
        this.getClassification();
    }
};
</script>

<style lang="scss" scoped>
.sorts {
    width: 100%;
}
.group {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    h1 {
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #eee;
        line-height: 50px;
        font-size: 16px;
        text-align: center;
        color: #000;
    }
    .content {
        width: 100px;
        height: 60px;
        text-align: center;
        border-bottom: 1px solid #eee;
        p {
            line-height: 30px;
        }
        .name {
            font-size: 15px;
            color: #333;
        }
        .num {
            font-size: 12px;
            color: #ccc;
        }
    }
}
</style>
