<template>
	<div>
		<el-table :key="tableKey"
			:data="showTableNum === 1 ? data : showTableNum === 2? data: data "
			style="width: 100%"
			max-height="350"
            @sort-change="sortChange"
		>
			<el-table-column
				v-for="item in tableHeader"
				:key="item.id"
				:prop="item.prop"
				:label="item.label"
				:sortable="item.id === 11 || item.id === 13 ? custom : false"
				:width="tableHeader.length > 8 ? 180 :''"
                >
				<template slot-scope="scope" >
					<div class="scope-item" v-if="item.prop === 'productCode'"  @click="goToDetail(scope.row)">{{scope.row[scope.column.property]}}</div>
					<div v-else >{{scope.row[scope.column.property]}}</div>
				</template>
			</el-table-column>
			<el-table-column
				v-if="showTableNum === 2 || showTableNum === 3"
				fixed="right"
				label="备注"
				width="150">
				<template slot-scope="scope">
					<el-input v-model="scope.row.remark" @blur="editContent(scope.row,scope.row.remark)" placeholder="请输入内容"></el-input>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-sizes="[100, 200, 300, 400]"
			:page-size="pageSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total">
		</el-pagination>
	</div>
</template>

<script>
    export default {
        name: "STOCK_TABLE",
		props:{
			showTableNum:Number,
            goodsHeader:{
			    type:Array,
				default:[]
			},
            allGoodsHeader:{
                type:Array,
                default:[]
            },
		},
		data() {
            return {
                tableKey: '',
                input:'',
                currentPage:1,
				pageSize:5,
				total:0,
                params:{
                    productCode:'',
                    productName:'',
                    abbreviation:'',
                    corporationName:'',
                    market:'',
                    department:''
				},
				data:[],
				tableHeader:[],
                tableData: [],
				goods:[],
                clientHeader:[
                    {
                        prop:'clientName',
                        label:'客户名称'
                    },
                    {
                        prop:'abbreviation',
                        label:'客户简称'
                    },
                    {
                        prop:'number',
                        label:'库存数量',
                        sortable:true
                    },
                    {
                        prop:'totalPrice',
                        label:'库存金额'
                    },
                    {
                        prop:'maxAge',
                        label:'最长库龄',
                        sortable:true
                    },
                    {
                        prop:'market',
                        label:'销售人员',
                        sortable:false
                    },
                    {
                        prop:'department',
                        label:'部门',
                        sortable:false
                    }
                ],
                companyHeader:[
                    {
                        prop:'corporationName',
                        label:'客户集团名称'
                    },
                    {
                        prop:'number',
                        label:'库存数量',
                        sortable:true
                    },
                    {
                        prop:'totalPrice',
                        label:'库存金额'
                    },
                    {
                        prop:'maxAge',
                        label:'最长库龄',
                        sortable:true
                    },
                    {
                        prop:'market',
                        label:'销售人员',
                        sortable:false
                    },
                    {
                        prop:'department',
                        label:'部门',
                        sortable:false
                    }
                ]
			}
		},
		mounted(){
            this.goods = this.goodsHeader
            this.getStockList(this.currentPage,this.pageSize,this.params)
			this.tableHeader = this.goods
			this.changeNum()
        },
    	methods:{
            goToDetail(row){
                console.log(row.id)
                $("#mainDiv").load(`${baseUrl}/ysd/warehousing/warehousingDetailed?id=${row.id}`);
			},
            getStockList(currentPage,pageSize,params) {
                doController(`/ysd/warehousing/getInventoryWaresList/${this.showTableNum}?currentPage=${currentPage}&pageSize=${pageSize}`,JSON.stringify(params),(res)=> {
					console.log(res)
					// if(res.code === '0000') {
					//
					// }
					this.total = res.data.total
					this.data = res.data.data
				},false,true)
			},
			changeNum() {
               this.tableHeader = this.showTableNum === 1 ? this.goods : this.showTableNum === 2 ? this.clientHeader : this.showTableNum === 3 ? this.companyHeader : [];
                this.tableKey = Date.now();
			},
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val
				this.getStockList(this.currentPage,this.pageSize,this.params)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val
                this.getStockList(this.currentPage,this.pageSize,this.params)
            }
		},
		watch:{
            showTableNum() {
                this.changeNum()
			},
            goodsHeader:{
               immediate:true,
				handler(val) {
                   this.goods = JSON.parse(JSON.stringify(val))
					this.changeNum()
					console.log(this.tableHeader)
				}
			}
		}
    }
</script>

<style lang="scss"scoped>

</style>