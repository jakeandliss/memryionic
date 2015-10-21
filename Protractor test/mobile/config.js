exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.js'],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
        mobileEmulation: {
          deviceName: 'Apple iPhone 6'
        }
      }
  },
  jasmineNodeOpts: {
      showColors: true,
     defaultTimeoutInterval: 30000,
    isVerbose: true,
  },
  
};