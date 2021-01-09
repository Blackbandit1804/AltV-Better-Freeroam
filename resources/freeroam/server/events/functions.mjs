export function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
};

export function randomNumber(min, max) {  
    return Math.round(Math.random() * (max - min) + min); 
}

export function getRandomListEntry(list){
    return randomNumber(0, list.length - 1);
}

export default {
    shuffle,
    randomNumber,
    getRandomListEntry
}