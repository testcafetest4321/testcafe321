import { Selector, ClientFunction, t } from "testcafe";
import ConfigData from "../../config_main/testcafe-config";
import { BaseObject } from "./base-object";

export default class ShoePageObject {

    constructor(selector){
        this.homePage = `${ConfigData.appUrl}men`
        this.selector = selector;
        this.itemsInBasket = [];
    }
    getLocation = ClientFunction(() => document.location.href);

    static get(parent = Selector('.men__categories')){
        return new ShoePageObject(parent);
    }

    async compareAddedItemsInBasket(){
        const itemsInBasketSelector = Selector('.shoeItem__title');
        for(let i = 0; i < itemsInBasketSelector.length; i++){
            console.log(`compared items are : ${this.itemsInBasketSelector[i]} i ${this.itemsInBasket[i]}`)
            await t
                .wait(200)
                .expect(await itemsInBasketSelector.nth(i).innerText)
                .eql(this.itemsInBasket[i])
        }
    }

    async getTotalPrice(){
        return Selector('.totalPrice__total').innerText;
    }

    async deleteAllFromBasket(){
        const removeItems = Selector('.shoeItem__remove').with({timeout: 2000});
        console.log(`length is ${await removeItems.count}`);
        for(let i=0; i < await removeItems.count; i++){
            await t.wait(200).click(removeItems.nth(i+1));
        }
    }

    getInputPromoCode(){
        return Selector('.checkout__notEmpty > form > input')
    }
    getItem (){
        return Selector('.shoeComponent')
            .nth(0)
            .find('.shoeComponent__add')

    }

    allLinks(){
        console.log(`iznosi ${Selector('.menWomenFootwear')
                .child('a')
                .with({timeout: 5000})}`)
        return Selector('.menWomenFootwear')
                .child('a')
                .with({timeout: 5000})
    }
    
    async getAllShoeTypes (){

    }

    isExists() {
        return this.selector;
    }

}