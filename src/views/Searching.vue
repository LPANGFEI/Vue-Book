<template>
    <section class="searching">
        <Spin v-show="isLoading" />
        <BookHeader :title="'搜索'" />
        <div class="container">
            <!-- 搜索框 -->
            <div class="search-bar">
                <a-auto-complete
                    allowClear
                    :dataSource="hotWorlds"
                    style="width: 100%"
                    @select="onSelect"
                    @search="handleSearch"
                    placeholder="请输入搜索内容"
                    ref="search"
                />
            </div>
            <!-- 热门推荐 -->
            <div class="hot-recommend">
                <div class="title">
                    <span>热门推荐</span>
                    <span class="tip" @click="replace">
                        <i>换一批</i>
                        <i class="icon"></i>
                    </span>
                </div>
                <div
                    class="content"
                    v-for="(hotRecommend, index) in hotRecommends"
                    :key="index"
                    @click="goToDetail(hotRecommend.word)"
                >{{hotRecommend.word}}</div>
            </div>
        </div>
    </section>
</template>

<script>
import { setTimeout } from "timers";
import BookHeader from "../components/BookHeader";

export default {
    name: "Searching",
    data: () => ({
        isLoading: true,
        dataSource: [],
        hotWorlds: [],
        searchHotWords: [],
        hotRecommends: [],
        fuzzySearchs: []
    }),
    components: {
        BookHeader
    },
    methods: {
        // 自动补全
        async getAutoData(value) {
            let res = await this.$http("/book/auto-complete?query=" + value);
            res = res.data;
            this.hotWorlds = res.keywords;
        },
        // 热门推荐
        async getHotWords() {
            let res = await this.$http("/book/search-hotwords");
            res = res.data;
            this.searchHotWords = res.searchHotWords;
            this.$nextTick(() => {
                this.replace();
            });
        },
        replace() {
            if (this.searchHotWords) {
                this.hotRecommends = [];
                for (var i = 0; i < 10; i++) {
                    let ran = ~~(Math.random() * 100);
                    this.hotRecommends.push(this.searchHotWords[ran]);
                }
            }
            this.$nextTick(() => {
                this.initLoading();
            });
        },
        initLoading() {
            setTimeout(() => {
                this.isLoading = false;
            }, 1000);
        },
        handleSearch(value) {
            this.getAutoData(value);
            this.dataSource = this.hotWorlds;
        },
        onSelect(title) {
            console.log("onSelect", title);
            this.$router.push({
                path: "/bookmore",
                query: {
                    title,
                    type: "search"
                }
            });
        },
        goToDetail(title) {
            this.$router.push({
                path: "/bookmore",
                query: {
                    title,
                    type: "search"
                }
            });
        }
    },
    created() {
        this.getHotWords();
    }
};
</script>

<style lang="scss" scoped>
.searching {
    width: 100%;
    height: 100vh;
    .container {
        width: 90%;
        margin: 0 auto;
    }
}
.search-bar {
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 20px;
    width: 100%;
    .icon {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAG1BMVEVHcEyZmZmZmZmampqampqZmZmZmZmZmZmZmZm+x9fIAAAACHRSTlMA5XQSKE7CmQNx6RMAAAH+SURBVFjD7Vc9U8JAED0gQKsywpUIo6YERmcscXSUEnUYKUEtKMXRIe0pSfZnSxKIIbfZu0MLi7yKLLx7+3XZhbEcOXL8AtbplIv6W1+f8cghwocmoXQEMQ46pgyATx3KHWzhUM2oQgqvSrdmaYqnCqcLEmqKgqzT2zi+OrufR59FX0NEvEdPt1xDJoqkvXnsRdFQjGL4k5cfw40yaWOpenZgWar8akq6QuFXqkVs6RQ5X03kmOyc2Vh6ZmRzcizUARVMGXU79GxINLGQmrDEicoUVt/5stlZmfcyKAO8agOimDZ+XIFImYM7XcX9jSswxBPpEWVBrpNFFCagIBe9RFAgmwIExcROq4i/C3+HJDv4/SsSpQwaZiKbK0TDjPEre7EyuxmUjO+Ck74yKBU8zhnuL3Fly9RbKeyMCaYNmTPGwXJjEzmOrmy6/hb9Uq4gb8YuENGvT9yejdHsJOZYEAw8Jy3hgPFVc08k8lzmqskXegZ+7FrJUa8Y463NJd5NhsphCf5D8HDubEa/S8nY6x/VF4tpYl3QkEnDNViUAPaVMlZq7/GuuVKmyJMM0WSXShnWS3BEe7MKkTKsF/vmhduMhgyzTsKDxVM/sXG5quVv1GqN4r7RkUEXO9eEsrvM0lzGY8YyghnLGFICGZ8Zy9RM/wXNGx2WI0eO/4pvXVtwjS2EstwAAAAASUVORK5CYII=);
        background-repeat: no-repeat;
        background-size: contain;
        z-index: 10;
    }
}
.hot-recommend {
    width: 100%;
    .title {
        position: relative;
        width: 100%;
        height: 25px;
        margin-bottom: 10px;
        font-size: 18px;
        color: #6b6b6b;
        font-style: normal;
        .tip {
            position: absolute;
            right: 0;
            bottom: 0;
            font-size: 10px;
            color: #bababf;
            font-style: normal;
            .icon {
                display: inline-block;
                width: 14px;
                height: 14px;
                vertical-align: middle;
                background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAnCAMAAABUv8o5AAAAjVBMVEX////8/P77+/34+Pr6+vz29viUlJaFhYf09PaIiIqPj5GKiozy8vSMjI6RkZPs7O7o6Ori4uTKysynp6mampyXl5nCwsTv7/Hl5ee7u72wsLKhoaOCgoTb293R0dPGxsienqDf3+HV1de4uLqtra+kpKbq6uy/v8G0tLapqaucnJ5/f4HNzc/W1ti9vb9Qf31QAAACK0lEQVQ4y+WU6bKbMAyFJeMF25gdQoDse3Lb93+8yr6X0LnJtNPf1QwMjD9LOgdh+A+Dicjf6RICAQEQ8T0ZcQAeVlH4Z2DsOxLTOoFZvFhQMgIj9g6jJZGt2qpJ5eladpy2eBxfMLHvG6eNVkrL4yZjxL1irLvUajT3YdjWRptmWVA+9oKJjVRpddjsimLfHuVDXgvmNX2LclDpdb2AiArFxc+7lsuMdMwApWawatx4OAt65ZzkLcrmUZcQ4YwhcuAHl95W7MvTCDBbprbKGYhZIiaQG1X/CM6Dx4gvbm5bwIz5XqAcbUV9UV66eZjhUtlLjr8lQ8ZutjlwSBh7YrCWuj/DjPmlRt4/Pr2cikJ3UkMC8dNXRrtTU+8gxCSB5ce03s1SYwQBcmxyakzg0xDrFPmdniYsoc1x5eQKWJidiFH+bONS87DSVhMmCAOSVYbxYV/t5SdnjVHyx4QFbXtlr3kY2TgKI5x81No43c9KOVKRrduuI7/lUxWLklY+dF/MGFWNcGNcX/gswGPBff3zUg4rwAlDwmI4D9r2+8XXR026XEBXrpMnxsJXAP5RjerUrrwlLG9vxx3wRPC5/yCBfFjXo5HDst20h8qq+xp4GKuXX2t/dKOWJpWpVrIS0ac33ynGu3ZrtNJW6+bSkax3GGCEmJV97ez2souBIbxiM/yXd2/WdGhw/qejxo+utzcOs/Q+iAnHQTKdMO8DQzYUVD7hfgop4F/jF16jG+TevfgUAAAAAElFTkSuQmCC);
                background-repeat: no-repeat;
                background-size: contain;
            }
        }
    }
    .content {
        width: 100%;
        height: 40px;
        font-size: 16px;
        line-height: 40px;
        border-bottom: 1px solid #eee;
    }
}
</style>
