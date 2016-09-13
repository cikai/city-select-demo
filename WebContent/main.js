$(document).ready(function() {
  getApiCitys();
});

var provinceCache = "";
var cityCache = "";

function getApiCitys() {
  var provinceList = "";
  $.ajax({
    url : '',
    method : 'get',
    dataType : 'jsonp',
    success : function(data) {
      for (var i = 0; i < data.configs.length - 1; i++) {
        provinceStr = data.configs[i].province_short_name + "-"
            + data.configs[i].province_name;
        provinceList += "<a href=\"javascript:provinceSelect("
            + data.configs[i].province_id + ")\">" + provinceStr + "</a>";
        provinceCache += "|" + data.configs[i].province_id + ","
            + data.configs[i].province_name + ","
            + data.configs[i].province_short_name + ",";
        for (var j = 0; j < data.configs[i].citys.length; j++) {
          cityCache += "|" + data.configs[i].citys[j].city_id + ","
              + data.configs[i].citys[j].city_name + ","
              + data.configs[i].province_id + ","
              + data.configs[i].citys[j].car_head + ","
              + data.configs[i].citys[j].engine_num + ","
              + data.configs[i].citys[j].body_num + ",";
        }
      }
      $("#provinceList").html(provinceList);
    }
  });
}

function provinceSelect(provinceId) {
  var cityList = "";
  var regStr = "\\|([^,]+),([^,]+),(" + provinceId + "),([^,]+),([^,]+),([^,]+),";
  var regx = new RegExp(regStr, "g");
  var result = cityCache.match(regx);
  var strResult = "";
  for (var i = 0; i < result.length; ++i) {
    var city_id = result[i].split(',')[0].split('|')[1];
    var car_head = result[i].split(',')[3];
    var engine_num = result[i].split(',')[4];
    var body_num = result[i].split(',')[5];

    cityList += "<a href=\"javascript:citySelect(" + city_id + ",'" + car_head
        + "'," + body_num + "," + engine_num + ")\">" + result[i].split(',')[1]
        + "</a>";
  }
  
  $("#cityList").html(cityList);
}

function citySelect(cityId, carHead, bodyNum, engineNum) {
  $("#provinceName").val(carHead.substring(0,1));
  $("#plateNo").val(carHead.substring(1));
  $("#classNo").val(bodyNum);
  $("#engineNo").val(engineNum);
}
