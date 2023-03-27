<template>
  <div  class="Line">
    <div id="myChart" :style="{width: 'auto', height: '600px'}"></div>
    <div v-for="item in tableData" :key="item.id">
      {{item.fengsu}}
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      tableData:[],
      
    }
  },
  created(){
      this.http();
  },
  mounted() {

},
  methods: {
      http() {
        this.$api.getParams()
          .then((res) => {
            // console.log(res.data);
            // console.log(res.data.fengsu);
            if (res.data.status === 200) {
              let xResult = res.data.result;
              let fengsuArr = [];
              let wenduArr = [];
              let cejuxArr = [];
              let cejuyArr = [];
              // this.tableData = res.data.result;
              // console.log(this.tableData);
              // console.log();
              xResult.forEach((ele)=>{
                fengsuArr.push(ele.fengsu);
                wenduArr.push(ele.wendu);
                cejuxArr.push(ele.cejux);
                cejuyArr.push(ele.cejuy);
              });
              console.log('*************fengsu',fengsuArr,wenduArr,cejuxArr,cejuyArr);
              let i = 12,num = 1;
              var cejuxArr1 = cejuxArr;
              var fengsuArr1 = fengsuArr;
              var cejuyArr1 = cejuyArr;
              var wenduArr1 = wenduArr;
              this.drawLine(cejuxArr1,fengsuArr1,cejuyArr1,wenduArr1);
              setInterval(()=>{
                    cejuxArr1 = cejuxArr.slice(i*(num-1),i*num);
                    fengsuArr1 = fengsuArr.slice(i*(num-1),i*num);
                    cejuyArr1 = cejuyArr.slice(i*(num-1),i*num);
                    wenduArr1 = wenduArr.slice(i*(num-1),i*num);
                    console.log('&&&&&&&&&&&&&',num,cejuxArr1);
                    num++;
                    if(num == 4){
                      num = 1;
                    }
                    
                    this.drawLine(cejuxArr1,fengsuArr1,cejuyArr1,wenduArr1);
              },12000)  //12s更新一次数据
            }
          });
    },
    //封装Echarts可视化插件函数
    drawLine(cejuxArr,fengsuArr,cejuyArr,wenduArr) {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      // 
      var xDataArr = ['1s','2s','3s','4s','5s','6s','7s','8s','9s','10s','11s','12s']
      var ycejux = cejuxArr
      var ycejuy = cejuyArr
      var yfengsu= fengsuArr
      var ywendu = wenduArr

      var option = {
        //竖线定位提示框
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        //与下方series折线的name结合，声明哪些折线代表的意思
        legend:{
          data:['桥梁横向变化','桥梁纵向变化','风速','温度'],
          left:250
        },
       
        grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
        },
         xAxis: {
            type: 'category',
            data: xDataArr,
            // 设置折线挨着y轴
            boundaryGap:false
        },
        yAxis: {
            type: 'value',
            // scale:true
        },
        series: [
            {
              name:'桥梁横向变化',
              data: ycejux,
              type: 'line',
              // smooth: true,
              lineStyle:{
                  color:'pink'
              },
              //在面积区域聚焦
              emphasis: {
              focus: "series",
              },
              //最值标记
              markPoint:{
                data:[
                  {
                    type:'max'
                  },
                  {
                    type:'min'
                  }
                ]
              },
              //平均值标记
              markLine:{
                data:[
                  {
                    type:'average'
                  }
                ]
              },
              // areaStyle:{
              //   color:'pink'
              // }
            },

            {
              name:'桥梁纵向变化',
              data: ycejuy,
              type: 'line',
              // smooth: true,
              lineStyle:{
                  color:'blue'
              },
              //在面积区域聚焦
              emphasis: {
              focus: "series",
              },
              //最值标记
              markPoint:{
                data:[
                  {
                    type:'max'
                  },
                  {
                    type:'min'
                  }
                ]
              },
              //平均值标记
              markLine:{
                data:[
                  {
                    type:'average'
                  }
                ]
              },
              // areaStyle:{
              //   color:'pink'
              // }
            },



            {
              name:'风速',
              data:yfengsu,
              type: 'line',
              // smooth: true,
              lineStyle:{
                  color:'green'
              },
              //在面积区域聚焦
              emphasis: {
              focus: "series",
              },
              //最值标记
              markPoint:{
                data:[
                  {
                    type:'max'
                  },
                  {
                    type:'min'
                  }
                ]
              },
              //平均值标记
              markLine:{
                data:[
                  {
                    type:'average'
                  }
                ]
              },
              // areaStyle:{
              //   color:'greenyellow'
              // }
            },

              {
              name:'温度',
              data:ywendu,
              type: 'line',
              // smooth: true,
              lineStyle:{
                  color:'red'
              },
              //在面积区域聚焦
              emphasis: {
              focus: "series",
              },
              //最值标记
              markPoint:{
                data:[
                  {
                    type:'max'
                  },
                  {
                    type:'min'
                  }
                ]
              },
              //平均值标记
              markLine:{
                data:[
                  {
                    type:'average'
                  }
                ]
              },
              // areaStyle:{
              //   color:'greenyellow'
              // }
            },


        ]
      }
      myChart.setOption(option)
    },
 
  },
    
}
</script>
<style lang="less" scoped>
  .Line{
    margin: 10px;
  }
</style>