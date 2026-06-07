export class bigNumber {
    m;
    e;
    constructor(m = 0, e = 0) {
        this.m = m;
        this.e = e;
    }
    set(data) {
        this.m = data.m ?? 0;
        this.e = data.e ?? 0;
    }
    getSaveData() {
        return {
            e: this.e,
            m: this.m
        };
    }
    loadSaveData(data) {
        this.m = data.m;
        this.e = data.e;
    }
    display() {
        if (this.e > 6) {
            return this.m.toFixed(2) + 'e' + this.e;
        }
        return (Math.floor(this.m * Math.pow(10, this.e))).toLocaleString();
    }
    normalize() {
        if (this.m == 0 && this.e == 0) {
            return;
        }
        if (this.m >= 10 || this.m < 1) {
            let newe = Math.floor(Math.log10(this.m));
            this.e += newe;
            this.m = this.m / Math.pow(10, newe);
        }
    }
    transformToBn(num2) {
        let bn = new bigNumber();
        if (!isNaN(Number(num2))) {
            bn.m = Number(num2);
            bn.normalize();
            return bn;
        }
        console.log(num2);
        console.error('Kein bigNumber übergeben');
        return ZERO;
    }
    getvalue() {
        return new bigNumber(this.m, this.e);
    }
    multiply(other) {
        if (typeof other === "number") {
            this.multiply(this.transformToBn(other));
            return;
        }
        else if (typeof other !== "object") {
            console.error(other);
            console.error('Dafuq');
            return;
        }
        // now treat as bigNumber
        let num2 = other;
        if (num2.m == ZERO.m || this.m == ZERO.m) {
            this.m = ZERO.m;
            this.e = ZERO.e;
            return;
        }
        this.m *= num2.m;
        this.e += num2.e;
        this.normalize();
    }
    add(other) {
        if (typeof other === "number") {
            this.add(this.transformToBn(other));
            return;
        }
        else if (typeof other !== "object") {
            console.error(other);
            console.error('Dafuq');
            return;
        }
        // now treat as bigNumber
        let num2 = other;
        let newm = num2.m;
        let ediff = num2.e - this.e;
        if (ediff < -EQUALTOLLERANCE)
            return;
        if (ediff > EQUALTOLLERANCE) {
            this.m = num2.m;
            this.e = num2.e;
            return;
        }
        if (ediff !== 0) {
            newm = num2.m * Math.pow(10, ediff);
        }
        this.m += newm;
        this.normalize();
    }
}
export const ZERO = Object.freeze(new bigNumber(0, 0));
export const ONE = Object.freeze(new bigNumber(1, 0));
const EQUALTOLLERANCE = 14;
//# sourceMappingURL=currency.js.map