<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { ATBFError } from '@/models/ATBFError';
import ButtonComponent from './common/ButtonComponent.vue';

export default defineComponent({

    props: {
        errors: { type: Object as PropType<ATBFError>, required: true, default: {name: '', errors: []} }
    },
    components: {
        ButtonComponent
    },
    emits: ['isDisplayed'],
})
</script>

<template>
    <body class="body-global" id="body">
        <div class="wrapper-global">
            <div class="container-global">
                <div class="header">
                    <h3>Internal Error</h3>
                </div>
                <div class="content-global">
                    <div class="input-container" v-if="errors.errors.length > 0">
                        <h5 style="text-align: center;">{{ errors.errors }}</h5>
                    </div>
                    <div class="submit-buttons">
                        <ButtonComponent title="Close" border-color="var(--error)" background-color="var(--error50)" 
                        hover-background-color="var(--error)" @onClick="$emit('isDisplayed', false)"/>
                    </div> 
                </div>
            </div>
        </div>
    </body>
</template>

<style scoped>
#body {
    z-index: 2;
}

.header { 
    padding: 16px;
}

.container-global {
    background-color: var(--error50);
}

.input-container {
    padding: 16px;
}

.submit-buttons {
    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: row;
    padding: 20px;
}
</style>