// DOM元素
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const backToTop = document.getElementById('back-to-top');
const storyForm = document.getElementById('story-form');
const generateBtn = document.getElementById('generate-btn');
const loading = document.getElementById('loading');
const result = document.getElementById('result');
const resultTitle = document.getElementById('result-title');
const storyContent = document.getElementById('story-content');
const copyBtn = document.getElementById('copy-btn');
const downloadBtn = document.getElementById('download-btn');
const shareBtn = document.getElementById('share-btn');
const navLinks = document.querySelectorAll('nav a');
const mobileNavLinks = document.querySelectorAll('#mobile-menu a');

// 移动端菜单切换
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// 关闭移动端菜单（当点击链接时）
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// 平滑滚动 - 只对锚点链接生效
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        const targetId = link.getAttribute('href');
        // 检查是否是锚点链接（以 # 开头）
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
        // 对于非锚点链接（如 us.html），允许默认跳转行为
    });
});

// 返回顶部按钮
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.remove('opacity-0', 'invisible');
        backToTop.classList.add('opacity-100', 'visible');
    } else {
        backToTop.classList.remove('opacity-100', 'visible');
        backToTop.classList.add('opacity-0', 'invisible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 故事生成模拟数据
const sampleStories = {
    fantasy: {
        title: '龙裔守护者',
        content: `<p>在瓦罗兰大陆的最北端，有一座被冰雪覆盖的山脉，名为"龙脊"。传说中，这里是古代龙族的栖息地，而如今，只剩下一座废弃的城堡，以及一个年轻的守护者——艾林。</p>

<p>艾林从小就被遗弃在城堡门口，由城堡的老管家抚养长大。老管家告诉她，她是"龙裔"，是龙族与人类的混血，肩负着守护这座城堡的使命。但艾林从未相信过这些话，她认为这只是老管家为了让她留在这个寒冷的地方而编造的谎言。</p>

<p>直到那一天，一个黑衣人闯入城堡，试图偷走传说中藏在城堡深处的"龙之心"。艾林与黑衣人展开激烈的搏斗，但她根本不是黑衣人的对手。就在黑衣人即将得手之际，艾林的身体突然发出一道金色的光芒，她的眼睛变成了金色，身后出现了一对巨大的龙翼。</p>

<p>"龙裔之力觉醒了。"老管家的声音在艾林的脑海中响起，"现在，你必须接受你的命运，守护龙之心，守护这片土地。"</p>

<p>艾林感到一股强大的力量涌遍全身，她发出一声龙吟，黑衣人被震飞出去。从此，艾林不再质疑自己的身份，她成为了真正的龙裔守护者，守护着龙脊山脉，守护着瓦罗兰大陆的和平。</p>`
    },
    'sci-fi': {
        title: '星际迷航：未知边界',
        content: `<p>公元2345年，人类已经征服了太阳系，并开始向银河系深处探索。"探索者号"是人类最先进的宇宙飞船之一，搭载了最新的量子引擎和人工智能系统"雅典娜"。</p>

<p>舰长艾丽西亚是一位经验丰富的宇航员，她曾参与过多次星际探索任务。这次，她的任务是带领船员们穿越"猎户座悬臂"，探索未知的星系。</p>

<p>在航行途中，"探索者号"发现了一个神秘的虫洞。根据传感器的数据，这个虫洞通往一个未知的星系。艾丽西亚决定带领船员们穿越虫洞，一探究竟。</p>

<p>穿过虫洞后，船员们被眼前的景象惊呆了。他们来到了一个美丽的星系，这里有七颗行星，其中一颗行星上竟然有生命迹象。艾丽西亚决定派遣登陆艇前往这颗行星进行探索。</p>

<p>登陆艇降落在行星表面后，船员们发现了一个高度发达的文明。这个文明的科技水平远远超过了人类，但他们却非常友好。他们告诉船员们，这个星系是"和平之域"，是宇宙中所有爱好和平的文明的避难所。</p>

<p>艾丽西亚和船员们在这个星系停留了一个月，学习了很多先进的科技和文化。当他们返回地球时，他们带来了一个重要的消息：宇宙中并不只有人类，还有许多友好的文明等待着我们去发现。</p>`
    },
    romance: {
        title: '雨季的相遇',
        content: `<p>那是一个下雨的傍晚，林小雨撑着一把碎花伞，走进了常去的那家咖啡馆。咖啡馆里很安静，只有几个人在悠闲地喝咖啡。林小雨找了一个靠窗的位置坐下，点了一杯热拿铁。</p>

<p>就在这时，一个穿着黑色风衣的男人走了进来。他的头发被雨水打湿，贴在额头上，显得有些狼狈。他四处张望了一下，发现只剩下林小雨对面的位置是空的，于是走了过去。</p>

<p>"请问，这里有人吗？"男人问道。</p>

<p>林小雨摇了摇头，男人便坐了下来。他点了一杯美式咖啡，然后从包里拿出一本素描本，开始画画。林小雨好奇地看了一眼，发现他画的是窗外的雨景，画得非常逼真。</p>

<p>"你画得真好。"林小雨忍不住说道。</p>

<p>男人抬起头，笑了笑："谢谢。我叫陈阳，是一名画家。"</p>

<p>"我叫林小雨，是一名编辑。"林小雨也笑了笑。</p>

<p>从那以后，林小雨和陈阳经常在咖啡馆相遇。他们一起喝咖啡，一起聊天，一起看雨。林小雨发现，陈阳不仅画画得好，而且很有才华，很幽默。而陈阳也发现，林小雨不仅漂亮，而且很善良，很温柔。</p>

<p>在雨季结束的那天，陈阳向林小雨表白了。林小雨答应了他。他们手牵着手，走出咖啡馆，发现外面的天空已经放晴，一道美丽的彩虹挂在天上。</p>`
    },
    mystery: {
        title: '古老庄园的秘密',
        content: `<p>位于英国乡村的"布莱克伍德庄园"是一座有着百年历史的古老建筑。庄园的主人是一位名叫爱德华·布莱克伍德的贵族，但他在十年前神秘失踪了。从那以后，庄园就被废弃了，没有人敢靠近。</p>

<p>直到有一天，一位名叫艾米丽的年轻记者来到了这里。她听说了庄园的传说，决定深入调查，写出一篇轰动的报道。</p>

<p>艾米丽走进庄园，发现里面布满了灰尘和蜘蛛网。她小心翼翼地走着，突然，她听到了一声奇怪的声音。她顺着声音的方向走去，发现了一扇隐藏在书架后面的门。</p>

<p>艾米丽推开了门，发现里面是一个地下室。地下室里有一张桌子，桌子上放着一本日记。艾米丽拿起日记，开始阅读。</p>

<p>日记的作者是爱德华·布莱克伍德。他在日记中写道，他发现了一个古老的秘密，这个秘密与庄园的建造者有关。他还写道，他正在被一股神秘的力量追杀，他必须离开庄园，否则会有生命危险。</p>

<p>艾米丽继续阅读，发现日记的最后一页写着一个地址。她决定按照这个地址去寻找线索。</p>

<p>艾米丽来到了地址所指向的地方，发现那是一座教堂。她走进教堂，找到了一位神父。神父告诉她，爱德华·布莱克伍德在十年前确实来过这里，他把一个箱子交给了神父，说如果有一天有人拿着他的日记来找他，就把这个箱子交给他。</p>

<p>艾米丽拿到了箱子，打开一看，发现里面是一封信和一张地图。信中说，庄园的地下隐藏着一个宝藏，这个宝藏是庄园的建造者留下的。地图上标着宝藏的位置。</p>

<p>艾米丽回到庄园，按照地图的指示，找到了宝藏。宝藏里有很多黄金和珠宝，还有一本古老的书籍。书籍里记载着庄园的历史和秘密。</p>

<p>艾米丽把这些发现写成了一篇报道，引起了轰动。她也因此成为了一名著名的记者。而布莱克伍德庄园的秘密，也终于被揭开了。</p>`
    },
    horror: {
        title: '午夜哭声',
        content: `<p>王小明是一名大学生，他租了一间位于郊区的老房子。房子很便宜，因为据说这里闹鬼。但王小明并不相信这些，他认为这只是房东为了降低房租而编造的谎言。</p>

<p>然而，在他搬进去的第一个晚上，他就听到了奇怪的声音。那是一个女人的哭声，从房子的阁楼里传来。哭声很凄凉，让人毛骨悚然。</p>

<p>王小明壮着胆子，拿着手电筒，走上了阁楼。阁楼里很暗，布满了灰尘和蜘蛛网。他四处照了照，没有发现任何人。但哭声却越来越清晰，仿佛就在他的耳边。</p>

<p>王小明感到一阵寒意，他转身想要离开，却发现阁楼的门不知何时已经关上了。他试图打开门，但门却纹丝不动。就在这时，他看到了一个白色的身影，从他的眼前飘过。</p>

<p>"你是谁？"王小明颤抖着问道。</p>

<p>白色身影停了下来，缓缓地转过身。王小明看到了一张苍白的脸，眼睛里流着血。</p>

<p>"我是这所房子的前主人，"女人的声音很沙哑，"我被我的丈夫杀害了，他把我的尸体藏在了阁楼的地板下。请你帮我报警，让他受到应有的惩罚。"</p>

<p>王小明吓得魂飞魄散，他拼命地撞门，终于把门撞开了。他跌跌撞撞地跑下楼，拿出手机，拨打了报警电话。</p>

<p>警察赶到后，在阁楼的地板下发现了一具女性的尸体。经过调查，证实这具尸体就是房子的前主人，她的丈夫是一名通缉犯，已经潜逃多年。</p>

<p>现在，王小明已经搬出了那所房子。但他永远也忘不了那个晚上的经历，以及那个女人的哭声。</p>`
    },
    adventure: {
        title: '丛林历险记',
        content: `<p>李阳是一名探险家，他最喜欢的事情就是去世界各地的丛林中探险。这一次，他的目的地是亚马逊雨林。</p>

<p>亚马逊雨林是世界上最大的雨林，里面充满了危险和未知。李阳带着他的探险队，深入雨林，想要寻找传说中的"黄金城"。</p>

<p>在雨林中，他们遇到了很多危险。他们被毒蛇袭击，被蚊子叮咬，被暴雨淋湿。但他们并没有放弃，继续前进。</p>

<p>一天，他们来到了一条河边。河边有一个古老的码头，码头上停着一艘破旧的船。李阳决定乘坐这艘船，继续前进。</p>

<p>船行驶了几天几夜，终于到达了一个神秘的地方。这里有一座古老的城市，城市的墙壁上镶嵌着黄金。李阳和他的队员们都惊呆了，他们终于找到了传说中的"黄金城"。</p>

<p>然而，他们的喜悦并没有持续多久。他们发现，这座城市里有很多陷阱和机关。有几个队员不小心触发了陷阱，差点丢了性命。</p>

<p>李阳意识到，这座城市并不像他们想象的那么简单。他们必须小心谨慎，否则会有生命危险。</p>

<p>在城市的中心，他们发现了一座巨大的金字塔。金字塔的顶部有一个黄金制成的雕像。李阳走上前去，想要触摸雕像，却被一股神秘的力量弹开了。</p>

<p>就在这时，地面开始震动，金字塔的墙壁上出现了一道门。李阳和他的队员们走了进去，发现里面有一个巨大的宝藏室。宝藏室里有很多黄金和珠宝，还有一些古老的文物。</p>

<p>李阳和他的队员们带着这些宝藏，离开了黄金城。他们的这次探险，成为了探险史上的一个传奇。</p>`
    },
    historical: {
        title: '大唐遗梦',
        content: `<p>武则天是中国历史上唯一的女皇帝。她的一生充满了传奇和争议。有人说她是一个英明的皇帝，有人说她是一个狠毒的女人。但无论如何，她都是中国历史上一位不可忽视的人物。</p>

<p>这一天，武则天做了一个奇怪的梦。她梦到自己回到了年轻的时候，成为了唐太宗的才人。她在宫中的生活并不如意，经常受到其他妃子的欺负。但她并没有气馁，而是努力学习，提高自己的能力。</p>

<p>在梦中，武则天看到了自己的一生。她看到了自己如何从一个小小的才人，一步步爬上皇后的位置；她看到了自己如何废掉自己的儿子，登上皇帝的宝座；她看到了自己如何治理国家，使唐朝走向繁荣。</p>

<p>武则天惊醒过来，她发现自己的脸上挂满了泪水。她意识到，自己的一生虽然辉煌，但也充满了孤独和痛苦。她为了权力，失去了很多东西，包括亲情和友情。</p>

<p>第二天，武则天颁布了一道诏书，宣布将皇位传给自己的儿子李显。她决定退位，去过一种平静的生活。</p>

<p>在退位的那天，武则天站在宫殿的屋顶上，望着远处的山脉。她想起了自己的一生，想起了那些陪伴过她的人。她的嘴角露出了一丝微笑，然后转身走进了宫殿。</p>

<p>从此，武则天过上了平静的生活。她不再关心权力和地位，只关心自己的内心。她终于找到了真正的幸福。</p>`
    }
};

// 表单提交处理
storyForm.addEventListener('submit', e => {
    e.preventDefault();

    // 获取表单数据
    const title = document.getElementById('title').value || '未知标题';
    const type = document.getElementById('genre').value;
    const background = document.getElementById('setting').value;
    const roles = document.getElementById('characters').value;
    const summary = document.getElementById('plot').value;
    const style = document.getElementById('style').value;
    const length = document.getElementById('length').value;

    // 转换故事长度为字数
    let words;
    if (length === 'short') {
        words = 500;
    } else if (length === 'medium') {
        words = 1500;
    } else {
        words = 3000;
    }

    // 根据表单数据构建配置
    const config = {
        title: title,
        type: type,
        background: background,
        roles: roles,
        chapters: 1,  // 固定生成3章
        summary: summary,
        style: style,
        words: words
    };
    console.log(config)
    // 显示加载状态
    loading.classList.remove('hidden');
    result.classList.add('hidden');

    // 发送请求到后端API，添加超时处理
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error('请求超时，请稍后重试'));
        }, 120000); // 设置60秒超时
    });

    Promise.race([
        fetch('http://127.0.0.1:5000/generate-novel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(config)
        }),
        timeoutPromise
    ])
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP错误! 状态码: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // 隐藏加载状态
        loading.classList.add('hidden');
        console.log(data);
        if (data.success) {
            // 显示结果
            resultTitle.textContent = data.title;
            // 将小说内容转换为HTML格式（添加段落）
            const formattedContent = data.content.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
            storyContent.innerHTML = formattedContent;
            result.classList.remove('hidden');

            // 滚动到结果区域
            result.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            alert('生成小说失败: ' + data.error);
        }
    })
    .catch(error => {
        // 隐藏加载状态
        loading.classList.add('hidden');
        console.error('请求错误:', error);
        alert('请求失败: ' + error.message);
    });
});

// 复制故事
copyBtn.addEventListener('click', () => {
    const text = storyContent.textContent;
    navigator.clipboard.writeText(text).then(() => {
        // 显示复制成功提示
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa fa-check"></i>';
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    });
});

// 下载故事
downloadBtn.addEventListener('click', () => {
    const title = resultTitle.textContent;
    const content = storyContent.innerHTML;
    const blob = new Blob(['<!DOCTYPE html><html><head><meta charset="UTF-8"><title>', title, '</title></head><body>', content, '</body></html>'], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// 分享故事
shareBtn.addEventListener('click', () => {
    alert('分享功能即将上线，敬请期待！');
});

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('py-2', 'shadow-md');
        nav.classList.remove('py-3', 'shadow-sm');
    } else {
        nav.classList.add('py-3', 'shadow-sm');
        nav.classList.remove('py-2', 'shadow-md');
    }
});

// 初始化页面
window.addEventListener('DOMContentLoaded', () => {
    // 隐藏加载和结果区域
    loading.classList.add('hidden');
    result.classList.add('hidden');
    backToTop.classList.add('opacity-0', 'invisible');
});