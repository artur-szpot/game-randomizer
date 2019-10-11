/**
 * A helper class containing functions useful for the randomizing sub-applications.
 */
class General {
    /** Changes an array of items into a comma-separated string listing all of them. */
   static list(source) {
       var comma = "";
       var result = "";
       for (let i = 0; i < source.length; i++) {
           result += comma + source[i];
           comma = ", ";
       }
       return result;
   }

   /** Produces a comma-separated list with those items from source having indices as provided by indices. */
   static listWithIndices(source, indices) {
       var comma = "";
       var result = "";
       for (let i = 0; i < indices.length; i++) {
           result += comma + source[indices[i]];
           comma = ", ";
       }
       return result;
   }

   /** Checks whether applying the change will not result in overflow - if so, sets the value back to 0. */
	static validateNewChosen(current, change, max) {
		let retval = current + change;
		if (retval < 0) {
			retval = max - 1;
		} else if (retval >= max) {
			retval = 0;
		}
		return retval;
	}

   /** Checks whether applying a given change to the current value of the [min, max, current] array would cause it to be invalid. */
   static validateMinMaxCurr(values, change) {
      if (values[2] + change < values[0]) { return false; }
      if (values[2] + change > values[1]) { return false; }
      return true;
   }

   /** Returns a random intiger from between min and max, inclusive on both ends. */
	static random(min, max) {
		return min + Math.floor(Math.random() * (max - min + 1));
	}

    /** Returns a random boolean. */
	static randomBool() {
		return this.random(0, 1) === 0;
	}
    
    /** Removes a number of random elements from the source and returns them as a new array. */
	static randomFromArray(source, count) {
		var result = [];
		for (let i = 0; i < count; i++) {
			var chosen = this.random(0, source.length - 1);
			result.push(source[chosen]);
			source.splice(chosen, 1);
		}
		return result;
	}
}

export default General;


