<template>
    <button @click="daochu">
      导出
    </button>
</template>

<script>
export default {
  data() {
    return {
      tableData:[
        {
          productNo:'3242424',
          title:'sdfsgsgssssssssssssssssssssssssssssssssssss',
          route:'dsfsfsf',
          statename:'sdfsfsf'
        },
        {
          productNo:'3242424',
          title:'sdfsgsgssssssssssssssssssssssssssssssssssss',
          route:'dsfsfsf',
          statename:'sdfsfsf'
        },
      ]
    }
  },
  methods:{
    daochu() {
        if(this.tableData.length==0){
          this.$message.error("目前表格没有数据不能导出");
        }else{
          // 这是需要导出的表头
          let headerArr = ['产品编号','产品名称','产品路线','产品状态']
          // 这是数组中obj中的属性
          let keyArr = ['productNo','title','route','statename']
          this.$tableExport.setTableData(this.tableData,headerArr,keyArr,this.tableData[0].route+'表格')
        }
      }
  }
}
</script>

<style>

</style>