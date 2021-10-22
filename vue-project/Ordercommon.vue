<template>
    <!--商品信息-->
    <div class="StayaboutCarEdit edit-stayboutcar">
        <h3 class="h-title">商品信息</h3>
        <div class="us-table-wrapper" style="margin-top: 20px" v-loading="loading">
            <div class="us-table-box">
                <table class="us-table" v-if="isOldOrder">
                    <thead>
                    <tr>
                        <th>采购单号</th>
                        <th>商品名称</th>
                        <th>品类</th>
                        <th v-if="orderType===1">{{supplierType===0?'楞型':'长乘宽乘高(单品数量)/件'}}</th>
                        <th v-if="supplierType===0&& orderType===1">总面积(m²)</th>
                        <th v-if="orderType===2">长(mm)</th>
                        <th v-if="orderType===2">宽(mm)</th>
                        <th v-if="orderType===2">高(mm)</th>
                        <th>总重量(kg)</th>
                        <th>总体积(m³)</th>
                        <th>数量(个)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item of productList">
                        <td>
                            <div>
                                {{item.purchaseOrderNumber}}
                            </div>
                        </td>
                        <td>{{item.productName}}</td>
                        <td>{{item.productCategory}}</td>
                        <td v-if="orderType===1">{{item.fluteType}}</td>
                        <td v-if="supplierType===0&& orderType===1">{{item.totalArea}}</td>
                        <td v-if="orderType===2">{{item.lengthInMm}}</td>
                        <td v-if="orderType===2">{{item.widthInMm}}</td>
                        <td v-if="orderType===2">{{item.heightInMm}}</td>
                        <td>{{item.totalWeight}}</td>
                        <td>
                            {{ item.totalVolume?item.totalVolume:'无' }}
                        </td>
                        <td>{{item.number?item.number:'无'}}</td>
                    </tr>
                    </tbody>
                </table>
                <template v-else>
                    <table class="us-table" v-if="cartonProductList.length">
                        <thead>
                        <tr>
                            <th>采购单号</th>
                            <th>商品名称</th>
                            <th>品类</th>
                            <th>楞型</th>
                            <th>总面积</th>
                            <th>总重量(kg)</th>
                            <th>总体积(m³)</th>
                            <th>数量(个)</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item of cartonProductList" :key="item.id">
                                <td>
                                    <div>
                                        {{item.purchaseOrderNumber}}
                                    </div>
                                </td>
                                <td>{{item.productName}}</td>
                                <td>{{item.productCategory}}</td>
                                <td>{{item.fluteType}}</td>
                                <td>{{item.totalArea}}</td>
                                <td>{{item.totalWeight}}</td>
                                <td>{{item.totalVolume}}</td>
                                <td>{{item.number?item.number:'无'}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="us-table" v-if="notCartonProductList.length">
                        <thead>
                        <tr>
                            <th>采购单号</th>
                            <th>商品名称</th>
                            <th>品类</th>
                            <th>外箱长(mm)</th>
                            <th>外箱宽(mm)</th>
                            <th>外箱高(mm)</th>
                            <th>外箱打包数量</th>
                            <th>单箱重量(kg)</th>
                            <th>总重量(kg)</th>
                            <th>总体积(m³)</th>
                            <th>数量(个)</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item of notCartonProductList" :key="item.id">
                                <td>
                                    <div>
                                        {{item.purchaseOrderNumber}}
                                    </div>
                                </td>
                                <td>{{item.productName}}</td>
                                <td>{{item.productCategory}}</td>
                                <td>{{item.lengthInMm}}</td>
                                <td>{{item.widthInMm}}</td>
                                <td>{{item.heightInMm}}</td>
                                <td>{{item.outerNumber}}</td>
                                <td>{{item.singleWeight}}</td>
                                <td>{{item.totalWeight}}</td>
                                <td>{{item.totalVolume}}</td>
                                <td>{{item.number?item.number:'无'}}</td>
                            </tr>
                        </tbody>
                    </table>
                </template>
            </div>
        </div>
        <!--订单信息-->
        <div style="margin-top: 40px;overflow: hidden">
            <h3 class="h-title">订单信息</h3>
            <div style="margin-top: 28px" v-loading="loading">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm "
                         label-position="left">
                    <el-form-item label="物流单号">
                        <span>{{logisticsNumber}}</span>
                    </el-form-item>
                    <el-form-item label="销售">
                        <span>{{ resData.carrierOrderDetailsVo && resData.carrierOrderDetailsVo.salesMan }}</span>
                    </el-form-item>
                    <el-form-item :label="'送货单号'+(index+1)" v-for="(item,index) of deliveryNumbers" :key="index">
                        <span class="span-details">{{item}}</span>
                    </el-form-item>
                    <div class="supplier">
                        <el-form-item label="供应链联系人">
                            <span>{{ruleForm.supplyName}}</span>
                        </el-form-item>
                    </div>
                    <div class="supplier" style="clear: both">
                        <el-form-item label="工厂名称">
                            <span>{{ruleForm.supplierName}}</span>
                        </el-form-item>
                    </div>
                    <div class="supplier kehu" style="clear: both">
                        <el-form-item label="联系人" prop="supplierLinkman">
                            <el-input
                                class="width-200"
                                auto-complete="off"
                                placeholder="请输入联系人"
                                type="text"
                                v-model.trim="ruleForm.supplierLinkman"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="supplierNumber">
                            <el-input
                                class="width-200"
                                auto-complete="off"
                                placeholder="请输入联系电话"
                                type="text"
                                v-model.trim="ruleForm.supplierNumber"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item label="备用电话" prop="spareNumber">
                            <el-input
                                class="width-200"
                                auto-complete="off"
                                placeholder="请输入备用电话"
                                type="text"
                                v-model.trim="ruleForm.spareNumber"
                            >
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="supplier" style="clear: both">
                        <el-form-item label="发货地详情" prop="supplierAddressDetail">
                            <el-input
                                class="width-260"
                                auto-complete="off"
                                placeholder="请输入发货地详情"
                                type="text"
                                v-model.trim="ruleForm.supplierAddressDetail"
                            >
                            </el-input>
                        </el-form-item>
                        <!--<el-form-item prop="provinceCode">-->
                        <!--<el-select placeholder="请选择省" class="width-160" v-model="ruleForm.provinceCode"-->
                        <!--@change="getcity">-->
                        <!--<el-option-->
                        <!--v-for="item in ruleForm.provinces"-->
                        <!--:key="item.id"-->
                        <!--:label="item.name"-->
                        <!--:value="item.code"-->
                        <!--&gt;-->
                        <!--</el-option>-->
                        <!--</el-select>-->
                        <!--<span style="color: #DEDEDE">-</span>-->
                        <!--</el-form-item>-->

                        <!--<el-form-item prop="cityCode">-->
                        <!--<el-select placeholder="请选择市" class="width-160" v-model="ruleForm.cityCode"-->
                        <!--@change="getdistrict">-->
                        <!--<el-option-->
                        <!--v-for="item in ruleForm.citys"-->
                        <!--:key="item.id"-->
                        <!--:label="item.name"-->
                        <!--:value="item.code"-->
                        <!--&gt;-->
                        <!--</el-option>-->
                        <!--</el-select>-->
                        <!--<span style="color: #DEDEDE">-</span>-->
                        <!--</el-form-item>-->

                        <!--<el-form-item prop="districtCode">-->
                        <!--<el-select placeholder="请选择区" v-model="ruleForm.districtCode" class="width-160"-->
                        <!--@change="getaddress">-->
                        <!--<el-option-->
                        <!--v-for="item in ruleForm.districts"-->
                        <!--:key="item.id"-->
                        <!--:label="item.name"-->
                        <!--:value=" item.code "-->
                        <!--&gt;-->
                        <!--</el-option>-->
                        <!--</el-select>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item prop="supplierAddressDetail">-->
                        <!--<el-input-->
                        <!--class="width-260"-->
                        <!--auto-complete="off"-->
                        <!--placeholder="具体地址"-->
                        <!--type="text"-->
                        <!--v-model.trim="ruleForm.supplierAddressDetail"-->
                        <!--&gt;-->
                        <!--</el-input>-->
                        <!--</el-form-item>-->
                    </div>
                    <div id="takeingmap" class="map">
                        <div
                            :class="!ruleForm.supplierLocationAddress||!ruleForm.supplierLongitudeAndLatitude?'input_map input_error':'input_map' ">
                            <input v-show="!loading" v-model="ruleForm.supplierLocationAddress" type="text"
                                   id="takeinginput" placeholder="请选择发货地址">
                            <p v-if="!loading" v-show="!ruleForm.supplierLocationAddress" style="color: red">
                                地址不能为空</p>
                            <p v-if="!loading"
                               v-show="ruleForm.supplierLocationAddress&&!ruleForm.supplierLongitudeAndLatitude"
                               style="color: red">请选择地址获得经纬度</p>
                        </div>
                    </div>
                    <div v-for="(item,index) of ruleForm.henduokehu">
                        <div class="supplier" style="clear: both">
                            <el-form-item label="客户名称">
                                <span>{{ruleForm.clientName}}</span>
                            </el-form-item>
                            <div class="leval" v-show="ruleForm.clientLevel==='A'">
                                <img src="../../assets/picture/leval/A.png" height="40" width="32.5"/>
                            </div>
                            <div class="leval" v-show="ruleForm.clientLevel==='B'">
                                <img src="../../assets/picture/leval/B.png" height="40" width="32.5"/>
                            </div>
                            <div class="leval" v-show="ruleForm.clientLevel==='C'">
                                <img src="../../assets/picture/leval/C.png" height="40" width="32.5"/>
                            </div>
                            <div class="leval" v-show="ruleForm.clientLevel==='D'">
                                <img src="../../assets/picture/leval/D.png" height="40" width="32.5"/>
                            </div>
                            <div class="leval" v-show="ruleForm.clientLevel==='S'">
                                <img src="../../assets/picture/leval/S.png" height="40" width="32.5"/>
                            </div>
                        </div>
                        <div class="client" style="clear: both">
                            <el-form-item label="联系人" :prop="'henduokehu.'+index+'.customerLinkman'"
                                          :rules="rules.customerLinkman">
                                <el-input
                                    class="width-200"
                                    auto-complete="off"
                                    placeholder="请输入联系人"
                                    type="text"
                                    v-model.trim="item.customerLinkman"
                                >
                                </el-input>
                            </el-form-item>
                            <el-form-item label="联系电话" :prop="'henduokehu.'+index+'.customerNumber'"
                                          :rules="rules.customerNumber">
                                <el-input
                                    class="width-200"
                                    auto-complete="off"
                                    placeholder="请输入客户联系人电话"
                                    type="text"
                                    v-model.trim="item.customerNumber"
                                    >
                                </el-input>
                            </el-form-item>
                            <el-form-item label="备用电话">
                                <el-input
                                    class="width-200"
                                    auto-complete="off"
                                    placeholder="请输入备用电话"
                                    type="text"
                                    v-model.trim="item.customerSpareContacts"
                                >
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="supplier" style="clear: both">
                            <!--<el-form-item :prop="'henduokehu.'+index+'.provinceCode'" :rules="rules.provinceCode">-->
                            <!--<el-select placeholder="请选择省" class="width-160" v-model="item.provinceCode"-->
                            <!--@change="getcity2(index)">-->
                            <!--<el-option-->
                            <!--v-for="v in item.provinces"-->
                            <!--:key="v.id"-->
                            <!--:label="v.name"-->
                            <!--:value="v.code"-->
                            <!--&gt;-->
                            <!--</el-option>-->
                            <!--</el-select>-->
                            <!--<span style="color: #DEDEDE">-</span>-->
                            <!--</el-form-item>-->

                            <!--<el-form-item :prop="'henduokehu.'+index+'.cityCode'" :rules="rules.cityCode">-->
                            <!--<el-select placeholder="请选择市" class="width-160" v-model="item.cityCode"-->
                            <!--@change="getdistrict2(index)">-->
                            <!--<el-option-->
                            <!--v-for="v in item.citys"-->
                            <!--:key="v.id"-->
                            <!--:label="v.name"-->
                            <!--:value="v.code"-->
                            <!--&gt;-->
                            <!--</el-option>-->
                            <!--</el-select>-->
                            <!--<span style="color: #DEDEDE">-</span>-->
                            <!--</el-form-item>-->

                            <!--<el-form-item :prop="'henduokehu.'+index+'.districtCode'" :rules="rules.districtCode">-->
                            <!--<el-select placeholder="请选择区" class="width-160" v-model="item.districtCode"-->
                            <!--@change="getaddress2(index)">-->
                            <!--<el-option-->
                            <!--v-for="v in item.districts"-->
                            <!--:key="v.id"-->
                            <!--:label="v.name"-->
                            <!--:value=" v.code "-->
                            <!--&gt;-->
                            <!--</el-option>-->
                            <!--</el-select>-->
                            <!--</el-form-item>-->
                            <el-form-item label="送货地详情" :prop="'henduokehu.'+index+'.deliveryAddressDetail'"
                                          :rules="rules.deliveryAddressDetail">
                                <el-input
                                    class="width-260"
                                    auto-complete="off"
                                    placeholder="具体地址"
                                    type="text"
                                    v-model.trim="item.deliveryAddressDetail"
                                >
                                </el-input>
                            </el-form-item>
                            <div class="add" @click="Addkehu" v-show="index===0">添加</div>
                            <div class="delete" @click="deletekehu(index)" v-show="index>0">删除</div>
                        </div>
                        <div :id="'demap'+index" class="map">
                            <div
                                :class="!item.deliveryLocationAddress||!item.deliveryLongitudeAndLatitude?'input_map input_error':'input_map' ">
                                <input v-model="item.deliveryLocationAddress" type="text" :id="'deinput'+index"
                                       placeholder="请选择送货地址">
                                <p v-show="!item.deliveryLocationAddress" style="color: red">地址不能为空</p>
                                <p v-show="item.deliveryLocationAddress&&!item.deliveryLongitudeAndLatitude"
                                   style="color: red">请选择地址获得经纬度</p>
                            </div>
                        </div>
                    </div>
                    <div class="supplier" style="clear: both">
                        <el-form-item label="总重量" prop="totalAllWeight">
                            <el-input
                                class="width-300"
                                auto-complete="off"
                                placeholder="请输入总面积"
                                type="text"
                                v-model.trim="ruleForm.totalAllWeight "
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item label="总体积" prop="totalAllVolume">
                            <el-input
                                class="width-300"
                                auto-complete="off"
                                placeholder="请输入总体积"
                                type="text"
                                v-model.trim="ruleForm.totalAllVolume "
                            >
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="Deliverydistance" style="clear: both">
                        <el-form-item label="参考距离" prop="distance">
                            <el-input disabled
                                class="width-300"
                                auto-complete="off"
                                placeholder="请输入参考距离"
                                type="text"
                                v-model.trim="ruleForm.distance"
                            ></el-input>
							<el-button type="text" v-if="recalcBtnVisible"
									@click="reCalcDistanceHandle" :disabled="recalcBtnDisable">重新计算距离</el-button>
                        </el-form-item>
                    </div>
                    <div class="DeliveryDate" style="clear: both">
                        <el-form-item label="发货日期">
                        </el-form-item>
                        <el-form-item prop="takingDate">
                            <!-- <el-date-picker class="width-235" type="date" placeholder="选择日期"
                                            style="width: 100%;  " v-model="ruleForm.takingDate"
                                            value-format="timestamp" @change="takingDateSelect"></el-date-picker> -->
							<el-date-picker v-model="ruleForm.takingDate"
									type="datetime" placeholder="选择日期时间"
									value-format="timestamp"></el-date-picker>
                        </el-form-item>
                        <!-- <el-form-item prop="takingDate">
                            <el-time-picker type="fixed-time" placeholder="选择时间" class="width-120"
                                            style="width: 100%;" v-model="ruleForm.takingDate" format="HH:mm"
                                            value-format="timestamp" @change="takingDateSelect"></el-time-picker>
                        </el-form-item> -->
                    </div>
                    <div class="DeliveryDate" style="clear: both">
                        <el-form-item label="最晚送货日期">
                        </el-form-item>
                        <el-form-item prop="deliveryDate">
                            <!-- <el-date-picker class="width-235" type="date" placeholder="选择日期"
                                            style="width: 100%;" v-model="ruleForm.deliveryDate"
                                            value-format="timestamp"
                                            :picker-options="pickerOptions"></el-date-picker> -->
							<el-date-picker v-model="ruleForm.deliveryDate"
									type="datetime" placeholder="选择日期时间"
									value-format="timestamp" :picker-options="pickerOptions"></el-date-picker>
                        </el-form-item>
                        <!-- <el-form-item prop="deliveryDate">
                            <el-time-picker @click.native="fan" type="fixed-time"
                                            placeholder="选择时间" class="width-120"
                                            style="width: 100%;" v-model="ruleForm.deliveryDate"
                                            :disabled="!ruleForm.deliveryDate" format="HH:mm"
                                            value-format="timestamp"></el-time-picker>
                        </el-form-item> -->
                    </div>
                    <div class="Serviceselection" style="clear: both">
                        <el-form-item label="服务选择" prop="delivery">
                            <div v-for="(item,index) of severlists" style="float: left;margin-right: 52px">
                                <el-switch v-model="item.selects" @change="huakuai(index)"></el-switch>
                                <span style="margin-left: 5px">{{item.name}}</span>
                            </div>
                        </el-form-item>
                    </div>
                    <div class="supplier" style="clear: both">
                        <el-form-item label="运输类型" prop="carpool">
                            <el-radio-group v-model="ruleForm.carpool">
                                <el-radio :label="'0'">专车</el-radio>
                                <el-radio :label="'1'">拼车</el-radio>
                                <el-radio :label="'2'">零担</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div class="Modelschoose" style="clear: both">
                        <el-form-item label="车型选择">
                        </el-form-item>
                        <div class="vt" v-for="(item,index) of ruleForm.truckList">
                            <el-form-item :prop="'truckList.'+index+'.id'">
                                <el-select placeholder="请选择车型" class="width-160" @change="carselect(index)"
                                           v-model="item.truckTypeId">
                                    <el-option
                                        v-for="(v,index) of TruckTypeInfo"
                                        :key="v.id"
                                        :label="v.name"
                                        :value=" v.id "
                                        :disabled="v.disabled"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item :prop="'truckList.' + index+'.number'" :rules="rules.truckNumber">
                                <el-input
                                    class="width-160"
                                    auto-complete="off"
                                    placeholder="请输入车辆数量"
                                    type="text"
                                    v-model.trim="item.number"
                                >
                                </el-input>
                            </el-form-item>
                            <div class="add" v-show="index===0" @click="addcar">添加</div>
                            <div class="delete" v-show="index>0" @click="deletecar(index)">删除</div>
                        </div>
                        <div class="add" v-show="ruleForm.truckList.length===0" @click="addcar">添加</div>
                    </div>
                    <div class="StayaboutCarEditremark " style="clear: both">
                        <el-form-item label="备注" prop="remark">
                            <el-input
                                class="width-480"
                                auto-complete="off"
                                placeholder="请输入备注"
                                type="textarea"
                                v-model.trim="ruleForm.remark"
                            >
                            </el-input>
                        </el-form-item>
                    </div>
                    <div v-if="condition3">
                        <div class="detail-clock-box"  v-for="(item, i) in ruleForm.carAndDriverList" :key="i">
                            <h3 class="h-title">打卡状态<i> {{item.plateNumber}}</i></h3>
                            <div class="detail-clock">
                                <div v-for="(ite, s) in item.driverClockInVoList" :key="s">
                                    <h4 v-if="ite.type === 0">{{ite.isClockIn ? '装货已打卡' : '装货未打卡'}}</h4>
                                    <h4 v-if="ite.type === 1">{{ite.isClockIn ? '卸货已打卡' : '卸货未打卡'}}</h4>
                                    <div class="detail-clock-time"><span>打卡时间</span><i v-if="ite.time">{{ite.time | formatDate}}</i> <i v-else>无</i> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 40px">
                        <h3 class="h-title">装车照片</h3>
                        <div style="margin-top: 28px" v-loading="loading">
                            <div class="Deliverydistance" style="clear: both" v-for="item of ruleForm.carAndDriverList">
                                <el-form-item :label="item.plateNumber">
                                    <div class="allcareimg" v-show="item.shipmentDriverOrderFileVoList.length>0">
                                        <viewer>
											<div class="carimg" v-for="(value,index) of item.shipmentDriverOrderFileVoList">
												<div class="singlimg">
														<img :src="value.url"
																style="width: 100%;height: 100%"/>
												</div>
												<span>{{value.fileTypeName}}</span>
											</div>
                                        </viewer>
                                        <div class="Imgbutton" style="clear: both"
                                             v-if="item.unloadDriverOrderFileVoList.length==0">
                                            <el-button
                                                v-show="item.auditState===1 && item.shipmentDriverOrderFileVoList.length!==0"
                                                @click="Imgreject(item.driverOrderId,0)">驳回
                                            </el-button>
                                            <el-button
                                                v-show="item.auditState===1&& item.shipmentDriverOrderFileVoList.length!==0 "
                                                @click="Imgpass(item.driverOrderId,0)" type="primary">通过
                                            </el-button>
                                            <el-button
                                                v-show="item.auditState===2 && item.shipmentDriverOrderFileVoList.length!==0"
                                                type="success">已通过
                                            </el-button>
                                            <el-button
                                                v-show="item.auditState===3&& item.shipmentDriverOrderFileVoList.length!==0"
                                                type="danger">已驳回
                                            </el-button>
                                        </div>
                                    </div>
                                    <span v-show="item.shipmentDriverOrderFileVoList.length===0">暂未上传图片</span>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 40px">
                        <h3 class="h-title">卸车照片</h3>
                        <div style="margin-top: 28px" v-loading="loading">
                            <div class="Deliverydistance" style="clear: both" v-for="item of ruleForm.carAndDriverList">
                                <el-form-item :label="item.plateNumber">
                                    <div class="allcareimg" v-show="item.unloadDriverOrderFileVoList.length>0">
                                        <viewer>
											<div class="carimg" v-for="value of item.unloadDriverOrderFileVoList">
												<div class="singlimg">
														<img :src="value.url"
															style="width: 100%;height: 100%"/>
												</div>
												<span>{{value.fileTypeName}}</span>
												<!-- DS单号、送货单号 -->
												<el-tooltip :content="value.deliveryNumber" placement="top">
													<div class="ds_order_num">{{ value.deliveryNumber }}</div>
												</el-tooltip>
											</div>
										</viewer>
                                        <div class="Imgbutton" style="clear: both"
                                             v-show="ruleForm.orderStatus==='4' ||ruleForm.orderStatus==='5' ||ruleForm.orderStatus==='2' ||ruleForm.orderStatus==='3'">
                                            <el-button v-show="item.auditState===1"
                                                       @click="Imgreject(item.driverOrderId,1)">驳回
                                            </el-button>
                                            <el-button v-show="item.auditState===1"
                                                       @click="Imgpass(item.driverOrderId,1)"
                                                       type="primary">通过
                                            </el-button>
                                            <el-button v-show="item.auditState===2" type="success">已通过</el-button>
                                            <el-button v-show="item.auditState===3" type="danger">已驳回</el-button>
                                        </div>
                                    </div>
                                    <span v-show="item.unloadDriverOrderFileVoList.length===0">暂未上传图片</span>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 40px;overflow: hidden" v-for="(item,index) of ruleForm.carAndDriverList">
                        <template v-if="item.unusualDriverOrderFileVoList.length">
                            <h3 class="h-title">异常信息</h3>
                            <div style="margin-top: 28px" v-loading="loading">
                                <div class="Deliverydistance;" style="clear: both;margin-top: 30px"
                                    v-for="value of item.unusualDriverOrderFileVoList">
                                    <el-form-item :label="item.plateNumber">
                                        <div class="allcareimg">
                                            <viewer>
												<div class="carimg" v-for="i of value.fileList">
													<div class="singlimg">
															<img :src="i.url"
																style="width: 100%;height: 100%"/>
													</div>
													<span>{{i.name}}</span>
												</div>
											</viewer>
                                        </div>
                                    </el-form-item>
                                    <!--                                <el-form-item label="备注">-->
                                    <!--                                    <span class="span-details">{{item.unusualInfo}}</span>-->
                                    <!--                                </el-form-item>-->
                                    <div style="clear: both;overflow: hidden" class="PickUpdetails">
                                        <div style="overflow-wrap: break-word;clear: both"
                                            class="PickUpdetails beizhu_last">
                                            <div style="color: #606266;height: 40px;line-height: 40px">异常类型</div>
                                            <div> {{value.abnormalTypeName}}</div>
                                        </div>
                                    </div>
                                    <div style="clear: both;overflow: hidden" class="PickUpdetails">
                                        <div style="overflow-wrap: break-word;clear: both"
                                            class="PickUpdetails beizhu_last">
                                            <div style="color: #606266;height: 40px;line-height: 40px">异常原因</div>
                                            <div> {{value.unusualInfo}}</div>
                                        </div>
                                    </div>
                                    <div style="clear: both;overflow: hidden" class="PickUpdetails">
                                        <div style="overflow-wrap: break-word;clear: both"
                                            class="PickUpdetails beizhu_last">
                                            <div style="color: #606266;height: 40px;line-height: 40px">上传地点</div>
                                            <div> {{value.location}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div style="margin-top: 40px;clear: both">
                        <h3 class="h-title">承运商信息</h3>
                        <div style="margin-top: 28px" v-loading="loading">
                            <div class="Deliverydistance">
								<!-- 承运商选项列表只有在“待约车”编辑页时，才显示 -->
                                <el-form-item label="选择承运商" prop="carrierId">
                                    <el-select @change="selectcarrier" placeholder="选择承运商" class="width-300"
											   v-model="ruleForm.carrierId" :disabled="!chooseCarrierListVisible">
                                        <el-option
                                            v-for="(item,index) in CarrierLists"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.id"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="Deliverydistance">
								<!-- 承运商选项列表只有在“待约车”编辑页时，才显示 -->
                                <el-form-item label="承运商接单模式" prop="buttonType">
                                    <el-select placeholder="选择承运商接单模式" class="width-300" :disabled="ruleForm.orderStatus !== '0'" v-model="ruleForm.buttonType">
                                        <el-option
                                            v-for="(item,index) in orderModel"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.id"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
							<div class="cost-type-field">
								<el-form-item label="费用类型">
									{{ ruleForm.costType | costTypeFormat }}
								</el-form-item>
							</div>
                            <div class="supplier ">
                                <el-form-item label="运输费用" prop="freight">
                                    <el-input :disabled="!isManualOffer"
                                        class="width-300"
                                        auto-complete="off"
                                        placeholder="请输入运输费用"
                                        type="text"
                                        v-model.trim="ruleForm.freight">
                                    </el-input>
									<!-- “待约车”编辑页，并且是手动报价时，才显示系统参考价 -->
									<!-- <span v-if="chooseCarrierListVisible && isManualOffer">系统报价：{{ systemOffer }}</span> -->
									<span v-if="isManualOffer" style="color: #C0C4CC;">
                                        系统参考报价：{{ systemOffer }}
                                    </span>
                                </el-form-item>
                            </div>
                            <div class="supplier " style="clear: both">
                                <el-form-item :label="item.serviceType+'费用'" :prop="'confirmhua.'+index+'.price'"
                                              v-for="(item,index) of ruleForm.confirmhua" :key="item.id"
                                              :rules="rules.otherfreight">
                                    <el-input disabled
                                        class="width-300"
                                        auto-complete="off"
                                        :placeholder="'请输入'+item.serviceType+'费用'"
                                        type="text"
                                        v-model.trim="item.price"
                                    >
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div v-if="exceptionTypeOptionVisible" class="Deliverydistance" style="clear: both">
                                <el-form-item label="异常类型">
                                    <el-select @change="yichangfeiyong" placeholder="请选择异常类型"
                                            multiple class="width-300" v-model="abtype">
                                        <el-option
                                            v-for="(item,index) in otherType"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div v-for="(item,index) of ruleForm.otherCost" :key="index" class="supplier"
                                 style="clear: both">
                                <el-form-item :label="filterType(item.abnormalType)"
                                              :prop="'otherCost.'+index+'.abnormalCost'" :rules="rules.otherCost">
                                    <el-input
                                        class="width-300"
                                        auto-complete="off"
                                        placeholder="请输入异常费用"
                                        type="text"
                                        v-model.trim="item.abnormalCost"
                                    >
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="异常原因">
                                    <el-input
                                        class="width-300"
                                        auto-complete="off"
                                        placeholder="请输入异常原因"
                                        type="text"
                                        v-model.trim="item.abnormalReason"
                                    >
                                    </el-input>
                                </el-form-item>
                            </div>

                            <div class="supplier" style="clear: both">
                                <el-form-item label="KPI扣款" prop="kpiCost">
                                    <el-input
                                        class="width-300"
                                        auto-complete="off"
                                        placeholder="请输入扣款费用"
                                        type="text"
                                        v-model.trim="ruleForm.kpiCost"
                                    >
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="扣款原因">
                                    <el-input
                                        class="width-300"
                                        auto-complete="off"
                                        placeholder="请输入扣款原因"
                                        type="text"
                                        v-model.trim="ruleForm.kpiReason"
                                    >
                                    </el-input>
                                </el-form-item>

                            </div>
                            <div class="supplier " style="clear: both">
                                <el-form-item label="索赔金额" prop="claimantCost">
                                    <el-input
                                        class="width-300"
                                        auto-complete="off"
                                        placeholder="请输入索赔金额"
                                        type="text"
                                        v-model.trim="ruleForm.claimantCost"
                                    >
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="索赔原因">
                                    <el-input
                                        class="width-300"
                                        auto-complete="off"
                                        placeholder="请输入索赔原因"
                                        type="text"
                                        v-model.trim="ruleForm.claimantReason"
                                    >
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="Deliverydistance" style="clear: both">
                                <el-form-item label="合计费用" prop="totalCost">
                                    <el-input disabled
                                        class="width-300"
                                        auto-complete="off"
                                        placeholder="请输入备注"
                                        type="text"
                                        v-model="ruleForm.totalCost"
                                    >
                                    </el-input>
                                    <span v-show="false">{{jisuan}}</span>
                                </el-form-item>
                            </div>
                            <div class="StayaboutCarEditremark " style="clear: both">
                                <el-form-item label="备注" prop="carrierRemark">
                                    <el-input
                                        class="width-480"
                                        auto-complete="off"
                                        placeholder="请输入备注"
                                        type="textarea"
                                        v-model="ruleForm.carrierRemark"
                                    >
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 40px;overflow: hidden" v-show="ruleForm.carAndDriverList.length>0">
                        <h3 class="h-title">车辆信息</h3>
                        <div style="margin-top: 28px" v-for="(item,index) of ruleForm.carAndDriverList"
                             v-loading="loading">

                            <div class="supplier ">
                                <el-form-item label="司机姓名" prop="region">
                                    <el-input
                                        class="width-300"
                                        auto-complete="off"
                                        placeholder="请输入司机姓名"
                                        type="text"
                                        v-model="item.driverName"
                                        :disabled="true"
                                    >
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="联系电话" prop="region">
                                    <el-input
                                        class="width-300"
                                        auto-complete="off"
                                        placeholder="请输入司机联系电话"
                                        type="text"
                                        v-model="item.driverPhone"
                                        :disabled="true"
                                    >
                                    </el-input>
                                </el-form-item>
                            </div>
                            <div class="supplier ">
                                <el-form-item label="车牌号" prop="region">
                                    <el-input
                                        class="width-300"
                                        auto-complete="off"
                                        placeholder="请输入司机车牌号"
                                        type="text"
                                        v-model="item.plateNumber"
                                        :disabled="true"
                                    >
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="车辆类型" prop="region">
                                    <el-input
                                        class="width-300"
                                        auto-complete="off"
                                        placeholder="请输入车辆类型"
                                        type="text"
                                        v-model="item.truckType"
                                        :disabled="true"
                                    >
                                    </el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="change-btn-wrapper">
			<el-button @click="$router.back()" style="width: 150px;">
				返回
			</el-button>
            <el-button v-show="ruleForm.orderStatus!=='5'" style="width:13.5%;padding: 0px 40px"
                       class="change-btn btn-default" type="primary"
                       @click="centerDialogVisible3=true">
                订单取消
            </el-button>
            <el-button style="width:13.5%;border-radius: 2px" type="primary" @click="updateinfomation">
                确定
            </el-button>
        </div>
        <div class="us-dialog-cover-wrapper us-dialog-input ">
            <el-dialog
                class="tonguo"
                title=""
                :visible.sync="centerDialogVisible">
                <div class="us-dialog-body us-dialog-body-judge">
                    <div class="warn">
                        <img src="../../assets/picture/mark@3x.png"/>
                    </div>
                    <h1 class="equire">确定照片无误</h1>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible=false">取消</el-button>
                    <el-button type="primary" @click="confirmdirver">确定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="us-dialog-cover-wrapper us-dialog-input ">
            <el-dialog
                class="bohui"
                v-if="centerDialogVisible2"
                title="驳回原因"
                :visible.sync="centerDialogVisible2">
                <div class="us-dialog-body us-dialog-body-judge" style="position: relative">
                    <el-form :model="rejectform" status-icon :rules="rejecrules" ref="rejectform" label-width="100px"
                             class="demo-ruleForm">
                        <el-form-item label="原因" prop="bohuiareaMsg">
                            <el-input
                                auto-complete="off"
                                placeholder="内容限制在100字以内"
                                type="textarea"
                                maxlength="100"
                                v-model="rejectform.bohuiareaMsg"
                            >
                            </el-input>
                            <div style="position: absolute;top: 78px;left: 300px;color: #CCCCCC">{{countWord}}/100</div>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                             <el-button @click="centerDialogVisible2=false">取 消</el-button>
                             <el-button type="primary" @click="rejectdirver">确 定</el-button>
                        </span>
            </el-dialog>
        </div>
        <div class="us-dialog-cover-wrapper us-dialog-input ">
            <el-dialog
                class="tonguo"
                title=""
                :visible.sync="centerDialogVisible3">
                <div class="us-dialog-body us-dialog-body-judge">
                    <div class="warn">
                        <img src="../../assets/picture/mark@3x.png"/>
                    </div>
                    <h1 class="equire">确定取消订单</h1>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible3=false">取消</el-button>
                    <el-button type="primary" @click="cancelOrder">确定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {formatDate} from "../../assets/js/Time";
    import {area} from "../../assets/js/Commonhttp";
    export default {
        data() {
            let supplierLinkman = (rule, value, callback) => {
                if (value === '' || !value) {
                    callback(new Error('联系人不能为空'))
                } else if ((value+'').indexOf(" ") > -1) {
                    callback(new Error('请输入正确的格式'))
                } else {
                    callback()
                }
            }
            let supplierNumber = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('电话号码不能为空'))
                } else if (!(/^1[3456789]\d{9}$/.test(value))) {
                    callback("手机号码有误，请重填");
                } else {
                    callback()
                }
            }
            let customerLinkman = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('联系人不能为空'))
                } else if ((value+'').indexOf(" ") > -1) {
                    callback(new Error('请输入正确的格式'))
                } else {
                    callback()
                }
            }
            let distance = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('参考距离不能为空'))
                } else if (!/^(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(value)) {
                    callback(new Error('请输入正确的数字'))
                } else if ((value+'').indexOf(" ") > -1) {
                    callback(new Error('请输入正确的格式'))
                } else {
                    callback()
                }
            }
            let provinceCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('省不能为空'))
                } else {
                    callback()
                }
            }
            let cityCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('市不能为空'))
                } else {
                    callback()
                }
            }
            let districtCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('区不能为空'))
                } else {
                    callback()
                }
            }
            let detailaddress = (rule, value, callback) => {
                if (value === '' || !value) {
                    callback(new Error('详情地址不能为空'))
                    // } else if (value.indexOf(" ")>-1){
                    //     callback(new Error('请输入正确的格式'))
                } else {
                    callback()
                }
            }
            let remark = (rule, value, callback) => {
                callback()
            }
            let takingDate = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('发货日期不能为空'))
                } else {
                    callback()
                }
            }
            let deliveryDate = (rule, value, callback) => {

                if (!value || value === '') {
                    callback(new Error('最晚送达日期不能为空'))
                } else {
                    callback()
                }
            }
            let freight = (rule, value='', callback) => {
                if (value==='') {
                    callback(new Error('费用不能为空'))
                } else if (!/^(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(value)) {
                    callback(new Error('请输入正确的数字'))
                } else if ((value+'').indexOf(" ") > -1) {
                    callback(new Error('请输入正确的格式'))
                } else {
					// 手动报价，计算手动报价是否在系统报价80%以内
					// if(this.isManualOffer){
					// 	if(this.systemOffer > 0 && this.ruleForm.freight > this.systemOffer * 0.8){
					// 		callback('临时报价必须小于合同价的80%');
					// 	}else{
					// 		callback();
					// 	}
					// }else{
						callback()
					// }
                }
            }
            let weight = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('不能为空'))
                } else if (!/^(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(value)) {
                    callback(new Error('请输入正确的数字'))
                } else if ((value+'').indexOf(" ") > -1) {
                    callback(new Error('请输入正确的格式'))
                } else {
                    callback()
                }
            }
            let otherfreight = (rule, value, callback) => {
                if (value) {
                    if (!/^(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(value)) {
                        callback(new Error('请输入正确的数字'))
                    } else if ((value+'').indexOf(" ") > -1) {
                        callback(new Error('请输入正确的格式'))
                    } else {
                        callback()
                    }
                } else {
                    callback()
                }
            }
            let bohuiareaMsg = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('驳回原因不能为空'))
                } else {
                    callback()
                }
            }
            let carnumber = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('车辆数量不能为空'))
                } else if (!/^(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(value)) {
                    callback(new Error('请输入正确的数字'))
                } else if (value.length > 8) {
                    callback(new Error('请输入正确数量'))
                } else if ((value+'').indexOf(" ") > -1) {
                    callback(new Error('请输入正确的格式'))
                } else {
                    callback()
                }
            }
            let carrierId = (rule, value, callback) => {
                if (!value || value === '') {
                    callback(new Error('请选择承运商'))
                } else {
                    callback()
                }
            }
            let buttonType = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择承运商接单模式'))
                } else {
                    callback()
                }
            }
            let carpool = (rule, value, callback) => {
                if (!value || value === '') {
                    callback(new Error('请选择是否拼车'))
                } else {
                    callback()
                }
            }
            return {

                msg: '待约车编辑',
                pickerOptions: this.processDate(),
                centerDialogVisible3: false,
                timeOptions: {},
                state: '',
                zhuangtai: false,
                auditdirverid: '',
                rejectform: {
                    bohuiareaMsg: ""
                },
                rejecrules: {
                    bohuiareaMsg: [{
                        validator: bohuiareaMsg, trigger: 'blur'
                    }],
                },
                ruleForm: {
                    //订单Id
                    id: '',
                    supplyName: '',
                    orderStatus: '',
                    statusName: '',
                    carpool: '',
                    // 发货定位地址
                    supplierLocationAddress: '',
                    // 发货定位经纬度
                    supplierLongitudeAndLatitude: '',
                    // 供应商发货地址省市区
                    supplierAddressAreaName: '',
                    supplierName: '',
                    supplierType: '',
                    clientLevel: '',
                    //供应商联系人
                    supplierLinkman: '',
                    clientName: '',
                    //供应商电话
                    supplierNumber: '',
                    //客户联系人
                    customerLinkman: '',
                    //客户联系电话
                    customerNumber: '',
                    //送货距离
                    distance: '',
                    //备用联系人
                    spareNumber: '',
                    totalAllWeight: '',
                    totalAllVolume: '',
                    //提货日期
                    takingDate: '',
                    //到货日期
                    deliveryDate: '',
                    //供货地详情地址
                    supplierAddressDetail: '',
                    //送货地详情地址
                    deliveryAddressDetail: '',
                    remark: '',
                    //承运商id
                    carrierId: '',
                    //承运商接单模式
					buttonType: '',
                    //承运商备注
                    carrierRemark: '',
                    //运输费用
                    freight: '',
                    //其他费用
                    otherCost: [],
                    henduokehu: [],
                    totalCost: '',
                    //车辆信息
                    truckList: [],
                    confirmhua: [],
                    //司机信息
                    carAndDriverList: [],
                    //.....
                    //省级信息集合
                    provinces: [],
                    //市级信息集合
                    citys: [],
                    //区级信息集合
                    districts: [],
                    //省编号
                    provinceCode: '',
                    //市编号
                    cityCode: '',
                    //区编号
                    districtCode: '',
                    //省名
                    provincename: '',
                    //市名
                    cityname: '',
                    //区名
                    districtname: '',
                    //地址
                    address: '',
                    //......
                    provinces2: [],
                    //市级信息集合
                    citys2: [],
                    //区级信息集合
                    districts2: [],
                    //省编号
                    provinceCode2: '',
                    //市编号
                    cityCode2: '',
                    //区编号
                    districtCode2: '',
                    //省名
                    provincename2: '',
                    //市名
                    cityname2: '',
                    //区名
                    districtname2: '',
                    //地址
                    address2: '',
                    a: [],
                    claimantCost: '',
                    claimantReason: '',
                    kpiCost: '',
                    kpiReason: '',
                    otherReason: '',
					otherType: '',
					// 费用类型-系统报价，或者手动报价
                    costType: null,
                },
                severlist: [],
                severlists: [],
                centerDialogVisible: false,
                centerDialogVisible2: false,
                abtype: [],
                //异常类型
                otherType: [
                    {
                        name: '承运商异常',
                        value: '0'
                    },
                    {
                        name: '供应链异常',
                        value: '1'
                    },
                    {
                        name: '工厂异常',
                        value: '2'
                    },
                    {
                        name: '快犀牛异常',
                        value: '3'
                    },
                    {
                        name: '销售异常',
                        value: '4',
                    },{
                        name: '客户异常',
                        value: '5',
                    }
                ],
                rules: {
                    carrierId: [{
                        validator: carrierId, trigger: ['blur', 'change']
                    }],
					buttonType: [{
						validator: buttonType, trigger: 'change'
                    }],
                    supplierLinkman: [{
                        validator: supplierLinkman, trigger: 'blur'
                    }],
                    supplierNumber: [{
                        validator: supplierNumber, trigger: 'blur'
                    }],
                    customerLinkman: [{
                        validator: customerLinkman, trigger: 'blur'
                    }],
                    customerNumber: [{
                        validator: supplierNumber, trigger: 'blur'
                    }],
                    distance: [{
                        validator: distance, trigger: 'blur'
                    }],
                    provinceCode: [{
                        validator: provinceCode, trigger: 'change'
                    }],
                    provinceCode2: [{
                        validator: provinceCode, trigger: 'change'
                    }],
                    cityCode: [{
                        validator: cityCode, trigger: 'change'
                    }],
                    cityCode2: [{
                        validator: cityCode, trigger: 'change'
                    }],
                    districtCode: [{
                        validator: districtCode, trigger: 'change'
                    }],
                    districtCode2: [{
                        validator: districtCode, trigger: 'change'
                    }],
                    supplierAddressDetail: [{
                        validator: detailaddress, trigger: 'blur'
                    }],
                    deliveryAddressDetail: [{
                        validator: detailaddress, trigger: 'change'
                    }],
                    takingDate: [{
                        validator: takingDate, trigger: 'change'
                    }],
                    deliveryDate: [{
                        validator: deliveryDate, trigger: 'change'
                    }],
                    totalAllWeight: [{
                        validator: weight, trigger: 'blur'
                    }],
                    totalAllVolume: [{
                        validator: weight, trigger: 'blur'
                    }],
                    freight: [
                        {
                            validator: freight, trigger: 'change'
                        }
                    ],
                    // totalCost: [{
                    //     validator: freight, trigger: 'blur'
                    // }],
                    otherCost: [
                        {
                            validator: otherfreight, trigger: 'blur'
                        }
                    ],
                    remark: [
                        {
                            validator: remark, trigger: 'blur'
                        }
                    ],
                    carrierRemark: [
                        {
                            validator: remark, trigger: 'blur'
                        }
                    ],
                    truckNumber: [
                        {
                            validator: carnumber, trigger: 'blur'
                        }
                    ],
                    carpool: [
                        {
                            validator: carpool, trigger: 'change'
                        }
                    ],
                    claimantCost: [
                        {
                            validator: otherfreight, trigger: 'blur'
                        }
                    ],
                    claimantReason: [
                        {
                            validator: otherfreight, trigger: 'blur'
                        }
                    ],
                    kpiCost: [
                        {
                            validator: otherfreight, trigger: 'blur'
                        }
                    ],
                    kpiReason: [
                        {
                            validator: otherfreight, trigger: 'blur'
                        }
                    ]
                },
                loading: true,
                productList: [],
                TruckTypeInfo: [],
                supplierType: '',
                orderType: '',
                logisticsNumber: '',
                CarrierLists: [],
                carrierOrderUnusualPojoList: [],
                deliveryNumbers: [],
                isclick: true,
				resData: {},

				// 参考距离重新计算次数
				recalcCount: 0,
				// 系统参考报价，手动报价回显在页面上
				systemOffer: '',
				// 承运商接单模式
				orderModel: [
					{
						id: 0,
						name: '承运商端和司机端'
					},
					{
						id: 1,
						name: '仅司机端'
					},
					{
						id: 2,
						name: '仅承运商端'
					},
                ],
                condition3:null
            }
        },
        created() {
            this.getManageList();
            // this.getserverlist();
            this.getorderdetail();
            // this.getprovince();
        },
        mounted() {
            // this.map()
        },
        methods: {
            processDate() {//提出结束时间必须大于提出开始时间
                let self = this;
                return {
                    disabledDate(time) {
                        if (new Date(self.ruleForm.takingDate).getHours() === 0 && new Date(time).getMinutes() === 0) {
                            return time.getTime() < self.ruleForm.takingDate
                        } else {
                            return time.getTime() < self.ruleForm.takingDate - 24 * 60 * 60 * 1000
                        }
                    }
                }
            },
            //提货地图渲染
            takingmap(lng) {
                let map = ''
                let marker = ''
                if (!lng) {
                    map = new AMap.Map('takeingmap', {
                        resizeEnable: true, // 是否监控地图容器尺寸变化
                        zoom: 15, // 初始化地图层级
                        center: [116.397428, 39.90923] // 初始化地图中心点
                    })
                } else {
                    map = new AMap.Map('takeingmap', {
                        resizeEnable: true, // 是否监控地图容器尺寸变化
                        zoom: 17, // 初始化地图层级
                        center: lng // 初始化地图中心点
                    })
                    marker = new AMap.Marker({
                        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
                        position: lng,
                        offset: new AMap.Pixel(-13, -30)
                    })
                }
                let that = this
                let autoOptions = {
                    input: "takeinginput"
                };
                let auto = new AMap.Autocomplete(autoOptions);
                let placeSearch = new AMap.PlaceSearch({
                    map: map
                });
                AMap.event.addListener(auto, "select", select);

                // 供应商地址列表选择后回调函数
                function select(e) {
                    placeSearch.setCity(e.poi.adcode);
                    placeSearch.search(e.poi.name);  //关键字查询查询
                    if (marker) {
                        marker.setMap(null)
                        marker = null
                    }
                    if (e.poi.location) {
                        const position = [e.poi.location.lng, e.poi.location.lat];
                        that.ruleForm.supplierLongitudeAndLatitude = position.join(',');
                        that.ruleForm.supplierLocationAddress = e.poi.name
                        that.ruleForm.districtCode = e.poi.adcode;
                        // 供应商发货地址省市区
                        that.ruleForm.supplierAddressAreaName = e.poi.district;
                        marker = new AMap.Marker({
                            icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
                            position,
                            offset: new AMap.Pixel(-13, -30)
                        })
                        marker.setMap(map)
                    } else {
                        that.$alert('此位置无经纬度，请重新选择地址', '错误', {
                            confirmButtonText: '确定',
                        });
                        that.ruleForm.supplierLongitudeAndLatitude = ''
                        that.ruleForm.supplierLocationAddress = '';
                        // 供应商发货地址省市区
                        that.ruleForm.supplierAddressAreaName = '';
                    }
                }

                if (lng) {
                    marker.setMap(map)
                }
            },
            //送货地图渲染
            delierymap(index, lng) {
                let map = ''
                let marker = ''
                if (!lng) {
                    map = new AMap.Map('demap' + index, {
                        resizeEnable: true, // 是否监控地图容器尺寸变化
                        zoom: 15, // 初始化地图层级
                        center: [116.397428, 39.90923] // 初始化地图中心点
                    })
                } else {
                    map = new AMap.Map('demap' + index, {
                        resizeEnable: true, // 是否监控地图容器尺寸变化
                        zoom: 17, // 初始化地图层级
                        center: lng // 初始化地图中心点
                    })
                    marker = new AMap.Marker({
                        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
                        position: lng,
                        offset: new AMap.Pixel(-13, -30)
                    })
                }
                let autoOptions = {
                    input: "deinput" + index
                };
                let that = this
                let auto = new AMap.Autocomplete(autoOptions);
                let placeSearch = new AMap.PlaceSearch({
                    map: map
                });
                AMap.event.addListener(auto, "select", select);

                // 客户收货地址列表选择后的回调函数
                function select(e) {
                    placeSearch.setCity(e.poi.adcode);
                    placeSearch.search(e.poi.name);  //关键字查询查询
                    if (marker) {
                        marker.setMap(null)
                        marker = null
                    }
                    if (e.poi.location) {
						const position = [e.poi.location.lng, e.poi.location.lat];
                        that.ruleForm.henduokehu[index].deliveryLongitudeAndLatitude = position.join(',')
                        that.ruleForm.henduokehu[index].deliveryAddressArea = e.poi.adcode
                        // 供应商发货地址省市区
                        that.ruleForm.henduokehu[index].deliveryAddressAreaName = e.poi.district;
                        that.ruleForm.henduokehu[index].deliveryLocationAddress = e.poi.name
                        marker = new AMap.Marker({
                            icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
                            position,
                            offset: new AMap.Pixel(-13, -30)
                        })
                        marker.setMap(map)
                    } else {
                        that.$alert('此位置无经纬度，请重新选择地址', '错误', {
                            confirmButtonText: '确定',
                        });
                        that.ruleForm.henduokehu[index].deliveryLongitudeAndLatitude = ''
                        that.ruleForm.henduokehu[index].deliveryAddressArea = ''
                        // 供应商发货地址省市区
                        that.ruleForm.henduokehu[index].deliveryAddressAreaName = '';
                    }
                }

                if (lng) {
                    marker.setMap(map)
                }
            },
            timeDate() {
                let a = new Date(this.ruleForm.takingDate)
                this.timeOptions = {selectableRange: formatDate(a, 'hh:mm') + ':00' + ' ' + '-' + ' ' + '23:59:00'}
            },
            //请求订单详情
            getorderdetail() {
                let url = '/api/sys/carrierOrder/getCarrierOrderDetails/' + this.$route.query.logisticsNumber;
                if (this.$route.query.status === '7' || this.$route.query.status === '6') {
                    url = '/api/sys/carrierHistoryOrder/getHistoryCarrierOrderDetails/' + this.$route.query.logisticsNumber;
                }
                this.$axios.get(url)
                    .then(res => {
                        //顺序由页面字段之上而下排列
                        if (res.data.code === 200) {
                            this.resData = res.data.data;
                            console.log(res)
                            this.ruleForm.orderStatus = res.data.data.carrierOrderStatus + '';
                            //订单id
                            this.ruleForm.id = res.data.data.id;
                            //承运商id
                            this.ruleForm.carrierId = res.data.data.carrierId;
                            this.ruleForm.buttonType = res.data.data.carrierOrderDetailsVo.buttonType;
                            this.condition3 = res.data.data.carrierOrderDetailsVo.branchType === 1 ? true : false
                            //订单商品信息
                            let carrierOrderGoodsVoList = JSON.parse(JSON.stringify(res.data.data.carrierOrderGoodsVoList));
                            //订单详情
                            let carrierOrderDetailsVo = JSON.parse(JSON.stringify(res.data.data.carrierOrderDetailsVo));
                            //订单费用及相关信息
                            let carrierOrderCostVo = JSON.parse(JSON.stringify(res.data.data.carrierOrderCostVo));
                            //订单送货地址详情（客户地址）
                            let carrierOrderDeliveryAddressVoList = JSON.parse(JSON.stringify(res.data.data.carrierOrderDeliveryAddressVoList));
                            //订单异常费用
                            let carrierOrderAbnormalCostVoList = JSON.parse(JSON.stringify(res.data.data.carrierOrderAbnormalCostVoList));
                            //订单运输服务信息
                            let carrierOrderServeVoList = JSON.parse(JSON.stringify(res.data.data.carrierOrderServeVoList));
                            //订单车型信息
                            let carrierOrderTruckVoList = JSON.parse(JSON.stringify(res.data.data.carrierOrderTruckVoList));
                            //订单图片详情信息
                            let driverOrderFileDetailsVoList = JSON.parse(JSON.stringify(res.data.data.driverOrderFileDetailsVoList));
                            driverOrderFileDetailsVoList.forEach((v, one) => {
                                v.shipmentDriverOrderFileVoList.forEach((i, index) => {
                                    i.url = ''
                                })
                                v.unloadDriverOrderFileVoList.forEach((i, index) => {
                                    i.url = ''
                                })
                                v.unusualDriverOrderFileVoList.forEach((i, index) => {
                                    i.fileList = []
                                    i.fileIds.split(',').forEach(v => {
                                        let params = {
                                            name: '',
                                            fileId: v,
                                            url: ''
                                        }
                                        i.fileList.push(params)
                                    })
                                })
                            })
                            this.productList = carrierOrderGoodsVoList;
                            //供应商类型的区分
                            this.supplierType = carrierOrderDetailsVo.supplierType;
                            //订单类型的区分
                            this.orderType = carrierOrderDetailsVo.orderType;
                            //物流单号
                            this.logisticsNumber = res.data.data.logisticsNumber;
                            this.deliveryNumbers = (res.data.data.carrierOrderDetailsVo.deliveryNumber || '').split(',').filter(v=>v);
                            //供应链联系人
                            this.ruleForm.supplyName = carrierOrderDetailsVo.supplyName;
                            //供应商名称（工厂名称）
                            this.ruleForm.supplierName = carrierOrderDetailsVo.supplierName;
                            //供应商联系人
                            this.ruleForm.supplierLinkman = carrierOrderDetailsVo.supplierLinkman;
                            //供应商联系电话
                            this.ruleForm.supplierNumber = carrierOrderDetailsVo.supplierPhone;
                            //供应商备用联系方式
                            this.ruleForm.spareNumber = carrierOrderDetailsVo.supplierSpareContacts;
                            //供应商发货地址详情
                            this.ruleForm.supplierAddressDetail = carrierOrderDetailsVo.supplierAddressDetail;

                            // 供应商发货地址省市区(获取高德地图)
                            this.ruleForm.supplierAddressAreaName = carrierOrderDetailsVo.supplierAddressAreaName;

                            //供应商发货地址编码(区的编码)
                            this.ruleForm.districtCode = carrierOrderDetailsVo.supplierAddressArea;
                            //供应商地图地址
                            this.ruleForm.supplierLocationAddress = carrierOrderDetailsVo.supplierLocationAddress;
                            //供应商经纬度渲染
                            this.ruleForm.supplierLongitudeAndLatitude = carrierOrderDetailsVo.supplierLongitudeAndLatitude;
                            if (this.ruleForm.supplierLongitudeAndLatitude) {
                                this.takingmap(this.ruleForm.supplierLongitudeAndLatitude.split(','))
                            } else {
                                this.takingmap()
                            }
                            //客户信息集合
                            //客户全称
                            this.ruleForm.clientName = res.data.data.clientName;
                            //客户级别
                            if (res.data.data.clientLevel) {
                                this.ruleForm.clientLevel = res.data.data.clientLevel.substr(0, 1);
                            }
                            //客户地址集合
                            this.ruleForm.henduokehu = carrierOrderDeliveryAddressVoList;
                            //客户地址渲染
                            this.$nextTick(function () {
                                this.ruleForm.henduokehu.forEach((v, index) => {
                                    if (v.deliveryLongitudeAndLatitude) {
                                        this.delierymap(index, v.deliveryLongitudeAndLatitude.split(','))
                                    } else {
                                        this.delierymap(index, null)
                                    }
                                })
                            })
                            //总重量
                            this.ruleForm.totalAllWeight = carrierOrderCostVo.totalWeight + '';
                            //总体积
                            this.ruleForm.totalAllVolume = carrierOrderCostVo.totalVolume + '';
                            //参考距离
                            this.ruleForm.distance = carrierOrderCostVo.distance + '';
                            //发货日期
                            this.ruleForm.takingDate = res.data.data.takingDate;
                            //最晚送货日期
                            this.ruleForm.deliveryDate = res.data.data.deliveryDate;
                            //服务
                            this.getserverlist(carrierOrderServeVoList);
                            //运输类型
                            this.ruleForm.carpool = carrierOrderDetailsVo.carpool + '';
                            //车型选择
                            this.getTwo(carrierOrderTruckVoList).then(()=>{
								this.$nextTick(()=>{
									// 获取系统报价
									this.watchfangfa(1)
								});
							});
                            //订单备注
                            this.ruleForm.remark = carrierOrderDetailsVo.orderRemark;
                            //运输费用
                            this.ruleForm.freight = carrierOrderCostVo.freight + '';
                            //异常类型
                            let otherCost = carrierOrderAbnormalCostVoList;
                            otherCost.forEach(v => {
                                this.abtype.push(v.abnormalType + '')
                                v.abnormalCost = v.abnormalCost + ''
                            });
                            this.ruleForm.otherCost = JSON.parse(JSON.stringify(otherCost))
                            //kpi扣款
                            this.ruleForm.kpiCost = carrierOrderCostVo.kpiCost + '';
                            //kpi扣款原因
                            this.ruleForm.kpiReason = carrierOrderCostVo.kpiReason;
                            //索赔金额
                            this.ruleForm.claimantCost = carrierOrderCostVo.claimantCost + '';
                            //索赔原因
                            this.ruleForm.claimantReason = carrierOrderCostVo.claimantReason;
                            //费用备注
                            this.ruleForm.carrierRemark = carrierOrderCostVo.costRemark;
                            // 费用类型，是手动报价还是自动报价
                            this.ruleForm.costType = carrierOrderCostVo.costType;
                            //车辆相关照片
                            this.ruleForm.carAndDriverList = JSON.parse(JSON.stringify(driverOrderFileDetailsVoList));
                            this.ruleForm.carAndDriverList.forEach((v, one) => {
                                v.shipmentDriverOrderFileVoList.forEach((i, index) => {
                                    this.changeImg(i.fileId, one, index, 1)
                                })
                                v.unloadDriverOrderFileVoList.forEach((i, index) => {
                                    this.changeImg(i.fileId, one, index, 2)
                                })
                                v.unusualDriverOrderFileVoList.forEach((i, index) => {
                                    i.fileList.forEach((value, three) => {
                                        this.changeImg(value.fileId, one, index, 3, three)
                                    })
                                })
                            })
                            console.log(this.ruleForm.carAndDriverList)
							this.loading = false
                        } else if (res.data.code !== 1006) {
                            this.$alert(res.data.message, '错误', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'error',
                                        message: res.data.message
                                    });
                                }
                            });
                        }
                    })
            },
            carselect(index) {
                this.ruleForm.truckList[index].number = '';
                this.TruckTypeInfo.forEach(v => {
                    v.disabled = false
                });
                this.TruckTypeInfo.forEach(v => {
                    this.ruleForm.truckList.forEach(i => {
                        if (v.id === i.truckTypeId) {
                            v.disabled = true
                        }
                    })
                })
            },
            yichangfeiyong(value) {
                let otherCost = []
                value.forEach(v => {
                    let params = {
                        abnormalType: Number(v),
                        abnormalCost: '',
                        abnormalReason: ''
                    }
                    otherCost.push(params)
                })
                this.ruleForm.otherCost.forEach((v, index) => {
                    otherCost.forEach(i => {
                        if (Number(v.abnormalType) === Number(i.abnormalType)) {
                            i.abnormalCost = v.abnormalCost
                            i.abnormalReason = v.abnormalReason
                        }
                    })
                })
                this.ruleForm.otherCost = JSON.parse(JSON.stringify(otherCost))
            },
            selectcarrier(carrierId) {
                // 询问合同价还是手动报价
                this.$confirm('使用合同报价还是临时报价？', '询问', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '使用合同报价',
                    cancelButtonText: '使用临时报价'
                }).then(()=>{
                    this.refreshOffer(carrierId, 0);
                }).catch(action=>{
                    // 点击的“临时报价”按钮
                    if(action == 'cancel'){
                        this.refreshOffer(carrierId, 1);
                    }
                });
            },
            /**刷新报价 */
            refreshOffer(carrierId, costType){
                // 记录承运商id
                this.ruleForm.carrierId = carrierId;
                // 获取报价请求发出后，在设置费用类型
                this.ruleForm.costType = costType;

                // 重新计算各种服务选项报价
                this.tijiup()
                // 重新获取系统报价
                this.watchfangfa();
            },
            //取消订单-zhuquanan
            cancelOrder() {
                let url = '/api/sys/carrierOrder/cancelCarrierOrder/' + this.ruleForm.id;
                // let parmas = {
                //     carrierOrderId: this.ruleForm.id,
                //     newStatus: '6',
                //     oldStatus: this.ruleForm.orderStatus,
                //     deliveryNumber: '1'
                // }
                this.$axios.get(url)
                    .then(res => {
                        this.$router.push({path: '/transportcomplete'})
                    })
            },
            //图片拒绝
            Imgreject(id, state) {
                this.centerDialogVisible2 = true;
                this.rejectform.bohuiareaMsg = ''
                this.auditdirverid = id;
                this.state = state
            },
            //图片通过
            Imgpass(id, state) {
                this.centerDialogVisible = true;
                this.rejectform.bohuiareaMsg = ''
                this.auditdirverid = id;
                this.state = state
            },
            rejectdirver() {
                this.$refs['rejectform'].validate((valid) => {
                    if (valid) {
                        let params = {
                            auditState: 3,
                            driverOrderId: this.auditdirverid,
                            carrierOrderId: this.ruleForm.id,
                            remark: this.rejectform.bohuiareaMsg
                        };
                        let url = '/api/sys/carrierOrder/approvalOrder';
                        this.$axios.post(url, params)
                            .then(res => {
                                if (res.data.code === 200) {
                                    window.location.reload()
                                } else if (res.data.code !== 1006) {
                                    this.$alert(res.data.message, '错误', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                            this.$message({
                                                type: 'error',
                                                message: res.data.message
                                            });
                                        }
                                    });
                                }
                            })
                    } else {
                        return false;
                    }
                });
            },
            fan() {
                if (!this.ruleForm.deliveryDate) {
                    this.$alert('请先选择送货日期', '标题名称', {
                        confirmButtonText: '确定',
                        callback: action => {
                        }
                    });
                }
            },
            filterType(state) {
                if (state === 0) {
                    return ' 承运商异常'
                }
                if (state === 1) {
                    return ' 供应链异常'
                }
                if (state === 2) {
                    return ' 工厂异常'
                }
                if (state === 3) {
                    return ' 快犀牛异常'
                }
                if (state === 4) {
                    return '销售异常'
                }
                if (state === 5) {
                    return '客户异常'
                }
            },
            confirmdirver() {
                let params = {
                    auditState: 2,
                    driverOrderId: this.auditdirverid,
                    carrierOrderId: this.ruleForm.id,
                };
                let url = '/api/sys/carrierOrder/approvalOrder';
                this.$axios.post(url, params)
                    .then(res => {
                        if (res.data.code === 200) {
                            window.location.reload()
                        } else if (res.data.code !== 1006) {
                            this.$alert(res.data.message, '错误', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$message({
                                        type: 'error',
                                        message: res.data.message
                                    });
                                }
                            });
                        }
                    })
            },
            changeImg(id, one, index, state, three) {
                let that = this
                area.changeImg(id, one, index).then(url => {
                    if (state === 1) {
                        if (!that.ruleForm.carAndDriverList[one].shipmentDriverOrderFileVoList[index].url) {
                            that.ruleForm.carAndDriverList[one].shipmentDriverOrderFileVoList[index].url = url
                        }
                    }
                    if (state === 2) {
                        if (!that.ruleForm.carAndDriverList[one].unloadDriverOrderFileVoList[index].url) {
                            that.ruleForm.carAndDriverList[one].unloadDriverOrderFileVoList    [index].url = url
                        }
                    }
                    if (state === 3) {
                        if (!that.ruleForm.carAndDriverList[one].unusualDriverOrderFileVoList[index].fileList[three].url) {
                            that.ruleForm.carAndDriverList[one].unusualDriverOrderFileVoList[index].fileList[three].url = url
                        }
                    }
                })
            },
            //获取服务列表
            getserverlist(data) {
                let url = '/api/sys/dict/getAllTransportServices';
                this.$axios.get(url)
                    .then(res => {
                        if (res.data.code === 200) {
                            let severlists = res.data.data;
                            severlists.forEach(v => {
                                v.selects = false;
                                v.price = '';
                            })
                            this.severlists = JSON.parse(JSON.stringify(severlists));
                            this.severlist = JSON.parse(JSON.stringify(data));
                            this.severlists.forEach(v => {
                                this.severlist.forEach(i => {
                                    if (v.id === i.serviceTypeId) {
                                        v.selects = true;
                                        v.price = i.price;
                                        i.name = v.name
                                    }
                                })
                            })
                            this.severlist.forEach(v => {
                                let params = {
                                    serviceType: v.name,
                                    price: v.price + '',
                                    carrierOrderId: this.ruleForm.id,
                                    id: v.serviceTypeId
                                }
                                // if (Number(params.price) === 0 && Number(this.ruleForm.totalAllVolume) !== 0 && this.ruleForm.carrierId) {
                                //     let url = '/api/otherFreight/computeOtherFreight'
                                //     let value = {
                                //         carrierId: this.ruleForm.carrierId,
                                //         supplierAddressArea: this.ruleForm.districtCode,
                                //         volume: this.ruleForm.totalAllVolume,
                                //         otherFreightId: v.oid
                                //     }
                                //     this.$axios.post(url, value)
                                //         .then(res => {
                                //             params.price = res.data.data + ''
                                //         })
                                // }
                                this.ruleForm.confirmhua.push(params)
                            })
                        }
                    })
            },
            takingDateSelect() {
                this.ruleForm.deliveryDate = null;
                this.timeDate()
            },
            //获取所有承运商
            getManageList() {
                let url = '/api/sys/carrier/getNormalCarriers';
                this.$axios.get(url)
                    .then(res => {
                        if (res.data.code === 200) {
                            this.CarrierLists = res.data.data
                        }
                    })
            },
            car() {
                this.TruckTypeInfo.forEach(v => {
                    this.ruleForm.truckList.forEach(i => {
                        if (v.id === i.truckTypeId) {
                            v.disabled = true
                        }
                    })
                })
            },
            Addkehu() {
                this.ruleForm.henduokehu.push({
                    customerLinkman: '',
                    customerNumber: '',
                    beiyongdianhua: '',
                    districtCode: '',
                    provinces: [],
                    citys: [],
                    districts: [],
                    provinceCode: '',
                    cityCode: '',
                    address: '',
                    deliveryAddressDetail: '',
                    deliveryAddressArea: '',
                    deliveryLocationAddress: '',
                    deliveryLongitudeAndLatitude: ''
                })
                // this.getprovince2()
                this.$nextTick(function () {
                    this.delierymap(this.ruleForm.henduokehu.length - 1)
                })
            },
            deletekehu(index) {
                this.ruleForm.henduokehu.splice(index, 1);
            },
            //添加车辆类型
            addcar() {
                let params = {
                    truckTypeId: '',
                    number: ''
                }
                this.ruleForm.truckList.push(params)
            },
            //删除车辆类型
            deletecar(index) {
                this.ruleForm.truckList.splice(index, 1);
                this.TruckTypeInfo.forEach(v => {
                    v.disabled = false
                });
                this.car()
            },
            //滑块状态改变时
            huakuai(index) {
                this.confirmhuakuai(index)
            },
            //计算费用的选择
            confirmhuakuai(index) {
                let params = {
                    serviceType: this.severlists[index].name,
                    price: this.severlists[index].price + '',
                    carrierOrderId: this.ruleForm.id,
                    id: this.severlists[index].id
                }
                let url = '/api/sys/freight/computeOtherFreight'
                let value = {
                    carrierId: this.ruleForm.carrierId,
                    supplierAddressArea: this.ruleForm.districtCode,
                    volume: this.ruleForm.totalAllVolume,
                    otherFreightId: this.severlists[index].id
                }
                if (this.severlists[index].selects) {
                    // 如果是手动报价，设置所有服务类型金额为0
                    if(this.isManualOffer){
                        this.ruleForm.confirmhua.push({
                            ...params,
                            price: 0,
                        });
                        return;
                    }

                    this.$axios.post(url, value)
                        .then(res => {
                            if (res.data.code === 200) {
                                params.price = res.data.data + ''
                            } else {
                                params.price = '0'
                            }
                            this.ruleForm.confirmhua.push(params)
                        })
                } else {
                    this.ruleForm.confirmhua.forEach((v, i) => {
                        if (v.serviceType === this.severlists[index].name) {
                            this.ruleForm.confirmhua.splice(i, 1)
                        }
                    })
                }

            },
            //体积与费用相关联（重新计算所有服务选项对应的金额）,承运商变化和体积变化
            tijiup() {
                // this.ruleForm.confirmhua.forEach(v => {
                //     // 费用类型为临时报价时，清空服务金额
                //     if(this.isManualOffer){
                //         v.price = 0;
                //         return;
                //     }

                //     let url = '/api/sys/freight/computeOtherFreight'
                //     let value = {
                //         carrierId: this.ruleForm.carrierId,
                //         supplierAddressArea: this.ruleForm.districtCode,
                //         volume: this.ruleForm.totalAllVolume,
                //         otherFreightId: v.id
                //     }
                //     this.$axios.post(url, value)
                //         .then(res => {
                //             if (res.data.code === 200) {
                //                 v.price = res.data.data + ''
                //             } else {
                //                 v.price = '0'
                //             }
                //         })
				// })

				const serviceCost = this.ruleForm.confirmhua;

				// 费用类型为临时报价时，清空服务金额
				if(this.isManualOffer){
					serviceCost.forEach(v=>v.price = 0);
					return;
				}

				if(serviceCost.length == 0){
					return;
				}

				let url = '/api/sys/freight/batchComputeOtherFreight'
				let value = {
					carrierId: this.ruleForm.carrierId,
					supplierAddressArea: this.ruleForm.districtCode,
					volume: this.ruleForm.totalAllVolume,
					otherFreightIds: this.ruleForm.confirmhua.map(v=>v.id),
				}
				this.$axios.post(url, value).then(res => {
					if(res.data.code === 200){
						const costMap = res.data.data.reduce((map, {otherFreightDictId,otherCostMoney})=>Object.assign(map, {[otherFreightDictId]:otherCostMoney}), {});
						// v.price = res.data.data + ''
						serviceCost.forEach(v=>v.price=costMap[v.id]);
					}else{
						// v.price = '0'
						serviceCost.forEach(v=>v.price=0);
					}
				})
            },
            //监听运费（重新计算运费报价）
            watchfangfa(isGetSysOffer) {
                // 如果为手动报价
                // if(this.isManualOffer){
                //     this.ruleForm.freight = 0;
                //     return;
                // }

                let url = '/api/sys/freight/computeFreight'
                let truckList = JSON.parse(JSON.stringify(this.ruleForm.truckList))
                let cartype = []
                truckList.forEach(v => {
                        let value = {
                            id: v.truckTypeId,
                            count: v.number + ''
                        }
                        cartype.push(value)
                })
                let params = {
                    carrierId: this.ruleForm.carrierId,
                    supplierAddressArea: this.ruleForm.districtCode,
                    distance: this.ruleForm.distance,
                    truckTypes: cartype
                }
                if(params.carrierId !== '' && params.carrierId !== null) {
                    this.$axios.post(url, params).then(res => {
                            // 报价
                            let offer = 0;
    
                            if (res.data.code === 200) {
                                // 记录系统报价
                                offer = res.data.data;
                            }
    
                            if(this.isManualOffer){
                                // 回显系统报价
                                this.systemOffer = offer;
                                // 置为0，将vm中的报价设为0
                                offer = 0;
                            }
    
                            // 只是获取系统报价
                            if(!isGetSysOffer){
                                this.ruleForm.freight = offer;
                            }
    
                            // 重新校验运费字段
                            this.$refs.ruleForm.validateField('freight');
                        })
                }
            },
            //获取所有车辆信息
            getTwo(data) {
                let url = '/api/sys/truckType/getAllTruckType';
                return this.$axios.get(url)
                    .then(res => {
                        this.TruckTypeInfo = res.data.data
                        this.TruckTypeInfo.forEach(v => {
                            v.disabled = false
                        });
                        let truckList = data
                        truckList.forEach(v => {
                            v.number = v.number + ''
                        })
                        this.ruleForm.truckList = JSON.parse(JSON.stringify(truckList))
                        this.car()
                    })
            },
            //修改订单信息
            updateinfomation() {
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        if (this.isclick) {
                            // let truckList = JSON.parse(JSON.stringify(this.ruleForm.truckList));
                            // let confirmhua = JSON.parse(JSON.stringify(this.ruleForm.confirmhua));
                            // confirmhua.forEach(v => {
                            //     delete v.id
                            // })
                            let deliveryAddressList = []
                            this.ruleForm.henduokehu.forEach(v => {
                                deliveryAddressList.push({
                                    customerLinkman: v.customerLinkman,
                                    customerNumber: v.customerNumber,
                                    customerSpareContacts: v.customerSpareContacts,
                                    deliveryAddressArea: v.deliveryAddressArea,
                                    deliveryAddressDetail: v.deliveryAddressDetail,
                                    deliveryLocationAddress: v.deliveryLocationAddress,
                                    deliveryLongitudeAndLatitude: v.deliveryLongitudeAndLatitude,
                                    // 送货地址省市区
                                    deliveryAddressAreaName: v.deliveryAddressAreaName,
                                })
                            })
                            let carrierOrderAbnormalCostVoList = []
                            this.ruleForm.otherCost.forEach(v => {
                                carrierOrderAbnormalCostVoList.push({
                                    abnormalType: v.abnormalType,
                                    abnormalCost: v.abnormalCost,
                                    abnormalReason: v.abnormalReason,
                                })
                            })
                            let carrierOrderServeVoList = []
                            this.ruleForm.confirmhua.forEach(v => {
                                carrierOrderServeVoList.push({
                                    serviceTypeId: v.id,
                                    price: v.price
                                })
                            })
                            let carrierOrderTruckVoList = []
                            this.ruleForm.truckList.forEach(v => {
                                carrierOrderTruckVoList.push({
                                    truckTypeId: v.truckTypeId,
                                    number: v.number
                                })
                            })
                            let params = {
                                id: this.ruleForm.id,
                                takingDate: this.ruleForm.takingDate,
                                deliveryDate: this.ruleForm.deliveryDate,
                                carrierId: this.ruleForm.carrierId,
                                carrierOrderDetailsVo: {
                                    supplierLinkman: this.ruleForm.supplierLinkman,
                                    supplierPhone: this.ruleForm.supplierNumber,
                                    supplierSpareContacts: this.ruleForm.spareNumber,
                                    supplierAddressArea: this.ruleForm.districtCode,
                                    supplierAddressDetail: this.ruleForm.supplierAddressDetail,
                                    supplierLongitudeAndLatitude: this.ruleForm.supplierLongitudeAndLatitude,
                                    supplierLocationAddress: this.ruleForm.supplierLocationAddress,
                                    carpool: this.ruleForm.carpool,
									buttonType: this.ruleForm.buttonType,
                                    orderRemark: this.ruleForm.remark,
                                    // 供应商发货地址省市区
                                    supplierAddressAreaName: this.ruleForm.supplierAddressAreaName,
                                },
                                carrierOrderCostVo: {
                                    distance: this.ruleForm.distance,
                                    totalWeight: this.ruleForm.totalAllWeight,
                                    totalVolume: this.ruleForm.totalAllVolume,
                                    freight: this.ruleForm.freight,
                                    kpiCost: this.ruleForm.kpiCost,
                                    kpiReason: this.ruleForm.kpiReason,
                                    claimantCost: this.ruleForm.claimantCost,
                                    claimantReason: this.ruleForm.claimantReason,
                                    totalCost: this.ruleForm.totalCost,
                                    costRemark: this.ruleForm.carrierRemark,
                                    costType: this.ruleForm.costType,
                                },
                                carrierOrderDeliveryAddressVoList: deliveryAddressList,
                                carrierOrderAbnormalCostVoList: carrierOrderAbnormalCostVoList,
                                carrierOrderServeVoList: carrierOrderServeVoList,
                                carrierOrderTruckVoList: carrierOrderTruckVoList,
                            };
                            let url = '/api/sys/carrierOrder/updateCarrierOrderInformation';
                            let all = 0
                            if (!params.carrierOrderDetailsVo.supplierLongitudeAndLatitude || !params.carrierOrderDetailsVo.supplierLocationAddress) {
                                all += 1
                            }
                            params.carrierOrderDeliveryAddressVoList.forEach(v => {
                                if (!v.deliveryLongitudeAndLatitude || !v.deliveryLocationAddress) {
                                    all += 1
                                }
                            })
                            if (all === 0) {
                                this.$axios.post(url, params)
                                    .then(res => {
                                        if (res.data.code === 200) {
                                            // if (this.$route.path !== '/allorder-allorderedit') {
                                            //     if (this.ruleForm.orderStatus === '0') {
                                            //         this.$router.push({path: '/stayaboutcar'})
                                            //     }
                                            //     if (this.ruleForm.orderStatus === '1') {
                                            //         this.$router.push({path: '/carrierallocated'})
                                            //     }
                                            //     if (this.ruleForm.orderStatus === '2' || this.ruleForm.orderStatus === '3') {
                                            //         this.$router.push({path: '/fortheloading'})
                                            //     }
                                            //     if (this.ruleForm.orderStatus === '4' || this.ruleForm.orderStatus === '5') {
                                            //         this.$router.push({path: '/intransit'})
                                            //     }
                                            // } else {
                                            //     this.$router.push({path: '/allorder'})
											// }
											// 页面返回上一页（为了保留列表页的搜索条件）
											this.$router.back();
                                        } else if (res.data.code !== 1006) {
                                            this.loading = false
                                            this.$alert(res.data.message, '错误', {
                                                confirmButtonText: '确定',
                                                callback: action => {
                                                    this.$message({
                                                        type: 'error',
                                                        message: res.data.message
                                                    });
                                                }
                                            });
                                        }
                                        // // if (res.data.errcode === '000000') {
                                        // //     if (this.$route.path !== '/allorder-allorderedit') {
                                        // //         if (this.ruleForm.orderStatus === '0') {
                                        // //             this.$router.push({path: '/stayaboutcar'})
                                        // //         }
                                        // //         if (this.ruleForm.orderStatus === '1') {
                                        // //             this.$router.push({path: '/carrierallocated'})
                                        // //         }
                                        // //         if (this.ruleForm.orderStatus === '2' || this.ruleForm.orderStatus === '10') {
                                        // //             this.$router.push({path: '/fortheloading'})
                                        // //         }
                                        // //         if (this.ruleForm.orderStatus === '3' || this.ruleForm.orderStatus === '11') {
                                        // //             this.$router.push({path: '/intransit'})
                                        // //         }
                                        // //         if (this.ruleForm.orderStatus === '5') {
                                        // //             this.$router.push({path: '/transportcomplete'})
                                        // //         }
                                        // //     } else {
                                        // //         this.$router.push({path: '/allorder'})
                                        // //     }
                                        // } else {
                                        //     this.$message.error(res.data.errmsg);
                                        // }
                                    })
                                this.isclick = false;
                                //定时器
                                let that = this
                                setTimeout(function () {
                                    that.isclick = true;
                                }, 5000);//五秒内不能重复点击
                            }
                        }
                    } else {
                        return false
                    }
                })
			},
			/**参考距离重新计算函数 */
			async reCalcDistanceHandle(){
				this.recalcCount++;

				const { data: { code, data, } } = await this.$axios({
					url: `/api/sys/carrierOrder/getDistance/${ this.resData.id }`,
					type: 'get',
				});

				// 失败提示
				if(code == 200){
					this.ruleForm.distance = data.toFixed(2);

					this.$message.success({
						message: '参考距离已更新'
					});
				}else{
					this.$message.success({
						message: '参考距离计算失败'
					});
				}
			},
        },
        computed: {
            /**是否为旧订单 */
            isOldOrder(){
                return /^(1|0)$/.test(this.supplierType) || this.orderType==2;
            },
            /**纸箱类型的订单列表 */
            cartonProductList(){
                return this.productList.filter(v=>v.productType==1);
            },
            /**非纸箱类型的订单列表 */
            notCartonProductList(){
                return this.productList.filter(v=>v.productType==2);
            },
            jisuan() {
                let all = 0;
                this.ruleForm.confirmhua.forEach(v => {
                    all += Number(v.price)
                });
                this.ruleForm.otherCost.forEach(v => {
                    all += Number(v.abnormalCost)
                });
                this.ruleForm.totalCost = (Number(this.ruleForm.freight * 1) + all - Number(this.ruleForm.kpiCost) - Number(this.ruleForm.claimantCost)).toFixed(2) + '';
                return (Number(this.ruleForm.freight * 1) + all - Number(this.ruleForm.kpiCost) - Number(this.ruleForm.claimantCost)).toFixed(2)
            },
            countWord() {
                let counts = this.rejectform.bohuiareaMsg.length;
                if (counts >= 100) {
                    return 100;
                } else {
                    return counts;
                }
            },
            newTableData() {
                return JSON.parse(JSON.stringify(this.ruleForm.truckList))
            },
            distance() {
                return this.ruleForm.distance
            },
            volume() {
                return this.ruleForm.totalAllVolume
			},
			/**重新计算距离的按钮是否禁用 */
			recalcBtnDisable(){
				return this.recalcCount > 2;
			},
			/**重新计算距离按钮是否显示 */
			recalcBtnVisible(){
				// 只有待约车编辑页面才展示此按钮
				return this.$route.name == 'StayaboutCarEdit';
			},
			/**异常类型设置选项是否可见 */
			exceptionTypeOptionVisible(){
				if(this.resData && this.resData.driverOrderFileDetailsVoList){
					return this.resData.driverOrderFileDetailsVoList.some((v)=>{
						return v.unusualDriverOrderFileVoList.length > 0;
					});
				}else{
					return false;
				}
			},
			// 选择承运商选项列表是否可见，只有待约车编辑页才展示
			chooseCarrierListVisible(){
				// return this.$route.name == 'StayaboutCarEdit';
				return this.resData.carrierOrderStatus === 0;
			},
			// 是否为手动报价
			isManualOffer(){
				// 没有设置报价类型时，按照临时报价
                // const { carrierOrderCostVo: { costType }={} } = this.resData;
                return this.ruleForm.costType == 1;
			},
        },
        watch: {
            // 卡车类型变化后
            newTableData: {
                handler(val, old) {
                    if (old.length > 0) {
                        this.watchfangfa()
                    }
                },
                deep: true
            },
            // 总体积变化时，重新计算服务费用
            volume(val, old) {
                if (old !== '' || this.zhuangtai) {
                    this.tijiup()
                }
            },
            distance(val, old) {
                if (old !== '' || this.zhuangtai) {
                    this.watchfangfa()
                }
            }
		},
		filters: {
			// 费用类型(合同价0,临时价1)
			costTypeFormat(costType){
				// const costType = costVo;
				return {
					0: '合同价',
					1: '临时价',
				}[costType] || '无';
			},
		},
    }
</script>

<style scoped>
	.detail-clock-box{
		display: flex;
		margin-top: 40px;
	}
	.detail-clock-box .h-title{
		width:110px ;
	}
	.detail-clock{
		flex: 1;
	}
	.detail-clock-time{
		margin: 10px 0;
	}
	.detail-clock-time span{
		padding-right: 20px;
	}
    .supplier > div {
        float: left;
        margin-left: 50px;
    }

    .kehu > div:nth-child(3) {
        margin-left: 50px !important;
    }

    .supplier > div:nth-child(odd) {
        margin-left: 0px;
    }

    .client > div {
        float: left;
        margin-left: 50px;
    }

    .client > div:nth-child(1) {
        margin-left: 0px;
    }

    .Pickgoods > div {
        float: left;
    }

    .Delivery > div {
        float: left;
    }

    .Modelschoose > div {
        float: left;
    }

    .DeliveryDate > div {
        float: left;
    }

    .h-title {
        font-size: 16px;
        font-family: "Microsoft Yahei", sans-serif;
        color: #333333;
    }
	.h-title i{
		display: block;
		font-weight: normal;
		color: #606266;
		font-size: 14px;
		padding-top: 10px;
	}
    .add {
        width: 40px;
        height: 20px;
        background-color: rgba(56, 156, 255, 1);
        margin-top: 10px;
        margin-left: 8px;
        text-align: center;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
    }

    .delete {
        width: 40px;
        height: 20px;
        background-color: rgba(56, 156, 255, 0);
        margin-top: 10px;
        margin-left: 8px;
        text-align: center;
        color: rgba(56, 156, 255, 1);
        cursor: pointer;
    }

    .change-btn-wrapper {
        padding: 40px 0px 20px 0px;
        margin-top: 40px;
    }

    .Imgbutton {
        text-align: center;
    }

    .carimg {
        width: 160px;
        min-height: 180px;
        text-align: center;
        line-height: initial;
    }

    .singlimg {
        width: 160px;
        height: 120px;
        background: #D8D8D8 100%;
        margin-bottom: 5px;
    }

    .singlimg > div {
        /* width: 160px; */
        height: 120px;
        background: #D8D8D8 100%;
    }

    .us-dialog-cover-wrapper.us-dialog-input .us-dialog-body {
        padding: 70px 140px 0px;
    }

    .warn {
        width: 68px;
        margin: auto;
        height: 68px;
        text-align: center;
        margin-top: 0px;

    }

    .warn > img {
        width: 100%;
        height: 100%;
    }

    .equire {
        font-size: 24px;
        text-align: center;
        margin-top: 20px;
        color: #333333;
    }

    /* DS单号内容过长显示。。。 */
    .ds_order_num{
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 8px;
    }
</style>
<style>
    .Pickgoods .el-form-item__content {
        margin-left: 2px !important;
    }

    .Modelschoose .vt {
        overflow: hidden;
        float: none !important;

    }

    .Pickgoods .el-form-item:nth-child(5) .el-form-item__content {
        margin-left: 24px !important;
    }

    .Delivery .el-form-item__content {
        margin-left: 2px !important;
    }

    .Modelschoose .el-form-item__content {
        margin-left: 0px !important;
    }

    .Modelschoose .el-form-item:nth-child(3) .el-form-item__content {
        margin-left: 32px !important;
    }

    .Delivery .el-form-item:nth-child(5) .el-form-item__content {
        margin-left: 24px !important;
    }

    .el-form-item__content .carimg {
        /* float: left !important; */
        /* margin-left: 40px !important; */
        /* width: 160px; */
    }

    .edit-stayboutcar .el-form-item__content .allcareimg {
        max-width: 760px;
    }

    .allcareimg .wrap{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .allcareimg .wrap .carimg{
        flex: 0 0 25%;
    }

    .el-form-item__content .carimg:nth-child(4n+1) {
        margin-left: 0px !important;
    }

    .StayaboutCarEdit .el-form-item__label {
        color: #666666;
    }

    .DeliveryDate .el-form-item__content {
        margin-left: 0px !important;
    }

    .DeliveryDate .el-form-item:nth-child(3) .el-form-item__content {
        margin-left: 20px !important;
    }

    .StayaboutCarEditremark textarea {
        height: 80px;
    }

    .Serviceselection .el-form-item__content div:nth-child(1) {
        margin-left: 0px !important;
    }

    .Modelschoose .vt {
        overflow: hidden;
        float: none !important;

    }

    .Modelschoose .vt:not(:first-child) {
        margin-left: 110px !important;
    }

    .vt > div {
        float: left;
    }

    .vt > div:nth-child(2) {
        margin-left: 20px;
    }

    .Imgbutton .el-button--default {
        border-radius: initial;
        border-color: #389CFF;
        color: #389CFF;
        width: 80px;
    }

    .Imgbutton .el-button--danger {
        border-radius: initial;
        width: 80px;
    }

    .Imgbutton .el-button--success {
        border-radius: initial;
        width: 80px;
    }

    .Imgbutton .el-button--primary {
        border-radius: initial;
        width: 80px;
    }

    .tonguo .el-dialog {
        width: 600px !important;
        height: 400px !important;
    }

    .bohui .el-textarea textarea {
        height: 114px !important;
        width: 356px;
    }

    .bohui .el-form {
        margin-left: -40px;
    }

    .Imgbutton .el-button {
        margin-left: 0px !important;
    }

    .beizhu_last div {
        width: 110px;
        float: left;
    }

    .beizhu_last div:nth-child(2) {
        width: 900px;
        font-size: 16px;
        line-height: 40px;
    }

    .leval {
        margin-left: 10px !important;
    }

    /*地图*/
    .map {
        width: 100%;
        height: 300px;
        position: relative;
        margin-bottom: 20px;
    }

    .input_map {
        position: absolute;
        top: 10px;
        left: 20px;
        z-index: 1;
    }

    .input_map > input {
        width: 350px;
        height: 30px;
        border: 1px solid #d6d6d6;
    }

    .input_error > input {
        border: 1px solid red !important;
    }

    .amap-icon img {
        width: 30px !important;
        height: 40px !important;
    }

    .amap-marker-content {
        display: none !important;
    }
</style>
