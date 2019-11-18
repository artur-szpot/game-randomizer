/**
 * A helper class containing functions useful for the randomizing sub-applications.
 */
class General {
    /** Produces a comma-separated list with those items from source having indices as provided by indices. */
    static listWithIndices(source: string[] | number[], indices: number[]): string {
        var comma: string = "";
        var result: string = "";
        for (let i = 0; i < indices.length; i++) {
            result += comma + source[indices[i]];
            comma = ", ";
        }
        return result;
    }

    /** Checks whether applying the change will not result in overflow - if so, sets the value back to 0. */
    static validateNewChosen(current: number, change: number, max: number): number {
        let retval: number = current + change;
        if (retval < 0) {
            retval = max - 1;
        } else if (retval >= max) {
            retval = 0;
        }
        return retval;
    }

    /** Returns a random intiger from between min and max, inclusive on both ends. */
    static random(min: number, max: number): number {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    /** Returns a random boolean. */
    static randomBool(): boolean {
        return this.random(0, 1) === 0;
    }

    /** Returns a random intiger from base and variation, adding a portion of variation to the base. 
     * The portion is most probable to be 0 and increasingly less probable for higher numbers, up to variation itself.
     * The variation part also has a random sign.
     * The result must be at greater that or equal to zero. */
    static randomNormal(base: number, variation: number): number {
        let binaryTotal: number = [...Array(variation + 1).keys()].reduce((a, b) => a + 2 ** b);
        let weights: number[] = [...Array(variation + 1).keys()].map(value => binaryTotal / (2 ** value));
        let weightTotal: number = weights.reduce((a, b) => a + b);
        let breakpoints: number[] = [0].concat(weights.map(value => (value / weightTotal) * 100));
        for (let i = 1; i < breakpoints.length; i++) {
            breakpoints[i] += breakpoints[i - 1];
        }
        let percent: number = this.random(1, 100);
        for (let i = breakpoints.length - 1; i > -1; i--) {
            if (percent > breakpoints[i]) {
                return Math.max(0, base + i * (this.randomBool() ? 1 : -1));
            }
        }
        return -1;
    }

    /** Removes a number of random elements from the source and returns them as a new array. */
    static randomFromArray(source: any[], count: number): any[] {
        let result: any[] = [];
        for (let i = 0; i < count; i++) {
            let chosen: number = this.random(0, source.length - 1);
            result.push(source[chosen]);
            source.splice(chosen, 1);
        }
        return result;
    }
}

export default General;


