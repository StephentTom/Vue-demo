import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);

// 修改默认配置
Toast.setDefaultOptions({ 
    forbidClick: true,
    duration: 2500
});


class CNToast {
    //  文本提示
    static messageInfo(params) {
        Toast(msg);
    }

    // 成功提示
    static success(msg) {
        Toast.success(msg);
    }

    // 失败提示
    static fail(msg) {
        Toast.fail(msg);
    }

    // 加载提示
    static loading(msg){
        Toast.loading({
            duration: 0,
            message: msg == undefined? "加载中..." : msg,
            loadingType: 'spinner'
        });
    }

    // 关闭提示
    static dismiss = ()=>{
        Toast.clear();
    }
}

export default CNToast;