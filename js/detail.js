$(function () {
  // 1 获取list.html页面传递过来的参数
  let id = location.search.split('=')[1]
  // console.log(id);

  if (!id) {
    location.href = './list.html'
  }

  // 2.根据id获取对应id号的商品数据对象：从数组中获取指定id的数据
  let current = {}
  // 我们可以遍历数据源数组，找到对应id号的数据对象
  $.each(dataMock, function (index, value) {
    if (value.id == id) { // 找到了,这就是当前的商品对象
      console.log(value);
      // 提供数据的方法外访问
      current = value
      console.log('current', current);
      // 为dom元素赋值
      $('.preview-img > img').prop('src', value.imgSrc)
      $('.sku-name').text(value.name)
      $('.summary-price em').text(value.price)

      return
    }
  })

  // 添加商品到购物车
  $('.addshopcar').on('click', function () {

    let dataStr = localStorage.getItem('pyg_cart_62') || '[]' // 字符串
    // 2.2 将字符串转换为数组
    let dataArr = JSON.parse(dataStr)

    let flag = false //  标记商品是否已经存在过
    for (let i = 0; i < dataArr.length; i++) {
      if (dataArr[i].id == current.id) { // 说明这个id号的商品已经添加过
        flag = true
        dataArr[i].count = parseInt(dataArr[i].count) + parseInt($('.choose-amount > input').val())
        break
      }
    }

    if (flag) { // 说明修改了数量，但是还没有进行本地存储，所以，只需要再实现本地存储就O了
      localStorage.setItem('pyg_cart_62', JSON.stringify(dataArr))
    }
    else {
      // 1.准备数据
      let newObj = {
        id: current.id,
        name: current.name,
        imgSrc: current.imgSrc,
        price: current.price,
        count: $('.choose-amount > input').val(),
        isChecked: true
      }
      // 2.3 将本次的新商品信息对象添加到数组--面向对象编程
      dataArr.push(newObj)
      // 2.4 将添加了新数据的数组重新转换为字符串，并存储到本地存储
      localStorage.setItem('pyg_cart_62', JSON.stringify(dataArr))
    }

    // 问用户是否要跳转到购物车列表页
    if (confirm('商品添加成功，是否跳转到购物车页面')) {
      location.href = './cart.html'
    }

  })
})