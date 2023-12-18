export const fieldIsInvalid = (carData) => {
    const requiredFields = [
        'imageUrl',
        'price',
        'weight',
        'speed',
        'about'
    ];

    return requiredFields.some(x => !carData[x])
}