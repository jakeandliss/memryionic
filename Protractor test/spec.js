describe('Add New Entry', function() {
  it('should add a title', function() {
    browser.get('http://localhost:8100/#/entries');
    browser.driver.manage().window().maximize();
    
    element(by.model("entry.title")).sendKeys("Protractor Title");
    element(by.model("entry.content")).sendKeys("Protractor content");
    element(by.model("newTag.text")).sendKeys("tes");
    element(by.model("newTag.text")).sendKeys(",");
    element(by.id("saveEntry")).click();
    var EntryList=element.all(by.repeater("entry in filterentries"));
    expect(EntryList.count()).toEqual(6);
    expect(EntryList.get(0).element(by.name("title")).getText()).toEqual("Protractor Title");
  });
});
describe('Test validation new Entry', function() {
  it('should add a title', function() {
    element(by.model("entry.title")).sendKeys("test value");
    element(by.model("entry.title")).clear();
    browser.sleep(1000);
    element(by.model("entry.title")).sendKeys("Protractor Title re-enter");
  });
});
describe("Add tag functionality",function(){
    it('Add functionality in new entry',function(){
        element(by.model("newTag.text")).sendKeys(protractor.Key.DOWN);
        browser.sleep(500);
        element(by.model("newTag.text")).sendKeys(protractor.Key.DOWN);
        browser.sleep(500);
        element(by.model("newTag.text")).sendKeys(protractor.Key.DOWN);
        browser.sleep(500);
        element(by.model("newTag.text")).sendKeys(protractor.Key.ENTER);
        element(by.model("newTag.text")).sendKeys("new tag");
        element(by.model("newTag.text")).sendKeys(",");
        browser.sleep(1000);
    })
});
describe("validation on add tag",function(){
    it("check after clear textbox",function(){
        element(by.name("addTag")).click();
        element(by.model("newTag.name")).sendKeys("tag");
        element(by.model("newTag.name")).clear();
        browser.sleep(1000);
        element(by.css('[ng-click="closeModal()"]')).click();
    })
});
describe("Add new Tag",function(){
    it('check add new tag', function(){
        element(by.name("addTag")).click();
        element(by.model("newTag.name")).sendKeys("test tag");
        element(by.id("saveNewTag")).click();
        var tagList= element.all(by.repeater("tag in filteredTags"));
        browser.executeScript('window.scrollTo(0,600);').then(function () {
            browser.sleep(1000);
            browser.executeScript('window.scrollTo(600,0)');
        })
    })
});

describe("Add child tag",function(){
    it("child tag",function(){
        element.all(by.repeater("tag in filteredTags")).then(function(Tags){
            Tags[10].element(by.className("btn")).click();
        });
        element(by.name("addTag")).click();
        element(by.model("newTag.name")).sendKeys("test child tag");
        element(by.css('[value="' + 10+ '"]')).click();
        element(by.id("saveNewTag")).click();
    })
});
describe('Add new Entry in selected tag', function() {
  it('should add a title', function() {
        element(by.model("entry.title")).sendKeys("Protractor Title test 2");
        element(by.model("entry.content")).sendKeys("Protractor content");
        element(by.model("newTag.text")).sendKeys("Entry New Tag");
        element(by.model("newTag.text")).sendKeys(",");
        element(by.id("saveEntry")).click();
        browser.sleep(1000);
        element(by.css('[ng-click="goBack()"]')).click();
         
  });
});
describe('edit Entry',function(){
    it('check Entry open in popup modal',function(){
        var EntryList=element.all(by.repeater('entry in filterentries'));
        EntryList.get(0).element(by.css('[ng-click="showBottomSheet(entry)"]')).click();
        browser.sleep(500);
        element(by.css('[ng-click="openModal($index)"]')).click();
        browser.sleep(500);
        element(by.model("selectedEntry.title")).clear();
        element(by.model("selectedEntry.title")).sendKeys("Update Entry");
        element(by.id('updateEntry')).click();
        browser.sleep(2000);
    })
});
describe("Edit tag",function(){
    it("check validation",function(){
        
        element.all(by.repeater("tag in filteredTags")).then(function(Tags){
            browser.actions().mouseMove(Tags[0].element(by.className('btn'))).perform();
            element(by.id("edittag")).click();
        });
         browser.sleep(500);
        element(by.model("selectedTag.name")).clear();
        browser.sleep(500);
        element(by.model("selectedTag.name")).sendKeys("Tag Edit");
        element(by.id("updateTag")).click();
        browser.sleep(1000);
    })
});
describe('open image',function(){
    it("should have Image",function(){
        browser.get('http://localhost:8100/#/entries');
        browser.driver.manage().window().maximize();
        browser.executeScript('window.scrollTo(0,300);');
        // var EntryList=element.all(by.repeater("entry in filterentries"));     
        // EntryList.get(0).element(by.id('popupButton')).click();
        element.all(by.repeater("entry in filterentries")).then(function(entries){
            browser.actions().mouseMove(entries[0].element(by.id("popupButton"))).click().perform();
        })
        //browser.actions().mouseMove(popupButton).click().perform();
        browser.sleep(500);
        var imageElement=element(by.css('[ng-swipe-left="Lightbox.nextImage()"]'));
        imageElement.sendKeys(protractor.Key.RIGHT);
        browser.sleep(500); 
        imageElement.sendKeys(protractor.Key.RIGHT);
        browser.sleep(5000);
        imageElement.sendKeys(protractor.Key.RIGHT);
        imageElement.sendKeys(protractor.Key.ESCAPE);
    })
});
describe("Delete Image/Video",function(){
    it("Delete will perform on update",function(){
        var EntryList=element.all(by.repeater('entry in filterentries'));
        EntryList.get(0).element(by.css('[ng-click="showBottomSheet(entry)"]')).click();
        browser.sleep(500);
        element(by.css('[ng-click="openModal($index)"]')).click();
        browser.sleep(500);
        element(by.css('[ng-click="removefromSelectedFile(resource)"]')).click();
        element(by.id('updateEntry')).click();
        browser.sleep(2000);
    })
});
describe("Delete Entry",function(){
    it("check confirm",function(){
        var EntryList=element.all(by.repeater('entry in filterentries'));
        EntryList.get(0).element(by.css('[ng-click="showBottomSheet(entry)"]')).click();
        browser.sleep(1000);
        element(by.css('[ng-click="remove()"]')).click();
        browser.sleep(500);
        element(by.css('[ng-click="deleteResource()"]')).click();
        browser.sleep(2000);
    })
});
describe("play Audio",function(){
    it("pause,mute and stop",function(){
        var EntryList=element.all(by.repeater("entry in filterentries"));
        browser.executeScript('window.scrollTo(0,250);').then(function () {});
        browser.sleep(2000);
        EntryList.get(0).element(by.id("playButton3")).click();
        browser.sleep(5000);
        EntryList.get(0).element(by.id("playButton3")).click();
        browser.sleep(1000);
        EntryList.get(0).element(by.id("playButton3")).click();
        browser.sleep(2000);
        EntryList.get(0).element(by.id("muteButton3")).click();
        browser.sleep(1000);
        EntryList.get(0).element(by.id("muteButton3")).click();
        browser.sleep(2000)
        EntryList.get(0).element(by.id("stopButton3")).click();
        browser.sleep(2000);
    })
});
describe("Delete Audio File",function(){
    it("confirm Delete",function(){
        var EntryList=element.all(by.repeater("entry in filterentries"));
        EntryList.get(0).element(by.css('[ng-click="removeFile(resource,entry)"]')).click();
        browser.sleep(500);
        element(by.css('[ng-click="deleteResource()"]')).click();
        browser.sleep(2000);
        EntryList.get(0).element(by.css('[ng-click="removeFile(resource,entry)"]')).click();
        browser.sleep(500);
        element(by.css('[ng-click="deleteResource()"]')).click();
        browser.sleep(2000);
    })
});
describe("Delete pdf File",function(){
    it("confirm Delete",function(){
        var EntryList=element.all(by.repeater("entry in filterentries"));
        EntryList.get(0).element(by.css('[ng-click="removeFile(resource,entry)"]')).click();
        browser.sleep(500);
        element(by.css('[ng-click="deleteResource()"]')).click();
        browser.sleep(1000);
    })
});

