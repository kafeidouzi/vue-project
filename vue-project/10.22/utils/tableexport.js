exports.install = function (Vue) {
  /* eslint-disable */
      // 导出表格功能
      Vue.prototype.$tableExport = {
          /**
          * 导出excel表格
          * @param {导出的数据,数组} dataArr  必传 比如 [{name:小王,age:10,deran:'男'}]
          * @param {表头} headerdata 必传 比如 ['名字','年龄','性别']
          * @param {表格的key值} keydata 必传 比如 ['name','age','deran']
          * @param {表格导出的名字} tablename 不传默认这表格数据
          */
          setTableData : (dataArr = [], headerdata = [], keydata = [], tablename = '表格数据') => {
              require.ensure([], () => {
                const {
                    export_json_to_excel
                } = require('./aa.js');
                // vendor/Export2Excel.js 这个是在webpakc中配置了vendor
                /*alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': resolve('src'),
                'vendor': resolve('src/vendor')
                }*/
                const tHeader = headerdata;
                const filterVal = keydata;
                const list = dataArr;
                const data = setDatas(filterVal,list)
                // 参数过滤
                function setDatas(filterVal, jsonData) {
                    return jsonData.map(v => filterVal.map(j => v[j]))
                }
                export_json_to_excel({header:tHeader, data, filename:tablename,autoWidth : true});
              })
          }
      }
}