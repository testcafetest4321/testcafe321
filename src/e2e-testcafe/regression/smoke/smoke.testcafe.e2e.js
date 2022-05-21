import { getRole } from "../../config/get-role";
import ConfigData from "../../../config_main/testcafe-config";
import HomePageObject from "../../page-objects/home-page-object";

const homePageObject = HomePageObject.get();

fixture('e-commerce app login')
    .beforeEach(async t => {
        await t.useRole(getRole());
        await t.wait(2000);
    });

test.meta({testType: 'smoke', severity: 'high', author:'test123'})
    ('Check links successfull display', async t => {
        await t.expect(homePageObject.isExists().exists).ok('Home Page postoji')
            .expect(await homePageObject.getLabel()).contains(`Hello, ${ConfigData.username}`)
        
        await t.expect(homePageObject.getLocation()).contains(homePageObject.homePage);
})

test.meta({testType: 'smoke', severity: 'medium', author:'test123'})
    ('Check if links can be traversed', async t => {
        const links = homePageObject.getLinks();
        for(let i=0; i < await links.count; i++){
            await 
                t.wait(2000)
                .click(links.nth(i))
                .expect(homePageObject.getLocation())
                .contains(homePageObject.homePage+homePageObject.links[i], 
                    'link je pravilno prikazan');
                }
    })