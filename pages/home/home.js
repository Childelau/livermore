Page({
    data:{
        state: 0,
        _num:'0'
    },
    // 点击tab切换
    toggle(e){
        if (this.data._num == e.currentTarget.dataset.index) {
            return false
        } else {
            this.setData({
                _num: e.currentTarget.dataset.index
            })
        }


    },
    bindchange:function(e){
        var that = this;
        that.setData({
          _num:e.detail.current
        })
          
    }


})

