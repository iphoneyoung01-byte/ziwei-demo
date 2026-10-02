export type BirthInput = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  gender: '男' | '女';
  place: string;
};

export type Palace = {
  title: string;
  primaryStar: string;
  secondaryStar: string;
  summary: string;
  luck: string;
};

export type ChartResult = {
  birthday: string;
  title: string;
  tagline: string;
  command: string;
  palaces: Palace[];
  overview: {
    mingGong: string;
    shenGong: string;
    spouse: string;
    fortune: string;
  };
  strengths: string[];
  cautions: string[];
};

const palaceTitles = [
  '命宫',
  '财帛',
  '官禄',
  '迁移',
  '疾厄',
  '福德',
  '子女',
  '夫妻',
  '兄弟',
  '田宅',
  '奴仆',
  '父母',
];

const starCatalog = [
  '紫微',
  '天机',
  '太阳',
  '武曲',
  '天同',
  '廉贞',
  '天府',
  '太阴',
  '贪狼',
  '巨门',
  '天相',
  '天梁',
  '七杀',
  '破军',
  '文曲',
  '文昌',
  '左辅',
  '右弼',
  '天魁',
  '天钺',
];

const secondaryCatalog = [
  '科名',
  '禄存',
  '化权',
  '化禄',
  '化科',
  '格局',
  '偏印',
  '正官',
  '食神',
  '伤官',
  '正财',
  '偏财',
];

const summaryTemplates = [
  '天赋清晰，目标感强，适合追求明确方向的事业与人生布局。',
  '情绪细腻，表达力较强，福祉来自稳定成长与内外兼修。',
  '性格坚韧，面对挑战时较能沉着应对，适合长期积累。',
  '谋略较佳，擅长从细节中观察机会，适合布局与协调。',
  '开拓能力佳，适合做创造型、服务型或团队型工作。',
  '契合资源与人脉，贵人相助较明显，容易形成正反馈。',
  '喜好自由与发挥，若能控制焦虑，更具长远成长性。',
  '内在力量稳定，具备担当力，适合将难点转化为优势。',
];

const fortuneTexts = [
  '事业发展值得重视长期积累，稳步推进将更有效。',
  '感情趋势偏成熟稳定，需从理解与坦诚中建立更深连接。',
  '财富管理需要理性规划，收益来源会较多元。',
  '健康与节奏管理要重视规律，避免过度投入。',
  '无论择业还是交友，都更适合以真诚为核心。',
  '人际上可获得帮助，适合合作型路径与跨界协作。',
  '中后期成长更佳，前期需打基础与稳步提升。',
  '置身于需求与资源之间时，分寸感会决定成败。',
];

function makeSeed(value: string) {
  return value.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function getGenderBias(gender: '男' | '女') {
  return gender === '男' ? 1 : 2;
}

export function generateZiweiChart(input: BirthInput): ChartResult {
  const bornAt = `${input.year}-${String(input.month).padStart(2,'0')}-${String(input.day).padStart(2,'0')} ${String(input.hour).padStart(2,'0')}:${String(input.minute).padStart(2,'0')}`;
  const seed = makeSeed(`${input.year}-${input.month}-${input.day}-${input.hour}-${input.minute}-${input.gender}-${input.place}`);

  const palaces: Palace[] = palaceTitles.map((title, index) => {
    const starIndex = (seed + index * 3 + getGenderBias(input.gender) * 5) % starCatalog.length;
    const secondaryIndex = (seed + index * 2 + getGenderBias(input.gender) * 7) % secondaryCatalog.length;
    const luckIndex = (seed + index + 17) % fortuneTexts.length;

    return {
      title,
      primaryStar: starCatalog[starIndex],
      secondaryStar: secondaryCatalog[secondaryIndex],
      summary: summaryTemplates[(starIndex + index + secondaryIndex) % summaryTemplates.length],
      luck: fortuneTexts[luckIndex],
    };
  });

  const mingGong = palaces[0];
  const shenGong = palaces[1];
  const spouse = palaces[7];

  const strengths = [
    `${mingGong.primaryStar}为主星，具备明确的人生方向与执行力。`,
    `${palaces[5].primaryStar}在福德宫有助于稳定内在能量与心理层面。`,
    `${palaces[8].primaryStar}与田宅关系突出，家庭与经营感较强。`,
  ];

  const cautions = [
    `在${palaces[3].title}与${palaces[10].title}的组合上，外在环境变化较多，需留意决策节奏。`,
    `情绪起伏容易影响长期规划，注重规律与边界管理。`,
    `${palaces[9].primaryStar}带来的挑战更重视执行细节，避免冲动决策。`,
  ];

  const title = `${input.gender}命 · ${input.place}`;
  const tagline = input.gender === '男' ? '事业心强，脚踏实地，能以行动转化机会。' : '感性与判断并存，适合在较稳定环境中成长。';

  return {
    birthday: bornAt,
    title,
    tagline,
    command: `${input.year}年${input.month}月${input.day}日 ${String(input.hour).padStart(2,'0')}:${String(input.minute).padStart(2,'0')}，于${input.place}出生。`,
    palaces,
    overview: {
      mingGong: `${mingGong.primaryStar}入${mingGong.title}，目标感强，偏向以结果为导向。`,
      shenGong: `${shenGong.primaryStar}入${shenGong.title}，适合在稳定节奏中谋取长期收益。`,
      spouse: `${spouse.primaryStar}入${spouse.title}，伴侣关系重视理解、信任与长期承诺。`,
      fortune: `整体格局偏向“慢热型成长”，前期积累、后期爆发，宜稳中求进。`,
    },
    strengths,
    cautions,
  };
}

export function formatLabel(input: BirthInput) {
  return `${input.year}年${input.month}月${input.day}日 ${String(input.hour).padStart(2,'0')}:${String(input.minute).padStart(2,'0')}`;
}
