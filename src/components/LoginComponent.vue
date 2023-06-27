<script lang="ts">
import UserService from '@/services/UserService';
import { defineComponent } from 'vue';

export default defineComponent({

    data() {
        return {
            email: "",
            password: ""
        }
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
                        <input type="text" v-model="email">
                    </div>
                    <div class="input-box">
                        <h5>Password:</h5>
                        <input type="password" v-model="password">
                    </div>
                </div>
                <div class="submit-buttons">
                    <div class="button">
                        <h6>Register</h6>
                    </div>
                    <div class="button" @click="Login">
                        <h6>Login</h6>
                    </div>
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

.input-box input {
    flex: 2;
    width: 100%;
    padding: 8px;
    font-size: 16px;
    
    color: var(--black75);
    background-color: rgb(255, 255, 255, .9);

    border-radius: 10px;
    border: 1px solid var(--primary);
}

.input-box input:focus {
    outline-color: var(--secondary);
}

.submit-buttons {
    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: row;
    padding: 20px;
}

.button {
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--white25);

    border: 1px solid var(--black75);
    border-radius: 10px;

    margin: 0px 64px;
}

.button:hover {
    cursor: pointer;
    background-image: linear-gradient(to left, var(--primary), var(--secondary));
}

.button h6 {
    padding: 8px 16px;
}
</style>