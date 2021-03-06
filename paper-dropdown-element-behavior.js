/**
@license
    paper-dropdown-behavior: Behavior for paper-dropdown
    Copyright (c) 2017 Pushkar Anand

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

import { IronFormElementBehavior } from '@polymer/iron-form-element-behavior';
import { IronValidatableBehavior } from '@polymer/iron-validatable-behavior';

/**
 * Use `Polymer.PaperDropdownBehavior` to implement a custom validation
 * and filter methods.
 * @polymerBehavior Polymer.PaperDropdownBehavior
 */
const PaperDropdownBehaviorImpl = {
    properties: {
        /**
         * Maximum number of items to be selected if item is required and
         * multiple items can be selected, ignored otherwise.
         */
        maxLength: {
            type: Number
        },

        /**
         * Minimum number of items to be selected if item is required and
         * multiple items can be selected, ignored otherwise.
         */
        minLength: {
            type: Number
        }
    },

    /**
     * Checks if item satisfies the filter condition.
     * If it satisfies and has to be shown to the user,
     * true is returned, else false is returned.
     *
     * Override this method to implement your own custom filter
     * condition.
     *
     * @param searchText Text user entered in search field
     * @param item Current Item
     * @return {boolean}
     * @protected
     */
    _filterCheck(searchText, item) {
        const currentValue = this._getItemLabel(item);
        if (searchText === "" || currentValue === "") {
            return true;
        }

        const re = new RegExp(searchText, "gi");
        return (re.exec(currentValue) != null);
    },

    /**
     * Returns false if the element is required and don't have any value, and true otherwise.
     * @param value.
     * @return {boolean} true if required is true and has atleast one value OR values selected
     *                      is greater than minLenght but less than max length.
     */
    _getValidity() {
        if (this.multi) {
            if (this.disabled) {
                // Return true if disabled.
                return true;
            } else if (this.minLength || this.maxLength) {
                // Return false if items selected is less than minLength.
                if (this.minLength && this.value && this.value.length < this.minLength)
                    return false;

                // Return false if items selected is greater than maxLength.
                if (this.maxLength && this.value && this.value.length > this.maxLength)
                    return false;

                // Return true as number of items selected in the
                // required range.
                return true;
            } else if (!this.required) {
                // Return true if input is not required
                // and there is no min or max number of
                // elements that needs to be selected.
                return true;
            } else {
                // Item is required so value must be set.
                return (this.value != null && this.value !== "");
            }
        } else {
            return this.disabled || !this.required || (this.value != null && this.value !== "");
        }
    }
};

/** @polymerBehavior PaperDropdownBehavior */
export const PaperDropdownBehavior = [
    IronFormElementBehavior,
    IronValidatableBehavior,
    PaperDropdownBehaviorImpl
];

export default {
    behavior: PaperDropdownBehavior
};
