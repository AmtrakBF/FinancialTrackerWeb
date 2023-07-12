<script lang="ts">
import { type Transaction } from '@/models/Transaction';
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
            time: ''
        }
    },
    mounted() {
        this.GetAmountDisplayColor()
        this.FormatDate()
    },
    methods: {
        GetAmountDisplayColor() {
            switch(this.transaction?.transactionType) {
                case 'Withdrawal' : this.amountColor = "#E0585F"; break
                case 'Deposit' : this.amountColor = "#4153E0"; break
                case 'Transfer In' : this.amountColor = "#8539ED"; break
                case 'Transfer Out' : this.amountColor = "#ffa585"; break
                default: this.amountColor = "#E0585F";
            }
        },
        FormatDate() {
            let date =  this.transaction.date
            this.time = date.getHours() + ":" + date.getMinutes()
            this.date = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
        }
    }
})
</script>

<template>
    <div class="transaction-container">
        <div class="transaction-group1">
            <h6>{{ date }}</h6>
            <p id="transaction-type">{{ transaction.transactionType }}</p>
            <p id="description">{{ transaction?.description }}</p>
        </div>
        <h4 :style="{ color: amountColor }" v-if="transaction.transactionType === 'Withdrawal' || transaction.transactionType === 'Transfer Out'">-${{ transaction?.amount }}</h4>
        <h4 :style="{ color: amountColor }" v-else>${{ transaction?.amount }}</h4>
        <p>${{ transaction.newBalance }}</p>
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