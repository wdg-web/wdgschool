<template>
    <div id="profile">
        <!-- 用户头像信息 -->
        <user-info></user-info>

        <list-view class="order-list"></list-view>
    </div>
</template>

<script>
import UserInfo from "./childComps/UserInfo";
import ListView from "./childComps/ListView";

export default {
    name: "Profile",
    components: {
        UserInfo,
        ListView,
    },
};
</script>

<style scoped>
#profile {
    background-color: #f2f2f2;
}

.nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
}

.account {
    display: flex;
}

.account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
}

.account-item:last-of-type {
    margin-right: 0;
}

.account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
}

.account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
}

.account-info {
    margin-top: 6px;
}

.order-list,
.service-list {
    margin-top: 12px;
}
</style>
