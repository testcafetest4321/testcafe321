import { getRole } from "../../config/get-role";
import {Selector, ClientFunction } from "testcafe";
import ConfigData from "../../../config_main/testcafe-config";
import ShoePageObject from "../../page-objects/shoes-page-object";

const shoePageObject = ShoePageObject.get();

fixture('e-commerce app login')
    .beforeEach(async t => {
        await t.useRole(getRole());
        await t.wait(2000);
        await t
            .click(Selector('.header__navItems')
                .withText('Muska odjeca'))
            .wait(2000);
    });

test.meta({testType: 'regression', severity: 'high', author:'test123'})
    ('Check link correctness', async t => {
        const { version } = require('testcafe/package.json');
        console.log("Testcafe Version " + version);
        await t.expect(shoePageObject.isExists().exists).ok('Shoe Page postoji')        
        await t.expect(await ClientFunction(() => window.location.href)()).contains(shoePageObject.homePage);
})

test.meta({testType: 'regression', severity: 'medium', author:'test123'})
    ('Add items from categories in basket', async t => {
        const allLinks = shoePageObject.allLinks();
        console.log(`links are ${await allLinks.count}`)
        for(let i=0; i < await allLinks.count; i++){
            await 
                t.wait(2000)
                .click(allLinks.nth(i))
                .wait(500)
                .click(shoePageObject.getItem())
                .wait(500)

            shoePageObject.itemsInBasket.push(await shoePageObject.getItem()
                .prevSibling('.shoeComponent__name1')
                .child('span').innerText)

            console.log(`text is ${shoePageObject.itemsInBasket}`)

            await t.click(Selector('.header__navItems')
                .withText('Muska odjeca')
                .parent('a'))

                }
})

test.meta({testType: 'regression', severity: 'medium', author:'test123'})
    ('Check if items are added in basket', async t => {
        await t
            .wait(500)
            .click(Selector('.header__navRight > a[href="/checkout"]'))
            .expect(parseInt(await Selector('a').withAttribute('href', '/checkout')
                .nextSibling('span').innerText))
            .gte(5)
            .wait(4000)

        await shoePageObject.compareAddedItemsInBasket();
})


test.meta({testType: 'regression', severity: 'medium', author:'test123'})
    ('Check if promo codes can be deleted\
        from the basket', async t => {
        const regex = /\d+?(\,)\d+/
        await t
            .wait(500)
            .click(Selector('.header__navRight > a[href="/checkout"]'))
            .wait(500)
        const originalPrice = (await shoePageObject.getTotalPrice()).match(regex)[0]
            .replace(",", ".")*1000-20;
        console.log(originalPrice)

        await t
            .typeText(shoePageObject.getInputPromoCode(), '20EUROFF')
            .pressKey('enter')

        await t    
            .expect(parseFloat(originalPrice))
            .eql((await shoePageObject.getTotalPrice()).match(regex)[0].replace(",",".")*1000)
            .wait(8000)
        
        await shoePageObject.deleteAllFromBasket();
        
})