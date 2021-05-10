<template>
    <div ref="list" class="kkb-list-container" @scroll="scrollEvent($event)">
    <div class="kkb-list-phantom" :style="{ height: listHeight + 'px' }"></div>
    <div class="kkb-list" :style="{ top: getTop }">
      <!-- <div class="kkb-list" :style="{ transform:getTransform }"></div> -->
      <ArticleItem ref="items"
        class="kkb-list-item" 
        v-for="item in visibleData" 
        :article="item"
        :key="item._id"
        :style="{ height: size + 'px'}"
      ></ArticleItem>
    </div>
  </div>
</template>
<script>
  import ArticleItem from './ArticleItem.vue'
  export default {
    name:'VirtualList',
    components:{ArticleItem},
    props: {
      //所有列表数据
      listData:{
        type:Array,
        default:()=>[]
      },
      //每项高度
      size: {
        type: Number,
        default:200
      }
    },
    computed:{
      //列表总高度
      listHeight(){
        return this.listData.length*this.size
      },
      getTop(){
        return `${this.startOffset}px`
      },
      //可显示的列表项数
      visibleCount(){
      return Math.ceil(this.screenHeight / this.size)
      },
      //偏移量对应的style
      getTransform(){
        return `translate3d(0,${this.startOffset}px, 0)`
      },
       //获取真实显示列表数据
      visibleData(){
        console.log(this.listData,this.start,this.end)
        return this.listData.slice(this.start, Math.min(this.end,this.listData.length));
      }
    },
    data(){
      return{
      screenHeight:800,
      //偏移量
      startOffset:0,
      //起始索引
      start:0,
      //结束索引
      end:4,
      }
    },
    mounted() {
    this.start = 0;
    this.end = this.start + this.visibleCount;
    },
    methods: {
      scrollEvent(){
         //当前滚动位置
      let scrollTop = this.$refs.list.scrollTop;
      //此时的开始索引
      this.start = Math.floor(scrollTop / this.itemSize);
      //此时的结束索引
      this.end = this.start + this.visibleCount;
      //此时的偏移量
      this.startOffset = scrollTop - (scrollTop % this.itemSize);
      }
    },
  }
</script>
<style scoped>
.infinite-list-container {
  height: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}
.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}
.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
}
.infinite-list-item {
  padding: 10px;
  color: #555;
  border-bottom: 1px solid #999;
}
</style>