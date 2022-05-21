import { Selector, ClientFunction, t } from "testcafe";
import ConfigData from "../../config_main/testcafe-config";
import { BaseObject } from "./base-object";

export default class HomePageObject {
    selector = Selector('body');
    homePage = `${ConfigData.appUrl}`;
    getLocation = ClientFunction(() => document.location.href);
    links = ["", "men", "women", "promocode"]

    static get(parent = Selector('body')){
        return new HomePageObject(parent);
    }
    
    async getLabel(){
        const helloPart = this.selector.find('.header__user')
            .child('.header__hello');
        return await helloPart.innerText;
    }

    getLocation(){
        return this.getLocation;
    }

    getLinks(){ return this.selector.find('span')
        .withAttribute('class', 'header__navItems')
        .parent('a') }



    async getCurrentPath(){
        ClientFunction(() => document.location.href);
    }


    isExists() {
        return this.selector;
    }

}