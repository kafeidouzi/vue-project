<template>
	<view class="cart">
		<!-- 购物车内容为空 -->
		<view v-if="showContent == 'notShow'" class="noMessage">
			<img src="/static/images/noShopping.png" alt="" />
			<view class="hint">
				您的购物车是空的，
				<span class="hint_red" @click="toIndex">去逛逛</span>
			</view>
		</view>
		<!-- 购物车 -->
		<view v-if="showContent == 'show'" class="content">
			<checkbox-group @change="checkboxChange">
				<blcok v-for="(item, index) in pageList" :key="index">
					<view v-if="item.haveMargin" class="haveMarginBlock"></view>
					<uni-swipe-action :options="options1" @click="remove(index)">
						<view class="item">
							<label class="item_label" @click="radioChange(index, item.skuId)"><checkbox :value="index" :checked="item.checked" /></label>
							<view class="item_image">
								<img v-if="item.product.picture" :src="imgurl + item.product.picture" alt="" />
								<img v-else src="/static/images/default.png" alt="" />
								<view class="item_image_label">{{ item.classify == 1 || item.classify == 3 ? '定制' : '严选' }}</view>
							</view>
							<view class="item_info">
								<view class="item_info_title">{{ item.product.name }}</view>
								<view v-if="item.classify == 1 || item.classify == 3" class="item_info_subhead">{{ item.product.note }}</view>
								<view v-else class="item_info_choose" @click="showSKU(item, index)">
									<view class="item_info_choose_text">{{ item.product.note }}</view>
									<view class="item_info_choose_img"><img src="/static/images/zhankai@2x.png" alt="" /></view>
								</view>
								<view class="item_info_end">
									<view class="item_info_price">
										<span>￥</span>
										<span class="item_info_init">{{ item.product.discountPrice.toFixed(3).split('.')[0] }}</span>
										<span>.{{ item.product.discountPrice.toFixed(3).split('.')[1] }}</span>
									</view>
									<view class="item_info_count">
										<uni-number
											:value="item.num"
											min="1"
											max="999999"
											step="1"
											:disabled="item.classify === 3"
											:up="item.lastNum"
											:next="item.nextNum"
											:index="index"
											@change="numChange"
										></uni-number>
									</view>
								</view>
							</view>
						</view>
						<view v-if="item.classify == 3" class="item_other">
							<div class="item_other_price">
								印版费：
								<span>￥{{ item.customPrice }}</span>
							</div>
							<div class="item_other_pic" @click="showCustom(item.product.customPicture)">预览印版图</div>
						</view>
					</uni-swipe-action>
				</blcok>
			</checkbox-group>
			<view v-if="problemCartItem.length > 0" class="pastBox">
				<view class="pastbox_title">
					<view class="pastbox_title_left">失效商品</view>
					<view class="pastbox_title_right" @click="empty">清空</view>
				</view>
				<block v-for="(item, index) in problemCartItem" :key="index">
					<view class="item">
						<view class="item_image">
							<img v-if="item.product.picture" :src="imgurl + item.product.picture" alt="" />
							<img v-else src="/static/images/default.png" alt="" />
							<view class="item_image_label">{{ item.classify == 1 ? '定制' : '严选' }}</view>
						</view>
						<view class="item_info">
							<view class="item_info_title">{{ item.product.name }}</view>
							<view v-if="item.product.note" class="item_info_subhead">{{ item.product.note }}</view>
							<view class="item_info_end">
								<view class="item_info_price">
									<span>￥</span>
									<span class="item_info_init">{{ item.product.price.toFixed(3).split('.')[0] }}</span>
									<span>.{{ item.product.price.toFixed(3).split('.')[1] }}</span>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<view v-if="showContent == 'show'" class="placeholder_view"></view>
		<checkbox-group v-if="showContent == 'show'" @change="allChange">
			<view class="bottom">
				<label class="bottom_label">
					<checkbox value="choAll" :checked="checkedAll" />
					全选
				</label>
				<view v-if="!manage" class="bottom_total">
					<span class="bottom_total_label">合计：</span>
					<span>￥</span>
					<span class="bottom_int">{{ totalPrice[0] }}</span>
					<span>.{{ totalPrice[1] }}</span>
				</view>
				<view v-if="!manage" :class="canPay ? 'bottom_btn_light' : ''" class="bottom_btn" @click="goPayIt">去结算</view>
				<view v-if="manage" :class="canPay ? 'bottom_btn_light' : ''" class="bottom_btn" @click="goDelIt">删除</view>
			</view>
		</checkbox-group>
		<!-- 底部出现弹窗 -->
		<uni-popup class="uni-popup" ref="sku" type="bottom" :custom="true" catchtouchmove="ture">
			<sku-view ref="skuView" @SKUChange="changeSKU"></sku-view>
			<view class="btn"><view class="btn_affirm" @click="affirmChange">确定</view></view>
		</uni-popup>
		<toLogin ref="showToLogin" :toType="1"></toLogin>
		<uni-popup ref="popup" type="center" :custom="true">
			<view class="choose_order">
				<view class="choose_top">请分开结算以下商品</view>
				<view class="choose_radio">
					<radio-group class="radio_group" @change="handleRadioChange">
						<label class="radio_yan">
							<view>
								<radio class="radio_item" value="0" :checked="0 === current" color="#DC231E" />
								严选商品
								<span class="contain">(包含有限定制商品)</span>
								<view class="radio_num">{{ biaoList.length }} 件</view>
							</view>
						</label>
						<label class="radio_biao">
							<view>
								<radio class="radio_item" value="1" :checked="1 === current" color="#DC231E" />
								定制商品
								<view class="radio_num">{{ fanList.length }} 件</view>
							</view>
						</label>
					</radio-group>
				</view>
				<view class="choose_foot">
					<view class="foot foot_fist" @click="closePop">返回购物车</view>
					<view class="foot foot_last" @click="goSettlement">去结算</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue';
import uniNumber from '@/components/uni-number-box/uni-number-box.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import toLogin from '@/components/toLogin.vue';
import skuView from '@/components/sku.vue';
import { getCartAll, remove, productDetail, changeSKU, changeCount, removeProblem, getAppletOrderCondition, status } from '@/api/api.js';
import myUrl from '@/api/imgUrl.js';
export default {
	components: {
		uniSwipeAction,
		uniPopup,
		skuView,
		uniNumber,
		toLogin
	},
	data() {
		return {
			current: 0,
			// 获取显示图片的地址
			imgurl: myUrl,
			// 页面数据管理
			pageList: [],
			problemCartItem: [],
			over: false,
			// 储存当前选中的SKU
			saveNowSKU: '',
			saveChooseSKU: {},
			// 管理切换
			manage: false,
			saveList: '',
			fanList: [],
			biaoList: [],
			// 左滑菜单设置
			options1: [
				{
					text: '删除',
					style: {
						backgroundColor: '#DC231E',
						color: '#fff'
					}
				}
			]
		};
	},
	methods: {
		//返回购物车
		closePop() {
			this.$refs.popup.close();
		},
		//商品类型选择
		handleRadioChange(evt) {
			if (evt.target.value === '0') {
				this.current = 0;
			} else {
				this.current = 1;
			}
		},
		handleRadioChang() {
			if (this.current === 0) {
				this.fanList.forEach(v => {
					v.checked = false;
				});
				this.biaoList.forEach(v => {
					v.checked = true;
				});
			} else {
				this.biaoList.forEach(v => {
					v.checked = false;
				});
				this.fanList.forEach(v => {
					v.checked = true;
				});
			}
		},
		//去结算
		goSettlement() {
			this.handleRadioChang();
			this.goPayIt();
			this.$refs.popup.close();
			this.biaoList = [];
			this.fanList = [];
		},
		// 跳转到首页
		toIndex() {
			uni.switchTab({
				url: '../../index/index'
			});
		},
		// 跳转到客服机器人
		toRobot() {
			uni.navigateTo({
				url: '../../mypage/robot/robot'
			});
		},
		// 更新子组件的数据
		updateSonData(apolloProduct, SKUcontent, SKUSaveList) {
			let _this = this;
			let sonApolloProduct = apolloProduct;
			let sonSKUcontent = SKUcontent;
			let sonSKUSaveList = SKUSaveList;

			sonSKUcontent.apolloProductLabelList.forEach((v, index) => {
				let canCheckList = []; //记录可选的选项id
				sonSKUcontent.apolloProductDetailList.forEach(k => {
					let count = 0;
					k.apolloProductLabelValue.forEach((i, idx) => {
						if (index != idx) {
							count += 1;
						}
					});
					if (count == k.apolloProductLabelValue.length - 1) {
						canCheckList.push(k.apolloProductLabelValue[index]);
					}
				});
				v.labelValueList.forEach(k => {
					k.disabled = true;
					canCheckList.forEach(u => {
						if (u == k.id) {
							k.disabled = false;
						}
					});
					if (sonSKUSaveList.indexOf(k.id) != -1) {
						k.checked = true;
					}
				});
			});
			_this.$refs.skuView.content = sonSKUcontent;
			_this.$refs.skuView.saveList = sonSKUSaveList;
			_this.$refs.skuView.showProduct = sonApolloProduct;
			_this.$refs.skuView.defaultProduct = sonApolloProduct;
			_this.$refs.sku.open();
		},
		// 修改单个商品的SKU
		showSKU(list, index) {
			let _this = this;
			let nowSKUId = list.skuId;
			let defaultProduct = {};
			_this.saveNowSKU = list.skuId;
			_this.saveChooseSKU = {
				id: list.skuId
			};
			productDetail(list.product.productId).then(res => {
				let SKUList = res.data.apolloProductDetailList;
				let SKUSaveList = [];
				for (var i = 0; i < SKUList.length; i++) {
					if (nowSKUId == SKUList[i].id) {
						defaultProduct = SKUList[i];
						SKUList[i].apolloProductLabelValue.forEach(v => {
							SKUSaveList.push(v);
						});
						break;
					}
				}
				let SKUcontent = {
					apolloProductDetailList: res.data.apolloProductDetailList,
					apolloProduct: res.data.apolloProduct,
					apolloProductLabelList: res.data.apolloProductLabelList
				};
				_this.updateSonData(defaultProduct, SKUcontent, SKUSaveList);
			});
		},
		// 操作SKU事件
		changeSKU(e) {
			this.saveChooseSKU = e;
		},
		// 确定修改SKU
		affirmChange() {
			let _this = this;
			if (!this.saveChooseSKU.id) {
				uni.showToast({
					title: '请选择SKU',
					icon: 'none',
					duration: 1500
				});
			} else if (this.saveChooseSKU.id == this.saveNowSKU) {
				uni.showToast({
					title: '您修改后的信息与修改前的一致',
					icon: 'none',
					duration: 1500
				});
			} else {
				changeSKU(this.saveChooseSKU.id, this.saveNowSKU).then(res => {
					if (res.success) {
						this.getPageList();
						_this.$refs.sku.close();
					} else {
						uni.showToast({
							title: '修改失败',
							icon: 'none',
							duration: 1500
						});
					}
				});
			}
		},
		// 删除单个商品
		remove(index) {
			let _this = this;
			let delId = _this.pageList[index].id;
			let delList = [delId];
			remove(delList).then(res => {
				if (res.success) {
					_this.pageList.splice(index, 1);
					getApp().globalData.cartNumber -= 1;
				} else {
					uni.showToast({
						title: '删除失败',
						icon: 'none',
						duration: 1500
					});
				}
			});
		},
		removeList(list) {
			let _this = this;
			let pageList = _this.pageList;
			remove(list).then(res => {
				if (res.success) {
					pageList.forEach((v, index) => {
						if (list.indexOf(v.skuId) != -1) {
							delete pageList[index];
						}
					});
					pageList = pageList.filter(function(val) {
						return val;
					});
					getApp().globalData.cartNumber = pageList.length;
					_this.pageList = pageList;
				} else {
					uni.showToast({
						title: '删除失败',
						icon: 'none',
						duration: 1500
					});
				}
			});
		},
		// 清空失效商品
		empty() {
			let _this = this;
			uni.showModal({
				content: `确定删除失效商品吗？`,
				confirmText: '确认',
				confirmColor: '#dc231e',
				cancelText: '取消',
				cancelColor: '#000000',
				success(Mres) {
					if (Mres.confirm) {
						removeProblem().then(res => {
							if (res.success) {
								_this.problemCartItem = [];
								getApp().globalData.cartNumber = pageList.length;
							} else {
								uni.showToast({
									title: res.message,
									icon: 'none',
									duration: 1500
								});
							}
						});
					}
				}
			});
		},
		// 切换管理
		toManage() {
			let _this = this;
			let manage = _this.manage;
			let pageList = _this.pageList;
			let saveList = _this.saveList;
			if (manage) {
				// 当前为管理操作状态->正常状态
				pageList.forEach(v => {
					v.checked = false;
					if (saveList.indexOf(v.skuId) != -1) {
						v.checked = true;
					}
				});
			} else {
				// 当前为正常状态->管理操作状态
				pageList.forEach(v => {
					v.checked = false;
				});
			}
			_this.pageList = pageList;
			_this.manage = !manage;
		},
		// 多选改变
		checkboxChange(e) {
			let _this = this;
			let pageList = _this.pageList;
			let chooseList = e.detail.value;
			pageList.forEach(v => {
				v.checked = false;
			});
			chooseList.forEach(v => {
				_this.pageList[v].checked = true;
			});
			_this.pageList = pageList;
			// 保存正常模式下的选中状态
			if (!_this.manage) {
				let saveList = [];
				chooseList.forEach(v => {
					saveList.push(_this.pageList[v].skuId);
				});
				_this.saveList = saveList;
			}
		},
		// 全选、反全选
		allChange(e) {
			let _this = this;
			let pageList = _this.pageList;
			let saveList = [];
			if (e.detail.value.length > 0) {
				pageList.forEach(v => {
					v.checked = true;
					if (!_this.manage) {
						saveList.push(v.skuId);
					}
				});
			} else {
				pageList.forEach(v => {
					v.checked = false;
				});
			}
			_this.saveList = saveList;
			_this.pageList = pageList;
		},
		// 选项修改
		radioChange(e) {
		},
		// 去结算
		goPayIt() {
			let _this = this;
			let num = 0;
			let pageList = _this.pageList;
			for (var i = 0; i < pageList.length; i++) {
				if (pageList[i].checked) {
					if (pageList[i].classify == 1) {
						num = 1;
						break;
					}
				}
			}
			if (_this.canPay) {
				getAppletOrderCondition(num).then(res => {
					// 请求是否成功
					if (res.success) {
						// 是否登录
						if (res.data == 1) {
							let list = [];
							_this.pageList.forEach((item, index) => {
								if (item.checked) {
									list.push(item);
								}
							});
							let fan = list.every(function(item) {
								return item.classify === 1;
							});
							let biao = list.every(function(item) {
								return item.classify === 2 || item.classify === 3;
							});
							if (fan === true || biao === true) {
								_this.affirmBuy();
								_this.current = 0;
							} else {
								let nowFanList = [];
								let nowBiaoList = [];
								list.forEach(item => {
									if (item.classify === 1) {
										nowFanList.push(item);
									} else {
										nowBiaoList.push(item);
									}
								});
								_this.current = 0;
								_this.fanList = nowFanList;
								_this.biaoList = nowBiaoList;
								console.log(_this.fanList, _this.biaoList);
								this.$refs.popup.open();
							}
						} else if (res.data == 2) {
							uni.showToast({
								title: '定制商品没有生效的合同',
								icon: 'none',
								duration: 1500
							});
						} else if (res.data == 3) {
							uni.showToast({
								title: '您有对账单超过15天未进入开票状态！请联系客户经理！',
								icon: 'none',
								duration: 1500
							});
						} else if (res.data == 4) {
							uni.showToast({
								title: '企业信息不全',
								icon: 'none',
								duration: 1500
							});
						}
					} else {
						if (res.code == '0001') {
							this.$refs.showToLogin.showIt('../../aboutLogin/login/login?type=');
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 1500
							});
						}
					}
				});
			} else {
				uni.showToast({
					title: '请先选择要结算的商品',
					icon: 'none',
					duration: 1500
				});
			}
		},
		// 确认购买
		affirmBuy() {
			let _this = this;
			let sendList = [];
      let pageList = _this.pageList;
			pageList.forEach(v => {
				if (v.checked) {
					sendList.push(v.id);
				}
			});
			let list = JSON.stringify(sendList);
			uni.navigateTo({
				url: '../affirmOrder/affirmOrder?list=' + list
			});
		},
		// 删除选中项
		goDelIt() {
			let _this = this;
			let pageList = _this.pageList;
			if (_this.canPay) {
				uni.showModal({
					content: `确定删除选中商品吗？`,
					confirmText: '确认',
					confirmColor: '#dc231e',
					cancelText: '取消',
					cancelColor: '#000000',
					success(res) {
						if (res.confirm) {
							pageList.forEach(v => {
								if (v.checked) {
									delList.push(v.skuId);
								}
							});
							_this.removeList(delList);
						}
					}
				});
				let delList = [];
			} else {
				uni.showToast({
					title: '请先选择要删除的商品',
					icon: 'none',
					duration: 1500
				});
			}
		},
		// 获取页面信息
		getPageList() {
			let _this = this;
			let saveList = _this.saveList;
			getCartAll().then(res => {
				if (res.success) {
					let pageList = res.data.readyCartItem;
					_this.problemCartItem = res.data.problemCartItem;
					getApp().globalData.cartNumber = pageList.length;
					let num = 0;
					pageList.forEach(v => {
						v.checked = false;
						if (v.classify == 1 && num == 0) {
							num = 1;
							v.haveMargin = true;
						}
						if (saveList.indexOf(v.skuId) != -1) {
							v.checked = true;
						}
					});
					_this.pageList = pageList;
					_this.over = true;
				} else {
					uni.showToast({
						title: '系统异常',
						icon: 'none',
						duration: 1500
					});
				}
			});
		},
		numChange(e) {
			let _this = this;
			let productItem = _this.pageList[e.index];
			if (productItem.num != e.value) {
				changeCount(productItem.id, e.value).then(res => {
					if (res.success) {
						if (productItem.classify == 3) {
							productItem.num = e.value;
							productItem.lastNum = res.data.lastNum;
							productItem.nextNum = res.data.nextNum;
							productItem.customPrice = res.data.printingPrice;
							productItem.product.discountPrice = res.data.unitPrice;
							_this.pageList[e.index] = productItem;
						} else {
							productItem.num = e.value;
							productItem.lastNum = res.data.lastNum;
							productItem.nextNum = res.data.nextNum;
							_this.pageList[e.index] = productItem;
						}
					}
				});
			}
		},
		showCustom(e) {
			let imgList = [this.imgurl + e];
			uni.previewImage({
				urls: imgList
			});
		}
	},
	computed: {
		totalPrice() {
			let _this = this;
			let pageList = _this.pageList;
			let totalPrice = 0;
			pageList.forEach(v => {
				let printingPrice = 0;
				if (v.classify !== 1) {
					printingPrice = v.customPrice;
				}
				if (v.checked) {
					totalPrice += v.product.discountPrice * v.num + printingPrice;
				}
			});
			return parseFloat(totalPrice)
				.toFixed(3)
				.split('.');
		},
		checkedAll() {
			let _this = this;
			let pageList = _this.pageList;
			let num = 0;
			pageList.forEach(v => {
				if (v.checked) {
					num += 1;
				}
			});
			if (num == pageList.length) {
				return true;
			} else {
				return false;
			}
		},
		canPay() {
			let _this = this;
			let pageList = _this.pageList;
			let haveChoose = false;
			for (var i = 0; i < pageList.length; i++) {
				if (pageList[i].checked) {
					haveChoose = true;
					break;
				}
			}
			return haveChoose;
		},
		showContent() {
			if (this.over) {
				return status(this.pageList, this.problemCartItem);
			}
		}
	},
	onShow() {
		let _this = this;
		uni.getStorage({
			key: 'cartList',
			success: res => {
				_this.saveList = res.data;
				_this.getPageList();
				uni.removeStorage({ key: 'cartList' });
			},
			fail() {
				_this.saveList = '';
				_this.getPageList();
				uni.removeStorage({ key: 'cartList' });
			}
		});
	}
};
</script>

<style lang="stylus" scoped>
.choose_order
	border-radius 8rpx
	width 560rpx
	height 530rpx
	background #FFFFFF
	display flex
	flex-direction column
	.choose_top
		border-radius 8rpx 8rpx 0 0
		width 100%
		height 102rpx
		background #DC231E
		color #FFFFFF
		font-family PingFangSC-Medium
		font-weight 600
		font-size 18px
		line-height 102rpx
		text-align center
	.choose_radio
		flex 1
		padding 40rpx 30rpx
		.radio_group
			display flex
			flex-direction column
			font-size 32rpx
			color #333333
			line-height 44rpx
			.radio_num
				padding 0 52rpx
				font-size 28rpx
			.radio_yan
				flex 1
				margin-bottom 40rpx
			.radio_biao
				flex 1
			.radio_item
				transform scale(0.64)
			.contain
				display inline-block
				margin-left 20rpx
	.choose_foot
		width 100%
		height 92rpx
		display flex
		flex-direction row
		border-top 1rpx solid #E5E5E5
		.foot
			flex 1
			display flex
			justify-content center
			align-items center
			font-family PingFangSC-Regular
			font-size 16px
			color #DC231E
		.foot_fist
			border-right 1rpx solid #E5E5E5
			color #000000
.cart
	width 100vw
	min-height 100vh
	overflow hidden
	background #f5f5f5
	.noMessage
		width 100vw
		height 100vh
		overflow hidden
		background #fff
		img
			display block
			width 666rpx
			height 424rpx
			margin 210rpx auto 60rpx
		.hint
			width 100vw
			text-align center
			font-size 36rpx
			color #000
			.hint_red
				color #DC231E
	.content
		background #F6F6F6
		padding-top 20rpx
		.title
			width 100vw
			height 100rpx
			display flex
			align-items center
			justify-content space-between
			background #fff
			margin-bottom 20rpx
			font-size 26rpx
			.title_left
				.title_left_service
					width 220rpx
					height 70rpx
					display flex
					justify-content center
					align-items center
					margin 0 0 0 10rpx
					padding 0
					background none
					img
						display block
						width 46rpx
						height 46rpx
						margin-right 20rpx
					text
						color #333
						font-size 24rpx
			.title_right
				margin-right 30rpx
		.haveMarginBlock
			width 100vw
			background #F6F6F6
			height 20rpx
		.item
			min-width 100vw
			display flex
			align-items center
			background #fff
			padding 30rpx 0
			.item_label
				display block
				width 50rpx
				padding-left 20rpx
			.item_image
				position relative
				width 200rpx
				height 200rpx
				margin 0 20rpx 0 10rpx
				img
					width 200rpx
					height 200rpx
				.item_image_label
					position absolute
					left 0
					top 0
					width 52rpx
					height 32rpx
					line-height 32rpx
					text-align center
					background rgba(209, 47, 26, 0.9)
					color #fff
					font-size 20rpx
			.item_info
				position relative
				width 430rpx
				height 200rpx
				.item_info_title
					width 100%
					font-size 26rpx
					color #333
					margin-bottom 10rpx
					overflow hidden
					text-overflow ellipsis
					white-space nowrap
				.item_info_subhead
					width 420rpx
					font-size 20rpx
					color #999
					text-overflow -o-ellipsis-lastline
					overflow hidden
					text-overflow ellipsis
					line-clamp 2
				.item_info_choose
					position relative
					display flex
					align-items center
					justify-content space-between
					width 408rpx
					height 48rpx
					background #f5f5f5
					padding 0 10rpx
					.item_info_choose_text
						width 374rpx
						height 32rpx
						color #999
						font-size 22rpx
						overflow hidden
						text-overflow ellipsis
						white-space nowrap
					.item_info_choose_img
						width 32rpx
						height 32rpx
						line-height 12rpx
						text-align center
						img
							width 16rpx
							height 6rpx
				.item_info_end
					position absolute
					left 0rpx
					bottom 0rpx
					width 100%
					display flex
					align-items flex-end
					justify-content space-between
					.item_info_price
						font-size 26rpx
						margin-right 40rpx
						color #DC231E
						font-weight 500
						.item_info_init
							font-size 34rpx
					.item_info_count
						display flex
						align-items center
						.jianImg
							width 44rpx
							height 44rpx
							display flex
							align-items center
							justify-content center
						.item_info_count_minus, .item_info_count_add
							width 44rpx
							height 44rpx
							display flex
							align-items center
							justify-content center
						img
							width 24rpx
							height 24rpx
						.item_info_count_input
							width 110rpx
							background #f6f6f6
						input
							width 110rpx
							text-align center
							color #333333
							font-size 28rpx
		.item_other
			display flex
			align-items center
			justify-content space-between
			padding-bottom 30rpx
			.item_other_price
				color #666
				font-size 28rpx
				margin-left 82rpx
				span
					color #DC231E
			.item_other_pic
				margin-right 30rpx
				color #0091ff
		.pastBox
			margin-top 20rpx
			.pastbox_title
				width 100vw
				height 100rpx
				display flex
				align-items center
				justify-content space-between
				background #fff
				color #333
				font-size 26rpx
				.pastbox_title_left
					margin-left 30rpx
				.pastbox_title_right
					margin-right 30rpx
			.item_image
				margin-left 50rpx
			.item_info
				margin-left 20rpx
	.placeholder_view
		height 120rpx
	.bottom
		position fixed
		bottom 0
		width 100vw
		height 104rpx
		display flex
		align-items center
		background #fff
		z-index 996
		.bottom_label
			height 50rpx
			width 140rpx
			padding-left 20rpx
			text-align center
			color #333
			font-size 28rpx
			display flex
			align-items center
			checkbox
				display flex
				align-items center
		.bottom_total
			height 50rpx
			font-size 26rpx
			color #d12f1a
			font-weight 500
			.bottom_total_label
				color #333
				font-size 28rpx
			.bottom_int
				font-size 32rpx
		.bottom_btn
			position absolute
			top 16rpx
			right 30rpx
			width 240rpx
			height 72rpx
			line-height 72rpx
			background #ccc
			color #fff
			border-radius 8rpx
			font-size 28rpx
			text-align center
		.bottom_btn_light
			background #DC231E
			color #fff
	.uni-popup
		z-index 1000
		.btn
			display flex
			align-items center
			width 100vw
			height 136rpx
			background #fff
			.btn_affirm
				width 630rpx
				height 76rpx
				line-height 76rpx
				color #fff
				font-size 28rpx
				text-align center
				border-radius 8rpx
				background #dc231e
				margin 0 auto
				border-top 2rpx solid #E8E8E8
	/deep/ checkbox .wx-checkbox-input
		border-radius 50%
		width 32rpx
		height 32rpx
		// border 2rpx solid #333
	/* 选中后的 背景样式 （红色背景 无边框 可根据UI需求自己修改） */
	/deep/ checkbox .wx-checkbox-input.wx-checkbox-input-checked
		border none
		background #D12F1A
		border 2rpx solid #D12F1A
	/* 选中后的 对勾样式 （白色对勾 可根据UI需求自己修改） */
	/deep/ checkbox .wx-checkbox-input.wx-checkbox-input-checked::before
		border-radius 50%
		width 28rpx
		height 28rpx
		line-height 28rpx
		text-align center
		font-size 22rpx
		color #fff
		background transparent
		transform translate(-50%, -50%) scale(1)
		-webkit-transform translate(-50%, -50%) scale(1)
</style>
