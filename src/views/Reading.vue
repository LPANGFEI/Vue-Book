<template>
    <section class="reading" ref="read">
        <Spin v-show="isLoading" />
        <!-- 小说内容 -->
        <div class="wrapper" ref="wrapper" @click="showMenu">
            <div class="container">
                <h1 style="font-size:22px" ref="title">{{titles[currentIndex]}}</h1>
                <div class="text" style="font-size:18px" ref="text">
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                    <p>版权已到期，无法阅读，非常歉意</p>
                </div>
            </div>
        </div>
        <!-- 菜单按钮 -->
        <transition name="menu">
            <div class="menu" v-show="isShowMenu" ref="menu">
                <div class="menu-title" @click="showMenu">
                    <span class="back">
                        <i class="icon"></i>
                        <i @click="goBack">返回</i>
                    </span>
                    <h1>{{this.$route.query.title}}</h1>
                    <span class="menus">
                        <i class="icon"></i>
                        <ul class="down">
                            <li @click="goHome">
                                <i class="menu-icon1"></i>
                                <span>首页</span>
                            </li>
                            <li @click="goBookShelf">
                                <i class="menu-icon2"></i>
                                <span>书架</span>
                            </li>
                            <li @click="goBookDetail">
                                <i class="menu-icon3"></i>
                                <span>详情</span>
                            </li>
                        </ul>
                    </span>
                </div>
                <!-- <div class="menu-content" @click="showMenu"> -->
                <div class="menu-content">
                    <div class="bookshelf" @click="joinBookShelf" ref="join">{{msg}}</div>
                    <div class="item">
                        <span class="btn font" @click="decFont" ref="dec">Aa-</span>
                        <span class="btn bar">
                            <span class="content" style="width: 25%;" ref="bar"></span>
                        </span>
                        <span class="btn font" @click="addFont" ref="add">Aa+</span>
                    </div>
                    <div class="mode">
                        <span :class="['btn',{defaul}]" @click="defaultColor">默认</span>
                        <span :class="['btn',{night}]" @click="nightColor">夜间</span>
                        <span :class="['btn',{eye}]" @click="eyeColor">护眼</span>
                    </div>
                    <div class="change">
                        <span :class="['btn',{isPrev}]" @click="prev">上一章</span>
                        <span class="btn catalog" @click="showLists">目录</span>
                        <span :class="['btn',{isNext}]" @click="next">下一章</span>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 目录 -->
        <transition name="lists">
            <div class="lists" v-show="isShowLists">
                <div class="content">
                    <!-- 标题 -->
                    <div class="top-bar">
                        <p class="name">{{titles[currentIndex]}}</p>
                        <p class="mu">目录</p>
                    </div>
                    <!-- 内容 -->
                    <div class="titles" ref="lists">
                        <ul class="directory-list">
                            <li class="li" v-for="(title, index) in titles" :key="index">
                                <div
                                    :class="['msg',{active:currentIndex===index}]"
                                    @click="changeTitle(index)"
                                >{{index}}-{{title}}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </transition>
    </section>
</template>

<script>
import { setTimeout } from "timers";
import BScroll from "better-scroll";
import { mapState, mapGetters } from "vuex";
import {
    ADD_BOOK,
    REMOVE_BOOK,
    ADD_READ,
    UPADTED_READ
} from "../store/mutation-types";
export default {
    name: "Reading",
    data: () => ({
        isLoading: true,
        bScroll: null,
        listsScroll: null,
        chapters: [],
        titles: [],
        detail: {},
        currentIndex: 0,
        // 菜单
        isShowMenu: false,
        // 目录
        isShowLists: false,
        // 模式
        defaul: true,
        night: false,
        eye: false,
        // 字体
        isAdd: true,
        isDec: true,
        // 上下章
        isPrev: false,
        isNext: false,
        // 书架
        isJoin: false
    }),
    watch: {},
    computed: {
        msg() {
            return this.isJoin ? "撤出书架" : "加入书架";
        },
        // ...mapState(["bookShelf"])
        ...mapGetters(["getBookShelf", "getReading"])
    },
    methods: {
        // 小说章节
        async getChapters(id) {
            let res = await this.$http(`/mix-atoc/${id}`);
            res = res.data;
            this.chapters = res.mixToc.chapters;
            for (let i of this.chapters) {
                let { link, title } = i;
                // 小说标题
                this.titles.push(title);
            }
            this.$nextTick(() => {
                this.initBScroll();
                this.initLoading();
            });
        },
        // 小说详情
        async getBookDetail(id) {
            let res = await this.$http("/book/" + id);
            res = res.data;
            this.detail = res;
            this.$nextTick(() => {
                this.initListsScroll();
                this.initLoading();
            });
        },
        initLoading() {
            setTimeout(() => {
                this.isLoading = false;
            }, 300);
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
        initListsScroll() {
            if (this.listsScroll) {
                this.listsScroll.refresh();
            } else {
                this.listsScroll = new BScroll(this.$refs.lists, {
                    probeType: 3,
                    click: true
                });
            }
        },
        // 显示菜单
        showMenu() {
            // 如果目录展示着，点击主页，隐藏目录和菜单
            if (this.isShowLists) {
                this.isShowLists = false;
                this.isShowMenu = false;
            } else {
                // 如果目录没有展示的话，点击主页显示菜单
                this.isShowMenu = !this.isShowMenu;
            }
        },
        // 显示目录
        showLists() {
            this.isShowLists = !this.isShowLists;
            this.$nextTick(() => {
                this.initListsScroll();
            });
            if (this.isShowMenu) {
                this.isShowMenu = false;
            }
        },
        // 返回
        goBack() {
            this.updateReading();
            this.$router.back();
        },
        // 首页
        goHome() {
            this.updateReading();
            this.$router.push("/home");
        },
        // 书架
        goBookShelf() {
            this.updateReading();
            let { id, title } = this.$route.query;
            this.$router.push({
                path: "/bookShelf",
                query: {
                    id,
                    title
                }
            });
        },
        // 详情
        goBookDetail() {
            this.updateReading();
            let { id, title } = this.$route.query;
            this.$router.push({
                path: "/bookdetail",
                query: {
                    id,
                    title
                }
            });
        },
        // 更新
        updateReading() {
            let { id } = this.$route.query;
            this.$store.commit(UPADTED_READ, {
                id,
                index: this.currentIndex
            });
        },
        // 字体-
        decFont() {
            if (this.isDec) {
                this.isAdd = true;
                this.$refs.add.style.color = "#fff";
                this.$refs.title.style.fontSize =
                    parseInt(this.$refs.title.style.fontSize) - 2 + "px";
                this.$refs.text.style.fontSize =
                    parseInt(this.$refs.text.style.fontSize) - 2 + "px";
                this.$refs.bar.style.width =
                    parseInt(this.$refs.bar.style.width) - 25 + "%";
            }
            if (!parseInt(this.$refs.bar.style.width)) {
                this.isDec = false;
                this.$refs.dec.style.color = "#888";
            }
        },
        // 字体+
        addFont() {
            if (this.isAdd) {
                this.isDec = true;
                this.$refs.dec.style.color = "#fff";
                this.$refs.title.style.fontSize =
                    parseInt(this.$refs.title.style.fontSize) + 2 + "px";
                this.$refs.text.style.fontSize =
                    parseInt(this.$refs.text.style.fontSize) + 2 + "px";
                this.$refs.bar.style.width =
                    parseInt(this.$refs.bar.style.width) + 25 + "%";
            }
            if (parseInt(this.$refs.bar.style.width) === 100) {
                this.isAdd = false;
                this.$refs.add.style.color = "#888";
            }
        },
        // 默认
        defaultColor() {
            this.defaul = true;
            this.night = false;
            this.eye = false;
            this.$refs.read.style = " background-color:#eee6dd";
        },
        // 夜间
        nightColor() {
            this.defaul = false;
            this.night = true;
            this.eye = false;
            this.$refs.read.style = "background-color:#0c0c0c";
        },
        // 护眼
        eyeColor() {
            this.defaul = false;
            this.night = false;
            this.eye = true;
            this.$refs.read.style = "background-color:#b8cd8d";
        },
        // 上一章
        prev() {
            // 换成button的话就可以disbled了，太懒了，不搞了
            this.isNext = false;
            this.currentIndex--;
            if (this.currentIndex <= 0) {
                this.isPrev = true;
                this.currentIndex = 0;
            }
            this.bScroll.scrollTo(0, 0, 300);
        },
        // 下一章
        next() {
            // 换成button的话就可以disbled了，太懒了，不搞了
            this.isPrev = false;
            this.currentIndex++;
            if (this.currentIndex >= this.titles.length - 1) {
                this.isNext = true;
                this.currentIndex = this.titles.length - 1;
            }
            this.bScroll.scrollTo(0, 0, 0);
        },
        // 更换章节
        changeTitle(index) {
            this.currentIndex = index;
            this.isShowLists = false;
        },
        // 加入撤出书架
        joinBookShelf() {
            this.isJoin = !this.isJoin;
            if (this.isJoin) {
                // 这个才是加入书架
                this.$store.commit(ADD_BOOK, this.detail);
            } else {
                // 这个才是撤出书架
                this.$store.commit(REMOVE_BOOK, this.detail);
            }
        }
    },
    created() {
        let { id, index } = this.$route.query;
        this.getChapters(id);
        this.getBookDetail(id);
        this.$nextTick(() => {
            for (let i of this.getReading) {
                if (id === i.id) {
                    this.currentIndex = i.index;
                    if (i.index === 0) {
                        this.isPrev = true;
                    } else {
                        this.isPrev = false;
                    }
                }
            }
            for (let i of this.getBookShelf) {
                if (id === i._id) {
                    this.isJoin = true;
                    this.isJoin ? "撤出书架" : "加入书架";
                }
            }
            if (index) {
                this.currentIndex = index;
            }
        });
    },
    mounted() {
        this.initBScroll();
    },
    beforeDestroy() {
        this.bScroll.destroy();
        this.bScroll = null;
        this.listsScroll.destroy();
        this.listsScroll = null;
    }
};
</script>

<style lang='scss' scoped>
.reading {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: #eee6dd;
    .wrapper {
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }
}
.container {
    width: 100%;
    padding-top: 20px;
    h1 {
        width: 100%;
        padding: 0 20px;
        font-weight: 400;
        line-height: 1.5;
        text-align: center;
        color: #666;
    }
    .text {
        width: 100%;
        min-height: 600px;
        padding: 10px 20px;
        text-align: justify;
        line-height: 1.5;
        color: #5c5d58;
    }
}
.menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    visibility: hidden;
}
.menu-title {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 21;
    width: 100%;
    height: 40px;
    color: #fff;
    background-color: rgba(50, 51, 52, 0.7);
    visibility: visible;

    .back {
        position: absolute;
        width: 50px;
        height: 40px;
        text-align: center;
        color: #fff;
        font-size: 12px;
        i {
            display: inline-block;
            vertical-align: middle;
            font-style: normal;
        }
        .icon {
            width: 13px;
            height: 40px;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAD7ElEQVR4Xu3d63XbMAxAYXKyppukmySTtN2o3aQbuMeJfeI4lgiSEAkCN39DypLuZ8mm88iJryFn4HQ6PaeUvuWcfwx5QOGDZOE4hnWcgUv8n5dN/LKEAAAdYSVT7+Jfp5hBAABJxcYxG/FNIQBAY9zStEJ8MwgAUCrZ8H1hfBMIANAQeG9KZfzpCACgCKAx/lQEAFAC0Bl/GgIAKABQin/dk9ec84vCbok2AQDRadoepBz/b0rpKef8r3O3xNMBID5VXweuHv98RABoBOAhPgCCxwdAAwAvz/zroXMLqEDgLT5XgODxASAE4PGZzy2A+G9ngNcAOxA8P/O5AhSuABHicwXYQBAlPgAeAIgUHwB3AKLFB8ANgIjxAXABEDU+AFJKkeOHBxA9fmgAxH+//4VcCST+x6vfcACI//m9bygAxP+68hUGAPEfr3uHAED87U++3AMg/v7Hnq4BEL/8Uy9uARC/HN/tOgDxZfFdAiC+PL47AMSvi+8KAPHr47sBQPy2+C4AEL89/vIAiN8Xf2kAxO+PvywA4uvEXxIA8fXiLweA+LrxlwJAfP34ywAg/jHxlwBA/OPimwdA/GPjmwZA/OPjmwVA/DHxTQIg/rj45gAQf2x8UwCIPz6+GQDEnxPfBADiz4s/HQDx58afCoD48+NPA0B8G/GnACC+nfjDARDfVvzVAfxJKX0f+R+27OXr36PhvxyqfBUAQaeB4QDO+wuCzmqK06cAAIFiwc5NTQMAgs5yStOnAgCBUsWOzUwHAIKOegpTTQAAgULJxk2YAQCCxoKd00wBAEFnzYbp5gCAoKFixxSTAEDQUbRyqlkAIKgs2TjcNAAQNFatmGYeAAgqajYMXQIACBrKCqcsAwAEwqKVw5YCAILKuoLhywEAgaBqxZAlAYCgonBh6LIAQKCDYGkAIOhHsDwAEPQhcAEABO0I3AAAQRsCVwBAUI/AHQAQ1CFwCQAEcgRuAYBAhsA1ABCUEbgHAIJ9BCEAgGAbQRgAIHiMIBQAEHxFEA4ACD4jCAkABB8IwgIAwTuC0ABAAIC3Z0Hkv1kU/gpwvRtGRQCAmxfFEREA4O6tcTQEAHiwQBYJAQA2lsmjIADAzodlERAAoPCRuXcEACj/zITrdQIACAB4XiwCgBCAVwQAqADgEQEAKgF4QwCABgCeEACgEYAXBADoAOABAQA6ARyA4DXn/KKwW6JNAEB0msqDlFYMf+ecn8uPpjcCAHrnsnfFcHj886EDQBFAx+1gSnwAKMe/bq7ydjAtPgAOAlBxJZgaHwAHAhAgmB4fAAcD2EFgIj4ABgB4gMBMfAAMAnCD4Gn0+/zSIf4HnJnqn1/5JcgAAAAASUVORK5CYII=)
                no-repeat;
            background-size: 125%;
            background-repeat: no-repeat;
            background-position: 50%;
        }
    }
    h1 {
        width: 70%;
        height: 100%;
        margin: 0 auto;
        font-size: 12px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .menus {
        position: absolute;
        right: 0;
        top: 0;
        width: 50px;
        height: 40px;
        text-align: center;
        font-size: 12px;
        color: #fff;
        .icon {
            width: 13px;
            height: 40px;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAaCAYAAABPY4eKAAAAcElEQVRIS+3UwQ2AMAxDUZspmArGgJFgQiqVA2SABiEkTpydA+kCVl+rz2o2oPlKoIfoOFDQcWI9zk05/N6PLLHju9mI5guE7HjYZ4qe+XMmx0P0kz2GPfMqd7/bnnmVswPIyESo/5k98yr/cdF5vQD65koTkcw9oAAAAABJRU5ErkJggg==)
                no-repeat;
            background-size: 100%;
            background-repeat: no-repeat;
            background-position: 50%;
            display: inline-block;
            vertical-align: middle;
            font-style: normal;
        }
        .down {
            position: absolute;
            width: 80px;
            background-color: rgba(50, 51, 52, 0.7);
            right: 13px;
            top: 45px;
            border-radius: 2px;
            li {
                height: 25px;
                border-bottom: 1px solid rgba(50, 51, 52, 0.7);
                i {
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    background-size: 100%;
                    background-repeat: no-repeat;
                    background-position: 50%;
                    vertical-align: middle;
                }
                .menu-icon1 {
                    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAVCAYAAACt4nWrAAABc0lEQVRIS+3UQStEURQH8P/JyIIyvXwEC1vFSlYsJaN77gJZychaKdlZsLCWkZUaNffeDFlbyYqypXwEvSgWMjl66k68eWbejLHi7e7pnN/tnnN6hJSfc25QRHaJaEkpdZ2mjNIkGWMmiagIoAfAE4A5Zj5pVNsQt9auANgC0OExEXkjolVm3q53wbd4oVDoDIJgB8BCHWA/DMPlfD7/mpSTiJfL5WylUnEAxho9HcBZJpNRuVzuIZ5bgxtj+onoFMBACtin3IrIhNb67nPNF9xaOwrgCEBfE7BPvQcwzcznPlDFrbXzAPYAdLUA+5IXAIvMfBAFSETIWrtBRGvR+QdwdZkAbCql1iPYAOA2oHHCRrj8AvxBUqlUGq8OgOiYiLpbvUxEnkVkqmagUcBaG+1qb6s4gEdmzv4RnIiGlVJX/rnOuSERuUxoX/Nt+ccTV7EtbXHOFUVkJjaoGxEZ0VqHPm6MCYjoIv5bFpFDrfWsz3sHIDy7/nCVYlkAAAAASUVORK5CYII=);
                }
                .menu-icon2 {
                    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAABPElEQVQ4T63UMUsDMRQH8P+7KLe7HXRwUFxFJ1cr4hdo7hC53e/QTfQD3OQoHFK8pJtLcXATl1LngjgonKOLHFSSJznaUhwT35Ah8H55vCSPAEAp1WXmKyLaA7Dm9jziyxjTpaqqDoloFAC1Z1trz9M0vSal1BOAA4+KVlNmTdNs5Hn+7cAZgPUQkJlfpZRbznDgO4BOCAjgs9frJQvwAkA/EIQxZifLsikVRREnSXIDIAtBmflOSpnRAqmqahfAPgDhC0dR9LgEfZG/ef8PDgaDTSHEsW+FQghjjHmRUo7bW3aL1vqWmU990Xmeruv6rAWHw2HHWvsW+v2Y+XLZQ631mJndcAiJj1XwgZmPQjRm/lmCSqkpgO1A8LkF3aMmokkIBsBEUXRCZVkmcRzfz4erj2kATKy1/TRNR7/K4n2RwkIP6QAAAABJRU5ErkJggg==);
                }
                .menu-icon3 {
                    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+nhxg7wAAAL5JREFUOI3t1TEKwjAYhuHH4CjiJcQrdHER8QCeRnAX71LwAOLm4hEELyHqrkMVBNta24AIvpAlIW/+Px8hrTRNoY8lxuj6nBM2mOHQxgA79GrIHnQxxQhJwKKh8JkeFkHWckwmQb07LKMTIgtBnnSIVoUx/ERalWvRQjtnbtvgIDSr9PvSsqAKw3knLaMwnGf+Qb1Q9UUVBte00tzgfiuoU2TnJcg+rJisA+Y4RhIeMQ/YI8EK55qy831/gv0NuwMcQx3mmj0AAAAASUVORK5CYII=);
                }
                span {
                    display: inline-block;
                    line-height: 25px;
                    height: 13px;
                    margin-left: 8px;
                    font-size: 10px;
                    color: #fff;
                    font-style: normal;
                }
            }
        }
    }
}
.menu-content {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 21;
    width: 100%;
    height: 150px;
    padding: 17px;
    background-color: rgba(50, 51, 52, 0.7);
    visibility: visible;
    .bookshelf {
        position: absolute;
        right: 0;
        top: -50px;
        width: 60px;
        height: 25px;
        padding-left: 10px;
        border-radius: 25px 0 0 25px;
        font-size: 12px;
        line-height: 25px;
        color: #fff;
        background: rgba(50, 51, 52, 0.7);
    }
    .btn {
        display: inline-block;
        vertical-align: middle;
        height: 25px;
        line-height: 25px;
        text-align: center;
        border-radius: 2px;
        color: #fff;
        font-size: 14px;
    }
    .item {
        position: relative;
        height: 25px;
        margin-bottom: 18px;
        font-size: 0;

        .font {
            width: 25px;
            font-size: 16px;
        }
        .bar {
            width: 70%;
            height: 2px;
            background: #b2b2b2;
            border-radius: 2px;
            margin: 12px;
            .content {
                width: 25%;
                height: 2px;
                display: block;
                background: #b93221;
                border-radius: 2px;
            }
        }
    }
    .mode {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 18px;
        span {
            width: 80px;
            border: 1px solid #b2b2b2;
            &.defaul,
            &.night,
            &.eye {
                color: #b93221;
                border: 1px solid #b93221;
            }
        }
    }
    .change {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 18px;
        span {
            width: 80px;
            border: 1px solid #b2b2b2;
            &.isPrev,
            &.isNext {
                color: #a8a8a8;
            }
        }
        .catalog {
            border: none;
            font-size: 12px;
            color: #a8a8a8;
        }
    }
}
.lists {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    visibility: hidden;
    .content {
        position: absolute;
        width: 250px;
        height: 100%;
        visibility: visible;
        background-color: #fff;
    }
    // 标题
    .top-bar {
        width: 100%;
        height: 70px;
        padding-left: 20px;
        border-bottom: 1px solid #f2f2f2;
        background: #fff;
        .name {
            padding: 15px 0;
            line-height: 15px;
            font-size: 15px;
            color: #333;
        }
        .mu {
            font-size: 14px;
            color: #999;
        }
    }
    // 内容
    .titles {
        width: 100%;
        height: 100%;
        overflow: hidden;
        visibility: visible;
        .directory-list {
            width: 100%;
            .li {
                width: 100%;
                height: 40px;
                .msg {
                    padding-right: 30px;
                    margin-left: 20px;
                    font-size: 12px;
                    line-height: 40px;
                    color: #999;
                    &.active {
                        color: #b93321;
                    }
                }
            }
        }
    }
}
</style>
