"use strict";
const common_vendor = require("../common/vendor.js");
const utils_config = require("./config.js");
function request(options) {
  options.url = utils_config.BASE_URL + options.url;
  return common_vendor.index.request(options);
}
exports.request = request;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
