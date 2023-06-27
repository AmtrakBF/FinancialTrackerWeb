export const clickOutside = {
    beforeMount: (el:any, binding:any) => {
        el.clickOutsideEvent = (event: { target: any; }) => {
        if (!(el == event.target || el.contains(event.target))) {
            binding.value();
        }
        };
        document.addEventListener("click", el.clickOutsideEvent);
    },
    unmounted: (el: { clickOutsideEvent: (this: Document, ev: MouseEvent) => any; }) => {
        document.removeEventListener("click", el.clickOutsideEvent);
    },
};