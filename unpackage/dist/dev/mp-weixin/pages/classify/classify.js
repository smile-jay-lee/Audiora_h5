"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      currentCategory: "all",
      showFilter: false,
      selectedDuration: "",
      selectedHeat: "",
      hasMore: true,
      page: 1,
      categoryList: [
        { icon: "📂", name: "全部", type: "all" },
        { icon: "📚", name: "有声书", type: "book" },
        { icon: "🎵", name: "音乐", type: "music" },
        { icon: "🎙️", name: "播客", type: "podcast" },
        { icon: "📰", name: "新闻", type: "news" },
        { icon: "🧘", name: "冥想", type: "meditation" },
        { icon: "🏃", name: "运动", type: "sport" },
        { icon: "👶", name: "儿童", type: "children" },
        { icon: "🎭", name: "戏曲", type: "opera" }
      ],
      durationOptions: [
        { label: "全部", value: "" },
        { label: "短篇(< 30分钟)", value: "short" },
        { label: "中篇(30-60分钟)", value: "medium" },
        { label: "长篇(> 60分钟)", value: "long" }
      ],
      heatOptions: [
        { label: "全部", value: "" },
        { label: "最新", value: "latest" },
        { label: "最热", value: "hottest" },
        { label: "评分最高", value: "highest" }
      ],
      allContentList: [
        {
          id: 1,
          title: "三体：黑暗森林",
          author: "刘慈欣",
          cover: "/static/audio1.jpg",
          duration: "15:30:45",
          category: "book",
          views: "12.5万",
          likes: "8.2千",
          isFavorited: false
        },
        {
          id: 2,
          title: "夜听故事",
          author: "夜听主播",
          cover: "/static/audio2.jpg",
          duration: "25:20",
          category: "podcast",
          views: "8.9万",
          likes: "5.6千",
          isFavorited: true
        },
        {
          id: 3,
          title: "轻松爵士乐",
          author: "爵士乐团",
          cover: "/static/audio3.jpg",
          duration: "1:45:30",
          category: "music",
          views: "6.3万",
          likes: "4.1千",
          isFavorited: false
        },
        {
          id: 4,
          title: "睡前冥想",
          author: "冥想导师",
          cover: "/static/audio4.jpg",
          duration: "18:00",
          category: "meditation",
          views: "15.2万",
          likes: "12.8千",
          isFavorited: true
        },
        {
          id: 5,
          title: "今日新闻摘要",
          author: "新闻播报员",
          cover: "/static/audio5.jpg",
          duration: "12:30",
          category: "news",
          views: "23.6万",
          likes: "3.2千",
          isFavorited: false
        },
        {
          id: 6,
          title: "儿童故事大全",
          author: "故事姐姐",
          cover: "/static/audio6.jpg",
          duration: "35:45",
          category: "children",
          views: "18.7万",
          likes: "15.3千",
          isFavorited: false
        }
      ]
    };
  },
  computed: {
    filteredList() {
      let list = this.allContentList;
      if (this.currentCategory !== "all") {
        list = list.filter((item) => item.category === this.currentCategory);
      }
      if (this.selectedDuration) {
        list = list.filter((item) => {
          const duration = this.parseDuration(item.duration);
          switch (this.selectedDuration) {
            case "short":
              return duration < 30;
            case "medium":
              return duration >= 30 && duration <= 60;
            case "long":
              return duration > 60;
            default:
              return true;
          }
        });
      }
      return list;
    }
  },
  onLoad() {
    this.loadContent();
  },
  methods: {
    switchCategory(type) {
      this.currentCategory = type;
    },
    getCategoryName(type) {
      const category = this.categoryList.find((item) => item.type === type);
      return category ? category.name : "";
    },
    showFilterPopup() {
      this.showFilter = true;
    },
    hideFilterPopup() {
      this.showFilter = false;
    },
    showSortPopup() {
      common_vendor.index.showActionSheet({
        itemList: ["最新发布", "最多播放", "最多收藏", "时长最短", "时长最长"],
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/classify/classify.vue:261", "选择了排序方式:", res.tapIndex);
          this.sortContent(res.tapIndex);
        }
      });
    },
    selectDuration(value) {
      this.selectedDuration = value;
    },
    selectHeat(value) {
      this.selectedHeat = value;
    },
    resetFilter() {
      this.selectedDuration = "";
      this.selectedHeat = "";
    },
    applyFilter() {
      this.hideFilterPopup();
    },
    toggleFavorite(item) {
      item.isFavorited = !item.isFavorited;
      common_vendor.index.showToast({
        title: item.isFavorited ? "已收藏" : "已取消收藏",
        icon: "none"
      });
    },
    playContent(item) {
      common_vendor.index.showToast({
        title: `正在播放: ${item.title}`,
        icon: "none"
      });
    },
    parseDuration(duration) {
      const parts = duration.split(":");
      if (parts.length === 3) {
        return parseInt(parts[0]) * 60 + parseInt(parts[1]);
      } else if (parts.length === 2) {
        return parseInt(parts[0]);
      }
      return 0;
    },
    sortContent(sortType) {
      common_vendor.index.__f__("log", "at pages/classify/classify.vue:307", "排序类型:", sortType);
      common_vendor.index.showToast({
        title: "排序完成",
        icon: "none"
      });
    },
    loadContent() {
      common_vendor.index.__f__("log", "at pages/classify/classify.vue:315", "加载分类内容");
    },
    loadMore() {
      if (!this.hasMore)
        return;
      setTimeout(() => {
        this.page++;
        common_vendor.index.__f__("log", "at pages/classify/classify.vue:323", "加载更多内容, 页码:", this.page);
        if (this.page >= 3) {
          this.hasMore = false;
        }
      }, 1e3);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.categoryList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.icon),
        b: common_vendor.t(item.name),
        c: index,
        d: $data.currentCategory === item.type ? 1 : "",
        e: common_vendor.o(($event) => $options.switchCategory(item.type), index)
      };
    }),
    b: common_vendor.o((...args) => $options.showFilterPopup && $options.showFilterPopup(...args)),
    c: common_vendor.o((...args) => $options.showSortPopup && $options.showSortPopup(...args)),
    d: common_vendor.f($options.filteredList, (item, index, i0) => {
      return {
        a: item.cover,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.author),
        d: common_vendor.t($options.getCategoryName(item.category)),
        e: common_vendor.t(item.duration),
        f: common_vendor.t(item.views),
        g: common_vendor.t(item.likes),
        h: common_vendor.t(item.isFavorited ? "❤️" : "🤍"),
        i: item.isFavorited ? 1 : "",
        j: common_vendor.o(($event) => $options.toggleFavorite(item), index),
        k: common_vendor.o(($event) => $options.playContent(item), index),
        l: index,
        m: common_vendor.o(($event) => $options.playContent(item), index)
      };
    }),
    e: $data.hasMore
  }, $data.hasMore ? {} : {}, {
    f: common_vendor.o((...args) => $options.loadMore && $options.loadMore(...args)),
    g: $data.showFilter
  }, $data.showFilter ? {
    h: common_vendor.o((...args) => $options.hideFilterPopup && $options.hideFilterPopup(...args)),
    i: common_vendor.f($data.durationOptions, (duration, k0, i0) => {
      return {
        a: common_vendor.t(duration.label),
        b: duration.value,
        c: $data.selectedDuration === duration.value ? 1 : "",
        d: common_vendor.o(($event) => $options.selectDuration(duration.value), duration.value)
      };
    }),
    j: common_vendor.f($data.heatOptions, (heat, k0, i0) => {
      return {
        a: common_vendor.t(heat.label),
        b: heat.value,
        c: $data.selectedHeat === heat.value ? 1 : "",
        d: common_vendor.o(($event) => $options.selectHeat(heat.value), heat.value)
      };
    }),
    k: common_vendor.o((...args) => $options.resetFilter && $options.resetFilter(...args)),
    l: common_vendor.o((...args) => $options.applyFilter && $options.applyFilter(...args)),
    m: common_vendor.o(() => {
    }),
    n: common_vendor.o((...args) => $options.hideFilterPopup && $options.hideFilterPopup(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/classify/classify.js.map
