```!
本节代码对应 GitHub 分支: chapter4
```
[仓库传送门](https://github.com/sanyuan0704/react-cloud-music/tree/chapter4)

为了做出小小的分类横向滚动列表，可谓花了不少的力气。不过做完了这个，再来开发歌手列表，简直易如反掌了。

进入 Singers/index.js, 增加以下代码，
```js
//mock 数据
const singerList = [1, 2,3, 4,5,6,7,8,9,10,11,12].map (item => {
  return {
    picUrl: "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
    name: "隔壁老樊",
    accountId: 277313426,
  }
}); 

// 渲染函数，返回歌手列表
const renderSingerList = () => {
  return (
    <List>
      {
        singerList.map ((item, index) => {
          return (
            <ListItem key={item.accountId+""+index}>
              <div className="img_wrapper">
                <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          )
        })
      }
    </List>
  )
};
```
然后将返回的 JSX 代码做一些改动:
```js
return (
  <div>
    <NavContainer>
      <Horizen 
        list={categoryTypes} 
        title={"分类 (默认热门):"} 
        handleClick={(val) => handleUpdateCatetory (val)} 
        oldVal={category}></Horizen>
      <Horizen 
        list={alphaTypes} 
        title={"首字母:"} 
        handleClick={val => handleUpdateAlpha (val)} 
        oldVal={alpha}></Horizen>
    </NavContainer> 
    <ListContainer>
      <Scroll>
        { renderSingerList () }
      </Scroll>
    </ListContainer>
  </div>
)
```
现在项目会报错，因为样式组件还没有定义，我们在 style.js 中添加：
```js
export const ListContainer = styled.div`
  position: fixed;
  top: 160px;
  left: 0;
  bottom: 0;
  overflow: hidden;
  width: 100%;
`;

export const List = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  overflow: hidden;
  .title {
    margin:10px 0 10px 10px;
    color: ${style ["font-color-desc"]};
    font-size: ${style ["font-size-s"]};
  }
`;
export const ListItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  margin: 0 5px;
  padding: 5px 0;
  align-items: center;
  border-bottom: 1px solid ${style ["border-color"]};
  .img_wrapper {
    margin-right: 20px;
    img {
      border-radius: 3px;
      width: 50px;
      height: 50px;
    }
  }
  .name {
    font-size: ${style ["font-size-m"]};
    color: ${style ["font-color-desc"]};
    font-weight: 500;
  }
`;
```
在 index.js 中引入:
```js
import { 
  NavContainer,
  ListContainer,
  List,
  ListItem
} from "./style";
```
现在你就能看到一个可以滚动的歌手列表啦！

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/18/16dddf3919da2c45~tplv-t2oaga2asx-image.image)

## 数据层开发

刚刚只是mock数据，要实现真正的线上功能，还有很多工作要做。

### axios请求处理
进入到api/request.js中，加入下面的请求代码:
```js
export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
}

export const getSingerListRequest= (category, alpha, count) => {
  return axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`);
}
```
这就是我们目前需要的全部ajax请求。

### redux层开发 
redux刚开始接触的时候确实是比较复杂，但多些几次你就会发现其实就是一些模板代码，并没有什么难的。还是按推荐模块一样，我们来按照步骤开发redux模块。

注意，在这里我们会添加一些新的业务逻辑，比如上拉/下拉/进场加载动画的控制、列表页数的控制，大家看到不要感到奇怪。

在Singers目录下，新建store文件夹，然后新建以下文件:
```
actionCreators.js //放不同action的地方
constants.js      //常量集合，存放不同action的type值
index.js          //用来导出reducer，action
reducer.js        //存放initialState和reducer函数
```
#### 1.声明初始化state

初始化state在reducer中进行

```js
//reducer.js
import { fromJS } from 'immutable';

const defaultState = fromJS({
  singerList: [],
  enterLoading: true,     //控制进场Loading
  pullUpLoading: false,   //控制上拉加载动画
  pullDownLoading: false, //控制下拉加载动画
  pageCount: 0            //这里是当前页数，我们即将实现分页功能
});
```
#### 2.定义constants
```js
export const CHANGE_SINGER_LIST = 'singers/CHANGE_SINGER_LIST';
export const CHANGE_PAGE_COUNT = 'singers/PAGE_COUNT';
export const CHANGE_ENTER_LOADING = 'singers/ENTER_LOADING';
export const CHANGE_PULLUP_LOADING = 'singers/PULLUP_LOADING';
export const CHANGE_PULLDOWN_LOADING = 'singers/PULLDOWN_LOADING';
```

#### 3.定义reducer函数
在reducer.js文件中加入以下处理逻辑，由于存放的是immutable数据结构，所以必须用set方法来设置新状态，同时取状态用get方法。

```js
export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_SINGER_LIST:
      return state.set('singerList', action.data);
    case actionTypes.CHANGE_PAGE_COUNT:
      return state.set('pageCount', action.data);
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', action.data);
    case actionTypes.CHANGE_PULLUP_LOADING:
      return state.set('pullUpLoading', action.data);
    case actionTypes.CHANGE_PULLDOWN_LOADING:
      return state.set('pullDownLoading', action.data);
    default:
      return state;
  }
}
```
#### 4.编写具体的action
```js
import {
  getHotSingerListRequest,
  getSingerListRequest
} from "../../../api/request";
import {
  CHANGE_SINGER_LIST,
  CHANGE_CATOGORY,
  CHANGE_ALPHA,
  CHANGE_PAGE_COUNT,
  CHANGE_PULLUP_LOADING,
  CHANGE_PULLDOWN_LOADING,
  CHANGE_ENTER_LOADING
} from './constants';
import {
  fromJS
} from 'immutable';


const changeSingerList = (data) => ({
  type: CHANGE_SINGER_LIST,
  data: fromJS(data)
});

export const changePageCount = (data) => ({
  type: CHANGE_PAGE_COUNT,
  data
});

//进场loading
export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data
});

//滑动最底部loading
export const changePullUpLoading = (data) => ({
  type: CHANGE_PULLUP_LOADING,
  data
});

//顶部下拉刷新loading
export const changePullDownLoading = (data) => ({
  type: CHANGE_PULLDOWN_LOADING,
  data
});

//第一次加载热门歌手
export const getHotSingerList = () => {
  return (dispatch) => {
    getHotSingerListRequest(0).then(res => {
      const data = res.artists;
      dispatch(changeSingerList(data));
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
    }).catch(() => {
      console.log('热门歌手数据获取失败');
    })
  }
};

//加载更多热门歌手
export const refreshMoreHotSingerList = () => {
  return (dispatch, getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount']);
    const singerList = getState().getIn(['singers', 'singerList']).toJS();
    getHotSingerListRequest(pageCount).then(res => {
      const data = [...singerList, ...res.artists];
      dispatch(changeSingerList(data));
      dispatch(changePullUpLoading(false));
    }).catch(() => {
      console.log('热门歌手数据获取失败');
    });
  }
};

//第一次加载对应类别的歌手
export const getSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    getSingerListRequest(category, alpha, 0).then(res => {
      const data = res.artists;
      dispatch(changeSingerList(data));
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
    }).catch(() => {
      console.log('歌手数据获取失败');
    });
  }
};

//加载更多歌手
export const refreshMoreSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount']);
    const singerList = getState().getIn(['singers', 'singerList']).toJS();
    getSingerListRequest(category, alpha, pageCount).then(res => {
      const data = [...singerList, ...res.artists];
      dispatch(changeSingerList(data));
      dispatch(changePullUpLoading(false));
    }).catch(() => {
      console.log('歌手数据获取失败');
    });
  }
};
```
#### 5.将相关变量导出
```js
//index.js
import reducer from './reducer'
import * as actionCreators from './actionCreators'

export { reducer, actionCreators };
```

### 组件连接Redux
首先，需要将Singers下的reducer注册到全局store，在src目录下的store/reducer.js中，内容如下:
```js
import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../application/Recommend/store/index';
import { reducer as singersReducer } from '../application/Singers/store/index';

export default combineReducers({
  recommend: recommendReducer,
  singers: singersReducer,
});
```
好，现在已经在全局的store下面注册完成。现在在Singers/index.js中，准备连接Redux。
增加代码:
```js
import React, {useState, useEffect} from 'react';
import Horizen from '../../baseUI/horizen-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import { 
  NavContainer,
  ListContainer,
  List,
  ListItem,
} from "./style";
import { 
  getSingerList, 
  getHotSingerList, 
  changeEnterLoading, 
  changePageCount, 
  refreshMoreSingerList, 
  changePullUpLoading, 
  changePullDownLoading, 
  refreshMoreHotSingerList 
} from './store/actionCreators';
import Scroll from './../../baseUI/scroll/index';
import {connect} from 'react-redux';

//在此省略组件代码

const mapStateToProps = (state) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
});
const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0));//由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true));//loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
      dispatch(getSingerList(category, alpha));
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count+1));
      if(hot){
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0));//属于重新获取数据
      if(category === '' && alpha === ''){
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category, alpha));
      }
    }
  }
};   
```
记得最后用react-redux中的connect包裹:
```js
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));
```
好，现在就可以完美地显示真实的列表了。

### 分类和列表联动

但是，点击不同的分类并没有获取相应的列表，现在我们就来实现分类和列表联动的功能。

这当然要从handleUpdatexxx函数开始着手啦。其实非常简单，只需做如下修改即可：
```js
let handleUpdateAlpha = (val) => {
  setAlpha(val);
  updateDispatch(category, val);
};

let handleUpdateCatetory = (val) => {
  setCategory(val);
  updateDispatch(val, alpha);
};
```
至此，这样联动效果就实现啦！

