const version = '1.0.0'

function doSomething () {
  console.log('module do something')
}

function modulLib(options) {
  console.log(options)
}

modulLib.version = version;
modulLib.doSomething = doSomething;

if(typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports  = modulLib
}
