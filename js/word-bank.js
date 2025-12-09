// 主题分类系统
const THEME_CATEGORIES = {
    daily: {
        name: '生活场景',
        icon: '🏠',
        themes: {
            '超市': { titles: ['《走进超市》', '《快乐购物》', '《超市大探索》', '《购物小达人》', '《超市寻宝记》'], icon: '🛒' },
            '家庭': { titles: ['《我的家》', '《温馨的家》', '《家人的爱》', '《家的小帮手》', '《幸福一家人》'], icon: '🏡' },
            '学校': { titles: ['《美丽的校园》', '《上学路上》', '《课堂时光》', '《学习真快乐》', '《校园生活》'], icon: '🏫' },
            '公园': { titles: ['《公园一角》', '《春天的公园》', '《快乐的公园》', '《公园游玩记》', '《美丽的大自然》'], icon: '🌳' }
        }
    },
    social: {
        name: '社会场所',
        icon: '🏢',
        themes: {
            '医院': { titles: ['《快乐医院》', '《医生阿姨》', '《看病不怕》', '《健康小卫士》', '《医院见闻》'], icon: '🏥' },
            '消防站': { titles: ['《英勇的消防员》', '《消防安全》', '《消防车来了》', '《防火小知识》', '《消防英雄》'], icon: '🚒' },
            '警察局': { titles: ['《警察叔叔》', '《平安守护》', '《交通警察》', '《警察抓小偷》', '《为人民服务》'], icon: '👮' },
            '图书馆': { titles: ['《知识的海洋》', '《安静的图书馆》', '《读书真快乐》', '《书的世界》', '《阅读好习惯》'], icon: '📚' }
        }
    },
    nature: {
        name: '自然动物',
        icon: '🌿',
        themes: {
            '动物园': { titles: ['《动物朋友》', '《动物园游记》', '《可爱的动物》', '《动物之家》', '《探秘动物园》'], icon: '🦁' },
            '农场': { titles: ['《美丽的农场》', '《农场的一天》', '《丰收的喜悦》', '《农场小帮手》', '《乡村生活》'], icon: '🚜' },
            '海洋': { titles: ['《海底世界》', '《海洋生物》', '《奇妙的海底》', '《海洋探秘》', '《保护海洋》'], icon: '🐠' },
            '森林': { titles: ['《森林探险》', '《森林里的家》', '《保护森林》', '《森林动物》', '《大自然的奥秘》'], icon: '🌲' }
        }
    },
    transport: {
        name: '交通工具',
        icon: '🚗',
        themes: {
            '汽车': { titles: ['《汽车总动员》', '《马路上的车》', '《交通安全》', '《各种各样的汽车》', '《小小司机》'], icon: '🚙' },
            '火车': { titles: ['《火车之旅》', '《火车飞驰》', '《坐火车去旅行》', '《火车轰隆隆》', '《铁路沿线》'], icon: '🚂' },
            '飞机': { titles: ['《蓝天飞翔》', '《飞机场》', '《坐飞机》', '《飞向天空》', '《空中旅行》'], icon: '✈️' },
            '轮船': { titles: ['《海上航行》', '《大轮船》', '《港口风光》', '《乘风破浪》', '《水上交通》'], icon: '🚢' }
        }
    },
    culture: {
        name: '节日文化',
        icon: '🎉',
        themes: {
            '春节': { titles: ['《过新年》', '《春节快乐》', '《红红火火过大年》', '《新年新气象》', '《春节习俗》'], icon: '🧧' },
            '中秋节': { titles: ['《月亮圆圆》', '《中秋赏月》', '《团圆的节日》', '《月饼香甜》', '《月光下的故事》'], icon: '🥮' },
            '端午节': { titles: ['《粽叶飘香》', '《赛龙舟》', '《端午节》', '《屈原的故事》', '《端午习俗》'], icon: '🚣' },
            '国庆节': { titles: ['《我爱祖国》', '《国庆快乐》', '《五星红旗》', '《祖国在我心中》', '《欢庆国庆》'], icon: '🇨🇳' }
        }
    }
};

// 词汇库系统
const WORD_BANK = {
    // 超市相关词汇（18个）
    '超市': {
        core: ['shōu yín yuán 收银员', 'huò jià 货架', 'tuī chē 推车', 'shòu huò yuán 售货员', 'jùn chē 购物车'],
        items: ['píng guǒ 苹果', 'niú nǎi 牛奶', 'miàn bāo 面包', 'yá gāo 牙膏', 'guǒ zhī 果汁', 'qiāo kè lì 巧克力', 'shuǐ guǒ 水果', 'shū cài 蔬菜'],
        env: ['chū kǒu 出口', 'rù kǒu 入口', 'dēng 灯', 'zhāo pái 招牌', 'jià gé qiā 价格卡']
    },

    // 医院相关词汇（18个）
    '医院': {
        core: ['yī shēng 医生', 'hù shi 护士', 'bìng chuáng 病床', 'bìng rén 病人', 'yī yuàn 医院'],
        items: ['yào xiè 药箱', 'zhēn tou 针头', 'tǐ wēn jì 体温计', 'tīng zhěn qì 听诊器', 'yào wù 药物', 'miàn zhēn 面罩', 'shǒu tào 手套', 'xiāo dú yè 消毒液'],
        env: ['guà hào chù 挂号处', 'děng dài qū 等待区', 'jǐ zhěn shì 急诊室', 'yào fang 药房', 'zhěn suǒ 诊所']
    },

    // 学校相关词汇（18个）
    '学校': {
        core: ['lǎo shī 老师', 'tóng xué 同学', 'jiào shì 教室', 'hēi bǎn 黑板', 'zhuō yǐ 桌椅'],
        items: ['shū bāo 书包', 'qiān bǐ 铅笔', 'zuò yè běn 作业本', 'wén jù hé 文具盒', 'shū 书', 'bǐ 笔', 'xiàng pí 橡皮', 'chǐ dào 尺子'],
        env: ['cāo chǎng 操场', 'tú shū guǎn 图书馆', 'shí táng 食堂', 'xiào mén 校门', 'jiào xué lóu 教学楼']
    },

    // 公园相关词汇（18个）
    '公园': {
        core: ['huā duǒ 花朵', 'shù mù 树木', 'cháng yǐ 长椅', 'huà tíng 画廊', 'xiǎo qiáo 小桥'],
        items: ['huā tán 花坛', 'qiū qiān 秋千', 'huá tǐ 滑梯', 'yǎo yáo chuán 摇摇船', 'diào chuán 吊船', 'niǔ niǔ chē 扭扭车', 'tī zi 梯子', 'pá pá gǒn 爬爬杆'],
        env: ['cǎo píng 草坪', 'xiǎo lù 小路', 'shí zǐ lù 石子路', 'shuǐ chí 水池', 'gōng gòng cè suǒ 公共厕所']
    },

    // 家庭相关词汇（18个）
    '家庭': {
        core: ['bà ba 爸爸', 'mā ma 妈妈', 'hái zi 孩子', 'yé ye 爷爷', 'nǎi nai 奶奶'],
        items: ['shā fā 沙发', 'diàn shì 电视', 'zhuō zi 桌子', 'yǐ zi 椅子', 'chuáng 床', 'yī guì 衣柜', 'bēi zi 杯子', 'wǎn 碗'],
        env: ['kè tīng 客厅', 'wò shì 卧室', 'chú fáng 厨房', 'wèi shēng jiān 卫生间', 'yáng tái 阳台']
    },

    // 消防站相关词汇（18个）
    '消防站': {
        core: ['xiāo fáng yuán 消防员', 'xiāo fáng chē 消防车', 'xiāo fáng shuǐ guǎn 消防水管', 'yān wù yǎn zhào 烟雾罩', 'duì 长 队长'],
        items: ['miè huǒ qì 灭火器', 'xiāo fáng fǔ 消防斧', 'jiù shēng suǒ 救生索', 'yáng qí 氧气瓶', 'tí shì dēng 提示灯', 'jǐng dí 警笛', 'wú xiàn diàn 对讲机', 'shǒu tào 手套'],
        env: ['xiāo fáng zhàn 消防站', 'chē kù 车库', 'xún liàn chǎng 训练场', 'jǐng bāo qì 警报器', 'xún huán shuǐ 循环水']
    },

    // 警察局相关词汇（18个）
    '警察局': {
        core: ['jǐng chá 警察', 'jǐng chá jú 警察局', 'jǐng chē 警车', 'jǐng guān 警官', 'zhí qín zhan 值勤站'],
        items: ['jǐng gào 警告', 'jǐng huán 警棍', 'shǒu kào 手铐', 'jǐng dí 警笛', 'duì jiǎng 对讲机', 'zhi wu zhi 制服', 'jiao tong zhi shi 交通指示', 'an jian 案件'],
        env: ['bàn gōng shì 办公室', 'jū liú shì 拘留室', 'shěn wèn shì 审问室', 'jiē fáng 接访', 'tíng chē chǎng 停车场']
    },

    // 图书馆相关词汇（18个）
    '图书馆': {
        core: ['tú shū guǎn 图书馆', 'guǎn lǐ yuán 管理员', 'dú zhě 读者', 'shū jià 书架', 'yuè lǎn shì 阅览室'],
        items: ['shū 书', 'bào zhī 报纸', 'zá zhì 杂志', 'jiè shū zhèng 借书证', 'suǒ míng kǎ 索命卡', 'diàn nǎo 电脑', 'yìn shuā jī 印刷机', 'fù yìn jī 复印机'],
        env: ['dà tíng 大厅', 'ér tóng qū 儿童区', 'xī xiū qū 休息区', 'xún wèn chá 询问处', 'cè suǒ 厕所']
    },

    // 动物园相关词汇（18个）
    '动物园': {
        core: ['dòng wù 动物', 'dòng wù yuán 动物园', 'sì yǎng yuán 饲养员', 'lǎo hǔ 老虎', 'dà xiàng 大象'],
        items: ['hóu zi 猴子', 'xīng xīng 猩猩', 'cháng jǐng lù 长颈鹿', 'xióng māo 熊猫', 'shī zi 狮子', 'kǒng què 孔雀', 'tuó niǎo 鸵鸟', 'hǎi bào 海豹'],
        env: ['lóng zi 笼子', 'chi táng 池塘', 'cǎo píng 草坪', 'xiǎo lù 小路', 'biāo zhí pái 标识牌', 'xiū xi tíng 休息亭']
    },

    // 农场相关词汇（18个）
    '农场': {
        core: ['nóng chǎng 农场', 'nóng mín 农民', 'nóng cháng 农场', 'zhòng tián 种田', 'shōu gē 收割'],
        items: ['niú 牛', 'yáng 羊', 'zhū 猪', 'jī 鸡', 'yā 鸭', 'gǒu 狗', 'māo 猫', 'tù zi 兔子'],
        env: ['tián dì 田地', 'cài yuán 菜园', 'guǒ yuán 果园', 'liáng cāng 粮仓', 'jī shè 鸡舍', 'zhū juàn 猪圈', 'fáng zi 房子']
    },

    // 海洋相关词汇（18个）
    '海洋': {
        core: ['hǎi yáng 海洋', 'hǎi shuǐ 海水', 'hǎi tǎn 海滩', 'làng huā 浪花', 'jiāo shí 礁石'],
        items: ['yú 鱼', 'xiā 虾', 'xiè 蟹', 'hǎi xīng 海星', 'hǎi shè 海参', 'hǎi kuí 海葵', 'hǎi tún 海豚', 'jīng yú 鲸鱼'],
        env': ['hǎi dǐ 海底', 'shān hú jiāo 珊瑚礁', 'hǎi zé 沼泽', 'hǎi gǎu 海沟', 'dǎo 屿', 'dēng tǎ 灯塔']
    },

    // 森林相关词汇（18个）
    '森林': {
        core: ['sēn lín 森林', 'shù mù 树木', 'guàn mù qù 灌木区', 'cǎo dì 草地', 'xiǎo xī 小溪'],
        items: ['niǎo 鸟', 'sōng shǔ 松鼠', 'tù zi 兔子', 'lù 鹿', 'hóu zi 猴子', 'yě zhū 野猪', 'máo chóng 毛虫', 'hú dié 蝴蝶'],
        env: ['shān lù 山路', 'mù wū 木屋', 'lù yíng 露营', 'kǎo huǒ duì 篝火堆', 'shān dòng 山洞', 'pù bù 瀑布']
    },

    // 汽车相关词汇（18个）
    '汽车': {
        core: ['qì chē 汽车', 'jià shǐ yuán 驾驶员', 'chē pái 车牌', 'lún tāi 轮胎', 'fā dòng jī 发动机'],
        items: ['sā chē 刹车', 'yóu mén 油门', 'líng hé dāo 离合器', 'fāng xiàng pán 方向盘', 'zuò yǐ 座椅', 'ān quán dài 安全带', 'hòu shì jìng 后视镜', 'chē chuāng 车窗'],
        env: ['gōng lù 公路', 'mǎ lù 马路', 'jiāo tōng zhì xù 交通秩序', 'hóng lǜ dēng 红绿灯', 'jiāo tōng biāo zhì 交通标志', 'tíng chē chǎng 停车场']
    },

    // 火车相关词汇（18个）
    '火车': {
        core: ['huǒ chē 火车', 'huǒ chē zhàn 火车站', 'sī jī 司机', 'liè chē 列车', 'guǐ dào 轨道'],
        items: ['chē xiāng 车厢', 'zuò wèi 座位', 'wò pù 卧铺', 'cān chē 餐车', 'xíng lǐ jià 行李架', 'chuāng hu 窗户', 'mén 门', 'liè chē yuán 列车员'],
        env': ['zhàn tái 站台', 'hòu chē shì 候车室', 'shòu piào chù 售票处', 'xíng lǐ tuō xíng yùn 行李托运', 'diàn zǐ xiǎn shì pái 电子显示牌', 'chū rù kǒu 出入口']
    },

    // 飞机相关词汇（18个）
    '飞机': {
        core: ['fēi jī 飞机', 'fēi jī chǎng 飞机场', 'jià shǐ yuán 驾驶员', 'chéng kè 乘客', 'kōng zhōng 空中'],
        items: ['jī yì 机翼', 'jī shēn 机身', 'fā dòng jī 发动机', 'luò xià 架', 'tān dāng 梯子', 'ān quán dài 安全带', 'jiù shēng yī 救生衣', 'yǎng qì miàn zhào 氧气面罩'],
        env: ['pǎo dào 跑道', 'háng kōng kòng zhì tái 航空控制台', 'hòu jī shì 候机室', 'xíng lǐ chuán sòng dài 行李传送带', 'děng jī mén 登机门', 'zhí bān xiá 志愿者']
    },

    // 轮船相关词汇（18个）
    '轮船': {
        core: ['lún chuán 轮船', 'chuán 船', 'chuán zhǎng 船长', 'hǎi yuán 海员', 'hǎi shuǐ 海水'],
        items: ['wěi 尾', 'cāng tīng 船舱', 'jiǎ bǎn 甲板', 'luó xuán jiǎng 螺旋桨', 'wěi 碇', 'fān 帆', 'duò 舵', 'cāng mén 舱门'],
        env: ['gǎng kǒu 港口', 'mǎ tóu 码头', 'hǎi àn 海岸', 'dēng tǎ 灯塔', 'háng dào 航道', 'fēng làng 风浪']
    },

    // 春节相关词汇（18个）
    '春节': {
        core: ['chūn jié 春节', 'nián nián 年年', 'chūn tiān 春天', 'jiā jiā 家家', 'huān lè 欢乐'],
        items: ['chūn lián 春联', 'nián huà 年画', 'bào zhú 爆竹', 'yān huā 烟花', 'hóng bāo 红包', 'táng guǒ 糖果', 'jiǎo zi 饺子', 'nián gāo 年糕'],
        env: ['jiā 家', 'mén 门', 'chuāng 窗', 'dēng 灯', 'zhōng guā 中国', 'chuán tǒng 传统', 'qìng zhù 庆祝', 'tuán yuán 团圆']
    },

    // 中秋节相关词汇（18个）
    '中秋节': {
        core: ['zhōng qiū jié 中秋节', 'yuè liang 月亮', 'yuán yuán 圆圆', 'tuán yuán 团圆', 'jiā rén 家人'],
        items: ['yuè bǐng 月饼', 'guì huā 桂花', 'guì huā jiǔ 桂花酒', 'shuǐ guǒ 水果', 'táng guǒ 糖果', 'lā dēng 笼灯', là zhú 蜡烛', 'xiāng cháng 香肠'],
        env: ['yuàn zi 院子', 'yáng tái 阳台', 'cǎo píng 草坪', 'gōng yuán 公园', 'yè wǎn 夜晚', 'xīng xīng 星星', 'tiān kōng 天空', 'qì fēn 气氛']
    },

    // 端午节相关词汇（18个）
    '端午节': {
        core: ['duān wǔ jié 端午节', 'lóng zhōu 龙舟', 'sài lóng zhōu 赛龙舟', 'zòng zi 粽子', 'qū yuán 屈原'],
        items: ['zhòng yāng 中阳', 'wǔ wǔ 午午', 'cǎo yào 草药', 'xiāng náng 香囊', 'xiòng jiǔ 雄黄酒', 'wǔ zǐ 粽子', 'dòu zi 豆子', 'mǐ 米'],
        env: ['jiāng hé 江河', 'hé àn 河岸', 'chuán 船', 'gǔ 鼓', 'qí 旗', 'guǎn zhòng 观众', 'shuǐ biān 水边', 'chuán tǒng 传统']
    },

    // 国庆节相关词汇（18个）
    '国庆节': {
        core: ['guó qìng jié 国庆节', 'zǔ guó 祖国', 'wǔ xīng hóng qí 五星红旗', 'tiān ān mén 天安门', 'zhōng yāng 中央'],
        items: ['huā duǒ 花朵', 'qí qi 旗旗', 'yān huā 烟花', 'dēng long 灯笼', 'luò gǔ 锣鼓', 'juǎn liǎn 卷帘', 'biāo yǔ 标语', 'huā huán 花环'],
        env: ['tiān chǎng 天场', 'jiē dào 街道', 'guǎng chǎng 广场', 'lóu fáng 楼房', 'diàn tǐng 电汀', 'xīn wén 新闻', 'rén mín 人民', 'guó jiā 国家']
    }
};

// 获取主题图标
function getThemeIcon(theme) {
    for (let category in THEME_CATEGORIES) {
        if (THEME_CATEGORIES[category].themes[theme]) {
            return THEME_CATEGORIES[category].themes[theme].icon;
        }
    }
    return '📚'; // 默认图标
}

// 获取主题标题列表
function getThemeTitles(theme) {
    for (let category in THEME_CATEGORIES) {
        if (THEME_CATEGORIES[category].themes[theme]) {
            return THEME_CATEGORIES[category].themes[theme].titles;
        }
    }
    return [];
}

// 检查主题是否存在
function isThemeExist(theme) {
    return WORD_BANK.hasOwnProperty(theme);
}

// 确保函数在全局作用域可用
window.getThemeTitles = getThemeTitles;
window.getThemeIcon = getThemeIcon;
window.isThemeExist = isThemeExist;
window.THEME_CATEGORIES = THEME_CATEGORIES;
window.WORD_BANK = WORD_BANK;