<script lang="ts">
import { type Transaction } from '@/models/Transaction';
import CurrencyService from '@/services/CurrencyService';
import { defineComponent, type PropType } from 'vue';


export default defineComponent({
    props: {
        transaction: { 
            type: Object as PropType<Transaction>, 
            required: true,
            }
    },
    data() {
        return {
            amountColor: "#4153E0",
            date: '',
            time: '',
            displayAmount: '',
            displayBalance: ''
        }
    },
    mounted() {
        this.GetAmountDisplayColor()
        this.displayAmount = CurrencyService.FormatNumber(this.transaction.amount)
        this.displayBalance = CurrencyService.FormatNumber(this.transaction.newBalance)
    },
    updated() {
        this.displayAmount = CurrencyService.FormatNumber(this.transaction.amount)
        this.displayBalance = CurrencyService.FormatNumber(this.transaction.newBalance)
    },
    methods: {
        GetAmountDisplayColor() {
            switch(this.transaction?.transactionType) {
                case 'Withdrawal' : this.amountColor = "#E0585F"; break
                case 'Deposit' : this.amountColor = "#4153E0"; break
                case 'TransferIn' : 
                case 'Transfer In' : this.amountColor = "#8539ED"; break
                case 'TransferOut' : 
                case 'Transfer Out' : this.amountColor = "#ffa585"; break
                default: this.amountColor = "#E0585F";
            }
        }
    }
})
</script>

<template>
    <div class="transaction-container">
        <div class="transaction-group1">
            <h5 style="border-right: 1px solid black; padding-right: 16px;">{{ transaction.date.toLocaleDateString() }}</h5>
            <h5 id="description" style="padding-left: 16px;">{{ transaction?.description }}</h5>
        </div>
        <div style="padding-left: 16px;">
            <h4 :style="{ color: amountColor }" v-if="transaction.transactionType === 'Withdrawal' || transaction.transactionType === 'TransferOut'">- {{ displayAmount }}</h4>
            <h4 :style="{ color: amountColor }" v-else>+ {{ displayAmount }}</h4>
            <p style="text-align: center;">Balance {{ displayBalance }}</p>
        </div>
    </div>
</template>

<style scoped>
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
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.transaction-group1 h6 {
    max-width: 104px;
    min-width: 104px;
}

#transaction-type {
    max-width: 104px;
    min-width: 104px;
    text-align: center;
}

#description {
    flex: 1;
    padding-left: 24px;
}
</style>