<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        title: { type: String, default: undefined }
    }
})
</script>

<template>
    <div class="input-row">
        <h5 v-if="title != undefined">{{title}}:</h5>
        <slot class="slot" />
    </div>
</template>

<style scoped>
.input-row {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    width: 100%;
}

.input-row h5 {
    padding: 0px 16px;
    text-align: center;
}
</style>