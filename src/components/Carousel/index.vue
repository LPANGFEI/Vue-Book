<template>
    <section class="carousel">
        <a-carousel autoplay>
            <div v-for="carousel in carousels " :key="carousel.id">
                <img :src="carousel.url" />
            </div>
        </a-carousel>
    </section>
</template>
<script>
import { mapState } from "vuex";
export default {
    name: "Carousel",
    computed: {
        ...mapState(["carousels"])
    }
};
</script>
<style scoped>
.ant-carousel >>> .slick-slide {
    text-align: center;
    width: 100%;
    height: 130px;
    overflow: hidden;
}

.ant-carousel >>> .slick-slide img {
    display: block;
    width: 100%;
    height: 130px;
}
.carousel {
    margin-bottom: 10px;
}
</style>
