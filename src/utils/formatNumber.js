// Форматирование чисел
const formatNumber = (value) => {
    return Intl.NumberFormat('ru-Ru').format(value);
}

export default formatNumber;