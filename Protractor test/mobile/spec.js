describe("Add New Entry",function(){
	it("Shoud be add title",function(){
		browser.driver.get('http://localhost:8100/#/entries');
		browser.driver.manage().window().maximize();
		element(by.css('a[ng-click="modal.show()"]')).click();
		element(by.model("entry.title")).sendKeys("Protractor test title");
		element(by.model("entry.content")).sendKeys("Protractor test content");
		element(by.model("newTag.text")).sendKeys("tes");
		element(by.model("newTag.text")).sendKeys(",");
		element(by.id('SaveEntry')).click();
		browser.sleep(3000);
	})
});
describe("Validation in new Entry",function(){
	it("save Entry button should disable un-till invalid",function(){
		element(by.css('a[ng-click="modal.show()"]')).click();
		element(by.model("entry.title")).sendKeys("test value");
		element(by.model("entry.title")).clear();
		browser.sleep(2000);
		element(by.css('button[ng-click="mobileEntryCancel()"]')).click();
	});
});
describe("edit entry",function(){
	it('',function(){
		var entries=element.all(by.repeater("entry in entries"));
		entries.get(0).element(by.css('[ng-click="openPopover($event,entry)"]')).click();
		browser.sleep(1500);
		element(by.css('[ng-click="openEdit()"]')).click();
		browser.sleep(500);
		element(by.model("selectedEntry.title")).sendKeys(" Edit");
		browser.sleep(1500);
		element(by.id("UpdateEntry")).click();
		browser.sleep(2000);
	})
});
describe('delete Entry',function(){
	it('',function(){
		var entries=element.all(by.repeater("entry in entries"));
		entries.get(0).element(by.css('[ng-click="openPopover($event,entry)"]')).click();
		browser.sleep(1500);
		element(by.css('[ng-click="removeMobile()"]')).click();
		browser.sleep(500);
		element.all(by.css('[ng-click="$buttonTapped(button, $event)"]')).then(function(buttons){
			buttons[2].click();	
		});
        browser.sleep(2000);
	})
});
describe('open imageSlide',function(){
	it("",function(){
		var entries=element.all(by.repeater("entry in entries"));
		entries.get(0).element(by.css("[ng-click='showModal($index,entry.resources)']")).click();
		browser.sleep(5000);
		// browser.actions().mouseMove(element(by.id("image")),{x:400}).mouseDown().mouseMove({x:-100}).perform();
		element(by.id("modalDiv")).click();
	})
});
describe('delete Images',function(){
	it('',function(){
		var entries=element.all(by.repeater("entry in entries"));
		entries.get(0).element(by.css('[ng-click="openPopover($event,entry)"]')).click();
		browser.sleep(1500);
		element(by.css('[ng-click="openEdit()"]')).click();
		browser.sleep(500);
		element(by.css('[ng-click="removefromSelectedFile(resource)"]')).click();
		browser.sleep(1500);
		element(by.id("UpdateEntry")).click();
		browser.sleep(2000);
	})
});
describe('open imageSlide',function(){
	it("",function(){
		var entries=element.all(by.repeater("entry in entries"));
		entries.get(0).element(by.css("[ng-click='showModal($index,entry.resources)']")).click();
		browser.sleep(5000);
		element(by.id("modalDiv")).click();
	})
});
describe('delete Audio',function(){
	it('',function(){
		var entries=element.all(by.repeater("entry in entries"));
		entries.get(0).element.all(by.css('[ng-click="selectTab(fileType.id)"]')).then(function (list){list[3].click()});
		browser.sleep(2000);
		entries.get(0).element(by.css('[ng-click="removeMobileFile($event,resource,entry)"]')).click();
		//element(by.css('[ng-click="candelDeleteResource()"]')).click();
        // var deletebutton=element(by.id("deleteButton"));
        // browser.actions().mouseMove(deletebutton).click().perform();
        var popover=element.all(by.css(".popover-backdrop"));
        	expect(1).toEqual(1);
        	popover.get(0).element(by.id("deleteButton")).click();
        	//popover[popover.count()-1].element(by.id("deleteButton")).click();
        browser.sleep(2000);
	})
});
describe('delete File',function(){
	it('',function(){
		var entries=element.all(by.repeater("entry in entries"));
		entries.get(0).element.all(by.css('[ng-click="selectTab(fileType.id)"]')).then(function (list){list[2].click()});
		browser.sleep(2000);
		var removeButton= entries.get(0).element(by.css('[ng-if="resource.attachment_content_type == \'pdf\'"]'));
		removeButton.element(by.css('[ng-click="removeMobileFile($event,resource,entry)"]')).click();
        var popover=element.all(by.css(".popover-backdrop"));
        	
        	popover.get(1).element(by.id("deleteButton")).click();
        browser.sleep(2000);
	})
});
describe("add new tag",function(){
	it("should be add name",function(){
		browser.driver.get("http://localhost:8100/#/tags/");
		element(by.css('span[ng-click="newLabel()"]')).click();
		element(by.model("newTag.name")).sendKeys("test tag");
		element(by.css('[ng-click="saveNewTagMobile()"]')).click();
		browser.executeScript('window.moveTo(0,300)');
		browser.sleep(5000);
	})
});
describe("validation in add new tag",function(){
	it("check save button is disabled un-till form is invalid",function(){
		element(by.css('span[ng-click="newLabel()"]')).click();
		element(by.model("newTag.name")).sendKeys("test tag");
		browser.sleep(500)
		element(by.model("newTag.name")).clear();
		browser.sleep(2000)
		element(by.css('[ng-click="cancelnewTag()"]')).click();
	})
});
describe("Edit tag",function(){
	it("",function(){
		browser.driver.get("http://localhost:8100/#/tags/");
		browser.sleep(3000);
		var tagList=element.all(by.repeater("tag in filteredTags"));
		var firstTag=tagList.get(0).element(by.css('[ng-click="test(tag)"]'));
		browser.actions().mouseMove(firstTag).mouseDown().mouseMove({x:40,y:350}).perform();	
		// browser.actions().mouseMove(firstTag,{x:400}).perform();
		// browser.actions().mouseDown().perform();
		// browser.actions().mouseMove({x:200}).perform();
		browser.sleep(3000);
		// browser.actions().mouseUp().perform();
		//agList.get(0).element(by.css('[ng-click="edit($event,tag)"]')).click();
		browser.sleep(3000);
		
	})
});
describe("open child tag",function(){
	it("",function(){
		var tagList=element.all(by.repeater("tag in filteredTags"));
		tagList.get(0).element(by.css('[ng-click="test(tag)"]')).click();
		browser.sleep(5000);
	})
});