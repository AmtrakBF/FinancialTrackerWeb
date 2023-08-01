const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

export default {
    FormatNumber(num:number) {
        return USDollar.format(num)
    }
}