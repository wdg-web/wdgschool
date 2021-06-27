<template>
    <div id="pay">
        <!-- 标题和导航 -->
        <van-nav-bar
            safe-area-inset-top
            title="详情"
            fixed
            placeholder
            @click-left="onClickLeft"
            class="titles"
            >
            <template #left>
                <van-icon name="arrow-left" size="18" color="#00ac2c" />
                <span style="font-size: 18px; color: #00ac2c">返回</span>
            </template>
        </van-nav-bar>
    </div>
</template>

<script>
export default {
    name:'Pay',
}
</script>

<style>

</style>