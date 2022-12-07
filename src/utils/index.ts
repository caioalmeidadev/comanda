export default function addZeroes(num: string, len: number): string {

    var counter = num.length;

    while (counter < len) {

        num = "0" + num;

        counter++;

    }

    return num;
}