webpackJsonp([1],{

/***/ 108:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 108;

/***/ }),

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/detail/detail.module": [
		263,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
module.exports = webpackAsyncContext;
webpackAsyncContext.id = 149;

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_search_search__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detail_detail__ = __webpack_require__(99);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
        this.maxRows = 50;
        this.myCallbackFunction = function (that, accountname, pinned) {
            //debugger;
            //that.updateResults(that.queryText, that.refiners, that.search.getPinnedItems());
            //that.items = that.search.getBestItems(that.queryText, that.maxRows);
            if (pinned) {
                that.pin(undefined, accountname);
            }
            else {
                that.unpin(undefined, accountname);
            }
        };
        //debugger;
        this.search = new __WEBPACK_IMPORTED_MODULE_2__providers_search_search__["a" /* SearchProvider */]();
        this.items = this.search.getBestItems("", this.maxRows);
    }
    HomePage.prototype.loadListItems2 = function () {
        this.items = this.search.getBestItems(this.queryText, this.maxRows);
        //this.updateResults(this.queryText, this.refiners, this.search.getPinnedItems());
    };
    HomePage.prototype.loadListItems2Clear = function () {
        console.log("loadListItemsClear");
        this.queryText = "";
        this.loadListItems2();
    };
    HomePage.prototype.updateList = function (ev) {
        console.log(ev.target.value);
        var queryText = ev.target.value;
        this.items = this.search.getBestItems(queryText, this.maxRows);
    };
    HomePage.prototype.pin = function (slidingItem, accountName) {
        //debugger;
        this.search.pinAccount(accountName);
        if (slidingItem) {
            slidingItem.close();
        }
        this.items = this.search.getBestItems(this.queryText, this.maxRows);
    };
    HomePage.prototype.unpin = function (slidingItem, accountName) {
        //debugger;
        this.search.unpinAccount(accountName);
        if (slidingItem) {
            slidingItem.close();
        }
        this.items = this.search.getBestItems(this.queryText, this.maxRows);
    };
    HomePage.prototype.call = function (phoneNumber) {
        if (phoneNumber) {
            window.location.href = "tel://" + phoneNumber;
        }
        else {
            alert("Phone number not available");
        }
    };
    HomePage.prototype.email = function (emailAddress) {
        if (emailAddress) {
            window.location.href = "mailto:" + emailAddress; //
        }
        else {
            alert("Email address not available");
        }
    };
    HomePage.prototype.viewItem = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__detail_detail__["a" /* DetailPage */], {
            selectedItem: item,
            queryText: this.queryText,
            //refiners: this.refiners,
            callback: this.myCallbackFunction,
            that: this
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\projects\directory\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Firm Directory\n    </ion-title>\n  </ion-navbar>\n\n  <ion-toolbar color="primary" id="simpleSearch">\n    <ion-row>\n      <ion-col>\n        <ion-searchbar [(ngModel)]="queryText" (keyup)="updateList($event)" (search)="loadListItems2()" (ionClear)="loadListItems2Clear()"\n          (ionCancel)="loadListItems2Cancel()" placeholder="Search">\n        </ion-searchbar>\n      </ion-col>\n    </ion-row>\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content style="background: #ccc">\n\n  <style>\n    .arrow-down {\n      margin: auto;\n      width: 20px;\n      height: 0;\n      border-left: 20px solid transparent;\n      border-right: 20px solid transparent;\n      border-top: 20px solid #003150;\n    }\n  </style>\n\n  <ion-list-header [hidden]="!isError" color="danger">\n    {{errorMessage}}\n  </ion-list-header>\n\n  <ion-list-header [hidden]="!isWarning" color="warning">\n    {{warningMessage}}\n  </ion-list-header>\n\n\n  <ion-row>\n    <ion-col>\n      <ion-list>\n        <ion-item-sliding #slidingItem *ngFor="let item of items">\n\n          <ion-item (click)="viewItem(item)">\n            <ion-avatar item-left class="item-avatar">\n              <img src="{{item.PictureUrl}}" style="width:80px;Height:80px;">\n            </ion-avatar>\n\n\n            <h2><span *ngIf="item.pinned"><i class="fa fa-thumb-tack" aria-hidden="true" ></i> </span>{{item.PreferredName}}</h2>\n            \n            <h3>{{item.Title}}</h3>\n            <h3>{{item.Department}}</h3>\n            <h3>{{item.Office}} {{item.PrimaryOfficeFloor}}</h3>\n\n          </ion-item>\n\n          <ion-item-options side="left">\n            <button ion-button (click)="pin(slidingItem,item.AccountName)" *ngIf="!item.pinned" color="dark">Pin</button>\n            <button ion-button (click)="unpin(slidingItem,item.AccountName)" *ngIf="item.pinned" color="dark">Unpin</button>\n            <button ion-button (click)="email(item.WorkEmail)" *ngIf="item.WorkEmail">Email</button>\n            <button ion-button (click)="call(item.WorkPhone)" *ngIf="item.WorkPhone" color="dark">Direct</button>\n            <button ion-button (click)="call(item.CellPhone)" *ngIf="item.CellPhone">Mobile</button>\n            <button ion-button (click)="call(item.HomePhone)" *ngIf="item.HomePhone" color="dark">Home</button>\n          </ion-item-options>\n        </ion-item-sliding>\n\n\n\n      </ion-list>\n    </ion-col>\n\n\n\n\n  </ion-row>\n\n\n\n\n</ion-content>'/*ion-inline-end:"C:\projects\directory\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(213);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_search_search__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_detail_detail__ = __webpack_require__(99);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_detail_detail__["a" /* DetailPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/detail/detail.module#DetailPageModule', name: 'DetailPage', segment: 'detail', priority: 'low', defaultHistory: [] }
                ]
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_detail_detail__["a" /* DetailPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_7__providers_search_search__["a" /* SearchProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(193);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { DetailPage } from '../pages/detail/detail';
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\projects\directory\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\projects\directory\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchProvider; });
/*import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';*/
/*
  Generated class for the SearchProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
//@Injectable()
var SearchProvider = (function () {
    //pinnedAccounts = [];
    //pinnedAccounts = [];
    function SearchProvider() {
        this.cachedResultsKey = 'directoryCachedResults';
        //challenge is for us to keep these next two members in step... 
        this.dataPinnedAndAll = { pinned: [], all: [] };
        //public http: Http) {
        //console.log('Hello SearchProvider Provider')
        var pinnedAccounts = this.getPinnedAccounts();
        this.dataPinnedAndAll = this.getItemsPinnedAndAll(pinnedAccounts);
    }
    SearchProvider.prototype.getItemsPinnedAndAll = function (pinnedItems) {
        var dataPinnedAndAll = { pinned: [], all: [] };
        var pinnedItemsWorkingCopy = pinnedItems; //this.getPinnedItems();
        for (var i = 0; i < DATA.length; i++) {
            ///var candidate = DATA[i];
            var candidateAccountName = DATA[i].AccountName;
            var index = pinnedItemsWorkingCopy.findIndex(function (pinnedItem) { return pinnedItem == candidateAccountName; });
            if (index == -1) {
                DATA[i]["pinned"] = false;
                dataPinnedAndAll["all"].push(DATA[i]);
            }
            else {
                DATA[i]["pinned"] = true;
                dataPinnedAndAll["pinned"].push(DATA[i]);
                dataPinnedAndAll["all"].push(DATA[i]);
                //may as well throw this away
                pinnedItemsWorkingCopy.splice(index, 1);
            }
        }
        return dataPinnedAndAll;
    };
    SearchProvider.prototype.getItemWithAccountName = function (candidateAccountName) {
        //return this.dataPinnedAndAll
        var index = this.dataPinnedAndAll["all"].findIndex(function (candidate) { return candidate.AccountName == candidateAccountName; });
        if (index == -1) {
            return undefined;
        }
        else {
            return this.dataPinnedAndAll["all"][index];
        }
        //.find(function(candidate){return })
    };
    SearchProvider.prototype.getAllItems = function () {
        return DATA;
    };
    SearchProvider.prototype.getFirst10Items = function () {
        return DATA.slice(0, 10);
    };
    SearchProvider.prototype.getBestItems = function (queryText, maxRows) {
        //debugger;
        if (!queryText) {
            queryText = "";
        }
        var filteredDataPinnedAndRest = { pinned: [], rest: [] };
        var matchingPinnedItems = this.getMatchingItems(this.dataPinnedAndAll["pinned"], queryText, true);
        var matchingPinnedItemsLength = matchingPinnedItems.length;
        //no need to consider anything but pinned items if either at least maxRows matching pinned items
        //or if no queryText value provided
        if (matchingPinnedItemsLength > maxRows || queryText == "") {
            filteredDataPinnedAndRest = { pinned: matchingPinnedItems.slice(0, maxRows), rest: [] };
        }
        else {
            //debugger;
            var matchingAllItems = this.getMatchingItems(this.dataPinnedAndAll["all"], queryText, false);
            filteredDataPinnedAndRest = { pinned: matchingPinnedItems, rest: matchingAllItems.slice(0, maxRows - matchingPinnedItemsLength) };
        }
        return filteredDataPinnedAndRest["pinned"].concat(filteredDataPinnedAndRest["rest"]);
    };
    SearchProvider.prototype.getMatchingItems = function (items, queryText, pinned) {
        var queryTextUpper = queryText.toUpperCase();
        //does the query contain a space?
        if (queryTextUpper.includes(" ")) {
            //look for a much more specific match
            return items.filter(function (candidate) {
                return ((candidate.PreferredNameUpperCase.startsWith(queryTextUpper)
                    ||
                        candidate.PreferredFirstNameUpperCase.startsWith(queryTextUpper)
                    ||
                        candidate.PreferredLastNameUpperCase.startsWith(queryTextUpper))
                    &&
                        candidate["pinned"] == pinned);
            });
        }
        return items.filter(function (candidate) {
            return (candidate.PreferredNameBitsUpperCase.find(function (bit) { return bit.startsWith(queryTextUpper); }) &&
                candidate["pinned"] == pinned);
        });
    };
    //pin related 
    SearchProvider.prototype.pinAccount = function (accountName) {
        //var pinnedAccounts = this.getPinnedAccounts();
        var pinnedAccounts = this.getPinnedAccounts();
        var index = pinnedAccounts.indexOf(accountName);
        //don't add duplicates
        if (index === -1) {
            pinnedAccounts.push(accountName);
            this.setPinnedAccounts(pinnedAccounts);
            console.log("pinned " + accountName);
            //adjust dataPinnedAndAll structure
            this.dataPinnedAndAll = this.getItemsPinnedAndAll(pinnedAccounts);
            return true;
        }
        return false;
    };
    SearchProvider.prototype.unpinAccount = function (accountName) {
        //var pinnedAccounts = this.getPinnedAccounts();
        var pinnedAccounts = this.getPinnedAccounts();
        var index = pinnedAccounts.indexOf(accountName);
        //don't remove if not there
        if (index > -1) {
            pinnedAccounts.splice(index, 1);
            this.setPinnedAccounts(pinnedAccounts);
            console.log("unpinned " + accountName);
            //adjust dataPinnedAndAll structure
            this.dataPinnedAndAll = this.getItemsPinnedAndAll(pinnedAccounts);
            return true;
        }
        return false;
    };
    SearchProvider.prototype.setPinnedAccounts = function (userArray) {
        window.localStorage.setItem(this.cachedResultsKey, JSON.stringify(userArray));
        console.log("storing " + JSON.stringify(userArray));
        //alert("storing " + JSON.stringify(userArray));
    };
    SearchProvider.prototype.getPinnedAccounts = function () {
        var userArray = JSON.parse(window.localStorage.getItem(this.cachedResultsKey));
        console.log("retieved " + JSON.stringify(userArray));
        //alert("retieved " + JSON.stringify(userArray));
        if (!userArray) {
            userArray = [];
        }
        if (userArray == null) {
            userArray = [];
        }
        return userArray;
    };
    return SearchProvider;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_search_search__ = __webpack_require__(76);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var DetailPage = DetailPage_1 = (function () {
    function DetailPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.item = navParams.get('selectedItem');
        this.isToggled = this.item["pinned"];
        this.search = new __WEBPACK_IMPORTED_MODULE_2__providers_search_search__["a" /* SearchProvider */]();
        this.callback = navParams.get('callback');
        this.that = navParams.get('that');
    }
    DetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DetailPage');
    };
    DetailPage.prototype.updatePinned = function () {
        var callback = this.navParams.get("callback");
        var that = this.navParams.get("that");
        callback(that, this.item.AccountName, this.isToggled);
    };
    DetailPage.prototype.viewItem = function (assignment) {
        //debugger;
        var item = this.search.getItemWithAccountName(assignment.AccountName);
        this.navCtrl.push(DetailPage_1, {
            selectedItem: item,
            //queryText: this.queryText,
            //refiners: this.refiners,
            callback: this.callback,
            that: this.that
        });
    };
    return DetailPage;
}());
DetailPage = DetailPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-detail',template:/*ion-inline-start:"C:\projects\directory\src\pages\detail\detail.html"*/'<!--\n  Generated template for the DetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>{{item.PreferredName}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n\n  <style>\n    #avatar {\n      background-color: #F5F5F5;\n      border: 1px solid #DDDDDD;\n      border-radius: 50% 50% 50% 50%;\n      padding: 4px;\n      width: 215px;\n      height: 215px;\n    }\n  </style>\n\n  <img id="avatar" src=\'{{item.PictureUrl}}\'>\n\n  <p>{{item.PreferredName}}</p>\n\n  {{item.Title}}\n\n  <!--2017/07/31 - Mark would like us to remove refiners feature - too complex for users...\n	<p color="primary"(click)="peoplePivot(\'Department\',item.Department,\'Department\')" *ngIf="item.Department">{{item.Department}}</p>\n\n	<p color="primary" (click)="peoplePivot(\'Office\',item.Office,\'Office\')" *ngIf="item.Office">{{item.Office}}</p>\n	-->\n\n  <h3 *ngIf="item.Groups.length>1">Groups</h3>\n  <p *ngFor="let group of item.Groups">{{group}}</p>\n\n\n  <p>{{item.Office}} {{item.PrimaryOfficeFloor}}</p>\n\n\n  <p *ngIf="item.WorkPhone">Direct <a href="tel:{{item.WorkPhone}}">{{item.WorkPhone}}</a></p>\n  <p *ngIf="item.CellPhone">Mobile <a href="tel:{{item.CellPhone}}">{{item.CellPhone}}</a></p>\n  <p *ngIf="item.HomePhone">Home <a href="tel:{{item.HomePhone}}">{{item.HomePhone}}</a></p>\n\n  <p><a href="mailto:{{item.WorkEmail}}">{{item.WorkEmail}}</a></p>\n\n  <ion-list>\n    <ion-item>\n      <ion-label>Pinned</ion-label>\n      <ion-checkbox [(ngModel)]="isToggled" (ionChange)="updatePinned(item.AccountName)"></ion-checkbox>\n    </ion-item>\n  </ion-list>\n\n  <!-- Pinned <ion-toggle [(ngModel)]="isToggled" (ionChange)="updatePinned(item.AccountName)"></ion-toggle> -->\n\n  <h3 *ngIf="item.Assignments.length>0">Assignments</h3>\n\n  <!--\n\n  <ion-item (click)="viewItem(assignment)" *ngFor="let assignment of item.Assignments">\n    <ion-avatar item-left class="item-avatar">\n      <img src="{{assignment.PictureUrl}}">\n    </ion-avatar>\n\n\n    <h2><span *ngIf="assignment.pinned"><i class="fa fa-thumb-tack" aria-hidden="true" ></i> </span>{{assignment.PreferredName}}</h2>\n\n  </ion-item>\n\n  -->\n\n\n  \n    <p  *ngFor="let assignment of item.Assignments"><a (click)="viewItem(assignment)" style="text-decoration:underline;text-decoration-line:underline">{{assignment.PreferredName}}</a></p>\n\n  \n\n\n\n\n\n</ion-content>'/*ion-inline-end:"C:\projects\directory\src\pages\detail\detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], DetailPage);

var DetailPage_1;
//# sourceMappingURL=detail.js.map

/***/ })

},[194]);
//# sourceMappingURL=main.js.map