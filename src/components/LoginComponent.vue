<script lang="ts">
import UserService from '@/services/UserService';
import { defineComponent } from 'vue';
import InputBoxComponent from './common/InputBoxComponent.vue';
import ButtonComponent from './common/ButtonComponent.vue';

export default defineComponent({

    data() {
        return {
            email: "",
            password: ""
        }
    },
    components: {
        InputBoxComponent,
        ButtonComponent
    },
    methods: {
        Login() {
            UserService.Login(this.email, this.password)
            .then(response => {
                this.$emit('getUser', response.data)
                this.$emit('isDisplayed', false)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
})
</script>

<template>
    <body class="body-global">
        <div class="wrapper-global">
            <div class="container-global">
                <div class="header-global">
                    <h2>Login</h2>
                    <img @click="$emit('isDisplayed', false)" src="./imgs/x-icon.png" height="32" width="32">
                </div>
                <div class="content-global">
                    <div class="input-box">
                        <h5>Email: </h5>
                        <InputBoxComponent class="input-box-comp" @onUpdate="newValue => email = newValue"/>
                    </div>
                    <div class="input-box">
                        <h5>Password:</h5>
                        <InputBoxComponent class="input-box-comp" inputType="password" @onUpdate="newValue => password = newValue"/>
                    </div>
                </div>
                <div class="submit-buttons">
                    <ButtonComponent title="Register" @OnClick=""/>
                    <ButtonComponent title="Login" @OnClick="Login"/>
                </div>
            </div>
        </div>
    </body>
</template>

<style scoped>

.header-global h2 {
    flex: 2;
    display: flex;
    justify-content: center;
}

.input-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
}

.input-box h5 {
    flex: 1;
    padding: 0px 16px;
    text-align: center;
}

.input-box-comp {
    flex: 2;
    width: 100%;
}

.submit-buttons {
    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: row;
    padding: 20px;
}
</style>