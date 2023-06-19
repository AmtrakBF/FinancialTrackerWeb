<script setup lang="ts">
import Transaction from '../components/TransactionComponent.vue'
</script>

<template>
    <div class="flex-container">
        <div class="flex-header">
            <img src="/atbfLogo.png" width="48">
            <div class="flex-header-title">
                <h4>$5,003.33</h4>
                <h3>Wallet</h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" width="30">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
            <h5>Riley</h5>
        </div>

        <div class="flex-body">
            <Transaction date="06/28/2023" description="Hannaford ToGo Order" amount="$202.56" transaction-type="withdraw"/>
            <Transaction date="06/28/2023" description="Gas" amount="$22.43" transaction-type="withdraw"/>
            <Transaction date="06/26/2023" description="Safe Transfer" amount="$250.00" transaction-type="transfer"/>
            <Transaction date="06/26/2023" description="Paycheck" amount="$287.00" transaction-type="deposit"/>
        </div>

        <div class="absolute-button-add">
            <img src="../components/imgs/plus.png" width="48" style="display: block;">
        </div>

        <div class="flex-footer">
            <p>Copyright © 2023 Riley Juniewic. All rights reserved.</p>
            <div class="footer-privacy">
                <h6>Privacy Policy</h6>
                <h6>Terms & Conditions</h6>
            </div>
            <div class="footer-social">
                <img src="../components/icons/linkedin.svg" width="32" style="filter: opacity(.75);">
                <img src="../components/icons/github.svg" width="32" style="filter: opacity(.75);">
            </div>
        </div>
    </div>    
</template>

<style scoped>
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
}

.flex-container {
    display: flex;
    flex-direction: column;

    min-height: 100vh;
    max-height: 100vh;
    margin: 0px 176px;
}

.flex-header {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;

    padding: 20px 48px;

    border-bottom: 1px solid var(--black10);
}

.flex-header-title {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
}

.flex-header h5 {
    color: var(--black100);
}

.flex-header-title h4 {
    padding-right: 32px;
    color: var(--primary);
}

.flex-body {
    margin: 0px 160px 16px 160px;
    overflow-y: auto;
    flex: 1;
}

.transaction-container {
    margin: 16px 32px;
    padding: 20px 16px;
    display: flex;

    align-items: center;
    justify-content: space-between;

    background-color: var(--black10);
    border-radius: 15px;
}

.transaction-group1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.transaction-group1 p {
    padding-left: 64px;
}

.flex-footer
{
    margin: 0px 160px;
    margin-top: auto;
    padding: 20.5px 32px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-top: 1px solid var(--black10);
}

.footer-privacy {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 290px;
}

.footer-social {
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    width: 80px;
}

.absolute-button-add {
    position: absolute;
    bottom: 126px;
    right: 214px;

    background-image: linear-gradient(to right, var(--primary), var(--secondary));
    border-radius: 50%;
    padding: 8px;
}
</style>
