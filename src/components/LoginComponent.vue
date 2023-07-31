<script lang="ts">
import UserService from '@/services/UserService';
import { defineComponent } from 'vue';
import InputBoxComponent from './common/InputBoxComponent.vue';
import ButtonComponent from './common/ButtonComponent.vue';
import type { ATBFError } from '@/models/ATBFError';
import ErrorHandlingService from '@/services/ErrorHandlingService';

export default defineComponent({

    data() {
        return {
            email: "",
            password: "",

            emailError: {name: 'Email', errors: []} as ATBFError,
            passwordError: {name: 'Password', errors: []} as ATBFError,

            domErrors: [] as ATBFError[],
        }
    },
    mounted() {
        this.domErrors = [ this.emailError, this.passwordError ]
    },
    components: {
        InputBoxComponent,
        ButtonComponent
    },
    methods: {
        async Login() {
            try {
                let response = await UserService.Login(this.email, this.password)
                this.$emit('onSubmit', response.data)
            } catch (error) {
                console.log(error)
                ErrorHandlingService.GetErrors(this.domErrors, error)
            }
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
                    <div class="input-container">
                        <div class="input-row">
                            <h5>Email: </h5>
                        <InputBoxComponent class="input-box-comp" @onUpdate="newValue => email = newValue"/>
                        </div>
                        <div class="input-row">
                            <p></p>
                            <span v-if="emailError.errors.length > 0">*{{ emailError.errors[0] }}</span>
                        </div>
                    </div> 

                    <div class="input-container">
                        <div class="input-row">
                            <h5>Password:</h5>
                            <InputBoxComponent class="input-box-comp" inputType="password" @onUpdate="newValue => password = newValue"/>
                        </div>
                        <div class="input-row">
                            <p></p>
                            <span v-if="passwordError.errors.length > 0">*{{ passwordError.errors[0] }}</span>
                        </div>
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

.input-container {
    padding: 16px;
}

.input-row {
    display: grid;
    justify-content: center;
    align-items: center;

    grid-template-columns: 160px 1fr;
}

.input-row h5 {
    padding: 0px 16px;
    text-align: center;
}

.input-row span {
    color: var(--error);
    font-weight: 500;
}

.submit-buttons {
    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: row;
    padding: 20px;
}
</style>