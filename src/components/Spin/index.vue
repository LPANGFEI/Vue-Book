<template>
    <section class="spin">
        <a-spin />
    </section>
</template>

<script>
export default {
    name: "Spin"
};
</script>

<style lang="scss" scoped>
.spin {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: #fff;
    text-align: center;
    z-index: 100;
    overflow: hidden;
}
</style>
