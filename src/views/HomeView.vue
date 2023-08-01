<script lang="ts">
import { defineComponent } from 'vue';
import HomeComponent from '@/components/HomeComponent.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';

import type { ATBFError } from '@/models/ATBFError';
import ErrorHandlingService from '@/services/ErrorHandlingService';

export default defineComponent({
    components: {
        HomeComponent,
        ErrorComponent
    },
    data() {
        return {
            genericErrorKey: 0,
            genericError: { name: ErrorHandlingService.ErrorKeys.DefaultKey, errors:[] } as ATBFError,
            domErrors: [] as ATBFError[],

            isLoginDisplayed: false
        }
    },
    errorCaptured(err:any, instance:any, info:string) {
        this.genericError.errors.push(err.message)
        this.genericErrorKey++

        return false
    },
})

</script>

<template>
    <HomeComponent />
    <ErrorComponent v-if="genericError.errors.length > 0" style="z-index: 2;" :errors="genericError" @isDisplayed="genericError.errors = []" :key="genericErrorKey"/>
</template>