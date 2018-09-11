/*
 Navicat Premium Data Transfer

 Source Server         : SURA_CN2
 Source Server Type    : MySQL
 Source Server Version : 50560
 Source Host           : 172.96.248.186:3306
 Source Schema         : sura

 Target Server Type    : MySQL
 Target Server Version : 50560
 File Encoding         : 65001

 Date: 11/09/2018 22:16:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article_table
-- ----------------------------
DROP TABLE IF EXISTS `article_table`;
CREATE TABLE `article_table`  (
  `article_id` int(11) NOT NULL AUTO_INCREMENT,
  `author` int(11) NOT NULL,
  `upload_time` datetime NOT NULL,
  `article_title` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `article_body` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`article_id`) USING BTREE,
  INDEX `author_fk`(`author`) USING BTREE,
  CONSTRAINT `article_table_ibfk_1` FOREIGN KEY (`author`) REFERENCES `user_table` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of article_table
-- ----------------------------
INSERT INTO `article_table` VALUES (3, 1, '2018-04-26 00:00:00', '关于BandwagonHost（搬瓦工）的购买和退款', '首先，在决定购买VPS之前要明白VPS是什么，有哪些用途。\r\n\r\n一、VPS的概念和用途\r\n\r\n一.1、VPS简述\r\n\r\n  虚拟专用服务器（英语：Virtual private server，缩写为 VPS），是将一台服务器分区成多个虚拟专享服务器的服务。实现VPS的技术分为容器技术和虚拟化技术 。在容器或虚拟机中，每个VPS都可分配独立公网IP地址、独立操作系统、实现不同VPS间磁盘空间、内存、CPU资源、进程和系统配置的隔离，为用户和应用程序模拟出”独占”使用计算资源的体验。VPS可以像独立服务器一样，重装操作系统，安装程序，单独重启服务器。VPS为用户提供了管理配置的自由，可用于企业虚拟化，也可以用于IDC资源租用。 IDC资源租用，由VPS提供商提供。不同VPS提供商所使用的硬件VPS软件的差异，及销售策略的不同，VPS的使用体验也有较大差异。尤其是VPS提供商超卖，导致实体服务器超负荷时，VPS性能将受到极大影响。相对来说，容器技术比虚拟机技术硬件使用效率更高，更易于超卖，所以一般来说容器VPS的价格都高于虚拟机VPS的价格。 这些VPS主机以最大化的效率共享硬件、软件许可证以及管理资源。每个VPS主机都可分配独立公网IP地址、独立操作系统、独立超大空间、独立内存、独立CPU资源、独立执行程序和独立系统配置等. VPS主机用户除了可以分配多个虚拟主机及无限企业邮箱外， 更具有独立主机功能, 可自行安装程序，单独重启主机。(以上摘自维基百科)\r\n\r\n  这样直接看起来可能会比较抽象，SURA现在对VPS的理解为：可以远程连接的，可以升级或降级配置的（部分厂商好像不能，不过应该很少见），能够长时间不间断开机的服务器。\r\n\r\n一.2、VPS的配置信息\r\n\r\n  正如同买家用电脑的时候要注重电脑配置一样，VPS在购买时也是需要注意配置的。\r\n\r\n    通常VPS的配置通常包含以下几个方面：\r\n\r\nCPU（中央处理器）\r\nRAM（通常说的运行内存，VPS的通常是ECC内存）\r\n流量（海外VPS厂商是按流量的多少来计费且带宽固定，而国内VPS厂商通常按照带宽来计费）\r\n硬盘（主要是硬盘大小和类型，SSD和HDD在速度上有天壤之别）\r\n一.3、VPS的用途\r\n\r\n  在了解VPS是什么和VPS的配置信息之后，就需要知道VPS有哪些用途。\r\n\r\n    SURA所知的VPS用途：\r\n\r\n海外的VPS可以搭建SS/SSR，魔法上网的不错选择，只是海外廉价VPS通常在国内的访问延迟在200-400毫秒之间，网速虽然快，但不适合用来打游戏，看个视频什么的还是很不错的。\r\nSURA最早掏腰包买VPS的初衷就是搭建SS来魔法上网，但搭建完SS或者SSR的时候，服务器资源实际上没有使用多少，让VPS闲着也确实有些浪费，于是摸索建站又是一种用途。\r\nVPS的用途实际上是由很多的，目前SURA只接触到了上述两种，\r\n二、VPS的选购\r\n\r\n二.1、VPS的选择\r\n\r\n  SURA是一名学生狗，在选购VPS的时候，注重的是VPS的稳定性，价格和VPS厂商的信誉。\r\n\r\n  首先，买VPS是为了使用，VPS如果稳定性差，天天宕机，那掏钱买回来的就是一大爷；其次，在VPS稳定性不差的基础上，SURA注重的是价格，至于原因嘛······/(ㄒoㄒ)/~~；最后，VPS厂商的信誉也很重要，毕竟谁也不想遇到刚买个VPS，然后厂商卷铺盖跑路了的事情吧(╯‵□′)╯︵┻━┻。\r\n\r\n  如上文所说，SURA购买VPS的初衷是搭建SS来魔法上网，因此国内的VPS厂商直接pass（PS：国内VPS厂商的服务器宽带是按带宽来计费的，跟大部分家用宽带计费方式一样，100+的一般是1m或者2m宽带······），而国外的VPS厂商主要有：Bandwagon、Linode 以及 Vultr（SURA才疏学浅，只知道这几个······）。\r\n\r\n  SURA没有办法（因囊中羞涩）去测试以上三个厂商的VPS质量，通常网上其他dalao的评价为：Bandwagon价钱便宜且速度更快方便使用，Linode价格高但更稳定、Vultr非常便宜但国内速度太慢了。\r\n\r\n  最终SURA选择了Bandwagon（搬瓦工）的VPS，让SURA做出决定的是Bandwagon支持支付宝付款，对，就是那个可以扫码支付的支付宝，就近一个月的运行状看来看，Bandwagon还是很不错的，没有出现宕机，安装锐速和SS之后，魔法上网的网络延迟在200-300毫秒之间，网速能跑满SURA家用的50m联通水管，整体表现还是令SURA很满意的。\r\n\r\n二.2、搬瓦工VPS的购买\r\n\r\n（1）、首先，进入搬瓦工购买页面\r\n\r\n\r\n\r\n（2）\r\n\r\n  在这里，SURA选择的当然是最便宜的这一款，其配置为：\r\n\r\n1.10G SSD硬盘\r\n2.512M内存\r\n3.流量500G(每月)，1Gigabit\r\n4.单核英特尔至强CPU\r\n  注意每套方案最下方的”order KVM”和”order OVZ”,其中的”KVM”和”OVZ”是指VPS使用的虚拟化技术，KVM比OVZ更稳定切能更换内核（能够更换内核这一点在之后安装锐速的时候尤为重要，SURA当年就因为年轻不懂事买了OVZ，最终锐速怎么都装不上，不得不退款重买），至于OVZ，由于搬瓦工基于OVZ的VPS提供IPV6地址，有特殊需求的话就购买OVZ。\r\n\r\n（3）、单击”order KVM”进入如下界面\r\n\r\n\r\n\r\n这个界面显示的是VPS的配置信息，拖到底\r\n\r\n（4）、\r\n\r\n\r\n\r\n（5）、\r\n\r\n\r\n\r\n目前SURA使用的优惠码是BWH1ZBPVK，可以优惠%6\r\n\r\n（6）、\r\n\r\n\r\n\r\n（7）、\r\n\r\n\r\n\r\n（8）、\r\n\r\n\r\n\r\n（9）、\r\n\r\n\r\n\r\n（10）、\r\n\r\n\r\n\r\n（11）、\r\n\r\n\r\n\r\n注意不要轻易泄露自己的服务器IP和端口（尤其对于想要建站的童鞋来说），至此，VPS的购买已经完成（合掌）。\r\n\r\n二、搬瓦工VPS的退款\r\n\r\n  在购买VPS之后，我们可能因为种种原因想要退货退款，搬瓦工VPS支持购买后30天内退款（而且退款速度很快，别问我怎么知道的，都是当年年轻不懂事）。\r\n\r\n（1）首先，进入搬瓦工首页，\r\n\r\n\r\n\r\n（2）\r\n\r\n\r\n\r\n（3）\r\n\r\n\r\n\r\n  这个界面全是英文，谷歌机翻为：\r\n\r\n此页允许您取消所有活动服务，并要求全额退款，前提是账户在30天前或更短时间内创建。这个帐户上创建：2017-06-26\r\n以下服务将被取消：\r\n主动服务：localhost.localdomain–67.218.154.224，创建：2017-07-06\r\n根据我们的服务条款，你可以要求我们取消所有上述VPS在您的帐户，并发出一次性退还所有款项贷记本帐户，但符合条件，在服务条款。\r\n一旦提交请求，我们将执行以下操作：\r\n我们将提供全额退款的所有款项从帐户开始时创建的帐户。\r\n帐户下的所有服务将立即终止。\r\n3.所有数据、快照和备份都将立即被不可逆地抹去。\r\n  在确认需要退货退款后，点击界面上红色按钮”Request cancellation of all services & full refund”,之后出现如下界面\r\n\r\n（4）\r\n\r\n\r\n\r\n（5）、\r\n\r\n\r\n\r\n  点击Submit之后便可关闭界面，退款一般会在几个小时内到账。\r\n\r\n  注意，一个账号只能退款一次，多次发起退款会被无视，毕竟第一次退款可以是买错了，第二次退款就是无理取闹了，以及退款是退回当前邮箱账号上所有的搬瓦工VPS，在账号上有多台VPS的情况下，申请退款会退掉所有购买时间不超过30天的VPS，不能指定其中一台退款（拥有多台VPS，需要指定其中一部分退款的童鞋，可以使用发送工单的方式，请客服帮忙退款，这里不再赘述）。\r\n\r\n  以上便是搬瓦工购买和退款流程，希望能对童鞋们有所帮助，SURA才疏学浅，如有纰漏，多多包涵。\r\n\r\n  PS：原创内容，转载请注明出处（https://www.sura907.com/index.php/2017/08/05/sura-first/）。');
INSERT INTO `article_table` VALUES (27, 3, '2018-05-28 00:00:00', 'ASURA标题测试ASURA标题测试ASURA标题测试', '文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息\r\n文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息\r\n\r\n文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息\r\n\r\n文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息\r\n\r\n\r\n文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息文本信息');
INSERT INTO `article_table` VALUES (35, 11, '2018-05-29 00:00:00', 'K8806标题测试K8806标题测试K8806标题测试', 'K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试\r\n\r\n\r\nK8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试\r\n\r\nK8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试\r\nK8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试\r\nK8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试\r\n\r\nK8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试K8806文本测试');
INSERT INTO `article_table` VALUES (38, 3, '2018-06-04 00:00:00', '测试测试测试测试测试测试测试测试测试测试', '测试文本测试文本测试文本测试文本测试文本测试文本\r\n测试文本测试文本测试文本测试文本测试文本测试文本\r\n测试文本测试文本测试文本测试文本测试文本测试文本\r\n测试文本测试文本测试文本测试文本测试文本测试文本\r\n测试文本测试文本测试文本测试文本测试文本测试文本\r\n\r\n测试文本测试文本测试文本测试文本测试文本测试文本\r\n\r\n测试文本测试文本测试文本测试文本测试文本测试文本\r\n测试文本测试文本测试文本测试文本测试文本测试文本\r\n测试文本测试文本测试文本测试文本测试文本测试文本\r\n测试文本测试文本测试文本测试文本测试文本测试文本\r\n\r\n测试文本测试文本测试文本测试文本测试文本测试文本\r\n\r\n测试文本测试文本测试文本测试文本测试文本测试文本\r\n\r\n测试文本测试文本测试文本测试文本测试文本测试文本');
INSERT INTO `article_table` VALUES (39, 2, '2018-06-11 00:00:00', '在搬瓦工VPS上一键部署ShadowsocksR（SSR）', '  好了，在上一篇博客中，SURA简单介绍了BandwagonHOST的购买和退款流程，正如在其中所说的，SURA购买VPS的初衷是搭建Shadowsocks/ShadowsocksR（以下简称SS/SSR）来魔法上网，在完成VPS的购买之后，要做的当然就是在VPS上部署SSR或者SS，本篇就简单写一下SSR的部署。\r\n\r\n  来介绍一下神奇的SS/SSR：\r\n\r\nshadowsocks是一种基于Socks5代理方式的网络数据加密传输包，并采用Apache许可证、GPL、MIT许可证等多种自由软件许可协议开放源代码。shadowsocks分为服务器端和客户端，在使用之前，需要先将服务器端部署到服务器上面，然后通过客户端连接并创建本地代理。目前包使用Python、C、C++、C#、Go语言等编程语言开发。\r\n在中国大陆，本工具也被广泛用于突破防火长城（GFW），以浏览被封锁、屏蔽或干扰的内容。2015年8月22日，Shadowsocks原作者Clowwindy称受到了中国政府的压力，宣布停止维护此计划（项目）并移除其个人页面所存储的源代码。因为移除之前就有大量的复制副本，所以事实上并未停止维护，而是转由其他贡献者们持续维护中。\r\n简单来说通过SS/SSR来连接自己的电脑和VPS，在访问网络时，将访问请求通过SS/SSR发送到VPS上，由VPS来向互联网发出上述访问请求，在VPS收到互联网的反馈之后，通过SS/SSR将反馈的信息发送到自己的电脑上。通过这种方式便可以突破GFW的封锁，访问Google，Facebook等网站，是不是很兴奋？但众所周知，互联网中鱼龙混杂，SURA也希望童鞋们能拥有基本的判断力，保护好自己。\r\n然后是SURA自制的一张网络拓补图：\r\n\r\n\r\n\r\n  如上图所示，可以看到VPS在网络访问流程中，扮演着类似于”跳板”的角色。\r\n\r\n  由于搬瓦工自带了SS和SSR，部署起来非常简单，当然，自带的SS和SSR使用起来是有一定的不便的（对于不需要创建多用户的童鞋来说没什么影响），SURA当前使用的SSR项目已被原作者删除（这就是传说中的绝版装备嘛），这里就不放上来了，对于刚入坑的童鞋来说，搬瓦工自带的SS和SSR已经够用了。\r\n  一、SSR在VPS端的部署\r\n\r\n  搬瓦工很良心的自带了SS和SSR的服务器端，只需要鼠标点点点就可以完成在VPS端的部署，流程奉上。\r\n1、首先进入BandwagonHOST的控制面板（首先需要确认自己VPS的操作系统是不是centos6）\r\n\r\n\r\n\r\n2、\r\n\r\n\r\n\r\n3、等待片刻即可更换完成操作系统，在此SURA只做演示，并未实际更换，开始部署SSR\r\n\r\n\r\n\r\n4、\r\n\r\n\r\n\r\n5、\r\n\r\n\r\n\r\n至此，SSR在VPS端的部署已经完成，接下来需要在本地下载SSR软件来连接VPS，以实现魔法上网。\r\n二、SSR在本地的安装\r\n\r\n  好了，接下来实在本地安装和配置SSR，实现本地和VPS的数据沟通，SURA现在在本地使用的SSR软件奉上（点击下载），接下来也会以这个软件为例。PS:压缩文件MD5为1173E451A629ECB5E35E8CA13DA8C45B，下载之后记得校验MD5。\r\n\r\n解压之后看到如下文件\r\n\r\n\r\n2、\r\n\r\n\r\n\r\n填写完信息之后点击”确定”\r\n\r\n3、\r\n\r\n在桌面右下角会看到一个小飞机的图标，右键，推荐使用如下设置\r\n\r\n\r\n\r\n4、\r\n\r\n\r\n\r\n至此，SSR的配置工作已经结束，可以访问Google（www.google.com）来测试是否配置成功。\r\n\r\n  三、结语\r\n\r\n  在本篇中，SURA只是列出了搬瓦工提供的SSR的部署方式（SS部署方式大同小异），目前SS/SSR均有多个版本，童鞋们也可以根据自身需求来选择安装其他版本，合掌(╯‵□′)╯︵┻━┻。\r\n\r\n  转载请注明本页链接（https://www.sura907.com/index.php/2017/08/05/sura-secound/）。');
INSERT INTO `article_table` VALUES (46, 2, '2018-09-07 11:07:03', '文章标题测试', 'hello, world');
INSERT INTO `article_table` VALUES (47, 2, '2018-09-07 12:52:52', 'hello,world', '你好，世界\n修改测试');
INSERT INTO `article_table` VALUES (50, 15, '2018-09-07 23:12:13', 'k907标题测试', 'k907文本测试\n文章修改测试');
INSERT INTO `article_table` VALUES (53, 11, '2018-09-09 22:25:59', 'markdown-test', '# node_blog\n\n一个使用node，基于express框架，使用ejs引擎的小型博客站程序\n\n## 零、更新日志\n\n### 2018-06-11\n修复了首页的作者与其他信息不匹配的问题\n\n### 2018-06-01\n增加了评论功能<br>\n数据库表结构也相应的改变\n\n## 一、路由列表\n![image](https://github.com/SURA907/node_blog/raw/master/v1.0/router_list.png)<br>\n## 二、文件目录\n![image](https://github.com/SURA907/node_blog/raw/master/v1.0/file_tree.png)<br>\n## 三、部署运行\n 切换到程序根目录');
INSERT INTO `article_table` VALUES (54, 2, '2018-09-09 23:05:55', 'SURA-markdown测试', '## 笔记\n- ### git init\n > 将当前目录初始化为git工作区</br>\n > 会在当前目录生成.git文件夹, 切勿修改此文件夹的内容\n\n- ### git add <文件名>\n > 将工作区文件修改添加至暂存区</br>\n > 可以连续执行多次add\n\n- ### git commit -m <本次提交的描述>\n > 将暂存区的所有内容保存至本地仓库\n\n- ### git status\n > 显示有变更的文件\n\n- ### git log\n > commit日志\n\n- ### git reflog\n > 版本变更日志\n\n- ### git remot add <仓库别名> <远程仓库地址>\n > 绑定远程仓库\n\n- ### git push <仓库> <分支>\n > 将本地仓库推送到远程仓库\n\n- ### git clone <远程仓库地址>\n > 将指定远程仓库克隆到本地');
INSERT INTO `article_table` VALUES (55, 2, '2018-09-11 02:23:56', 'GitHub文件-README', '* # node_blog\n > 一个使用node，选用express mysql ejs的简易博客站点程序\n---\n## 0. 概述\n > 几个月时间，SURA深刻认识到自己当前所学的不足</br>\n > 由于自己年轻不懂事，之前的版本存在许多早期设计上的缺陷，故弃用（弃用项目文件放入v1.0）\n---\n## 1. 新版本的主要变化\n > (1)、重新设计了前端界面，SURA希望借此获得更良好的交互体验</br>\n > (2)、对路由模块进行了进一步抽象，尽可能规范api的使用</br>\n > (3)、对数据库交互部分与主程序进行了一定程度的分离，同时将数据库配置部分从主程序抽离出来</br>\n > (4)、对权限检验部分就行了一定程度的封装，提高泛用性</br>\n > (5)、添加markdown解析支持，告别纯文本输入</br>\n > (6)、由于远程数据库位置经常变更，故不再提供私人远程数据库连接\n---\n## 2. 目录结构\n > ![image](https://github.com/SURA907/node_blog/raw/master/readme_img/v1.1/file_list.png)\n---\n## 3. 路由列表\n > ![image](https://github.com/SURA907/node_blog/raw/master/readme_img/v1.1/route_list.png)\n---\n## 4. 访问demo\n > SURA将简易博客站点部署在http://sura.wang</br>\n > 部署时间（更新：2018-09-11）</br>\n > 由于这是SURA的个人服务器，不保证长期部署此项目</br>\n > ##### - 测试用账号\n >> 序号 | 账号    |密码     |管理员\n >> :--: | :-----: | :-----: | :----:\n >> 1    | SURA    | asdf    | 是\n >> 2    | ASURA   | asura   | 否\n >> 3    | SURA907 | sura907 | 否\n > ##### 请勿在demo站点删除以上账号\n---\n## 5. 部署运行\n > (1)、将仓库下载或克隆到本地</br>\n > (2)、使用v1.1/sura.sql还原mysql表结构</br>\n > (3)、修改v1.1/config.js中的数据库配置</br>\n > (4)、切换到根目录：cd v1.1/</br>\n > (5)、下载依赖：npm install</br>\n > (6)、运行程序：node server.js</br>\n > (7)、打开浏览器，输入http://localhost:8080 查看运行结果</br>\n > (8)、端口监听可在server.js中修改\n---\n## 6. PS\n > 关于mysql的安装和配置不过多赘述</br>\n > 完工，合掌\n---');

-- ----------------------------
-- Table structure for comment_table
-- ----------------------------
DROP TABLE IF EXISTS `comment_table`;
CREATE TABLE `comment_table`  (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_user_id` int(11) NOT NULL,
  `comment_article_id` int(11) NOT NULL,
  `comment_body` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `upload_time` datetime NOT NULL,
  PRIMARY KEY (`comment_id`) USING BTREE,
  INDEX `fk_comment_user_id_TO_user_table_user_id`(`comment_user_id`) USING BTREE,
  INDEX `fk_comment_article_id_TO_article_table_article_id`(`comment_article_id`) USING BTREE,
  CONSTRAINT `fk_comment_article_id_TO_article_table_article_id` FOREIGN KEY (`comment_article_id`) REFERENCES `article_table` (`article_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comment_user_id_TO_user_table_user_id` FOREIGN KEY (`comment_user_id`) REFERENCES `user_table` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 65 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of comment_table
-- ----------------------------
INSERT INTO `comment_table` VALUES (2, 1, 3, '评论测试', '2018-05-31 00:00:00');
INSERT INTO `comment_table` VALUES (16, 3, 3, '评论测试评论测试评论测试', '2018-05-31 22:57:24');
INSERT INTO `comment_table` VALUES (19, 3, 38, '测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本', '2018-06-04 04:01:07');
INSERT INTO `comment_table` VALUES (21, 11, 39, '评论测试', '2018-06-11 07:29:47');
INSERT INTO `comment_table` VALUES (22, 11, 27, '评论测试', '2018-06-11 07:30:28');
INSERT INTO `comment_table` VALUES (23, 11, 35, '评论测试', '2018-06-11 07:30:41');
INSERT INTO `comment_table` VALUES (42, 11, 3, '评论测试', '2018-08-29 01:20:48');
INSERT INTO `comment_table` VALUES (43, 3, 3, '评论测试', '2018-08-29 01:23:44');
INSERT INTO `comment_table` VALUES (57, 2, 39, '评论测试', '2018-09-08 08:45:09');
INSERT INTO `comment_table` VALUES (58, 2, 50, '评论测试', '2018-09-08 08:45:34');
INSERT INTO `comment_table` VALUES (59, 11, 50, '评论测试', '2018-09-08 08:48:56');
INSERT INTO `comment_table` VALUES (61, 11, 47, '评论测试', '2018-09-08 08:59:20');
INSERT INTO `comment_table` VALUES (62, 11, 53, 'markdown测试', '2018-09-09 23:03:16');
INSERT INTO `comment_table` VALUES (63, 2, 54, '评论测试', '2018-09-10 05:26:28');
INSERT INTO `comment_table` VALUES (64, 11, 55, '评论测试', '2018-09-11 09:41:15');

-- ----------------------------
-- Table structure for user_table
-- ----------------------------
DROP TABLE IF EXISTS `user_table`;
CREATE TABLE `user_table`  (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `is_admin` set('NO','YES') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'NO',
  PRIMARY KEY (`user_id`, `username`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user_table
-- ----------------------------
INSERT INTO `user_table` VALUES (1, '牛世杰', '62127294ad444a250d7cb71439205cd0cbafe8fc0f4f5b933502c7846afb303e', 'NO');
INSERT INTO `user_table` VALUES (2, 'SURA', '2e6d9ba9a3390b741a5ec69432740126f05af8b94202e4953a260e3f47f79f4e', 'YES');
INSERT INTO `user_table` VALUES (3, 'ASURA', '30493b6461fe50fc18a1d9df56b527e0dd92340442d297102ea8ea9019535404', 'NO');
INSERT INTO `user_table` VALUES (7, 'K8806', 'dd9089399a409c8bc584f35022af818af0b95451f80e9ab2c4424d1d1d44d304', 'NO');
INSERT INTO `user_table` VALUES (11, 'sura907@hotmail.com', '36ee4f2235fa4cee4dcc2bb1fd356745099d2bfbf03650ce00d522dd9d5f5e9a', 'NO');
INSERT INTO `user_table` VALUES (15, 'K907', '9d8e5f2c9026d239e79ff7986b08c27bbfeea8a28084c548640b8f9de7ff382e', 'NO');

SET FOREIGN_KEY_CHECKS = 1;
