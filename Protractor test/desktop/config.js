exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.js'],
  capabilities: {
    browserName: 'firefox',
    // chromeOptions: {
    //     mobileEmulation: {
    //       deviceName: 'Apple iPhone 6'
    //     }
    //   }
  }
	// multiCapabilities: [{
	//   'browserName': 'firefox'
	// }, {
	//   'browserName': 'chrome'
	// }]
};