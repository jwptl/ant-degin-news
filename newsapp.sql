# Host: localhost  (Version: 5.7.26)
# Date: 2021-03-18 16:32:43
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "newsclass"
#

DROP TABLE IF EXISTS `newsclass`;
CREATE TABLE `newsclass` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_class_name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `create_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `news_content` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

#
# Data for table "newsclass"
#

/*!40000 ALTER TABLE `newsclass` DISABLE KEYS */;
INSERT INTO `newsclass` VALUES (5,'热点','1616049756653','10','热点列表','lzyrt600'),(6,'体育新闻','1616049769503','10','体育新闻列表','lzyrt600'),(7,'吃瓜新闻','1616049802535','10','娱乐圈新闻','lzyrt600');
/*!40000 ALTER TABLE `newsclass` ENABLE KEYS */;

#
# Structure for table "newslist"
#

DROP TABLE IF EXISTS `newslist`;
CREATE TABLE `newslist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `new_title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `new_author` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `new_content` text CHARACTER SET utf8 NOT NULL,
  `create_time` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(1) NOT NULL,
  `user_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `news_class_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT '1',
  `news_class_name` varchar(255) CHARACTER SET utf8 DEFAULT '体育',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "newslist"
#

/*!40000 ALTER TABLE `newslist` DISABLE KEYS */;
INSERT INTO `newslist` VALUES (19,'伴财商学院：财商教育第一步，树立正确的理财观念','lzyrt600','1','<p>近日，#拥有多少资产才算财务自由# 的话题在微博引起广泛讨论，冲上热搜。对于“财务自由”，很多网友有不同的看法。有人觉得：“财务自由说到底是在不工作的前提下，收入大于等于支出”。也有人认为：“有房有车生活稳定，工资有月余，这样基本就可以想干嘛干嘛了”。还有网友表示：“在北上广深最起码要5个亿才能做到财务自由”……</p><p><img alt=\"\" src=\"http://drdbsz.oss-cn-shenzhen.aliyuncs.com/2103111815081505212521.jpg\"/></p><p>“财务自由”究竟是普通人的美好幻想，还是真有切实可行的路径，一直以来争论不休。前段时间，某知名互联网公司创始人曾公开表达过自己的看法，在他看来，对大部分人来说，工资永远只能解决糊口问题，解决不了买房买车的问题，要想实现“财务自由”，唯一的办法是参与创业，通过股权致富。此话一出，又引得网上争议四起。支持者认为，在通货膨胀和房价面前，依赖工资致富确实十分困难。而反对者表示，并不是每个人都有机会和能力参与创业并享受到股权，比起涨工资，创业还同时面临着更大的失败风险，因此这条路显然不适合大多数普通人。</p><p>在财商教育服务平台伴财商学院看来，相比较而言，理财反而是更切实可行、适合大部分普通人积累财富的渠道。伴财商学院认为，理财是人生的一场长期“修行”，考验的不仅是智慧更是心态，比起不切实际地仰望“财务自由”的高山，保持理性、不断学习才能让我们走在理财正确的道路上，从而收获内心的“踏实感”，这也正是伴财商学院的教育目标所在。</p><p>要打破理财小白对“财务自由”的迷信，首要任务是帮助理财新人建立基础知识体系。伴财商学院的老师们从投资理财的底层逻辑入手，通过一对一教学，化繁为简，用通俗易懂的语言讲解各种专业的术语概念，让理财小白更好<a href=\"http://www.zjjzx.cn/news/\" target=\"_blank\">的</a>理解投资理财市场的基本方法，从而审视并纠正自己的财富观念，懂得用知识和理性思考支撑起投资理财的担子。</p><p>摆正观念是第一步<a href=\"https://hea.china.com/article/20210311/032021_728380.html\">，</a>为学员们提供后续更加优质的财商教育课程是助力财商提升的关键。伴财商学院的创始团队和课研团队由来自金融、教育、互联网等多元背景的成员组成，在财富管理、教育咨询等领域有着多年的丰富经验，对投资者的实战困惑能够做到精准“把脉”，从而提供更具针对性的学习解决方案。据悉，伴财商学院授课内容涵盖基金、股票、保险等各领域。贴心的一对一教学服务和专业的授课内容，让伴财商学院不仅收获了学员一致好评，更收获了来自权威媒体、机构的多项荣誉称号。</p><p>巴菲特曾说：“投资必须是理性的。如果你不能理解它，就不要做。”这份理性来自每个人对投资理财扎实的理论和实战经验的积累。伴财商学院将继续保持高质量的教学课程，用一对一教学等更加优质的财商教育服务，赋能更多投资者财富管理能力的提高。</p>','2018-12-12',2,'10','7','吃瓜新闻'),(22,'谁偷走了青年人的睡眠？59.5%受访青年23点后入睡','lzyrt600','0','<p>3月21日是世界睡眠日。“如何能好好睡个觉”是困扰不少年轻人的问题，入睡难、多梦易醒等都是年轻人中常见的睡眠问题。</p><p>上周，中国青年报社社会调查中心联合问卷网，对2002名18-35岁青年进行的一项调查显示，59.5%的受访青年夜里习惯了晚睡，入睡时间都在23点以后。梦多、睡眠浅、夜间易醒或凌晨早醒是年轻人中常见的睡眠问题。</p><p>59.5%受访青年入睡时间在23点以后</p><p>今年29岁的胡博（化名）在北京一家私企任职，他介绍，自己很少在凌晨以前入睡，“每天下班回到家就8点多了，有时还没吃饭，等收拾好，再看会儿电脑、手机，时间就不早了”。</p><p>自由职业者王晶（化名）一直被睡眠问题困扰。她感觉每天睡上9个小时都不够，“每晚都在11点前入睡，早上8点起来仍然很费劲。如果是休息日，我能一直睡到上午10点钟”。</p><p>我国公布的《健康中国行动（2019-2030年）》中，“提倡成人每日平均睡眠时间为7～8小时”。睡眠时间过多过少都对身体产生影响。本次调查显示，42.7%的受访青年夜间睡眠时长为7-8小时，40.9%的受访青年为6-7小时，8.5%的受访青年达到了8小时以上，夜间睡眠时长小于6小时的有7.9%。</p><p>根据医学建议，人们在23点前入睡对身体健康有益。调查显示，59.5%的受访青年夜里习惯了晚睡，入睡时间都在23点以后。具体来看，能在22点以前入睡的受访青年仅占5.2%，22点至23点入睡的占35.3%，23点至凌晨入睡的占42.4%，凌晨至凌晨1点的占14.0%，凌晨1点以后的占3.0%。</p><p>已经工作3年的刘澄娟（化名），从高中起就有睡前复盘的习惯，想想一天里学习了什么、有哪些知识点要掌握，“上班以后，每天睡前会总结一天的收获、有哪些该避免的失误等，但工作的这些事儿越想越睡不着，经常躺床上一小时了还很清醒”。</p><p>“我特别羡慕那些头碰到枕头就能睡着的人。”胡博感慨，虽然他睡得晚，但仍不能很快入睡，常常还要过半小时的时间。</p><p>本次调查显示，11.1%的受访青年入睡时长超过了30分钟。</p><p>年轻人中梦多、睡浅、夜间易醒等睡眠问题常见</p><p>王晶说，她夜晚常常能醒两三次，梦也非常多，“感觉都能上演几部大戏了”，这导致她每天早晨起床非常困难，闹钟响过了眼睛仍然睁不开，“得冷水洗脸才能让我更快清醒一点”。</p><p>与王晶正相反，胡博表示，当别人还在熟睡时，他已经非常清醒了，“每天早上5点多就醒了，之后就再难入睡。尤其冬天，早上5点钟天还黑着，眼看着天儿越来越亮，有时会有一点焦虑”。</p><p>“我睡眠特别浅，稍微有些声响动静就会立刻醒来。加上现在租的房子隔音效果差，夜里醒来是常有的事。”刘澄娟说，她找室友都会先问问对方的作息习惯，“通常得等对方休息了我才安心睡下”。</p><p>数据显示，42.2%的受访青年感觉自己睡眠质量好，其中5.4%认为非常好。41.1%的受访青年感到一般，16.6%直言睡眠质量差。</p><p>在大家面临的睡眠问题上，梦多（46.0%）、睡眠浅（45.4%）最普遍，其他还有：夜间易醒或凌晨早醒（33.1%），入睡难（27.6%），难以完全放松（25.3%），睡眠时间短（18.2%）。</p><p>一个高素质人才应该做到把工作和睡觉的时间安排妥当</p><p>胡博感慨，晚上睡得晚、早上醒得早，这导致他一到上午办公时间，就开始犯困，提不起精神，有时还影响情绪，“晚睡早醒，工作效率低，就会形成恶性循环”。</p><p>王晶说，睡眠差很容易让她打乱原本的计划，“有时夜里睡不好，第二天的效率就会非常低。为了提高效率，我宁愿早上晚起补会儿觉，但第二天的事项安排，有部分也只能推迟”。</p><p>睡眠质量差带来哪些影响？59.2%的受访青年坦言易感到疲劳困倦，49.2%的受访青年做事效率降低，注意力难集中，41.9%的受访青年存在头晕、内分泌紊乱等身体问题。其他还有：情绪不稳定，易烦躁、焦虑等（41.0%），眼袋、脸色暗沉等皮肤问题（34.9%），记忆力减退（27.3%），脱发加重（22.9%）。</p><p>河北省人民医院营养科主任张晓伟表示，睡眠质量比较差，带来的健康问题主要有两个方面。第一是身体上的。会造成机体免疫功能的下降，容易得感冒或支气管炎、肺炎，和一些肠道炎症性疾病，还容易导致一些癌症的高发。第二，是精神上的。比如情绪上容易激惹、易怒、烦躁。</p><p>“我在不同的场合反复说过，现在最大的炫富不是挣了多少钱、买了多少车，而是有个好身体。”对于未来年轻人睡眠问题能否得到改善，张晓伟很有信心。“党的十九大提出‘实施健康中国战略’，足见国家已经非常重视。而作为自己健康的第一责任人，我相信大家一旦树立起责任意识，随着健康知识的不断普及，年轻人熬夜、睡眠差的问题会有很大改善”。</p><p>针对年轻人自身，张晓伟建议，第一就是多接受健康教育，树立一个健康的责任意识。第二是要科学、合理地安排日常工作，做到饮食有节、劳作有序、起居有常。“最后一点，提高综合能力。工作是你的能力，睡觉同样也是能力。能把工作和睡觉的时间安排得妥当，这是一个高素质人才应该做到的。一个成功的人，更多的应该是获得一个高品质的生活，其中就包括高质量的睡眠”。</p>','2018-12-12',2,'10','6','体育新闻'),(23,'国际油价17日下跌','lzyrt600','1','<p>华社纽约3月17日电（记者刘亚南）国际油价17日下跌。</p><p>截至当天收盘，纽约商品交易所4月交货的轻质原油期货价格下跌0.20美元，收于每桶64.60美元，跌幅为0.31%；5月交货的伦敦布伦特原油期货价格下跌0.39美元，收于每桶68美元，跌幅为0.57%。</p><p>美国能源信息局17日公布的数据显示，上周美国商业原油库存为5.008亿桶，环比增加240万桶。</p>','2018-12-12',0,'10','5','热点'),(24,'123','lzyrt600','1','<p>123</p>','2018-12-12',0,'10','1','体育');
/*!40000 ALTER TABLE `newslist` ENABLE KEYS */;

#
# Structure for table "userinfo"
#

DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_pic` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_desc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `create_itme` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "userinfo"
#

/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;
INSERT INTO `userinfo` VALUES (10,'lzyrt600','https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4255886855,218583982&fm=111&gp=0.jpg','','1615429804392','15755037307');
/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;

#
# Structure for table "users"
#

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `create_time` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `status` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

#
# Data for table "users"
#

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (10,'lzyrt600','123','15755037307','1615429804392','1'),(11,'123','123','123','1615533253757','0'),(12,'zhanli','123','15255148075','1615533277712','0');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
