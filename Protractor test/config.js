exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.js'],
  capabilities: {
    browserName: 'firefox'
  }
	// multiCapabilities: [{
	//   'browserName': 'firefox'
	// }, {
	//   'browserName': 'chrome'
	// }]
};