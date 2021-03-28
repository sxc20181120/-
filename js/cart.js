$(function () {
  // 1.实现购物车数据的动态渲染
  // 说到渲染，立马想到  数据 +　模板
  // 数据在本地存储中：获取本地存储数据 + 转换
  let data = JSON.parse(localStorage.getItem('pyg_cart_62') || '[]')
  console.log(data);
  // 遍历生成 动态结构
  let html = ''
  $.each(data, function (index, value) {
    html += `  <div class="item">
                  <div class="row">
                      <div class="cell col-1 row">
                          <div class="cell col-1">
                              <input type="checkbox" class="item-ck" ${value.isChecked ? 'checked' : ''}>
                          </div>
                          <div class="cell col-4">
                              <img src="${value.imgSrc}" alt="">
                          </div>
                      </div>
                      <div class="cell col-4 row">
                          <div class="item-name">${value.name}</div>
                      </div>
                      <div class="cell col-1 tc lh70">
                          <span>￥</span>
                          <em class="price">${value.price}</em>
                      </div>
                      <div class="cell col-1 tc lh70">
                          <div class="item-count">
                              <a href="javascript:void(0);" class="reduce fl">-</a>
                              <input autocomplete="off" readonly="" type="text" class="number fl" value="${value.count}">
                              <a href="javascript:void(0);" class="add fl">+</a>
                          </div>
                      </div>
                      <div class="cell col-1 tc lh70">
                          <span>￥</span>
                          <em class="computed">${value.price * value.count}</em>
                      </div>
                      <div class="cell col-1">
                          <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
                      </div>
                  </div>
              </div>`
  })
  $('.item-list').html(html)


  function getTotalPrice() {
    let total = 0 // 总金额
    let cnt = 0 // 当前被选中的商品的数量
    // 计算出总金额:只需要读取当前被选中的商品的总金额
    // data中有我们想要的所有数据
    $.each(data, function (index, value) {
      if (value.isChecked) { // 被选中了
        cnt++
        total += value.price * value.count
      }
    })

    // 赋值
    $('.selected').text(cnt)
    $('.total-money').text(total)

    // 设置全选筛选框的状态
    $('.pick-all').prop('checked', cnt == data.length)
  }
  getTotalPrice()

  // 增加数量
  $('.add').on('click', function () {
    // 1.将文本框中的数量+1：只需要将当前+号前面的输入框的值+1
    let cnt = $(this).prev().val() - 0 + 1
    $(this).prev().val(cnt)

    // 2.当前商品的总价需要更新
    let index = $(this).parents('.item').index()
    $(this).parents('.item').find('.computed').text(cnt * data[index].price)

    // 3.更新本地存储中的数据
    data[index].count = cnt // 更新数据
    localStorage.setItem('pyg_cart_62', JSON.stringify(data))

    // 4.重新计算总价格
    getTotalPrice()
  })

  // 减少数量
  $('.reduce').on('click', function () {

    let cnt = $(this).next().val() - 1
    if (cnt < 1) {
      cnt = 1
      return
    }
    $(this).next().val(cnt)

    // 2.当前商品的总价需要更新
    let index = $(this).parents('.item').index()
    $(this).parents('.item').find('.computed').text(cnt * data[index].price)

    // 3.本地存储数据需要更新
    data[index].count = cnt // 更新数据
    localStorage.setItem('pyg_cart_62', JSON.stringify(data))

    // 4.重新计算总价格
    getTotalPrice()
  })

  // 单击全选复选框
  $('.pick-all').on('click', function () {
    // 1.将列表中的复选框的选中状态设置为与全选复选框一致
    let state = $(this).prop('checked')
    $('.item-ck').prop('checked', state)

    // 2.更新本地存储中的数据
    for (let i = 0; i < data.length; i++) {
      data[i].isChecked = state
    }

    // 3.本地存储数据需要更新
    localStorage.setItem('pyg_cart_62', JSON.stringify(data))

    // 4.重新计算总价格
    getTotalPrice()
  })

  // 单击列表结构中的复选框
  $('.item-ck').on('click', function () {
    // 更新数据
    let index = $(this).parents('.item').index()
    data[index].isChecked = $(this).prop('checked')

    // 更新本地存储
    localStorage.setItem('pyg_cart_62', JSON.stringify(data))

    // 重新计算总价格，判断全选复选框是否要全选
    getTotalPrice()
  })


})