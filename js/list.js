$(function () {
  // 数据有没有
  // console.log(window.dataMock);
  // 1.根据数据生成 动态结构
  // 1.1 定义变量接收生成的结构
  let html = ''
  // 1.2 遍历生成动态结构
  $.each(dataMock, function (index, value) {
    html += `<li class="goods-list-item">
              <a href="./detail.html?id=${value.id}">
                <div class="item-img">
                  <img src="${value.imgSrc}" alt="">
                </div>
                <div class="item-title">
                  ${value.name}
                </div>
                <div class="item-price">
                  <span class="now">¥ ${value.price}</span>
                </div>
                <div class="sold">
                  <span> 已售 <em>${value.percent}% </em></span>
                  <div class="scroll">
                    <div class="per" style="width:${value.percent}%;"></div>
                  </div>
                  <span>剩余<i>${value.left}</i>件</span>
                </div>
              </a>
              <a href="./detail.html?id=${value.id}" class="buy">
                查看详情
              </a>
            </li>`
  })
  // 1.3 将生成的结构填充到指定的dom容器中
  $('.goods-list > ul').html(html)
})