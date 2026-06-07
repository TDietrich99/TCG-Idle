export class bigNumber{
    constructor(m,e){

        this.m = m;
        this.e = e;
    }
    display(){
        if(this.e > 9){
            return this.m.toFixed(3) + 'e' + this.e;
        }
        return Math.floor(this.m * Math.pow(10,this.e));
    } 
    normalize(){
        if(this.m >= 10){
            this.e+= Math.floor(this.m/10);
            this.m = this.m/10;
        }
        while(this.m < 1 && this.m != 0){
            this.m = this.m*10;
            this.e--;
        }
    }

    multiply(num2){
        if(num2 == ZERO || this == ZERO){
            this.m = ZERO.m;
            this.e = ZERO.e;
            return;
        }
        this.m *= num2.m;
        this.e += num2.e;
        this.normalize();
    }
    add(num2){
        if(!(num2 instanceof bigNumber)){
            console.log(num2);
            console.error('Kein bigNumber übergeben');
            return;
        }
        let newm = num2.m;
        let ediff = num2.e - this.e;
        // this ist viel größer als num2
        if(ediff < (-1 * EQUALTOLLERANCE)){
            return;
        }
        //num2 ist viel größer als this
        if(ediff > EQUALTOLLERANCE){
            this.m = num2.m;
            this.e = num2.e;
            return;
        }
        // exponentenangleichung von num2
        console.log(ediff)
        if(ediff != 0){
            newm = num2.m * Math.pow(10,ediff);
        }
        this.m += newm;
        this.normalize();
    }
}

export const ZERO = Object.freeze(new bigNumber(0, 0));
export const ONE = Object.freeze(new bigNumber(1, 0));
const EQUALTOLLERANCE = 14;