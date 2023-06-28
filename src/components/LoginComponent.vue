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
    <body>
        <div class="wrapper">
            <div class="container">
                <div class="header">
                    <h2>Login</h2>
                    <img @click="$emit('isDisplayed', false)" src="./imgs/x-icon.png" height="32" width="32">
                </div>
                <div class="content">
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
body {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    background-color: var(--black25);
    height: 100%;
    width: 100%;

    z-index: 1;
}

.wrapper {
    width: 516px;
    background-color: white;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border-radius: 10px;
}

.container {
    background-image: linear-gradient(to right, var(--primary25), var(--secondary25));
    border: 1px solid var(--black100);

    color: var(--black100);
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.header {
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
}

.header img:hover {
    cursor: pointer;
}

.header h2 {
    flex: 2;
    display: flex;
    justify-content: center;
}

.content {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
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