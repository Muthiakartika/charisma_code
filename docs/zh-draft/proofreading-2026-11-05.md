# Laporan proofreading draf Mandarin

**Tanggal:** 5 Nov 2026
**Total perubahan:** 352 di 27 file halaman dan `shared.md`

## Ringkasan

Setelah draf selesai, lima pemeriksa terpisah membaca ulang semua file. Mereka bukan penerjemah aslinya, dan mereka membaca teks Inggris dan Mandarin berdampingan, kalimat demi kalimat. Setiap kesalahan yang jelas langsung diperbaiki di file, dan setiap perubahan dicatat di tabel di bawah. Setelah itu saya cek ulang semuanya: struktur ke-27 halaman tetap sama dengan brief Inggris, tidak ada huruf Tradisional, dan tanda baca konsisten. Teks hasil proofread juga sudah dimasukkan lagi ke CMS lokal (`npm run import:zh`).

**Jenis perbaikan yang paling banyak:**
- **Tata bahasa.** Contohnya "我们会回复您档期" yang salah susunan (sekarang "我们会回复您，告知档期…"), 介于 tanpa 之间, kata penggolong yang salah (一支音响 → 一套, 一堂工作坊 → 一场), dan "可以由你们策划又主持" → "既策划又主持".
- **Salah arti.** "彼此信任的团队" (saling percaya) seharusnya "由他信任的团队" (tim yang dia percaya). "主宾和贵宾都按正确的顺序致意" seharusnya "向主宾和贵宾致意". "做回自己" seharusnya "保持本色".
- **Klaim yang berlebihan diturunkan.** Contohnya "semua ulasan" menjadi "sering", dan 完美收尾 menjadi 精彩收尾.
- **Kalimat kaku atau terasa terjemahan.** Kalimatnya ditulis ulang supaya wajar bagi pembaca Singapura, tanpa mengubah isinya.
- **Istilah.** Diseragamkan sesuai glosarium, misalnya 礼宾程序, 串词, dan nama paket 司仪兼现场歌手.

**Batasannya:** pemeriksa ini tetap AI, bukan penutur asli manusia. Kesalahan yang jelas sudah dibereskan. Tapi pilihan gaya untuk seluruh situs dan istilah lokal tetap perlu diputuskan De Zhong.

## Yang perlu diputuskan De Zhong

Ini pilihan gaya yang sengaja **tidak** diubah pemeriksa. Kalau diubah, harus diubah di semua halaman sekaligus:

1. **H1 Corporate Emcee: 包您玩得尽兴.** Versi Inggrisnya menjanjikan "guarantees the fun". Pertahankan janji ringan ini, atau hapus?
2. **常年晚宴 vs 年终晚宴.** Selain itu, 公司晚宴 sekarang dipakai untuk D&D dan juga untuk "makan malam perusahaan" secara umum, jadi kadang ambigu.
3. **Istilah sekolah:** 颁奖日 / 颁奖礼, atau 常年颁奖典礼?
4. **一个联系窗口** (one point of contact) terasa gaya Tiongkok/Taiwan. Usulan: 单一联络人.
5. **领导** (介绍领导和嘉宾) terasa gaya Tiongkok. Usulan: 领导层 atau 贵宾.
6. **获取报价** (get a quote). Situs Singapura lebih sering memakai **索取报价**.
7. **周边活动** untuk "fringe activities". Mungkin vendor lebih kenal 余兴活动 atau 趣味摊位.
8. **Sapaan WhatsApp otomatis 您好德忠，…** Lebih wajar ditulis **德忠您好，…**
9. **线上线下混合** (hybrid) jadi panjang di judul. Pilihan lain: 混合式.
10. **Label kategori "Campaigns": 品牌活动 atau 营销活动?**
11. **Ucapan 捞鱼生** di halaman Chinese New Year. Keenam ucapan sudah benar, tapi apakah itu yang biasa De Zhong ucapkan, dan perlu pinyin atau tidak?
12. **Nama Mandarin resmi** untuk SAFRA *The Ultimate Talent*, UFM100.3 *The Wedding Singer*, dan Caregiving Welfare Association, kalau ada.

## Detail per pemeriksa

### Pemeriksa A: home, corporate-team-building, corporate-workshops, communication-coaching, kids-youth-programs (+ 2 file tambahan) (67 perubahan)

Checker: `npx tsx scripts/check-zh-draft.ts` prints ✓ for all seven files. A separate scan found no spacing, half-width punctuation, dash or Traditional-character problems in the visible text. The only hits were the English `Note (译注)` lines, which were left alone. 的/地/得 usage was checked and is correct throughout.

Changes: home 10 · corporate-team-building 20 · corporate-workshops 10 · communication-coaching 11 · future-communication-coaching-additions 1 · kids-youth-programs 15 · future-kids-youth-programs-additions 0. **Total 67.**

| File | Before | After | Why |
|---|---|---|---|
| home | 有趣，更有目的的团队建设。 | 既有趣又有目的的团队建设。 | grammar: comma inside attributive phrase; 更 implies comparison |
| home | 设计并引导整个活动，并以德忠在新加坡各大舞台上的同样活力来主持 | 设计并引导整个活动，主持时也带着德忠在新加坡各大舞台上展现的同样活力 | word order (的同样); repeated 并 |
| home | 这场活动之后，什么应该有所改变，或值得庆祝？ | 您希望这场活动带来什么改变，或庆祝什么？ | translationese |
| home | 根据您的人数、场地和时间安排，设计……时间分配 | 根据您的人数、场地和日程，设计……时间分配 | repetitive (时间 twice) |
| home | 由引导师、主持人、表演者和活动伙伴组成、彼此信任的团队 | 由他信任的引导师、主持人、表演者和活动伙伴组成的团队 | mistranslation: 'partners he trusts', not 'mutual trust' |
| home | 预订场地和供应商、当天主持 | 预订场地和供应商、在活动当天主持 | missing word |
| home | 您也可以只预订其中任何一项服务 | 您也可以单独预订其中任何一项服务 | unnatural (只…任何) |
| home | 同一场活动，可以由你们策划又主持吗？ | 同一场活动，你们可以既策划又主持吗？ | grammar: 又 needs 既 |
| home | 越早越好，尤其是 11 月至 3 月， | 越早越好，尤其是在 11 月至 3 月举办的活动， | mistranslation: 'for' events in Nov to Mar |
| home | 我们会回复您活动构思和方案 | 我们会为您提出活动构思和方案 | grammar: 回复 cannot take this double object |
| corporate-team-building | 希望从活动中得到的成果 | 希望从中获得的成果 | repetitive (活动 twice) |
| corporate-team-building | 让每个人都能参与，无论职位或语言 | 让每个人不分职位、不论语言，都能参与其中 | English word order |
| corporate-team-building | 活动奖励聆听、清楚的指示和及时确认 | 活动会奖励用心聆听、清楚下达指示和及时确认的表现 | literal 'reward'; wrong collocation |
| corporate-team-building | 气氛轻松，而因为每个人都刚亲身经历过，收获也更容易记住 | 我们让气氛保持轻松，而且每个人都刚亲身经历过，收获自然更容易记住 | broken connector 而因为 |
| corporate-team-building | 的团队，因为在这些团队里，小误会 | 的团队；在这类团队里，小误会 | stiff 'because' clause |
| corporate-team-building | 名字都对上了面孔 | 大家已经能把名字和面孔对上号 | literal; idiom is 对上号 |
| corporate-team-building | 这可以安排在新员工入职日 | 我们可以把活动安排在新员工入职日 | stiff, vague subject |
| corporate-team-building | 团队离开时感到被看见，而不只是被娱乐 | 团队离开时会感到自己受到重视，而不只是被娱乐了一场 | translationese / mainland slang 被看见 |
| corporate-team-building | 这正是让全场感觉像一个团队的原因 | 也正因如此，全场才真正凝聚成一个团队 | translationese |
| corporate-team-building | 与本地家庭，一同参与了同一个节目 | 与本地家庭欢聚一堂，参与同一个节目 | repetitive (同…同) |
| corporate-team-building | 在团队面前担任角色 | 在团队面前担当特定角色 | incomplete phrase |
| corporate-team-building | 而没有会议室里的压力 | 又不必承受会议室里的压力 | unnatural |
| corporate-team-building | 刚换上新领导的团队 | 刚迎来新领导的团队 | unnatural |
| corporate-team-building | 让新技能由大家一起练习 | 让大家一起练习新技能 | awkward passive |
| corporate-team-building | 让每项活动都人人能参与 | 确保每项活动人人都能参与 | grammar |
| corporate-team-building | 通过合作伙伴网络推荐选择 | 通过合作伙伴网络为您推荐合适的选择 | stiff, incomplete |
| corporate-team-building | 一场活动多长？ | 一场活动要多长时间？ | too colloquial for H3 |
| corporate-team-building | 档期很快就会排满。……我们会为您确认档期。 | 日期很快就会被订满。……我们会为您确认档期。 | repetitive (档期 twice) |
| corporate-team-building | 我们会回复您档期和下一步安排 | 我们会回复您，告知档期和下一步安排 | grammar: 回复 double object |
| corporate-team-building | 给您的团队一个津津乐道的日子 | 给您的团队一个让大家津津乐道的日子 | 津津乐道 needs someone doing the talking |
| corporate-workshops | 让新技能在同一个星期就能用在工作上 | 让新技能当周就能用在工作上 | literal 'the same week' |
| corporate-workshops | 一场让员工记得的工作坊 | 一场让员工难忘的工作坊 | unnatural |
| corporate-workshops | 让参与者从中看到自己的工作 | 让参与者从中看到自己工作的影子 | literal 'recognise their own work' |
| corporate-workshops | 凭借多年的舞台与课堂经验，课程注重实用 | 他们拥有多年的舞台与课堂经验，课程因此注重实用 | dangling modifier (a course has no experience) |
| corporate-workshops | 汇报技巧来自一位以主持现场活动为职业的人 | 汇报技巧由一位以主持现场活动为业的司仪亲自传授 | stiff |
| corporate-workshops | 工作坊多长？ | 工作坊要多长时间？ | too colloquial for H3 |
| corporate-workshops | 你们有为个人提供公众演讲培训吗？ | 你们为个人提供公众演讲培训吗？ | non-standard 有 + verb |
| corporate-workshops | 有，通过一对一沟通辅导，每节 S$120 起。 | 提供，形式是一对一沟通辅导，每节 S$120 起。 | matches new question; fragment |
| corporate-workshops | 给您的团队一堂真正用得上的工作坊 | 给您的团队一场真正用得上的工作坊 | measure word: 堂 is for 课 |
| corporate-workshops | 欢迎策划您的工作坊。(meta) | 立即与我们策划您的工作坊。 | unnatural CTA ('Plan yours') |
| communication-coaching | 在压力下依然做回自己 | 让您在压力下依然保持本色 | wrong idiom: 做回 = go back to being |
| communication-coaching | 只需要几个好习惯，别让紧张主导一切 | 只需要几个好习惯，让紧张不再主导一切 | imperative inside a statement |
| communication-coaching | ✓ 忘词时如何接回 | ✓ 忘词时如何接下去 | incomplete verb |
| communication-coaching | ✓ 说话像您自己 | ✓ 保持您自己的说话风格 | literal 'sounding like yourself' |
| communication-coaching | 我们帮您精简简报 | 我们帮您修整简报 | repetitive (简 twice) |
| communication-coaching | 会议和内部简报。 | 会议和内部简报会。 | ambiguous: 简报 already means the deck |
| communication-coaching | 并为会议室、全员大会和大会讲台而调整 | 并针对会议室、全员大会和会议讲台作出调整 | repetitive (大会 twice); stiff |
| communication-coaching | 希望在日常工作中，而不只是在台上，表达得更清楚 | 希望不只在台上，在日常工作中也能表达得更清楚 | English sentence structure |
| communication-coaching | ✓ 更清晰的会议 | ✓ 会议沟通更清晰 | literal 'clearer meetings' |
| communication-coaching | 您希望作为讲者如何成长 | 您希望在演讲方面有哪些提升 | translationese |
| communication-coaching | 我们会回复您档期和下一步安排 | 我们会回复您，告知档期和下一步安排 | grammar: 回复 double object |
| future-communication-coaching-additions | 四节课围绕您即将进行的一场真实汇报： | 四节课都围绕您即将进行的一场真实汇报展开： | missing verb |
| kids-youth-programs | ✓ 在海星中学开办过 11 堂课 | ✓ 在海星中学进行过 11 堂课 | collocation: 开办 is for a programme, not lessons |
| kids-youth-programs | 对年轻人来说，它分三步成长。 | 对年轻人来说，这项技能可以分三步培养起来。 | unnatural |
| kids-youth-programs | 然后才请任何人站起来发言 | 之后才请孩子站起来发言 | translationese 'anyone' |
| kids-youth-programs | 自信地准备学校和奖学金面试 | 做好准备，自信应对学校和奖学金面试 | meaning: the confidence is in the interview, not the preparing |
| kids-youth-programs | 从简短有趣的说话练习，逐步发展成在大家面前的一场真正演讲 | 从简短有趣的说话练习开始，逐步发展到在全组面前完成一场真正的演讲 | word order; 'the group' |
| kids-youth-programs | 适合……从第一次上台的学生到学生领袖都适用 | 适合……从第一次上台的学生到学生领袖都可参加 | redundant (适合 + 适用) |
| kids-youth-programs | 最终成为一堂关于创意自信的课 | 最终更成为学生培养创意自信的一段经历 | repetitive (11 堂课 … 一堂课) |
| kids-youth-programs | 学生最后会完成一部……短片，也掌握了制作下一部的技能 | ……短片，并掌握制作下一部的技能 | tense mismatch (会 … 了) |
| kids-youth-programs | 让正式面试时感觉更熟悉 | 到了正式面试时就不会感到陌生 | missing subject |
| kids-youth-programs | 孩子们一起赢、一起输的活动，在过程中学会聆听和轮流 | 在这些活动中，孩子们一起赢、一起输，并在过程中学会聆听和轮流 | broken sentence (fragment) |
| kids-youth-programs | 一个班级或课外活动（CCA）在一个学期内进行 | 在一个学期内进行的班级或课外活动（CCA） | broken structure after Ideal for |
| kids-youth-programs | 准备演讲、表演或面试的学生，提供即时反馈 | 准备演讲、表演或面试的学生，课程提供即时反馈 | missing subject |
| kids-youth-programs | 你们有举办假期营会吗？ | 你们有假期营会吗？ | non-standard 有 + verb |
| kids-youth-programs | 我们会回复您档期和下一步安排 | 我们会回复您，告知档期和下一步安排 | grammar: 回复 double object |
| kids-youth-programs | 告诉我们您学生的情况 | 告诉我们学生的情况 | awkward possessive |

#### For the native reviewer

1. **团队互动 for "team dynamics"** (corporate-workshops topic H3, Section 4 H2, form option; home service card). The more exact term is 团队动力 or 团队协作关系. I kept 团队互动 because the whole site uses it consistently and it is not a glossary term. If you change it, the home card stops repeating 互动 (互动式的引导工作坊……团队互动).
2. **周边活动提供者 for "fringe activity providers"** (home §13). In Singapore event work, fringe activities are usually 余兴活动 or 趣味摊位 (balloon sculpting, caricature, photo booth). Please check which term vendors would recognise.
3. **活跃于舞台的司仪 / 活跃司仪 for "working emcee"** (corporate-workshops, communication-coaching). It works but is long. 职业司仪 is shorter. The translator's note on this is still there.
4. **Glossary vs pages, "presentation skills".** The glossary gives 演讲与汇报技巧, but the pages use 汇报技巧 on its own (fine in context). Either the glossary or the pages should be updated so they match.
5. **静修活动 for "leadership retreat"** (corporate-team-building §11). Possibly 领导层退修会 or 静修营 in Singapore corporate usage. Please confirm.
6. **品牌活动 for the case-study category "Campaigns"** (home §8). The glossary uses 创意营销活动 / 营销活动 for campaigns. I did not change it because our-work.md and event-planning.md use the same label. If it changes, it should change on all pages.
7. **Home §4 H2 既有趣又有目的的团队建设.** I fixed the grammar but kept 目的 (= purpose). 既有趣又有意义 would sound warmer, but it slightly changes the claim.
8. **谢德忠（Chia De Zhong） repeated in home §9.** The full form already appears in the hero. The glossary says full form at first mention only, but the English also repeats the full name in this founder section, so I left it.
9. **"Founder-led, crew-delivered" → 创办人亲自带领，团队专业执行** (home hero). 专业 is a small addition not in the English. Left as acceptable.
10. **每位孩子** (kids meta description). Some editors prefer 每名孩子 or 每个孩子. Left.
11. **颁奖日 for "speech day"**: the translator's note is still open. I have nothing to add, except that some schools say 常年颁奖典礼.
12. **future-kids-youth-programs-additions:** no changes needed. 级任老师 for "form teacher" is the right Singapore term.

### Pemeriksa B: emcee, corporate-emcee, conference-emcee, roadshow-emcee, government-community-emcee (102 perubahan)

Checker: `npx tsx scripts/check-zh-draft.ts` prints ✓ for all five files after the edits.
Changes: emcee 7 · corporate-emcee 25 · conference-emcee 30 · roadshow-emcee 25 · government-community-emcee 15 (102 in all).

| File | Before | After | Why |
|---|---|---|---|
| emcee | 以英语和华语双语主持。企业活动、公司晚宴（D&D）、会议、新春晚宴、婚礼和社区活动，遍及新加坡各地，每一场都… | 以英语和华语主持新加坡各地的企业活动、公司晚宴（D&D）、会议、新春晚宴、婚礼和社区活动。每一场都… | broken structure (list fragment); redundant 双语 |
| emcee | 好的司仪是贯穿整个节目流程的那条线。大部分工作，在有人拿起麦克风之前就已经开始。 | 好的司仪是串起整个节目的主线。大部分工作，早在有人拿起麦克风之前就已完成。 | translationese; mistranslation: "happens before" = done, not "starts" |
| emcee | H2 您活动的新加坡最佳司仪，为什么是德忠？ | 为什么德忠是您活动的新加坡最佳司仪？ | word order |
| emcee | 他的主持内容在 Instagram…上也拥有众多关注者 | 他的主持片段在 Instagram…上也吸引了大批关注者 | logic: content cannot "have followers" |
| emcee | 超过 15 年面对现场观众 | 面对现场观众超过 15 年 | word order |
| emcee | 每一项预订都会收到书面报价 | 每一项预订，我们都会提供书面报价 | literal (booking as receiver) |
| emcee | 您的日期才会为您保留 | 才会为您保留日期 | repetitive 您…为您 |
| corporate-emcee | 以英语和华语自信、富有魅力地主持…。谢德忠（Chia De Zhong）让您的节目准时进行，准确介绍您的领导和嘉宾 | 谢德忠（Chia De Zhong）以英语和华语，自信而富有魅力地主持…。他让您的节目准时进行，准确介绍公司领导层和嘉宾 | subjectless sentence; 您的领导 reads as mainland "your boss" |
| corporate-emcee | 。这意味着以正确的姓名和职衔…，在致辞超时时控制好时间 | ：以正确的姓名和职衔…，致辞超时也能控制好时间 | translationese "That means"; 超时时 |
| corporate-emcee | 温馨又热闹的司仪，主持员工期待了一整年的那个晚上。 | 员工期待一整年的晚宴，由温馨又热闹的司仪来主持。 | unnatural |
| corporate-emcee | 也包括混合式和线上会议 | 也包括线上线下混合及线上会议 | glossary: hybrid = 线上线下混合 |
| corporate-emcee | 让每个奖项都有属于它的时刻 | 让每个奖项都获得应有的关注 | translationese |
| corporate-emcee | 长长的名单依然生动，…全场投入直到最后一个奖项 | 长长的名单也不沉闷，…直到最后一个奖项，全场依然投入 | word order |
| corporate-emcee | 您的日期才会为您保留 | 才会为您保留日期 | repetitive |
| corporate-emcee | 由一人统筹策划、观众和舞台 | 策划、带动观众和舞台演出都由他一人包办 | collocation: 统筹观众 |
| corporate-emcee | 费用介于 S$888 至 S$1,888 | 费用在 S$888 至 S$1,888 之间 | grammar: 介于 needs 之间 |
| corporate-emcee | 每一项预订都会收到书面报价 | 我们会为每一项预订提供书面报价 | literal |
| corporate-emcee | 活动前的彩排或技术彩排 | 活动前的彩排或技术测试 | repetitive |
| corporate-emcee | H2 为您的活动增添更多 | 为您的活动锦上添花 | literal/incomplete "Add more" |
| corporate-emcee | 晚宴期间的一首歌或压轴表演，由您的司仪亲自演出 | 晚宴期间献唱一曲或压轴表演，都由您的司仪亲自上阵 | repetitive 演出 |
| corporate-emcee | 主持和制作都由同一方负责 | 主持与制作一站式完成 | stiff |
| corporate-emcee | 超过 15 年面对观众 | 面对观众超过 15 年 | word order |
| corporate-emcee | 让您的重要信息按您的意图传达 | 让您的重要信息准确传达到位 | translationese |
| corporate-emcee | 主持您节目的同一个人，也能现场演唱 | 主持节目的司仪，也能为您现场演唱 | translationese |
| corporate-emcee | FAQ 大部分公司活动介于 S$888 至 S$1,888 | 大部分公司活动的费用在 S$888 至 S$1,888 之间 | grammar: 介于…之间 |
| corporate-emcee | H3 你们可以撰写司仪主持稿吗？ | 你们可以撰写主持稿吗？ | redundant 司仪+主持 (glossary: script = 主持稿) |
| corporate-emcee | 双语司仪主持稿也可以加入 | 双语主持稿也可以加入 | redundant |
| corporate-emcee | …以及全天价格，都在我们的会议及研讨会司仪页面。 | …的详情及全天价格，请参阅我们的会议及研讨会司仪页面。 | incomplete sentence |
| corporate-emcee | H3 你们主持混合式或线上活动吗？ | 你们主持线上线下混合或线上活动吗？ | glossary |
| corporate-emcee | 从我们以前的网站开始，混合式和线上主持就一直是… | 早在我们的旧网站上，线上线下混合及线上主持就已是… | literal "since our previous site"; glossary |
| corporate-emcee | 我们会回复您档期和书面报价 | 我们会回复您，告知档期并提供书面报价 | grammar: 回复 with double object |
| corporate-emcee | 我们会回复您档期和下一步安排 (thank-you) | 我们会回复您，告知档期和下一步安排 | grammar |
| conference-emcee | 以英语和华语双语主持…，从开幕欢迎词到闭幕致辞。 | 以英语和华语主持…，从开幕欢迎词到闭幕结语，全程主持。 | redundant 双语; dangling clause; 闭幕致辞 = VIP speech, not emcee's closing remarks |
| conference-emcee | tick 混合式和线上会议 | 线上线下混合及线上会议 | glossary |
| conference-emcee | H2 会议司仪为您负责的工作 | 会议司仪负责的各项工作 | awkward (为您负责 = "answerable to you") |
| conference-emcee | H3 混合式和线上会议 | 线上线下混合及线上会议 | glossary |
| conference-emcee | 为第一位讲者准备好全场 | 全场就绪，迎接第一位讲者 | unnatural |
| conference-emcee | 主宾和贵宾都按正确的顺序致意 | 按正确的顺序向主宾和贵宾致意 | mistranslation: VIPs are acknowledged, they do not greet |
| conference-emcee | tick 贵宾按正确顺序致意 | 按正确顺序向贵宾致意 | mistranslation (same) |
| conference-emcee | 我们都让对话对全场有价值 | 我们都让讨论切合全场观众的需要 | translationese |
| conference-emcee | 任何观众人数 | 不限观众人数 | literal "any audience size" |
| conference-emcee | H2 混合式和线上会议 | 线上线下混合及线上会议 | glossary |
| conference-emcee | 我们以前的网站把这项服务列为核心服务，现在依然如此 | 我们的旧网站已将此列为核心服务，至今依然如此 | repetitive 服务 |
| conference-emcee | 与会者带着清晰的重点信息离开 | 与会者离开时对重点信息记忆犹新 | mistranslation: "fresh", not "clear" |
| conference-emcee | 您的日期才会为您保留 | 才会为您保留日期 | repetitive |
| conference-emcee | 环节超时时当场调整 | 环节超时也能当场调整 | 超时时 awkward |
| conference-emcee | 费用一般介于 S$1,588 至 S$2,888 | 费用一般在 S$1,588 至 S$2,888 之间 | grammar: 介于…之间 |
| conference-emcee | 每一项预订都会收到书面报价 | 每一项预订，我们都会提供书面报价 | literal |
| conference-emcee | 混合式或线上元素 | 线上线下混合或线上元素 | glossary |
| conference-emcee | 活动前的彩排或技术彩排 | 活动前的彩排或技术测试 | repetitive |
| conference-emcee | tick 以英语和华语双语主持 | 中英双语主持 | redundant (glossary form) |
| conference-emcee | **混合式平台** | **线上线下混合会议平台** | glossary |
| conference-emcee | 混合式或线上会议的直播 | 线上线下混合或线上会议的直播 | glossary |
| conference-emcee | 也包括为主宾进行双语介绍 | 也能以双语介绍主宾 | awkward |
| conference-emcee | H3 你们可以主持混合式或线上会议吗？ | 你们可以主持线上线下混合或线上会议吗？ | glossary |
| conference-emcee | 让介绍和过渡在活动前就准备好 | 让介绍词和串词在活动前就准备好 | translationese "transitions"; glossary 串词 |
| conference-emcee | 双语司仪主持稿 | 双语主持稿 | redundant |
| conference-emcee | 我们会回复您档期和书面报价 | 我们会回复您，告知档期并提供书面报价 | grammar |
| conference-emcee | 是否有混合式或线上元素？：只有现场 / 混合式 / 全线上 | 是否有线上线下混合或线上元素？：仅限现场 / 线上线下混合 / 全线上 | glossary; 只有现场 unnatural |
| conference-emcee | 我们会回复您档期和下一步安排 (thank-you) | 我们会回复您，告知档期和下一步安排 | grammar |
| conference-emcee | Meta: 问答及混合式会议 | 问答及线上线下混合会议 | glossary |
| conference-emcee | ALT: 主持混合式会议 | 主持线上线下混合会议 | glossary |
| roadshow-emcee | 以英语和华语双语主持，活力十足，适合新加坡各地的…。谢德忠（Chia De Zhong）能… | 谢德忠（Chia De Zhong）以英语和华语主持新加坡各地的…，活力十足。他能… | subjectless; mistranslation: "for" ≠ 适合 (suitable); redundant 双语 |
| roadshow-emcee | 介绍新品，以及它为何重要 | 介绍新品，说明它的价值所在 | translationese "why it matters" |
| roadshow-emcee | 让每位路过的人都感到受邀 | 让每位路过的人都感到受欢迎 | literal "feels invited" |
| roadshow-emcee | 以…招揽购物者，并配合最繁忙的时段 | 抓准最繁忙的时段，以…招揽购物者 | dangling clause |
| roadshow-emcee | 都认识您的品牌和优惠 | 都了解您的品牌和优惠 | collocation: 认识优惠 |
| roadshow-emcee | 简短访谈…吸引访客再次回来的比赛 | 快速访谈…吸引访客再度光临的比赛 | repetitive 简短; redundant 再次回来 |
| roadshow-emcee | 商业观众需要清楚的信息，所以主持保持专业、紧扣信息，同时仍给人停下来的理由 | 商业访客需要清楚的信息，因此主持风格专业、紧扣重点，同时仍能让人愿意停下脚步 | repetitive 信息; literal "a reason to stop" |
| roadshow-emcee | tick 紧扣信息，面向商业访客 | 紧扣重点，面向商业访客 | consistency with paragraph |
| roadshow-emcee | 把这些时刻变成一场表演，让路人变成参与者 | 把这些时刻化为一场表演，让路人变成参与者 | repetitive 变成 |
| roadshow-emcee | 教授 11 堂的摄像课程 | 教授共 11 节的摄像课程 | grammar: measure word |
| roadshow-emcee | 带领观众了解演示和现场示范 | 引导观众跟上各项简报和现场示范 | 演示/示范 overlap; SG 简报 = presentation |
| roadshow-emcee | 适合媒体和合作伙伴的语调 | 适合媒体和合作伙伴的主持风格 | wrong word: 语调 = intonation |
| roadshow-emcee | 您的日期才会为您保留 | 才会为您保留日期 | repetitive |
| roadshow-emcee | H2 为您的路演增添更多 | 为您的路演锦上添花 | literal "Add more" |
| roadshow-emcee | 他的主持内容…也拥有众多关注者 | 他的主持片段…也吸引了大批关注者 | logic |
| roadshow-emcee | tick 以英语和华语双语主持 | 中英双语主持 | redundant |
| roadshow-emcee | **场地规定和批准** | **场地规定和审批** | SG usage |
| roadshow-emcee | 会规定舞台时间、音量和所需批准。我们会在这些规定内… | 对舞台时间、音量和审批都有规定。我们会在这些规定范围内… | broken structure |
| roadshow-emcee | H3 你们可以主持全天或连续多天吗？ | 你们可以主持全天或连续多天的活动吗？ | grammar: missing object |
| roadshow-emcee | 让赠品聚集人潮 | 借助赠品聚集人潮 | logic (giveaways do not act) |
| roadshow-emcee | 附带示范的公开发布活动适合本页；…请看 | 附带产品示范的公开发布活动属于本页的服务范围；…请参阅 | translationese "fit this page" |
| roadshow-emcee | 我们会回复您档期、建议的演出时段和报价 | 我们会回复您，告知档期、建议的演出时段和报价 | grammar |
| roadshow-emcee | 是否计划赠品或比赛？ | 是否计划派发赠品或举办比赛？ | grammar: missing verbs |
| roadshow-emcee | 我们会回复您档期和下一步安排 (thank-you) | 我们会回复您，告知档期和下一步安排 | grammar |
| roadshow-emcee | ALT: 购物人潮在品牌推广活动中参与游戏 | 购物者在品牌推广活动中参与游戏 | collocation: a "crowd" joining a game |
| government-community-emcee | 提供英语和华语双语主持。…主持准备充足、熟悉礼宾程序 | 提供中英双语主持。…司仪准备充足、熟悉礼宾程序 | redundant 双语; "hosting" cannot know protocol |
| government-community-emcee | 以恰当的礼仪和语调，主持推介礼 (S2) | 以恰当的礼仪和语气，主持推介礼 | wrong word: 语调 = intonation |
| government-community-emcee | 以恰当的礼仪和语调主持推介礼 (S3) | 以恰当的礼仪和语气主持推介礼 | wrong word |
| government-community-emcee | 依照您的要求和审批内容进行，…调整语调 | 依照您的要求和审批结果进行，…调整主持语气 | wrong word; "approvals" |
| government-community-emcee | 让整个邻里都投入庆祝 | 让街坊邻里都投入庆祝 | unnatural |
| government-community-emcee | 让整晚的注意力始终放在… | 整晚的焦点始终放在… | subjectless fragment |
| government-community-emcee | tick 每一位受奖者的时刻 | 每一位受奖者都有专属时刻 | fragment |
| government-community-emcee | H2 您的司仪报价如何决定 | 您的司仪报价如何计算 | awkward |
| government-community-emcee | 每一项预订都会收到书面报价 | 每一项预订，我们都会提供书面报价 | literal |
| government-community-emcee | 致辞、演示和环节的数量 | 致辞、简报和环节的数量 | SG usage: presentation = 简报 |
| government-community-emcee | tick 英语和华语双语主持 | 中英双语主持 | redundant |
| government-community-emcee | H2 预订前请先阅读 | 预订须知 | consistency with the other emcee pages |
| government-community-emcee | 让各年龄层的居民都感到被接纳 | 让各年龄层的居民都能融入其中 | unnatural (被接纳 too heavy) |
| government-community-emcee | 我们会回复档期和书面报价 | 我们会回复您，告知档期并提供书面报价 | grammar |
| government-community-emcee | 我们会回复档期和下一步安排 (thank-you) | 我们会回复您，告知档期和下一步安排 | grammar |

#### For the native reviewer

- **Corporate H1 包您玩得尽兴** (left as is, with the existing 译注). The English line says "guarantees" and the glossary bans 保证. The client needs to decide.
- **Glossary term for "hybrid" (线上线下混合).** I used it everywhere to follow the glossary, but it gets long in headings (线上线下混合及线上会议). If the reviewer prefers 混合式, change the glossary first and then every page; product-launch-events.md already uses 线上线下混合.
- **领导 / 介绍领导和嘉宾.** This sounds mainland ("各位领导"). I only changed 您的领导 in the corporate hero (→ 公司领导层). The why-band line 准确介绍领导和嘉宾 is still on corporate S2, conference, roadshow and government. Consider 领导层 or 贵宾 across the site.
- **宣布事项 (announcements)** is used on many pages and is a bit stiff. 各项宣布 or 通告 would be alternatives. I left it so the wording stays consistent across the site.
- **摄像 (videography)** is used site-wide. In Singapore 录像 or 摄影录像 is also common. I did not change it.
- **简报 for "presentations"** (roadshow S7, government S9). I replaced 演示 with it because 简报 is the usual Singapore term. Please confirm.
- **Government page terms in the 译注:** 交流会 for "engagement session" (some agencies say 对话会), 推介礼 for "launch" and 负责官员 for "officer-in-charge". These look right to me, but a public-sector reader should confirm them.
- **Emcee hub H2** 为什么德忠是您活动的新加坡最佳司仪？ keeps the SEO phrase 新加坡最佳司仪. 您活动的 is slightly colloquial; 您的活动的 would double the 的.
- **Government S11** keeps the line 标志墙（沿用现有）：… where other pages keep the English marker "Logo strip (existing):". The importer does not use this paragraph's text, so it is harmless, but it is inconsistent across files.
- **"literally saved the day"** (emcee S5, corporate S10) stays in English, as the 译注 says. The reviewer may prefer the suggested 简直救了全场.

### Pemeriksa C: school-family-emcee, chinese-new-year-emcee, dinner-and-dance-emcee, dinner-and-dance-planning (57 perubahan)

57 changes in total: school-family-emcee 20, chinese-new-year-emcee 10, dinner-and-dance-emcee 17, dinner-and-dance-planning 10. `npx tsx scripts/check-zh-draft.ts` prints ✓ for all four files.

| File | Before | After | Why |
|---|---|---|---|
| school-family-emcee | H1 您的学校、儿童及家庭日司仪。 | 为学校、儿童及家庭日而设的司仪。 | ambiguous ("您的学校" reads as "your school"); English is "An emcee for…" |
| school-family-emcee | SEO table H1 您的学校、儿童及家庭日司仪。 | 为学校、儿童及家庭日而设的司仪。 | keep in step with the H1 |
| school-family-emcee | 游戏和音乐，一应俱全 | 游戏和音乐融入节目 | unnatural: 一应俱全 claims "everything", English says "built in" |
| school-family-emcee | 生日派对配合游戏、音乐和童话角色嘉宾 (Section 2) | 生日派对有游戏、音乐和童话角色嘉宾 | wrong word: 配合 = "cooperate with" |
| school-family-emcee | 都感到被接纳 (Section 2) | 都能融入其中 | translationese: 被接纳 = "accepted", English says "included" |
| school-family-emcee | 三种清楚的配套 | 三种配套一目了然 | unnatural collocation |
| school-family-emcee | 不让任何人落单 (Family Day Host) | 不冷落任何人 | wrong word: 落单 = "left on your own"; this is about being left out |
| school-family-emcee | 让每个年龄层都有活动可以参与 | 让每个年龄层都有节目可以参与 | 活动 used twice in one sentence |
| school-family-emcee | 由同样在学校执教的主持人带领，例如在海星中学。 | 主持人本身也在学校执教，海星中学便是其中一所。 | broken structure: "例如在海星中学" was left dangling |
| school-family-emcee | 生日派对配合游戏、音乐和童话角色嘉宾 (Section 7) | 生日派对有游戏、音乐和童话角色嘉宾 | wrong word: 配合 |
| school-family-emcee | - ✓ 没有人落单 | - ✓ 没有人被冷落 | wrong word: 落单 |
| school-family-emcee | H2 两种语言，不让任何人落单 | 两种语言，不冷落任何人 | wrong word: 落单 |
| school-family-emcee | 全家人都感到被接纳 (Section 10) | 全家人都能融入其中 | translationese: 被接纳 |
| school-family-emcee | 串连起来 | 串联起来 | wrong character: 串联 is the standard form |
| school-family-emcee | 教授一个共 11 节课的摄像课程 | 教授共 11 节课的摄像课程 | clumsy: "一个共" |
| school-family-emcee | 标志墙（沿用现有）：青年奥林匹克运动会… | Logo strip (existing): 青年奥林匹克运动会… | build marker: the importer only finds the logo block by the English prefix (`LOGO_STRIP` in src/seed/handoff/to-blocks.ts), so 标志墙… would have shown on the page as text |
| school-family-emcee | 一支无线麦克风和音响系统 | 一支无线麦克风和一套音响系统 | wrong measure word: 支 can't count 音响系统 |
| school-family-emcee | 围绕小寿星和他的朋友 | 围绕小寿星和朋友们 | added gender: English says "their friends" |
| school-family-emcee | 自信、公众演讲和创意课程，都介绍在我们的儿童与青少年课程页面。 | 自信培养、公众演讲和创意课程，详情请见我们的儿童与青少年课程页面。 | grammar: wrong word order (都介绍在…页面) |
| school-family-emcee | 我们会确认档期和下一步安排 | 我们会确认档期，并告知下一步 | 安排 used twice in one sentence |
| chinese-new-year-emcee | 让每一桌宾客都能投入致辞、捞鱼生、游戏和幸运抽奖 | 致辞、捞鱼生、游戏和幸运抽奖，每一桌宾客都能投入其中 | unnatural collocation: 投入致辞 |
| chinese-new-year-emcee | 为公司新春晚宴准备的三种清楚配套。 | 专为公司新春晚宴而设的三种配套，内容一目了然。 | unnatural: 清楚配套 |
| chinese-new-year-emcee | 从第一次祝酒到最后一份奖品 | 从第一杯祝酒到最后一个奖项 | unnatural; now matches 第一杯祝酒 in the Section 7 H2 |
| chinese-new-year-emcee | - ✓ 没有人落单 | - ✓ 没有人被冷落 | wrong word: 落单 |
| chinese-new-year-emcee | 以亲切和幽默主持 | 以亲切幽默的风格主持 | stiff structure |
| chinese-new-year-emcee | 步步高升：寓意一步一步往上攀升 | 步步高升：寓意事业节节上升 | lo hei gloss: was a word-for-word restatement; now says what the wish means |
| chinese-new-year-emcee | 万事如意：寓意凡事称心如意 | 万事如意：寓意事事顺心 | lo hei gloss repeated the phrase itself (如意) |
| chinese-new-year-emcee | 在适当的时刻随时切换语言 | 在需要时随时切换语言 | contradictory: 适当的时刻 + 随时; English is "whenever the moment calls for it" |
| chinese-new-year-emcee | 标志墙（沿用现有）：青年奥林匹克运动会… | Logo strip (existing): 青年奥林匹克运动会… | build marker (see school page row) |
| chinese-new-year-emcee | 一支无线麦克风和运作正常的音响系统 | 一支无线麦克风和一套运作正常的音响系统 | wrong measure word |
| dinner-and-dance-emcee | Price line: 大部分 D&D 晚宴介于 S$888 至 S$2,888 | 大部分 D&D 晚宴在 S$888 至 S$2,888 之间 | grammar: 介于 needs …之间 |
| dinner-and-dance-emcee | 欢迎及早告诉我们日期，查询档期。 | 请及早告诉我们日期，让我们为您查询档期。 | broken clause link |
| dinner-and-dance-emcee | 留到全场准备好的时候 (Section 3) | 留到全场情绪到位的时候 | translationese: "when the crowd is ready" |
| dinner-and-dance-emcee | 德忠在 Mandai Rainforest Resort 主持… | 谢德忠（Chia De Zhong）在 Mandai Rainforest Resort 主持… | style rule: first mention on the page needs the full name (glossary §2) |
| dinner-and-dance-emcee | H3 05 完美收尾 | 05 精彩收尾 | claim made stronger: English is "A strong finish" |
| dinner-and-dance-emcee | 告诉我们日期、场地和人数，我们会马上告诉您 | 发送您的日期、场地和人数，我们会马上告诉您 | 告诉 used twice in one sentence |
| dinner-and-dance-emcee | 您的日期就会为您保留 | 便会为您保留日期 | 您 / 为您 redundant |
| dinner-and-dance-emcee | 收费介于 S$888 至 S$2,888。 (Section 8) | 收费在 S$888 至 S$2,888 之间。 | grammar: 介于 |
| dinner-and-dance-emcee | 开场演出、晚餐时段献唱或压轴演出，由您的司仪亲自表演。 | 开场表演、晚餐时段献唱或压轴演出，都由您的司仪亲自上阵。 | 演出 / 表演 repeated |
| dinner-and-dance-emcee | 串场词 | 串词 | glossary §9: emcee links = 串词 |
| dinner-and-dance-emcee | 留到全场准备好的时候 (Section 10) | 留到全场情绪到位的时候 | translationese |
| dinner-and-dance-emcee | H2 预订前请阅读 | 预订前请先阅读 | consistency with the other pages |
| dinner-and-dance-emcee | 以下几点能让您的活动顺利进行，也适用于每一项预订。 | 以下几点有助于活动顺利进行，适用于每一项预订。 | logic: 也 is wrong here (English: "They are part of every booking") |
| dinner-and-dance-emcee | 一支无线麦克风和正常运作的音响系统 | 一支无线麦克风和一套正常运作的音响系统 | wrong measure word |
| dinner-and-dance-emcee | 收费介于 S$888 至 S$2,888，视节目流程而定 (FAQ) | 收费在 S$888 至 S$2,888 之间，视节目流程而定 | grammar: 介于 |
| dinner-and-dance-emcee | 主持。新春晚宴的详情… | 是的。新春晚宴的详情… | unnatural: one-verb answer (主持。) |
| dinner-and-dance-emcee | 可以。现场演唱和钢琴可以安排在… | 可以。现场演唱和钢琴演奏能安排在… | 可以 used twice |
| dinner-and-dance-planning | 从第一杯祝酒到压轴大抽奖，全程负责。 | 从第一杯祝酒到压轴大抽奖，全程把关。 | 负责 used twice in the sentence |
| dinner-and-dance-planning | 由德忠主持 | 由谢德忠（Chia De Zhong）主持 | style rule: first mention on the page needs the full name |
| dinner-and-dance-planning | H3 05 完美收尾 | 05 精彩收尾 | claim made stronger: "A strong finish" |
| dinner-and-dance-planning | 从第一份需求简介到压轴大抽奖 | 从您提出需求到压轴大抽奖 | translationese: "first brief" |
| dinner-and-dance-planning | 您的日期就会为您保留 | 便会为您保留日期 | 您 / 为您 redundant |
| dinner-and-dance-planning | H2 预订前请阅读 | 预订前请先阅读 | consistency with the other pages |
| dinner-and-dance-planning | 以下几点能让您的活动顺利进行，也适用于每一项预订。 | 以下几点有助于活动顺利进行，适用于每一项预订。 | logic: 也 is wrong here |
| dinner-and-dance-planning | 推荐合适的方案；方案会逐项列出每个部分的费用 | 推荐合适的方案，并逐项列出每个部分的费用 | 方案 used twice |
| dinner-and-dance-planning | 提供。德忠以英语和华语主持… | 是的。德忠以英语和华语主持… | unnatural: one-verb answer |
| dinner-and-dance-planning | 策划，并提供双语主持… | 是的，并提供双语主持… | unnatural: one-verb answer |

#### For the native reviewer

- **Logo strip marker (school and CNY pages).** The drafts had translated the prefix as 标志墙（沿用现有）. The importer only recognises the logo block by the English `Logo strip` prefix, so I put the English prefix back, as on the two D&D pages. Please do not translate it again.
- **Lo hei list (CNY page).** The six phrases are correct and are ones Singaporeans really say: 年年有余 (余, not 鱼), 大吉大利, 步步高升, 风生水起, 招财进宝, 万事如意. As the existing 译注 says, the pinyin and English meanings were swapped for Chinese 寓意 glosses. Two points to confirm:
  - Is it OK to drop the pinyin and English meanings? The English brief shows them.
  - Which phrases does De Zhong actually call? Common calls such as 恭喜发财, 一本万利, 鸿运当头, 金银满屋 and 甜甜蜜蜜 are not on the list. I did not add them, because that would be new content.
- **落单 → 冷落 in one H2.** School Section 10 H2 is now 两种语言，不冷落任何人. The H2s are planned for SEO, so please confirm you are happy with the wording.
- **Glossary: 公司晚宴 has two meanings.** It stands for D&D, but the drafts also use it for any "company dinner" (for example 大部分公司晚宴都在 11 月至 3 月举行, and 公司晚宴上 on the CNY page). Readers cannot always tell a D&D apart from a CNY or annual dinner. This is a glossary-level question, so I did not change it.
- **常年晚宴 vs 年终晚宴.** The existing 译注 on the CNY and D&D pages is still open. 常年晚宴 is correct Singapore usage, but HR readers may simply say 年终晚宴 or 公司晚宴.
- **颁奖日 / 颁奖礼 for speech day / prize-giving.** The existing 译注 on the school page is still open. Many Singapore schools call it 常年颁奖典礼 or just 颁奖典礼.
- **Left as is, but you may want to tune:**
  - 每一桌都不落下 (CNY H2 and H3; colloquial)
  - 该正式时庄重得体，能轻松时活泼有趣 (school page; the idiomatic form would be 该庄重时庄重，该活泼时活泼)
  - 外出活动日 for "days out" (a little stiff)
  - 摄像课程 for "videography programme" (视频制作课程 may be what the school calls it)
  - 紧凑的节目流程 in the D&D hero ("紧凑" is slightly more than the English says)

### Pemeriksa D: wedding-emcee, event-planning, product-launch-events, creative-campaigns, event-support (60 perubahan)

Files: wedding-emcee.md (13), event-planning.md (10), product-launch-events.md (18), creative-campaigns.md (11), event-support.md (8). Total 60 changes, one table row each. `npx tsx scripts/check-zh-draft.ts` prints ✓ for all five.

| File | Before | After | Why |
|---|---|---|---|
| wedding-emcee.md | 三个清楚的配套，询问之前就能看清楚包含什么。 | 三个配套一目了然，询问之前就能清楚知道包含什么。 | repetitive: 清楚 / 看清楚 |
| wedding-emcee.md | 以及希望一起打造整个晚上的新人 | 以及希望与我们一起打造整个晚上的新人 | mistranslation: "shaped with them" (with us), not with each other |
| wedding-emcee.md | 一路上没有意外 | 一路上不会有意料之外的状况 | unnatural: 意外 reads as "accident" |
| wedding-emcee.md | 我们会马上告诉您当天是否有空档（step 1） | 我们会马上告诉您该日期是否还有空档 | ambiguous: 当天 can mean "same day" |
| wedding-emcee.md | 父母和致辞嘉宾会以他们最习惯的语言介绍，接着他再用另一种语言衔接 | 德忠会用父母和致辞嘉宾最习惯的语言介绍他们，接着再用另一种语言衔接 | mistranslation: read as if parents do the introducing |
| wedding-emcee.md | 15 年来主持企业盛大晚宴、公司晚宴和路演，让他能 | 15 年来主持企业盛大晚宴、公司晚宴（D&D）和路演的经验，让他能 | grammar: missing subject noun 经验; glossary: first mention 公司晚宴（D&D） |
| wedding-emcee.md | 从温馨的小型庆祝到酒店宴会厅 | 从温馨的小型庆祝会到酒店宴会厅 | grammar: 庆祝 is a verb here, needs noun |
| wedding-emcee.md | 热门日子……告诉您当天是否有空档 | 热门日期……告诉您该日期是否还有空档 | unnatural 日子; ambiguous 当天 |
| wedding-emcee.md | `查询场地档期` | `告诉我们场地，查询档期` | mistranslation: read as checking the venue's availability |
| wedding-emcee.md | `与我们一起策划整天婚礼` | `与我们一起策划整场婚礼` | unnatural: 整天婚礼 |
| wedding-emcee.md | 新人在评价中都提到这一点 | 新人在评价中常提到这一点 | mistranslation: overclaim, "all" not in English |
| wedding-emcee.md | 节目节奏丝毫不受影响 | 节目也不会因此拖慢 | mistranslation: stronger than "without slowing the programme down" |
| wedding-emcee.md | 演唱精选（2023 年）：在婚礼和活动上的现场演唱。现场演唱包含在司仪兼现场演唱配套中。 | 演唱精选（2023 年）：收录德忠在婚礼和活动上的演唱片段。司仪兼现场演唱配套包含现场献唱。 | repetitive: 现场演唱 ×3; fragment |
| event-planning.md | 媒体发布会和店内发布会，从头到尾全程策划。 | 媒体发布会和店内发布会，从头到尾一手包办。 | redundant: 从头到尾 = 全程 |
| event-planning.md | 让孩子、家长和同事都有事可做 | 让孩子、家长和同事都能找到适合自己的活动 | unnatural: 有事可做 sounds dull |
| event-planning.md | 这场活动之后，什么应该有所改变，或值得庆祝？ | 您希望这场活动带来什么改变，或庆祝什么？ | translationese |
| event-planning.md | 根据您的场地、人数和时间安排，策划节目、流程表和时间分配 | 根据您的场地、人数和日程，策划节目、流程表和时间分配 | repetitive: 时间 ×2 |
| event-planning.md | 朝着同一个目标努力（after 说明您的目标） | 朝着同一个方向努力 | repetitive: 目标 ×2 |
| event-planning.md | **H3 ·** 内容创作者与内容 | **H3 ·** 内容创作者与内容制作 | unnatural: 内容 dangling |
| event-planning.md | 围绕您的活动安排网红和内容 | 围绕您的活动安排网红和制作内容 | grammar: 安排内容 odd collocation |
| event-planning.md | 我们会回复您活动构思、档期和方案 | 我们会回复您，提供活动构思、档期和方案 | grammar: 回复 takes no second object |
| event-planning.md | 我们会回复您档期和下一步安排（thank-you） | 我们会回复您，告知档期和下一步安排 | grammar: 回复 takes no second object |
| event-planning.md | 我们会回复您活动构思和分项列明的方案 | 我们会回复您，附上活动构思和分项列明的方案 | grammar: 回复 takes no second object |
| product-launch-events.md | - ✓ **从头到尾全程策划** | - ✓ **从头到尾一手包办** | redundant: 从头到尾 = 全程 |
| product-launch-events.md | 好好介绍每位讲者 | 得体地介绍每位讲者 | unnatural: 好好 too casual for "properly" |
| product-launch-events.md | ……内容创作者和艺人，事先做好说明，在对的时间 | ……内容创作者和艺人，事先沟通到位，在对的时间 | unnatural: reads as if they do the explaining |
| product-launch-events.md | 让发布会在灯光熄灭后继续发挥作用 | 让发布会落幕后依然持续发挥影响力 | translationese: literal "after the lights go down" |
| product-launch-events.md | 宾客动线，从头到尾全程策划 | 宾客动线，从头到尾一手包办 | redundant: 从头到尾 = 全程 |
| product-launch-events.md | 直接接触购物人潮 | 直接接触商场里的购物人群 | repetitive: 人潮 already in the card above |
| product-launch-events.md | 主持时兼顾现场和线上的观众 | 主持时兼顾线上线下 | repetitive: 观众 ×2 in one line |
| product-launch-events.md | 我们也与 SOMA 团队合作打造品牌形象和策略 | 我们也在品牌形象和策略方面与 SOMA 团队合作 | mistranslation: overclaim ("built" SOMA's brand image) |
| product-launch-events.md | 以及您心目中的成功是什么样子 | 以及您对成功的定义 | translationese: "what success looks like" |
| product-launch-events.md | 邀请函、向内容创作者和艺人做说明，以及当天的内容计划 | 邀请函、内容创作者和艺人的说明会，以及当天的内容计划 | grammar: verb phrase in a noun list |
| product-launch-events.md | 品牌为什么选择 The Charisma Code 办发布会 | 品牌为什么选择 The Charisma Code 举办发布会 | unnatural: 办 too colloquial for an H2 |
| product-launch-events.md | 艺人和信息都根据您的品牌形象挑选 | 艺人和宣传信息都根据您的品牌形象来挑选和拟定 | grammar: 挑选信息 wrong collocation |
| product-launch-events.md | 时间有变动时依然沉着冷静，而发布当天往往就是如此。 | 发布当天的时间往往会有变动，他依然沉着冷静。 | ambiguous: 如此 seemed to refer to "calm" |
| product-launch-events.md | 活动长度和任何额外天数，例如店内探访 | 活动时长，以及店内探访等额外天数 | translationese: 长度, 任何 |
| product-launch-events.md | 内容创作者的说明 | 给内容创作者的说明资料 | unnatural: "creator briefs" (matches 说明资料 on campaigns page) |
| product-launch-events.md | 仅司仪主持方面，半天或晚间发布会 S$888 起 | 若只需司仪主持，半天或晚间发布会 S$888 起 | unnatural / grammar |
| product-launch-events.md | 我们会回复您建议方案和报价 | 我们会回复您，提供建议方案和报价 | grammar: 回复 takes no second object |
| product-launch-events.md | 我们会回复您方案和报价 | 我们会回复您，提供方案和报价 | grammar: 回复 takes no second object |
| creative-campaigns.md | 需要听到它的人 | 要传达的对象 | translationese: "who needs to hear it" |
| creative-campaigns.md | 由同样站上舞台主持的内容创作者制作，无论在镜头前还是现场都很自然 | 由同时也是舞台司仪的内容创作者制作，无论在镜头前还是现场都显得自然 | grammar: 同样 wrong ("also"), unclear |
| creative-campaigns.md | 并从头到尾全程协调 | 并全程协调 | redundant: 从头到尾 = 全程 |
| creative-campaigns.md | - ✓ 从头到尾全程协调 | - ✓ 全程协调 | redundant: 从头到尾 = 全程 |
| creative-campaigns.md | 而不只是滑过去 | 而不是一滑而过 | unnatural |
| creative-campaigns.md | 在同一天、以同一个信息呈现 | 在同一天推出，传达同一个信息 | grammar: 以信息呈现 wrong collocation |
| creative-campaigns.md | 撰写脚本和拍摄内容，并商定审批流程 | 撰写脚本、拍摄内容，并商定审批流程 | repetitive 并 / 和 chain |
| creative-campaigns.md | 就像 SOMA Fragrances 一样 | 就像我们为 SOMA Fragrances 所做的一样 | mistranslation: compared you to SOMA, not to our work for SOMA |
| creative-campaigns.md | ……贴文都可以。 | ……贴文都能制作。 | repetitive: 可以 ×2 |
| creative-campaigns.md | 我们会回复您档期和下一步安排（thank-you） | 我们会回复您，告知档期和下一步安排 | grammar: 回复 takes no second object |
| creative-campaigns.md | 我们会回复您创意方向和报价 | 我们会回复您，提供创意方向和报价 | grammar: 回复 takes no second object |
| event-support.md | 让活动结束后很久依然持续发挥作用 | 让活动结束后仍能长久发挥效益 | translationese / redundant 依然持续 |
| event-support.md | 到餐馆和活动室都有 | 到餐馆和多功能厅都有 | unnatural: "function rooms" = 多功能厅; 活动室 sounds like a CC activity room |
| event-support.md | 让整晚准时进行 | 确保整晚流程准时进行 | grammar: missing noun |
| event-support.md | 朝着同一个目标努力（after 说明您的目标） | 朝着同一个方向努力 | repetitive: 目标 ×2 (same fix as event planning) |
| event-support.md | 我们从供应商网络中为您配对合适的供应商 | 我们从自己的网络中为您配对合适的供应商 | repetitive: 供应商 ×2 |
| event-support.md | 场地、供应商和流程表，从头到尾全程策划 | 场地、供应商和流程表，从头到尾一手包办 | redundant: 从头到尾 = 全程 |
| event-support.md | 歌手、现场乐手、魔术师和角色表演者，并针对您的观众做好说明 | 包括歌手、现场乐手、魔术师和角色表演者，并会针对您的观众向他们做好说明 | grammar: 并 with no verb before it |
| event-support.md | 我们会回复您档期和下一步安排（thank-you） | 我们会回复您，告知档期和下一步安排 | grammar: 回复 takes no second object |

#### For the native reviewer

1. **The thank-you line uses 回复您 + a second object across the whole site.** I fixed it in my five files (我们会回复您，告知档期和下一步安排). The same construction is in 12 other pages: home, about, contact, rates, corporate-emcee, conference-emcee, roadshow-emcee, dinner-and-dance-emcee, dinner-and-dance-planning, corporate-team-building, communication-coaching and kids-youth-programs. They should be fixed the same way so the form message is identical everywhere.
2. **Glossary §9 package name 司仪兼现场演唱 (not changed).** 兼 normally joins two roles (司仪兼歌手). Here it joins a role with an activity (现场演唱), which reads a little off. 司仪兼现场歌手 would be more grammatical. The wedding H2 (中英双语婚礼司仪兼现场演唱) and the SEO title copy the same pattern.
3. **The H1 让宾客宾至如归 (not changed).** It is widely used, but strictly 宾客 + 宾至 is redundant. Possible alternatives: 让来宾有宾至如归之感, or 让宾客倍感亲切. If you change it, also change the H1 row in the SEO table.
4. **Wedding button `告诉我们场地，查询档期` (was 查询场地档期).** The old label read as "check the venue's availability". Please confirm my wording, or pick something shorter.
5. **"brief / briefed" has no glossary term.** The pages use 说明, 做好说明, 说明资料 and 说明会. 简报 is common in Singapore corporate Chinese and could be standardised and added to the glossary.
6. **"Campaigns" category label 品牌活动 (event-planning, Recent work).** I kept it because home and our-work use the same label. Glossary §4 gives creative campaigns as 创意营销活动, so 营销活动 may be the better category name. Decide site-wide.
7. **Pronouns for the couple on the wedding page are mixed:** 您, 两位 and 你们. The glossary says 您. 两位 is natural for a couple, so a single rule for wedding copy would help.
8. **Wedding: 爷爷奶奶 for "grandparents" names only the paternal side.** 长辈 or 爷爷奶奶、外公外婆 would cover both families. Not changed.
9. **Wedding step 3 确定日期 for "Secure your date".** It reads closer to "decide the date". 锁定档期 is an option. Not changed.
10. **One point of contact 一个联系窗口 (H1, ticks, H2).** 单一联系窗口 is the more established phrase. Not changed, because it is used consistently on several pages.
11. **Event support: 周边活动 for "fringe activities".** Kept, because Lianhe Zaobao uses 周边活动 for side events. Mainland readers may read 周边 as merchandise.
12. **Open 译注 left in place:** 证婚仪式 / 注册仪式 / ROM; 常年晚宴; 新加坡洲际酒店; 消息解禁日期; 借势营销; 角色表演者 / 人偶表演者; package-name proposal.

### Pemeriksa E: services, rates, about, future-about-additions, our-work, contact, shared.md (57 perubahan)

Checker (`npx tsx scripts/check-zh-draft.ts`): ✓ on all six page files after editing. shared.md table layout checked by hand (193 lines before and after, same column counts, English cells untouched).
Prices: every S$ figure on rates.md (49) and services.md (9) matches the English in value and order; no price was wrong.

| File | Before | After | Why |
|---|---|---|---|
| services.md | 让整晚气氛不冷场 | 让整晚不冷场 | collocation: 气氛不冷场 redundant |
| services.md | 主题涵盖沟通、协作和团队互动 | 主题涵盖沟通、协作和团队动力 | repetition (互动式…互动); 'team dynamics' |
| services.md | 为学校、营会和年轻人设计的自信、沟通及创意课程 | 为学校、营会和年轻人设计的课程，培养自信、沟通能力和创意 | unnatural: 自信课程 |
| services.md | 一个联系窗口，为您对接可靠的供应商 | 一个联系窗口，帮您安排可靠的供应商 | mainland jargon 对接 |
| services.md | 在下面找到您正在筹划的活动 | 请在下方查找您正在筹划的活动 | literal / stiff |
| services.md | 公司晚宴、D&D 或年终派对 | 公司聚餐、D&D 晚宴或年终派对 | 'company dinner' and D&D both rendered 公司晚宴 (glossary D&D term) |
| services.md | 为品牌寻找内容创作者和内容 | 为品牌物色内容创作者、制作内容 | verb-object mismatch (寻找…内容) |
| services.md | H2 每项合作的进行方式 | H2 我们的合作方式 | translationese |
| services.md | 这场活动之后，什么应该有所改变，或值得庆祝？ | 您希望这场活动带来什么改变，或庆祝什么？ | broken structure, literal |
| services.md | 本来就是为互相配合而设计的，并由… | 本就设计成可以互相搭配，并由… | stiff |
| services.md | 告诉我们日期、人数，以及您希望大家带走什么收获 | 请分享活动日期、人数，以及您希望大家有什么收获 | repeats H2 告诉我们; 带走收获 unnatural |
| rates.md | 每场活动都会根据…报价，在您预订之前，都会先收到书面报价。 | 每场活动都会根据…报价，您在预订之前一定会先收到书面报价。 | grammar: missing subject, double 都会; 'always' |
| rates.md | 询价无需任何承诺 | 询价不必承诺预订 | translationese ('no obligation') |
| rates.md | Button 按您的日期获取报价 | Button 提供日期，获取报价 | translationese ('for your date') |
| rates.md | `> **Note (译注):** English price ranges … Package names …` | (deleted) | resolved: package names match wedding/CNY/school pages and glossary §9; range format is glossary rule 8 |
| rates.md | 包括礼仪程序和贵宾环节 | 包括礼宾程序和贵宾环节 | glossary §9: protocol → 礼宾程序 |
| rates.md | 一个学期内约 10 小时，由贵校挑选的主题组成。 | 一个学期共约 10 小时，内容由贵校自选的主题组合而成。 | grammar: missing subject |
| rates.md | 只需主持服务则 S$888 起 | 仅司仪主持 S$888 起 | grammar; align with product-launch-events wording |
| rates.md | H2 任何主持预订都可加选的附加服务 | H2 所有主持服务都可加选的附加服务 | translationese ('any hosting booking') |
| rates.md | 司仪串场词 | 司仪串词 | glossary §9: emcee links → 串词 |
| rates.md | 只需三步，在您确认之前，不会有任何预订。 | 只需三步，经您确认后才会正式预订。 | stiff |
| rates.md | 您的日期就会为您保留 | 便会为您保留该日期 | double 您, awkward |
| rates.md | 为什么有些服务是报价，而不是标价？ | 为什么有些服务需要报价，而不直接标价？ | unnatural |
| rates.md | H2 按您的日期获取报价 | H2 提供日期，获取报价 | translationese; matches hero button |
| rates.md | 我们会回复您档期情况和准确报价 | 我们会告知您档期和准确报价 | grammar: 回复 + double object |
| rates.md | Button 获取我的报价 | Button 获取报价 | translationese ('my') |
| rates.md | 我们会回复您档期情况和下一步安排。需要更快得到答复？ | 我们会告知您档期和下一步安排。想更快得到答复？ | grammar; same message worded identically on contact.md |
| about.md | Zenitant、Edublitz 和 Aktivate 培训师 | 担任 Zenitant、Edublitz 和 Aktivate 的培训师 | reads as a bare label in a sentence list |
| about.md | 也在课堂上用了五年多的时间 | 也在课堂上执教五年多 | stiff / wordy |
| about.md | 它关乎沟通、连结，以及… | 它关乎沟通、与人建立联系，以及… | 连结 Taiwan usage; 'connecting' |
| about.md | 引进可靠的合作伙伴 | 请来可靠的合作伙伴 | wrong word: 引进 = import (tech, talent) |
| about.md | 您只需对接一个联系窗口 | 您只需通过一个联系窗口沟通 | mainland jargon 对接 |
| about.md | 我们会回复您活动构思。 | 我们会带着构思回复您。 | grammar: broken object ('come back with ideas') |
| future-about-additions.md | ABRSM 钢琴八级（优良） | ABRSM 钢琴八级（良好） | ABRSM Chinese grade term: Merit = 良好 |
| future-about-additions.md | 译注 sentence "ABRSM's own Chinese term for Merit may be 良好…" | (sentence deleted; rest of note kept) | resolved by the fix above |
| our-work.md | H3 Sheraton Towers Singapore 婚礼司仪与现场演唱 | H3 Sheraton Towers Singapore 婚礼司仪与现场献唱 | consistency with case-study title (shared.md §7) |
| our-work.md | H3 两位童话人物到场的公主生日派对 | H3 两位童话公主驾到的生日派对 | consistency with case-study title (shared.md §7) |
| contact.md | 我们会回复您活动构思和方案。 | 我们会带着构思和方案回复您。 | grammar: broken object |
| contact.md | 我们会回复档期和下一步安排。 | 我们会告知您档期和下一步安排。 | grammar; consistent with rates.md |
| contact.md | H3 3. 我们一起完善计划 | H3 3. 我们一起完善方案 | consistency with step 2 (方案) |
| contact.md | 就足以开始。 | 就可以开始了。 | stiff |
| contact.md | 可以，如果您希望的话。 | 可以，只要您希望，我们就用华语回复。 | translationese (trailing English conditional) |
| contact.md | SEO title 联系我们，询问您的活动 | SEO title 联系我们：咨询您的活动事宜 | unnatural: 询问您的活动 |
| shared.md | §5 ABRSM 钢琴八级（优良） | ABRSM 钢琴八级（良好） | ABRSM Chinese grade term |
| shared.md | §6 热爱观众的声音人才、现场表演者和角色扮演表演者 | 热爱观众的配音员、现场演出者和角色表演者 | 声音人才 unnatural; 表演者 repeated |
| shared.md | Lectrix approach: 身兼三职：活动策划、企业活动司仪… | 身兼三职：活动策划人、企业活动司仪… | role noun needed (planner, not planning) |
| shared.md | Lectrix outcomes: 让客户的沟通更简单 | 让客户沟通起来更简单 | grammar |
| shared.md | Banyan objective: 主持一场漫长的晚间节目 | 主持一场长达整晚的节目 | 漫长 negative (tedious) |
| shared.md | Banyan objective: 串连起来 | 串联起来 | wrong character: standard form 串联 |
| shared.md | Banyan on the day: 肯定他们的里程碑 | 表扬他们达成的里程碑 | collocation |
| shared.md | SOMA objective: 并在对的时刻出现 | 并在适当的时刻亮相 | colloquial / Taiwan usage 对的时刻 |
| shared.md | SOMA outcomes: 一场由精心挑选的一群人，共同演绎品牌故事的发布会。 | 精心挑选的一群人齐聚发布会，共同演绎品牌故事。 | broken structure (comma splits the attributive) |
| shared.md | Sheraton outcomes: 一个充满欢笑、感动时刻和开心宾客的午后 | 一个充满欢笑与感动、宾客尽欢的午后 | translationese (充满…开心宾客) |
| shared.md | Maris Stella summary: 一支教师节感恩视频 | 一段教师节感恩视频 | measure word (支 for video is mainland marketing) |
| shared.md | Maris Stella on the day: 期末作品 | 结业作品 | mistranslation: holiday programme (Jul to Aug), not end of term |
| shared.md | Maris Stella outcomes: 一支真挚的教师节感恩视频 | 一段真挚的教师节感恩视频 | measure word |
| shared.md | Princess summary: 一场生日午后派对 | 一场午后生日派对 | word order |

#### For the native reviewer

- **WhatsApp greeting "您好德忠，…"** (every page, not only mine): "德忠您好，" or "德忠，您好！" reads more naturally. I left it because every page uses the same form; change it everywhere or nowhere.
- **"一个联系窗口" for "one point of contact"** (services, about, and also home, event-planning, event-support H1/H2): 窗口 for a person sounds mainland/Taiwanese. "一位联络人 / 单一联络人" is more natural in Singapore. Not changed: the phrase repeats across pages (including an H1), so it should be swapped site-wide in one go. I only removed 对接.
- **钢琴八级 vs glossary rule 8:** the rule says Arabic numerals when the English uses digits ("Grade 8" → 钢琴 8 级). I kept 八级 because it is the set term. Please decide. Also confirm 良好 for ABRSM "Merit" (ABRSM's Chinese grades as I know them: 合格 / 良好 / 优秀).
- **"按每场发布会报价"** (services, rates, home, product-launch-events): 按…每 is a bit redundant ("每场发布会单独报价" or "按场报价" would be cleaner). Not changed, so all four pages stay the same.
- **Glossary §6 "Get a quote → 获取报价":** 获取 leans mainland. Singapore sites more often say 索取报价 (glossary §9 already uses 索取方案). Consider changing the glossary entry. I kept 获取报价 everywhere.
- **New wording only on rates.md:** "提供日期，获取报价" replaces "按您的日期获取报价" (button + H2 "Get a quote for your date"). No other page uses this string.
- **services.md quick-match:** I used 公司聚餐 for "a company dinner" so it no longer repeats 公司晚宴 (the glossary's D&D term). Please check you agree.
- **rates.md "座谈会主持"** for "panel moderation": 小组讨论主持 is more exact. Kept because 座谈会 is common in Zaobao usage.
- **SAFRA's The Ultimate Talent:** about.md shows SAFRA《The Ultimate Talent》, but future-about-additions bolds "SAFRA's The Ultimate Talent" as a link part I may not change. Align them once official Chinese titles are confirmed.
- **shared.md §5 COMPASS:** the title says "COMPASS 颁奖典礼" while future-about-additions keeps "COMPASS Awards Presentation" in English as its link text. Both are fine; pick one if you want them to match.
- Process note: I ran one read-only `git diff --stat` by mistake while checking my edits. It changed nothing.

### Perbaikan akhir setelah pengecekan menyeluruh (9 perubahan)

| File | Before | After | Why |
|---|---|---|---|
| dinner-and-dance-emcee | 我们会回复您档期和书面报价。 | 我们会回复您，告知档期并提供书面报价。 | grammar: 回复您 + object |
| dinner-and-dance-emcee | 我们会回复您档期和下一步安排。 | 我们会回复您，告知档期和下一步安排。 | grammar: 回复您 + object |
| dinner-and-dance-planning | 我们会回复您场地建议和方案。 | 我们会回复您，提供场地建议和方案。 | grammar: 回复您 + object |
| dinner-and-dance-planning | 我们会回复您档期和下一步安排。 | 我们会回复您，告知档期和下一步安排。 | grammar: 回复您 + object |
| dinner-and-dance-planning | 我们会回复您场地建议和逐项列明的方案。 | 我们会回复您，提供场地建议和逐项列明的方案。 | grammar: 回复您 + object |
| glossary | 司仪兼现场演唱 (1x) | 司仪兼现场歌手 | grammar: 兼 joins two roles |
| rates | 司仪兼现场演唱 (1x) | 司仪兼现场歌手 | grammar: 兼 joins two roles |
| wedding-emcee | 司仪兼现场演唱 (12x) | 司仪兼现场歌手 | grammar: 兼 joins two roles |
| government-community-emcee | 标志墙（沿用现有）： | Logo strip (existing): | layout marker stays English, as on other pages |
