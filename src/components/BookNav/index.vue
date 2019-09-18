<template>
    <nav class="book-nav">
        <router-link v-for="nav in navs" :key="nav.id" :to="{name:nav.name}" tag="div" class="link">
            <img v-lazy="nav.src" />
            <p>{{nav.text}}</p>
        </router-link>
    </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "BookNav",
    computed: {
        ...mapState(["navs"])
    }
};
</script>

<style lang="scss" scoped>
.book-nav {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 60px;
    background-color: #fff;
    .link {
        width: 40px;
        height: 40px;
        text-align: center;
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
        p {
            width: 100%;
            font-size: 12px;
            line-height: 20px;
        }
    }
}
</style>
