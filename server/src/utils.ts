export function deepCopy(array: number[][]): number [][] {
    const tab = array.map((itm) => {
        return itm.map((value) => {
            return value;
        });
    });
    return tab;
}
