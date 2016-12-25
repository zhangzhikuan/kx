$(function () {

    function addTab(options) {
        var title = options.title;
        var href = options.href;
        var id = "iframe_" + options.id;

        if ($('#' + id).length == 0) {

            $('#tab-contents').append($('<div id="' + id + '" class="tab-pane auto-height"><iframe width="100%" height="100%" src="' + href + '" frameborder="0" seamless></iframe></div>'))
            var tab_titile = $('<li class=""><a data-toggle="tab" href="#' + id + '">' + title + '<i class="ace-icon fa fa-thumbs-o-up"></i><i class="pink ace-icon fa fa-times-circle tab-close"/></a></li>');
            $('#tab-titles').append(tab_titile)

            //激活新的tab
            activeTab(tab_titile)
        }

    }

    function activeTab(tab) {
        ///激活新的tab
        tab.tab('show')
        //把原来的active的选项卡给去掉active
        $('#tab-contents').children('.active').removeClass('active')
        //将新的选项卡内容展示
        $(tab.children('a').attr('href')).addClass('active')
    }

    //新增tab
    $(".submenu li").click(function (e) {
        addTab({
            "title": "kuan",
            "href": "tables.html",
            "id": "abcdef"
        })
        return false;
    })

    //添加关闭按钮
    $('#tab-titles').on('click', 'li a .tab-close', function (e) {
        var __i = $(e.target)
        var _a = __i.parent()
        var li = _a.parent()


        //判断当前的tab是不是激活tab，如果是激活tab，需要选择某一个tab作为激活tab，默认为前一个
        if (li.hasClass('active')) {
            //前一个
            var prev = li.prev()
            activeTab(prev)

        }
        //开始删除当前tab
        var content_id = _a.attr("href")
        //内容删除
        $(content_id).remove()
        //title删除
        li.remove()

    });
})