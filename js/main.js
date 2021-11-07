var app = new Vue({
    el: "#player",
    data: {
        //查询关键字
        query: "",
        //歌曲数组
        musicList: [],
        // 歌曲地址
        musicUrl: "",
        // 歌曲封面
        musicCover: "",
        // 歌曲评论
        hotComments: "",
        // 动画播放状态
        isPlaying: false,
        // mv地址
        mvUrl: "",
        // mv播放状态
        isShow: false,

    },
    methods: {
        searchMusic: function() {
            var that = this;
            axios.get('https://autumnfish.cn/search?keywords=' + this.query)
                .then(function(response) {
                    // console.log(response);
                    that.musicList = response.data.result.songs;
                }, function(err) {})
        },
        playMusic: function(musicId) {
            var that = this;
            // console.log(musicId);
            axios.get('https://api.imjad.cn/cloudmusic/?type=url&id=' + musicId).then(function(response) {
                that.musicUrl = response.data.data[0].url;
            }, function(err) {})
            axios.get('https://api.imjad.cn/cloudmusic/?type=detail&id=' + musicId).then(function(response) {
                // console.log(response);
                that.musicCover = response.data.songs[0].al.picUrl;
            }, function(err) {})
            axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + musicId).then(function(response) {
                that.hotComments = response.data.hotComments
            }, function(err) {})
        },
        play: function() {
            this.isPlaying = true;

        },
        pause: function() {
            this.isPlaying = false;
        },
        playMV: function(mvId) {
            var that = this;
            axios.get('https://autumnfish.cn/mv/url?id=' + mvId).then(function(response) {
                that.isShow = true;
                that.mvUrl = response.data.data.url;
                that.musicUrl = "";
                that.isPlaying = false
            }, function(err) {})
        },
        hide: function() {
            this.isShow = false;
            this.mvUrl = '';
        }

    }
})