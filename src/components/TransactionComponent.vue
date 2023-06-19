<script lang="ts">
import type { Transaction } from '@/models/Transaction';
import { defineComponent } from 'vue';


    export default defineComponent({
        props: {
            date: { type: String, required: true },
            description: { type: String, required: true },
            amount: { type: String, required: true },
            transactionType: { type: String, required: true },
        },
        data() {
            return {
               amountColor: "#4153E0",
            }
        },
        created() {
            this.GetAmountDisplayColor()
        },
        methods: {
            GetAmountDisplayColor() {
                switch(this.transactionType) {
                    case "deposit" : this.amountColor = "#E0585F"; break
                    case "withdraw" : this.amountColor = "#4153E0"; break
                    case "transfer" : this.amountColor = "#8539ED"; break
                    default: this.amountColor = "#E0585F";
                }
                console.log(this.amountColor)
            }
        }
    })
</script>

<template>
    <div class="transaction-container">
        <div class="transaction-group1">
            <h6>{{ date }}</h6>
            <p>{{ description }}</p>
        </div>
        <h4 :style="{ color: amountColor }">{{ amount }}</h4>
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
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.transaction-group1 p {
    padding-left: 64px;
}
</style>