<template>
  <div>
      <div id="container"></div>
  </div>
  
</template>

<script>
    import AMapLoader from '@amap/amap-jsapi-loader';
    export default {
        name:'Mapview',
        data(){
          return{
            map:null,
          } 
        },
        created(){
          
          // let num = 0;
          // setInterval(()=>{
            
          // },1000)  
        },
        mounted(){
          //DOM初始化完成进行地图初始化
          this.initMap();
          this.updateData().then(valueData =>{
                      let num = 0;
                      console.log(valueData.value1);
                      setInterval(()=>{
                          if(num == valueData.value1.length){
                              num = 0;
                          };
                          let val1 = document.getElementById('val1');
                          let val2 = document.getElementById('val2');
                          let val3 = document.getElementById('val3');
                          let val4 = document.getElementById('val4');
                          let val5 = document.getElementById('val5');
                          if(!val1|val2|val3|val4|val5){
                                return
                          }
                          val1.innerHTML = valueData.value1[num];
                          val2.innerHTML = valueData.value2[num];
                          val3.innerHTML = valueData.value3[num];
                          val4.innerHTML = valueData.value4[num];
                          let degree,x;
                          degree = valueData.value1[num];
                          x = valueData.value3[num];
                          if(degree==24){
                              this.open();
                          }

                          // else if(0<degree<=10){
                          //     val5.innerHTML =  '微风' 
                          // }
                          // else if(11<=degree<17){
                          //     val5.innerHTML =  '疾风' 
                          // }
                          // else if(17<=degree<24){
                          //     val5.innerHTML =  '狂风' 
                          // }
                          // else{
                          //     val5.innerHTML =  '暴风' 
                          // }
                        
                          console.log(valueData.value1[num]);
                          num++;
                      },1000)
              })
        },
        methods: {
          initMap(){
              AMapLoader.load({
                  key:"c1e1c5fc799f581569bec001bce3cc32",             // 申请好的Web端开发者Key，首次调用 load 时必填
                  version:"",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
              }).then((AMap)=>{
             var map = new AMap.Map("container",{
              resizeEnable:true,
              zoom:14,//级别
                    center: [113.267507,23.111885],//中心点坐标
                    viewMode:'3D',//使用3D视图
            });
            
            var marker = new AMap.Marker({
              map:map,
              position: [113.267507,23.111885]//点所在位置
            });
            //创建信息窗体
            var infoWindow = new AMap.InfoWindow({
              
              content:`<div class='prompt'><h3>数据展示</h3></div><hr>
              <div class="items">风速(cm/s):<span id='val1'></div><br/>
              
              <div class="items">桥体地面温度(°C):<span id='val2'> </div><br/>
              <div class="items">桥梁横向数据(mm): <span id='val3'> </div><br/>
              <div class="items">桥梁纵向数据(mm): <span id='val4'> </div><br/>
              
              `
            });
            //信息窗口
            AMap.event.addListener(marker,'click',function(){ //监听点标记的点击事件
              infoWindow.open(map,marker.getPosition()); //信息窗体打开
            });
                
                }).catch(e=>{
                       console.log(e);
                              })
            },

          updateData(){
              let valueData = {
                value1:[],
                value2:[],
                value3:[],
                value4:[],
              }
              // 
              return this.$api.getParams().then((res) => {
                  if (res.data.status === 200) {
                    // console.log('******',res.data.result);
                    /**/for(let i = 0; i < res.data.result.length; i++){
                        // console.log('**********风速序列',i,res.data.result[i].fengsu,'**********');
                        valueData.value1.push(res.data.result[i].fengsu);
                        valueData.value2.push(res.data.result[i].wendu);
                        valueData.value3.push(res.data.result[i].cejux);
                        valueData.value4.push(res.data.result[i].cejuy);
                    }
                    return valueData;
                  }
              });
          },


          open() {
            this.$alert(`记录时间点为:${this.getLocalTime()},桥体发生强烈抖动，为保障安全请立即暂停在桥面上行车`, '安全警告', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `收到！系统已将信息发送给交管部门`
                });
              }
            });
          },


          getLocalTime() {   
            let n = Date.now();
            console.log(n);
            return new Date(parseInt(n)).toLocaleString().replace(/:\d{1,2}$/,' ');   
          } 

          },
        }
</script>

<style  scoped>

  #container {
    width:100%;
    height:900px;
  }

  .prompt {
    margin-top: 8px;
    text-align: center;
    font-size: 20px;
  }

  .items {
  font-size: 20px;
  }

</style>