describe('Add New Entry', function() {
  it('should add a title', function() {
    browser.get('http://localhost:8100/#/entries');
    browser.driver.manage().window().maximize();
    
    element(by.model("entry.title")).sendKeys("Protractor Title");
    element(by.model("entry.content")).sendKeys("Protractor content");
    element(by.model("newTag.text")).sendKeys("tes");
    element(by.model("newTag.text")).sendKeys(",");
    element(by.id("saveEntry")).click();
    var EntryList=element.all(by.repeater("entry in entries"));
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
            Tags[11].element(by.className("btn")).click();
        });
        element(by.name("addTag")).click();
        element(by.model("newTag.name")).sendKeys("test child tag");
        element(by.css('[value="' + 11+ '"]')).click();
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

describe('delete entry',function(){
    it('',function(){
        var entries=element.all(by.repeater('entry in entries'));
        entries.get(0).element(by.css('[ng-click="showBottomSheet(entry)"]')).click();
        browser.sleep(500);
        element(by.css('[ng-click="remove()"]')).click();
        browser.sleep(1000);
        element(by.css('[ng-click="deleteResource()"]')).click();
        browser.sleep(1000);
    })
});
describe('delete entry',function(){
    it('',function(){
        var entries=element.all(by.repeater('entry in entries'));
        entries.get(0).element(by.css('[ng-click="showBottomSheet(entry)"]')).click();
        browser.sleep(500);
        element(by.css('[ng-click="remove()"]')).click();
        browser.sleep(1000);
        element(by.css('[ng-click="deleteResource()"]')).click();
        browser.sleep(1000);
    })
})
describe('edit Entry',function(){
    it('check Entry open in popup modal',function(){
        var EntryList=element.all(by.repeater('entry in entries'));
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
        // browser.get('http://localhost:8100/#/entries')
        browser.executeScript('window.scrollTo(0,350);');
        element.all(by.repeater("entry in entries")).then(function(entries){
            entries[0].element(by.id("popupButton0")).click();
        })
        var imageElement=element(by.css('[ng-swipe-left="Lightbox.nextImage()"]'));
        imageElement.sendKeys(protractor.Key.RIGHT); 
        imageElement.sendKeys(protractor.Key.RIGHT);
        imageElement.sendKeys(protractor.Key.RIGHT);
        // imageElement.sendKeys(protractor.Key.ESCAPE);
        // browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
        element(by.css('[ng-click="close($event)"]')).click();
    })
});
describe("Delete Image/Video",function(){
    it("Delete will perform on update",function(){
        var EntryList=element.all(by.repeater('entry in entries'));
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
        var EntryList=element.all(by.repeater('entry in entries'));
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
        var EntryList=element.all(by.repeater("entry in entries"));
        browser.executeScript('window.scrollTo(0,400);').then(function () {});
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
        var EntryList=element.all(by.repeater("entry in entries"));
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
        var EntryList=element.all(by.repeater("entry in entries"));
        EntryList.get(0).element(by.css('[ng-click="removeFile(resource,entry)"]')).click();
        browser.sleep(500);
        element(by.css('[ng-click="deleteResource()"]')).click();
        browser.sleep(1000);
    })
});
describe("check infinite scrolling",function(){
    it("",function(){
        browser.executeScript('window.scrollTo(0,800);');
        browser.sleep(500);
        browser.executeScript('window.scrollTo(0,2000);');
        browser.sleep(2000);
    })
});
describe("open shared entries",function(){
    it("",function(){
        element.all(by.repeater("tag in filteredTags")).then(function(Tags){
            Tags[10].element(by.className("btn")).click();
        });
        browser.sleep(2000);
    })
});
describe("edit shared Entries",function(){
    it("",function(){
        var EntryList=element.all(by.repeater('entry in entries'));
        EntryList.get(0).element(by.css('[ng-click="showSharedBottomSheet(entry)"]')).click();
        browser.sleep(500);
        element(by.css('[ng-click="openSharedModal()"]')).click();
        browser.sleep(500);
        element(by.model("newTag.text")).sendKeys("tes");
        element(by.model("newTag.text")).sendKeys(",");
        browser.sleep(1000);
        element(by.id('updateEntry')).click();
        browser.sleep(2000);
    })
});
describe("add group",function(){
   it("",function(){
      element(by.css('a[href="#/group"]')).click();
      browser.sleep(1000);
      element(by.css('[ng-click="newGroup()"]')).click();
      element(by.model("group.name")).sendKeys("Group");
      browser.sleep(500);
      element(by.id('addGroup')).click();
      browser.sleep(1000);
   })
});
describe("Add Members",function(){
   it("",function(){
      element.all(by.repeater("group in GroupList")).then(function(groups){
         groups[2].element(by.css('button[href="#/group/3"]')).click();
      })
      browser.sleep(2000);
      element(by.css('[ng-click="addMember()"]')).click();
      element(by.model("user.email")).sendKeys("test@gmail.com");
      element(by.model("user.email")).sendKeys(protractor.Key.TAB);
      browser.sleep(500);
      element(by.id('addUser')).click();
      browser.sleep(1000);
   });
});
describe("edit group",function(){
   it("",function(){
      element.all(by.repeater("group in GroupList")).then(function(groups){
         browser.actions().mouseMove(groups[0].element(by.className('btn'))).click().perform();
         browser.actions().mouseMove(element(by.id('editGroup0'))).click().perform();
      });
      browser.sleep(2000);
      element(by.model("selectedGroup.name")).clear();
      element(by.model("selectedGroup.name")).sendKeys("Group Edit");
      browser.sleep(2000);
      element(by.id('updateGroup')).click();
      browser.sleep(2000);
   })
});
describe("share Entry",function(){
   it("",function(){
      element(by.css('a[href="#/entries"]')).click();
      browser.sleep(1000);
      element(by.css('[ng-click="showBottomSheet(entry)"]')).click();
      element(by.css('[ng-click="share()"]')).click();
      element(by.model('user.email')).sendKeys("test2@gmail.com");
      element(by.model('user.email')).sendKeys(protractor.Key.TAB);
      element(by.id('add')).click();
      element.all(by.repeater("group in GroupList")).then(function(groups){
         groups[2].element(by.css('input[type="checkbox"]')).click();
      });
      element(by.css('[ng-click="shareEntry()"]')).click();
      browser.sleep(1000);
   })
});
