/**
* @description This function shuffles an array of elements using the Fisher-Yates
* shuffle algorithm.
* 
* @param { any[] } array - The `array` input parameter is the array to be shuffled.
*/
export const shuffleArray = (array: any[]) => 
/**
* @description The given function is a sort function for an array that randomly
* shuffles the elements of the array during each iteration of the sort process.
*/
[...array].sort(() => Math.random() - 0.5)
