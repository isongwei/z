# -------------------------------------------------------------------------
# v0.2.0  https://o1xhack.com/2020/06/21/surge/
# Telegram Channel： https://t.me/o1xinsight
# -------------------------------------------------------------------------
[General]
loglevel = notify
# 从 Surge iOS 4 / Surge Mac 3.3.0 起，工具开始支持 DoH。 但是因为这是 Surge 4 需要付费解锁的功能，因此默认不开启。
# 您可以根据需求自行决定选用 DNS 服务器的种类和组合方式，例如：混用服务器来实现最佳解析速度；单独 DoH 使用来达到最佳安全性和最低污染度。
# dns-server = https://13800000000.rubyfish.cn:443, https://1.1.1.1/dns-query, https://dns.google/dns-query, https://dns9.quad9.net:443/dns-query, system
dns-server = 1.2.4.8, 114.114.114.114, 223.5.5.5, 8.8.8.8, system
tun-excluded-routes = 0.0.0.0/8, 10.0.0.0/8, 100.64.0.0/10, 127.0.0.0/8, 169.254.0.0/16, 172.16.0.0/12, 192.0.0.0/24, 192.0.2.0/24, 192.168.0.0/16, 192.88.99.0/24, 198.51.100.0/24, 203.0.113.0/24, 224.0.0.0/4, 255.255.255.255/32
skip-proxy = localhost, *.local, captive.apple.com, 0.0.0.0/8, 10.0.0.0/8, 17.0.0.0/8, 100.64.0.0/10, 127.0.0.0/8, 169.254.0.0/16, 172.16.0.0/12, 192.0.0.0/24, 192.0.2.0/24, 192.168.0.0/16, 192.88.99.0/24, 198.18.0.0/15, 198.51.100.0/24, 203.0.113.0/24, 224.0.0.0/4, 240.0.0.0/4, 255.255.255.255/32

allow-wifi-access = true
wifi-access-http-port = 6152
wifi-access-socks5-port = 6153
http-listen = 0.0.0.0:6152
socks5-listen = 0.0.0.0:6153

test-timeout = 4
network-framework = true
proxy-test-url = http://www.gstatic.com/generate_204

external-controller-access = 请指定密码@0.0.0.0:6170
exclude-simple-hostnames = true
ipv6 = false
replica = false
# > 优酷 去广告
# force-http-engine-hosts = %APPEND% vali.cp31.ott.cibntv.net

[Replica]
hide-apple-request = 0
hide-crash-reporter-request = 0
hide-udp = 0
keyword-filter-type = none
keyword-filter = (null)

[Proxy]
DIRECT = direct


[Proxy Group]
Global = select, Proxy1, Proxy2, Proxy3, DIRECT
Domestic = select, DIRECT, Global
AdBlock = select, REJECT, Global, Domestic
# CDN 资源类 推荐选择直连（App 实体文件、Apple Music 音乐文件
# API 服务类 推荐选择账号所在区（购买、发起下载、iCloud 同步（含上传和下载）、Siri
Apple_API = select, Domestic, Global, Proxy1, Proxy2, Proxy3
Apple_CDN = select, Domestic, Apple_API
AsianMedia = select, Domestic, Global, Proxy1, Proxy2, Proxy3
GlobalMedia = select, Global, Domestic, Proxy1, Proxy2, Proxy3
Proxy1 = select, policy-path=https://www.example.com/example1.list
Proxy2 = select, policy-path=https://www.example.com/example2.list
Proxy3 = select, policy-path=https://www.example.com/example3.list

[Rule]
# > 京东  去启动广告
URL-REGEX,^https?:\/\/api\.m\.jd\.com\/client\.action\?functionId=start$,REJECT-TINYGIF
# > 哔哩哔哩 去广告
DOMAIN,data.bilibili.com,REJECT
URL-REGEX,https://app.bilibili.com/x/v2/(splash|search/(defaultword|square)),REJECT
URL-REGEX,https://api.bilibili.com/x/v2/dm/ad,REJECT
# > YouTube 去片头广告
# URL-REGEX,^https?:\/\/[\w-]+\.googlevideo\.com\/.+&(oad|ctier),REJECT-TINYGIF
# > 知乎 去广告
# SOME MCN INFO MAY BE USEFUL
# URL-REGEX,https://www.zhihu.com/api/v4/mcn/,REJECT
# DO NOT GET CDN-BASED IP
DOMAIN,118.89.204.198,REJECT
USER-AGENT,AVOS*,REJECT
URL-REGEX,https://api.zhihu.com/(ad|drama|fringe|commercial|market/popover|search/(top|preset|tab)|.*featured-comment-ad),REJECT
AND,((USER-AGENT,ZhihuHybrid*), (URL-REGEX,.*recommend)),REJECT
# > 人人视频 去广告
AND,((USER-AGENT,PUClient*), (NOT,((DOMAIN-SUFFIX,rr.tv)))),REJECT
URL-REGEX,^https?:\/\/api\.rr\.tv\/(?:ad\/getAll$|storage/business/rootName/app/homePage),REJECT
# > 优酷 去广告
# URL-REGEX,^http:\/\/vali\.cp31\.ott\.cibntv\.net\/youku\/,REJECT-TINYGIF
# > 爱美剧 去广告
URL-REGEX,^http(s)://api.bjxkhc.com/index.php/app/ios/pay/ok$,REJECT-TINYGIF
URL-REGEX,^http(s)://api.bjxkhc.com/index.php/app/ios/ver/index_ios$,REJECT
URL-REGEX,^http(s)://api.bjxkhc.com/index.php/app/ios/ads/index,REJECT-TINYGIF
# 淘宝历史价格
IP-CIDR,203.119.144.0/21,REJECT,no-resolve
IP-CIDR,203.119.175.0/24,REJECT,no-resolve
# eHpo1 https://github.com/eHpo1/Rules
RULE-SET,https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Liby.list,AdBlock
RULE-SET,https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Tide.list,AdBlock
RULE-SET,https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Apple_CDN.list,Apple_CDN
RULE-SET,https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Apple_API.list,Apple_API
RULE-SET,https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/AsianMedia.list,AsianMedia
RULE-SET,https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/GlobalMedia.list,GlobalMedia
RULE-SET,https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Domestic.list,Domestic
RULE-SET,https://raw.githubusercontent.com/eHpo1/Rules/master/Surge4/Ruleset/Global.list,Global
GEOIP,CN,Domestic
FINAL,Domestic,dns-failed

[URL Rewrite]
# Redirect Google Search Service
^https?://(www.)?(g|google).cn https://www.google.com 302
# > TikTok 解锁
# (?<=_region=)CN(?=&) JP 307
# (?<=&app_version=)16..(?=.?.?&) 1 307
# (?<=\?version_code=)16..(?=.?.?&) 1 307
# > 抖音 去广告&水印
# ^https?:\/\/[\w-]+\.amemv\.com\/aweme\/v\d\/feed\/ https://aweme.snssdk.com/aweme/v1/feed/ header
# ^https?:\/\/[\w-]+\.amemv\.com\/aweme\/v\d\/aweme\/post\/ https://aweme.snssdk.com/aweme/v1/aweme/post/ header
# ^https?:\/\/[\w-]+\.amemv\.com\/aweme\/v\d\/follow\/feed\/ https://aweme.snssdk.com/aweme/v1/follow/feed/ header
# ^https?:\/\/[\w-]+\.amemv\.com\/aweme\/v\d\/nearby\/feed\/ https://aweme.snssdk.com/aweme/v1/nearby/feed/ header
# ^https?:\/\/[\w-]+\.amemv\.com\/aweme\/v\d\/search\/item\/ https://aweme.snssdk.com/aweme/v1/search/item/ header
# ^https?:\/\/[\w-]+\.amemv\.com\/aweme\/v\d\/general\/search\/single\/ https://aweme.snssdk.com/aweme/v1/general/search/single/ header
# ^https?:\/\/[\w-]+\.amemv\.com\/aweme\/v\d\/hot/search\/video\/list\/ https://aweme.snssdk.com/aweme/v1/hot/search/video/list/ header
# 豆瓣去广告 hostname= api.douban.com
^https?://api.douban.com/v2/app_ads/ - reject
^https?://erebor.douban.com/count/?ad= - reject
^https?://.+.doubanio.com/view/dale-online/dale_ad/ - reject

[Header Rewrite]
# 知乎
^https?://www\.zhihu\.com header-replace User-Agent "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1 Safari/605.1.15"
# 百度贴吧
^https?+:\/\/(?:c\.)?+tieba\.baidu\.com\/(?>f|p) header-replace User-Agent "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Safari/605.1.15"
^https?+:\/\/jump2\.bdimg\.com\/(?>f|p) header-replace User-Agent "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Safari/605.1.15"
# 百度知道
^https?+:\/\/zhidao\.baidu\.com header-replace User-Agent "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Safari/605.1.15"
# > 小小影视vip #Alex0510/Eric
# https:\/\/.*.xiaoxiao(img|apps|appxs).com header-replace Cookie xxx_api_auth=6131333537653261363463323331666265663763396239663835636662373930

[MITM]
skip-server-cert-verify = true
hostname = *.amemv.com, *.iydsj.com, *.k.sohu.com, *.kakamobi.cn, *.kingsoft-office-service.com, *.meituan.net, *.musical.ly, *.ofo.com, *.pstatp.com, *.snssdk.com, *.tiktokv.com, *.tv.sohu.com, *.ydstatic.com, 101.201.175.228, 119.18.193.135, 123.59.31.1, 154.8.131.171, 182.92.251.113, 4gimg.map.qq.com, a.apicloud.com, a.qiumibao.com, acs.m.taobao.com, act.vip.iqiyi.com, api*.futunn.com, api.21jingji.com, api.caijingmobile.com, api.chelaile.net.cn, api.daydaycook.com.cn, api.gotokeep.com, api.haohaozhu.cn, api.huomao.com, api.intsig.net, api.izuiyou.com, api.jr.mi.com, api.jxedt.com, api.kkmh.com, api.meipian.me, api.mgzf.com, api.psy-1.com, api.qbb6.com, api.smzdm.com, api.vistopia.com.cn, api.waitwaitpay.com, api.wallstreetcn.com, api.xiachufang.com, api.xueqiu.com, api.yangkeduo.com, api.zhuishushenqi.com, api-mifit*.huami.com, api-release.wuta-cam.com, app.58.com, app.api.ke.com, app.mixcapp.com, app.poizon.com, app.variflight.com, app.wy.guahao.com, app.xinpianchang.com, app.yinxiang.com, app.zhuanzhuan.com, appapi.huazhu.com, app-api.smzdm.com, appconf.mail.163.com, appv6.55haitao.com, b.zhuishushenqi.com, business-cdn.shouji.sogou.com, c.m.163.com, cap.caocaokeji.cn, capi.mwee.cn, ccsp-egmas.sf-express.com, cdn.moji.com, cdnfile1.msstatic.com, channel.beitaichufang.com, client.mail.163.com, clientaccess.10086.cn, cms.daydaycook.com.cn, consumer.fcbox.com, creditcardapp.bankcomm.com, daoyu.sdo.com, dl.app.gtja.com, dsa-mfp.fengshows.cn, dxy.com, e.dangdang.com, easyreadfs.nosdn.127.net, g.cdn.pengpengla.com, gateway.shouqiev.com, guide-acs.m.taobao.com, gw.alicdn.com, gw.csdn.net, gw-passenger.01zhuanche.com, heic.alicdn.com, i.ys7.com, iapi.bishijie.com, iface.iqiyi.com, ih2.ireader.com, imeclient.openspeech.cn, img.jiemian.com, img01.10101111cdn.com, interface.music.163.com, ios.lantouzi.com, ios.wps.cn, jump2.bdimg.com, kaola-haitao.oss.kaolacdn.com, learn.chaoxing.com, list-app-m.i4.cn, m*.amap.com, m.ibuscloud.com, m.tuniu.com, m.yap.yahoo.com, mapi.mafengwo.cn, media.qyer.com, mlife.jf365.boc.cn, mob.mddcloud.com.cn, mobi.360doc.com, mrobot.pcauto.com.cn, mrobot.pconline.com.cn, ms.jr.jd.com, msspjh.emarbox.com, news.ssp.qq.com, newsso.map.qq.com, nnapp.cloudbae.cn, open.qyer.com, pan.baidu.com, pic*.chelaile.net, pic1cdn.cmbchina.com, pocketuni.net, portal-xunyou.qingcdn.com, promo.xueqiu.com, pss.txffp.com, render.alipay.com, res.xiaojukeji.com, resrelease.wuta-cam.com, restapi.iyunmai.com, richmanapi.jxedt.com, rtbapi.douyucdn.cn, s*.zdmimg.com, s.youtube.com, service.4gtv.tv, slapi.oray.net, smkmp.96225.com, snailsleep.net, ss0.bdstatic.com, ssl.kohsocialapp.qq.com, static.vuevideo.net, static1.keepcdn.com, status.boohee.com, support.you.163.com, thor.weidian.com, tieba.baidu.com, tiku.zhan.com, www.bodivis.com.cn, www.dandanzan.com, www.flyertea.com, www.hxeduonline.com, www.icourse163.org, www.iyingdi.cn, www.tieba.com, www.youtube.com, www.zybang.com, xyz.cnki.net, xyst.yuanfudao.com, youtubei.googleapis.com, yxyapi*.drcuiyutao.com, zhidao.baidu.com, api.douban.com, api.m.jd.com, trade-acs.m.taobao.com, ios.prod.ftl.netflix.com, api.weibo.cn, mapi.weibo.com, *.uve.weibo.com, weibointl.api.weibo.cn, mp.weixin.qq.com, -*.googlevideo.com, sp.kaola.com, r.inews.qq.com, api.rr.tv, www.zhihu.com, api.zhihu.com, link.zhihu.com, app.bilibili.com, api.bilibili.com, api.live.bilibili.com, *.xiaoxiaoimg.com, *.xiaoxiaoapps.com, *.xiaoxiaoappxs.com, *.xiaoxiao*.com, vsco.co, p.du.163.com, manga.bilibili.com, act.10010.com, m.client.10010.com, credits.bz.mgtv.com, *.video.qq.com, i.meituan.com, h5.ele.me, m.ctrip.com, vip.heytea.com
ca-passphrase = UNCLEWANG
ca-p12 = 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

[Script]
# > Speed up download app ios
// dnspod = script-path=https://raw.githubusercontent.com/langkhach270389/Scripting/master/Surge/dnspod.js,script-update-interval=0,type=dns
# > 京东历史比价 #yichahucha hostname=api.m.jd.com
京东历史比价 = type=http-response,pattern=^https?://api\.m\.jd\.com/client\.action\?functionId=(wareBusiness|serverConfig),requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/yichahucha/surge/master/jd_price.js,script-update-interval=0
# > 淘宝历史比价 #yichahucha  hostname=trade-acs.m.taobao.com
# ！！！不生效或失效的需要卸载 tb 重装，注意不开脚本进 tb 会失效
淘宝历史比价 = requires-body=1,script-path=https://raw.githubusercontent.com/yichahucha/surge/master/tb_price.js,type=http-request,pattern=^http://.+/amdc/mobileDispatch
淘宝历史比价 = requires-body=1,script-path=https://raw.githubusercontent.com/yichahucha/surge/master/tb_price.js,type=http-response,pattern=^https?://trade-acs\.m\.taobao\.com/gw/mtop\.taobao\.detail\.getdetail
# > 奈飞评分 #yichahucha hostname=ios.prod.ftl.netflix.com
奈飞评分 = script-path=https://raw.githubusercontent.com/yichahucha/surge/master/nf_rating.js,type=http-request,pattern=^https?://ios\.prod\.ftl\.netflix\.com/iosui/user/.+path=%5B%22videos%22%2C%\d+%22%2C%22summary%22%5D
奈飞评分 = requires-body=1,script-path=https://raw.githubusercontent.com/yichahucha/surge/master/nf_rating.js,type=http-response,pattern=^https?://ios\.prod\.ftl\.netflix\.com/iosui/user/.+path=%5B%22videos%22%2C%\d+%22%2C%22summary%22%5D
奈飞单集评分 = type=http-response,pattern=^https?://ios\.prod\.ftl\.netflix\.com/iosui/warmer/.+type=show-ath,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/yichahucha/surge/master/nf_rating_season.js
# > 微博去广告 #yichahucha  hostname=api.weibo.cn, mapi.weibo.com, *.uve.weibo.com
# 国际版 hostname=weibointl.api.weibo.cn
微博去广告开屏 = requires-body=1,script-path=https://raw.githubusercontent.com/yichahucha/surge/master/wb_launch.js,type=http-response,pattern=^https?://(sdk|wb)app\.uve\.weibo\.com(/interface/sdk/sdkad.php|/wbapplua/wbpullad.lua)
微博去广告 = type=http-response,requires-body=1,max-size=-1,pattern=^https?://m?api\.weibo\.c(n|om)/2/(statuses/(unread|extend|positives/get|(friends|video)(/|_)(mix)?timeline)|stories/(video_stream|home_list)|(groups|fangle)/timeline|profile/statuses|comments/build_comments|photo/recommend_list|service/picfeed|searchall|cardlist|page|!/photos/pic_recommend_status|video/tiny_stream_video_list),script-path=https://raw.githubusercontent.com/yichahucha/surge/master/wb_ad.js
# > 微信去广告公众号底部  #Choler  hostname=mp.weixin.qq.com
微信去广告公众号 = script-path=https://Choler.github.io/Surge/Script/WeChat.js,type=http-request,pattern=^https://mp\.weixin\.qq\.com/mp/getappmsgad
# > YouTube  #Choler hostname=-*.googlevideo.com
// YouTube.js = script-path=https://Choler.github.io/Surge/Script/YouTube.js,type=http-request,pattern=^https://[\s\S]*\.googlevideo\.com/.*&(oad|ctier)
# > 网易考拉去广告  #NobyDa hostnam=sp.kaola.com
wykaola.js = requires-body=1,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/File/wykaola.js,type=http-response,pattern=^https://sp\.kaola\.com/api/openad$
# > 腾讯新闻去广告  #NobyDa  hostname=r.inews.qq.com
腾讯新闻去广告 = requires-body=1,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/QQNews.js,type=http-response,pattern=^https://r\.inews\.qq.com\/get(QQNewsUnreadList|RecommendList)
# > 人人视频去广告  #Choler hostname=api.rr.tv
rrsp_video = type=http-response,requires-body=true,pattern=^https?:\/\/api\.rr\.tv\/watch\/v\d\/get_movie_info,script-path=https://Choler.github.io/Surge/Script/rrsp.js
rrsp_banner = type=http-response,requires-body=true,pattern=^https?:\/\/api\.rr\.tv\/v\dplus\/index\/channel$,script-path=https://Choler.github.io/Surge/Script/rrsp.js
# > 知乎去广告  #onewayticket255  hostname=www.zhihu.com, api.zhihu.com, link.zhihu.com
知乎去广告people = type=http-response,requires-body=1,max-size=0,pattern=https://api.zhihu.com/people/,script-path=https://raw.githubusercontent.com/onewayticket255/Surge-Script/master/surge%20zhihu%20people.js
知乎去广告feed = type=http-response,requires-body=1,max-size=0,pattern=https://api.zhihu.com/moments/recommend,script-path=https://raw.githubusercontent.com/onewayticket255/Surge-Script/master/surge%20zhihu%20feed.js
知乎去广告recommend = type=http-response,requires-body=1,max-size=0,pattern=https://api.zhihu.com/topstory/recommend,script-path=https://raw.githubusercontent.com/onewayticket255/Surge-Script/master/surge%20zhihu%20recommend.js
知乎去广告answer = type=http-response,requires-body=1,max-size=0,pattern=https://api.zhihu.com/v4/questions,script-path=https://raw.githubusercontent.com/onewayticket255/Surge-Script/master/surge%20zhihu%20answer.js
# > 哔哩哔哩 精简&去广告  #onewayticket255 hostname=app.bilibili.com, api.bilibili.com, api.live.bilibili.com,
哔哩哔哩开启1080P+ = type=http-response,pattern=https:\/\/ap(p|i)\.bilibili\.com\/((pgc\/player\/api\/playurl)|(x\/v2\/account\/myinfo\?)|(x\/v2\/account/mine\?)),requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/nzw9314/Surge/master/Script/BiliHD.js
哔哩哔哩收藏排行通知推送 = type=http-response,requires-body=1,max-size=0,pattern=https://app.bilibili.com/x/v2/space\?access_key,script-path=https://raw.githubusercontent.com/onewayticket255/Surge-Script/master/surge%20bilibili%20space.js
哔哩哔哩首页tab = type=http-response,requires-body=1,max-size=0,pattern=https://app.bilibili.com/x/resource/show/tab\?access_key,script-path=https://raw.githubusercontent.com/onewayticket255/Surge-Script/master/surge%20bilibili%20tab.js
哔哩哔哩feed = type=http-response,requires-body=1,max-size=0,pattern=https://app.bilibili.com/x/v2/feed/index\?access_key,script-path=https://raw.githubusercontent.com/onewayticket255/Surge-Script/master/surge%20bilibili%20feed.js
哔哩哔哩个人中心 = type=http-response,requires-body=1,max-size=0,pattern=https://app.bilibili.com/x/v2/account/mine\?access_key,script-path=https://raw.githubusercontent.com/onewayticket255/Surge-Script/master/surge%20bilibili%20account.js
哔哩哔哩view = type=http-response,requires-body=1,max-size=0,pattern=https://app.bilibili.com/x/v2/view\?access_key,script-path=https://raw.githubusercontent.com/onewayticket255/Surge-Script/master/surge%20bilibili%20view%20relate.js
哔哩哔哩reply = type=http-response,requires-body=1,max-size=0,pattern=https://api.bilibili.com/x/v2/reply/main\?access_key,script-path=https://raw.githubusercontent.com/onewayticket255/Surge-Script/master/surge%20bilibili%20reply.js
哔哩哔哩live = type=http-response,requires-body=1,max-size=0,pattern=https://api.live.bilibili.com/xlive/app-room/v1/index/getInfoByRoom\?access_key,script-path=https://raw.githubusercontent.com/onewayticket255/Surge-Script/master/surge%20bilibili%20live.js
# > 小小影视去广告 #Alex0510/Eric hostname=*.xiaoxiaoimg.com, *.xiaoxiaoapps.com, *.xiaoxiaoappxs.com, *.xiaoxiao*.com,
小小影视 = type=http-response,pattern=https:\/\/.*\/getGlobalData,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/Alex0510/Eric/master/surge/Script/xxysad.js,script-update-interval=0
# -------------------------------------------------------------------------
# 部分 VIP 相关。勿滥用
# -------------------------------------------------------------------------
# > VSCO滤镜VIP #NobyDa hostname=vsco.co
# ^https?:\/\/vsco\.co\/api\/subscriptions\/2.1\/user-subscriptions\/ url script-response-body https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/File/vsco.js
# > 网易蜗牛读书VIP (By yxiaocai and JO2EY) hostname=p.du.163.com
网易蜗牛读书VIP = requires-body=1,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/QuantumultX/File/wnyd.js,type=http-response,pattern=^https?:\/\/p\.du\.163\.com\/gain\/readtime\/info\.json
# > 小小影视Vip #Alex0510/Eric hostname=*.xiaoxiaoimg.com, *.xiaoxiaoapps.com, *.xiaoxiaoappxs.com, *.xiaoxiao*.com,
// 小小影视Vip = type=http-response,pattern=https:\/\/.*.xiaoxiao(img|apps|appxs).com\/(vod\/reqplay\/|ucp/index|getGlobalData),requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/Alex0510/surge/master/Script/xxys.js
# -------------------------------------------------------------------------
# 推送通知相关
# -------------------------------------------------------------------------
# 📌 注意 rsshub.app 需要代理访问，将下面的配置加到分流规则中：
# 1. QX（host, rsshub.app, proxy）2. Loon & Surge（domain, rsshub.app, proxy）
# 更新地址：https://raw.githubusercontent.com/Peng-YM/QuanX/master/Tasks/epic.js
每周Epic游戏限免提醒 = type=cron,cronexp=0 0 19 * * *,script-path=https://raw.githubusercontent.com/Peng-YM/QuanX/master/Tasks/epic.js,script-update-interval=0
# -------------------------------------------------------------------------
# 获取 Cookie & 签到相关
# -------------------------------------------------------------------------
# > 京东 Cookie 获取 #NobyDa hostname=api.m.jd.com
# 浏览器登录 https://bean.m.jd.com 点击签到并且出现签到日历
# 成功后，禁用 Cookie 脚本
// 京东签到Cookie = type=http-request,pattern=https:\/\/api\.m\.jd\.com\/client\.action.*functionId=signBean,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js
# > 京东签到 #NobyDa hostname=api.m.jd.com
// 京东签到 = type=cron,cronexp=0 0 17 * * *,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js,script-update-interval=0
// 京东签到 = type=cron,cronexp=0 0 18 * * *,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js,script-update-interval=0
# > 爱奇艺 Cookie #NobyDa hostname=*.iqiyi.com
# 打开爱奇艺App后(AppStore中国区)，点击"我的", 如通知成功获取cookie, 则可以使用此签到脚本. 获取Cookie后, 请将Cookie脚本禁用并移除主机名，以免产生不必要的MITM.
// 爱奇艺获取Cookie = type=http-request,pattern=https?:\/\/.*\.iqiyi\.com\/.*authcookie=,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/iQIYI-DailyBonus/iQIYI.js
# > 爱奇艺 #NobyDa
// 爱奇艺签到 = type=cron,cronexp=0 1 17 * * *,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/iQIYI-DailyBonus/iQIYI.js,script-update-interval=0
// 爱奇艺签到 = type=cron,cronexp=0 1 18 * * *,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/iQIYI-DailyBonus/iQIYI.js,script-update-interval=0
# > 美团签到Cookie #chavyleung hostname=i.meituan.com
// 美团签到Cookie = script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/meituan/meituan.cookie.js,requires-body=true,type=http-request,pattern=^https:\/\/i.meituan.com\/evolve\/signin\/signpost\/
# 打开 APP , 然后手动签到 1 次, 系统提示: 获取Cookie: 成功 (首页 > 红包签到)
# 把获取 Cookie 的脚本注释掉
// 美团签到 = type=cron,cronexp=0 2 17 * * *,script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/meituan/meituan.js,script-update-interval=0
// 美团签到 = type=cron,cronexp=0 2 18 * * *,script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/meituan/meituan.js,script-update-interval=0
# > 哔哩哔哩漫画Cookie #NobyDa hostname=manga.bilibili.com
# 打开软件，点击 我，通知提醒获取成功即可，不需要禁用，script 自我检查
// 哔哩哔哩漫画Cookie = type=http-request,pattern=https:\/\/manga\.bilibili\.com\/.*\.User\/GetWallet,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/Bilibili-DailyBonus/Manga.js
# > 哔哩哔哩漫画签到 #NobyDa hostname=manga.bilibili.com
// 哔哩哔哩漫画签到 = type=cron,cronexp=0 3 17 * * *,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/Bilibili-DailyBonus/Manga.js,script-update-interval=0
// 哔哩哔哩漫画签到 = type=cron,cronexp=0 3 18 * * *,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/Bilibili-DailyBonus/Manga.js,script-update-interval=0
# > 中国联通Cookie #chavyleung hostname=act.10010.com, m.client.10010.com
# 打开 APP , 进入签到页面, 系统提示: `获取刷新链接: 成功`,然后手动签到 1 次
# 首页>天天抽奖, 系统提示 `2` 次: `获取Cookie: 成功 (登录抽奖)` 和 `获取Cookie: 成功 (抽奖次数)`
// 10010.cookie.js = script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/10010/10010.cookie.js,type=http-request,pattern=^https:\/\/act.10010.com\/SigninApp\/signin\/querySigninActivity.htm
// 10010.cookie.js = script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/10010/10010.cookie.js,type=http-request,pattern=^https:\/\/act.10010.com\/SigninApp(.*?)\/signin\/daySign
// 10010.cookie.js = script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/10010/10010.cookie.js,type=http-request,pattern=^https:\/\/m.client.10010.com\/dailylottery\/static\/(textdl\/userLogin|active\/findActivityInfo)
# 中国联通签到 #chavyleung hostname=act.10010.com, m.client.10010.com
// 中国联通签到 = type=cron,cronexp=0 4 17 * * *,script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/10010/10010.js,script-update-interval=0
// 中国联通签到 = type=cron,cronexp=0 4 18 * * *,script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/10010/10010.js,script-update-interval=0
# > 芒果tvCookie #chavyleung hostname=credits.bz.mgtv.com
// 芒果tvCookie = script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/mgtv/mgtv.cookie.js,type=http-request,pattern=^https:\/\/credits.bz.mgtv.com\/user\/creditsTake
# 芒果tv签到 #chavyleung hostname=credits.bz.mgtv.com
# 打开 APP 然后手动签到 1 次
// 芒果tv签到 = type=cron,cronexp=0 5 17 * * *,script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/mgtv/mgtv.js,script-update-interval=0
// 芒果tv签到 = type=cron,cronexp=0 5 18 * * *,script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/mgtv/mgtv.js,script-update-interval=0
# > 微博超话签到 #toulanboy hostname=api.weibo.cn
# 1. 根据你当前的软件，配置好srcipt。 Tips:由于是远程文件，记得顺便更新文件。
# 2. 打开微博APP，”我的“， ”超话社区“， ”底部栏--我的“， ”关注“， 弹出通知，提示获取已关注超话链接成功。
# 3. 点进一个超话页面，手动签到一次。弹出通知，提示获取超话签到链接成功。 若之前所有已经签到，请关注一个新超话进行签到。
# 4. 回到quanx等软件，关掉获取cookie的 2 个rewrite。（loon是关掉获取cookie的脚本）
# 📌 配置第2个账号方法：只需在第1个账号获取cookie结束后。在微博app中切换到第2个号，进行相同的获取逻辑即可。
// 微博超话cookie获取 = type=http-request,pattern=^https:\/\/api\.weibo\.cn\/2\/(cardlist|page\/button),script-path=https://raw.githubusercontent.com/toulanboy/scripts/master/weibo/weibotalk.cookie.js,requires-body=false
// 微博超话签到 = type=cron,cronexp=0 6 17 * * *,script-path=https://raw.githubusercontent.com/toulanboy/scripts/master/weibo/weibotalk.js,wake-system=true,timeout=600
// 微博超话签到 = type=cron,cronexp=0 6 18 * * *,script-path=https://raw.githubusercontent.com/toulanboy/scripts/master/weibo/weibotalk.js,wake-system=true,timeout=600
# > 腾讯视频Cookie #chavyleung hostname=*.video.qq.com
# 手机浏览器访问: https://film.qq.com/，随便选 1 部电影观看，最后就可以把第 1 条脚本注释掉了
// 腾讯视频Cookie = script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/videoqq/videoqq.cookie.js,type=http-request,pattern=^https:\/\/access.video.qq.com\/user\/auth_refresh
# > 腾讯视频签到 #chavyleung hostname=*.video.qq.com
// 腾讯视频签到 = type=cron,cronexp=0 7 17 * * *,script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/videoqq/videoqq.js,script-update-interval=0
// 腾讯视频签到 = type=cron,cronexp=0 7 18 * * *,script-path=https://raw.githubusercontent.com/chavyleung/scripts/master/videoqq/videoqq.js,script-update-interval=0
# > 饿了么 (By @syzzzf) hostname=h5.ele.me
# 1.打开 APP, 访问下`我的`>`签到领红包`(左上角)（或者点击 福利中心 ）
# 成功获取 cookie 后关闭对应脚本
// 饿了么Cookiee = script-path=https://raw.githubusercontent.com/nzw9314/QuantumultX/master/Task/elemGetCookies.js,type=http-request,pattern=^https:\/\/h5\.ele\.me\/restapi\/eus\/v\d\/current_user$
// 饿了么-签到 = type=cron,cronexp=0 8 17 * * *,script-path=https://raw.githubusercontent.com/songyangzz/QuantumultX/master/elem/elemSign.js,script-update-interval=0
// 饿了么-签到 = type=cron,cronexp=0 8 18 * * *,script-path=https://raw.githubusercontent.com/songyangzz/QuantumultX/master/elem/elemSign.js,script-update-interval=0
# 2."饿了么" app(9.0.10) "我的 - 打卡领红包"自动签到 默认设定使用了上面的签到
# 到 cron 设定时间自动签到时，若弹出"饿了么 - 打卡领红包 - 打卡成功"即完成签到，其他提示或无提示请发送日志信息至 issue。
// 饿了么-打卡领红包 = type=cron,cronexp=0 9 17 * * *,script-path=https://raw.githubusercontent.com/zZPiglet/Task/master/elem/elemCheckIn.js
// 饿了么-打卡领红包 = type=cron,cronexp=0 9 18 * * *,script-path=https://raw.githubusercontent.com/zZPiglet/Task/master/elem/elemCheckIn.js
# > 携程旅行 (By @barrymchen) hostname=m.ctrip.com
# 携程app内获得。点击"我的",然后点击"我的积分",再点击下面的"签到.任务"即可
// 携程旅行Cookie = script-path=https://raw.githubusercontent.com/nzw9314/QuantumultX/master/Task/ctrip_cookie.js,type=http-request,pattern=https:\/\/m\.ctrip\.com\/restapi\/soa2\/14946\/json\/userBaseInfo
// 携程旅行签到 = type=cron,cronexp=0 10 17 * * *,script-path=https://raw.githubusercontent.com/nzw9314/QuantumultX/master/Task/ctrip.js,script-update-interval=0
// 携程旅行签到 = type=cron,cronexp=0 10 18 * * *,script-path=https://raw.githubusercontent.com/nzw9314/QuantumultX/master/Task/ctrip.js,script-update-interval=0
# > 喜茶小程序 (By @zZPiglet) hostname=vip.heytea.com
# 配置:进入"喜茶GO"小程序，点击"我的"，进入"任务中心"，若弹出"首次写入喜茶 Authorization 成功"即可正常食用，其他提示或无提示请发送日志信息至 issue。
# 到 cron 设定时间自动签到时，若弹出"喜茶 - 签到成功"即完成签到，其他提示或无提示请发送日志信息至 issue。
# 获取完 Authorization 后可不注释 rewrite / hostname，Authorization 更新时会弹窗。若因 MitM 导致该软件或小程序网络不稳定，可注释掉 hostname。
// 喜茶小程序Cookie = script-path=https://raw.githubusercontent.com/zZPiglet/Task/master/HEYTEA/HEYTEA.js,type=http-request,pattern=^https:\/\/vip\.heytea\.com\/api\/service-member\/vip\/task$
// 喜茶小程序签到 = type=cron,cronexp=0 11 17 * * *,script-path=https://raw.githubusercontent.com/zZPiglet/Task/master/HEYTEA/HEYTEA.js,wake-system=1
// 喜茶小程序签到 = type=cron,cronexp=0 11 18 * * *,script-path=https://raw.githubusercontent.com/zZPiglet/Task/master/HEYTEA/HEYTEA.js,wake-system=1
