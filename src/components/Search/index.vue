<template>
    <section class="search">
        <router-link to="/searching">
            <a-carousel vertical autoplay>
                <div class="container" v-for="(hotName, index) in hotNames" :key="index">
                    <h3>{{hotName.word}}</h3>
                </div>
            </a-carousel>
        </router-link>
        <div class="icon"></div>
    </section>
</template>

<script>
export default {
    name: "Search",
    data: () => ({
        hotWords: [],
        hotNames: []
    }),
    methods: {
        async getHotWorlds() {
            let res = await this.$http("/book/search-hotwords");
            res = res.data;
            this.hotWords = res.searchHotWords;
            this.hotNames = this.hotWords.splice(0, 10);
        }
    },
    created() {
        this.getHotWorlds();
    }
};
</script>

<style scoped>
.ant-carousel >>> .slick-list {
    height: 30px;
}
.ant-carousel >>> .slick-slide {
    text-align: left;
    background-color: #fff;
    overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
    padding-left: 10px;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    color: #000;
}

.ant-carousel >>> .slick-dots {
    display: none !important;
}

.search {
    position: relative;
    width: 100%;
    height: 30px;
}
.icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAG1BMVEVHcEyZmZmZmZmampqampqZmZmZmZmZmZmZmZm+x9fIAAAACHRSTlMA5XQSKE7CmQNx6RMAAAH+SURBVFjD7Vc9U8JAED0gQKsywpUIo6YERmcscXSUEnUYKUEtKMXRIe0pSfZnSxKIIbfZu0MLi7yKLLx7+3XZhbEcOXL8AtbplIv6W1+f8cghwocmoXQEMQ46pgyATx3KHWzhUM2oQgqvSrdmaYqnCqcLEmqKgqzT2zi+OrufR59FX0NEvEdPt1xDJoqkvXnsRdFQjGL4k5cfw40yaWOpenZgWar8akq6QuFXqkVs6RQ5X03kmOyc2Vh6ZmRzcizUARVMGXU79GxINLGQmrDEicoUVt/5stlZmfcyKAO8agOimDZ+XIFImYM7XcX9jSswxBPpEWVBrpNFFCagIBe9RFAgmwIExcROq4i/C3+HJDv4/SsSpQwaZiKbK0TDjPEre7EyuxmUjO+Ck74yKBU8zhnuL3Fly9RbKeyMCaYNmTPGwXJjEzmOrmy6/hb9Uq4gb8YuENGvT9yejdHsJOZYEAw8Jy3hgPFVc08k8lzmqskXegZ+7FrJUa8Y463NJd5NhsphCf5D8HDubEa/S8nY6x/VF4tpYl3QkEnDNViUAPaVMlZq7/GuuVKmyJMM0WSXShnWS3BEe7MKkTKsF/vmhduMhgyzTsKDxVM/sXG5quVv1GqN4r7RkUEXO9eEsrvM0lzGY8YyghnLGFICGZ8Zy9RM/wXNGx2WI0eO/4pvXVtwjS2EstwAAAAASUVORK5CYII=);
    background-repeat: no-repeat;
    background-size: contain;
    z-index: 10;
}
</style>
