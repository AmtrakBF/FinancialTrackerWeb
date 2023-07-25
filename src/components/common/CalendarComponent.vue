<script lang="ts">
import DateService from '@/services/DateService';
import { defineComponent, type PropType } from 'vue';

import InputBoxComponent from './InputBoxComponent.vue';
export default defineComponent({
    props: {
        userDate: { type: Date },
        color: { type: String, default: "var(--black75)" },
        borderColor: { type: String, default: "var(--primary)" },
        backgroundColor: { type: String, default: "rgb(255, 255, 255, .9)" },
        hoverBackgroundColor: { type: String, default: "var(--black25)" },
        focusBorderColor: { type: String, default: "var(--secondary)" },
        disabledBackgroundColor: { type: String, default: "var(--black5)" },
        isDisabled: { type: Boolean, default: false }
    },
    emits: ["onUpdate"],
    data() {
        return {
            isDropDownActive: false,

            time: '12:00',
            mainKey: 0,
            weekKey: 0,

            month: [] as [
            ] as {
                week: number;
                days: Date[];
            }[],
            monthNames: ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decemeber"],
            currentMonthNumber: -1,
            currentMonthIndex: 0,

            currentYear: new Date().getFullYear(),
            currentDay: new Date()
        };
    },
    watch: {
        time() {
            this.SetTime()
        }
    },
    mounted() {
        if (this.userDate == undefined) {
            this.currentDay = new Date;
        }
        else {
            this.currentDay = this.userDate;
        }
        this.GetMonth(new Date().getMonth())
    },
    methods: {
        GetMonth(monthNum: number) {
            this.month = []
            this.month = DateService.GetMonth(monthNum, new Date().getFullYear());
            this.currentMonthNumber = this.month[0].days[6].getMonth()
            this.currentMonthIndex = this.currentMonthNumber
            this.currentYear = this.month[0].days[6].getFullYear()
            this.weekKey++
        },
        GetDayClass(day: Date) {
            if (day.toLocaleDateString() == this.currentDay.toLocaleDateString()) {
                return "selected-day";
            }

            if (day.getMonth() != this.currentMonthNumber) {
                return "other-month"
            }
            
            return "day";
        },
        
        SelectDay(day: Date) {
            this.currentDay = day;
            this.SetTime()
        },

        CloseDropDownMenu() {
            this.isDropDownActive = false;
        },

        OpenDropDown() {
            if (!this.isDisabled) {
                this.isDropDownActive = !this.isDropDownActive
            }
        },

        SetTime() {
            let [hours, mins] = this.time.split(':')

            if (Number.isNaN(hours) || Number.isNaN(mins)){
                return
            }

            this.currentDay.setHours(parseInt(hours))
            this.currentDay.setMinutes(parseInt(mins))


            console.log(this.currentDay)

            this.$emit("onUpdate", this.currentDay);
        },

        GetContainerClass() {
            if (this.isDisabled) {
                return 'is-disabled'
            }

            if (this.isDropDownActive) {
                return 'dropdown-container-active'
            }

            return 'container-child'
        }
    },
    components: { InputBoxComponent }
})
</script>

<template>
    <div class="dropdown-container"
    :style="{'--text-color' : color,
    '--background-color' : backgroundColor,
    '--hover-background-color': hoverBackgroundColor,
    '--disabled-bg-color' : disabledBackgroundColor,
    '--focus-border-color' : focusBorderColor,
    '--border-color' : borderColor}" :disabled="isDisabled">
        <div class="container" v-click-outside="CloseDropDownMenu" :class="{'is-disabled': isDisabled}">
            <div class="container-child" :class="GetContainerClass()" @click="OpenDropDown" :key="mainKey">
                <p>{{ currentDay.toLocaleDateString()}} {{ currentDay.toLocaleTimeString() }}</p>
                <div style="padding: 0px 8px;">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" width="16" height="16">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                    </svg>
                </div>
            </div>
            <div class="dropdown" :class="{'dropdown-active': isDropDownActive}">
                <div class="dropdown-item">
                    <div class="calendar">
                        <div class="header">
                            <input type="time" v-model="time" style="border-radius: 10px; padding: 5px; border: 1px solid black; text-align: center;">

                            <div class="month">
                                <h5 class="select-button" @click="GetMonth(--currentMonthIndex)">&#60;</h5>
                                <h5 style="flex: 1; text-align: center;">{{ monthNames[currentMonthNumber] }}, {{ currentYear }}</h5>
                                <h5 class="select-button" @click="GetMonth(++currentMonthIndex)">&#62;</h5>
                            </div>

                        </div>
                        <div :key="weekKey">
                            <div class="week" v-for="week in month">
                                <div :class="GetDayClass(day)" @click="SelectDay(day)" v-for="day in week.days">
                                    <p>{{ day.getDate() }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.calendar {
    background-color: white;
    padding: 10px;
    border-radius: 10px;
}

.month, .header{
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px;

    margin-left: 5%;
}

.month {
    flex: 2;
}

.header input:hover {
    cursor: pointer;
}

.month h5 {
    padding: 1fr;
}

.week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
}

.select-button {
    width: 20%;
    text-align: center;
}

.select-button:hover {
    cursor: pointer;
    color: var(--secondary);
}

.day {
    padding: 1fr;
    border-radius: 10px;
    margin: 5px;
}

.day:hover, .other-month:hover {
    cursor: pointer;
    background-color: var(--secondary25);
}

.selected-day {
    background-color: var(--secondary50);
    border-radius: 10px;
    margin: 5px;
}

.other-month {
    background-color: var(--black5);
    border-radius: 10px;
    margin: 5px;
}

.dropdown-container {
    --text-color: black;
    --background-color: white;
    --hover-background-color: grey;
    --disabled-bg-color: grey;
    --focus-border-color: black;
    --border-color: black;


    flex: 2;
}

.container {
    position: relative;

    min-height: 39px;
    max-height: 39px;

    min-width: 260px;

    user-select: none;
}

.container-child {
    display: flex;
    align-items: center;
    justify-content: space-between;

    min-height: 39px;
    max-height: 39px;
    
    font-size: 16px;

    width: 100%;
    cursor: pointer;
    
    color: var(--text-color);
    background-color: var(--background-color);

    border: 1px solid var(--border-color);
    border-radius: 10px;
}

.is-disabled {
    background-color: var(--disabled-bg-color);
}

.is-disabled:hover {
    cursor: default;
}

.container div p {
    padding: 8px;
}

.dropdown {
    position: absolute;
    display: none;
    user-select: none;
    z-index: 1;

    background-color: white;

    width: 100%;
    top: 2.4em;
    left: 0;
    
    border-radius: 0px 0px 10px 10px;
    outline: 1px solid var(--border-color);
}

.dropdown-item {
    border-radius: 10px;
    background-color: var(--background-color);
    min-height: 37px;
}

.dropdown-active {
    display: block
}

.dropdown-container-active {
    border-radius: 10px 10px 0px 0px;
}
</style>