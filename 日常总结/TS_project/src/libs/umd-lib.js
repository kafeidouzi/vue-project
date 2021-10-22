(function (root,factory) {
  if(typeof define === 'function' && define.amd) {
    define(factory)
  } else if(typeof module === 'object' && mudule.exports) {
    module.exports = factory
  } else {
    root.umdLib = factory
  }
}(this,function() {
  return {
    version:'1.0.0',
    dosomething() {
      console.log('umdLib do something')
    }
  }
}));