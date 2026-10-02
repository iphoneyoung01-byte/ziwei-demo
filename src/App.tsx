import { useMemo, useState } from 'react';
import { formatLabel, generateZiweiChart, type BirthInput } from './lib/ziwei';

const initialState: BirthInput = {
  year: 1995,
  month: 7,
  day: 15,
  hour: 21,
  minute: 30,
  gender: '男',
  place: '上海',
};

function App() {
  const [form, setForm] = useState<BirthInput>(initialState);
  const [result, setResult] = useState(() => generateZiweiChart(initialState));

  const chartLabel = useMemo(() => formatLabel(form), [form]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setResult(generateZiweiChart(form));
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">紫微斗数 · 命盘演示</p>
          <h1>命格可视化</h1>
        </div>
        <div className="badge">Demo</div>
      </header>

      <main className="layout">
        <aside className="panel form-panel">
          <h2>出生信息</h2>
          <form onSubmit={onSubmit} className="form-grid">
            <label>
              年
              <input
                type="number"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
              />
            </label>
            <label>
              月
              <input
                type="number"
                min={1}
                max={12}
                value={form.month}
                onChange={(e) => setForm({ ...form, month: Number(e.target.value) })}
              />
            </label>
            <label>
              日
              <input
                type="number"
                min={1}
                max={31}
                value={form.day}
                onChange={(e) => setForm({ ...form, day: Number(e.target.value) })}
              />
            </label>
            <label>
              时
              <input
                type="number"
                min={0}
                max={23}
                value={form.hour}
                onChange={(e) => setForm({ ...form, hour: Number(e.target.value) })}
              />
            </label>
            <label>
              分
              <input
                type="number"
                min={0}
                max={59}
                value={form.minute}
                onChange={(e) => setForm({ ...form, minute: Number(e.target.value) })}
              />
            </label>
            <label>
              性别
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value as '男' | '女' })}
              >
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </label>
            <label className="wide">
              出生地
              <input
                value={form.place}
                onChange={(e) => setForm({ ...form, place: e.target.value })}
              />
            </label>
            <button type="submit" className="primary-btn">生成命盘</button>
          </form>
        </aside>

        <section className="panel content-panel">
          <div className="summary-header">
            <div>
              <p className="eyebrow">出生时间</p>
              <h2>{chartLabel}</h2>
            </div>
            <div className="summary-mini">
              <span>{result.title}</span>
              <small>{result.tagline}</small>
            </div>
          </div>

          <div className="hero-card">
            <div>
              <p className="eyebrow">命盘说明</p>
              <h3>{result.command}</h3>
            </div>
            <div className="hero-note">{result.tagline}</div>
          </div>

          <div className="chart-grid">
            {result.palaces.map((palace, index) => (
              <div className="palace-card" key={palace.title}>
                <span className="palace-name">{palace.title}</span>
                <strong>{palace.primaryStar}</strong>
                <small>{palace.secondaryStar}</small>
                <p>{palace.summary}</p>
                <i>{palace.luck}</i>
              </div>
            ))}
          </div>

          <div className="insight-grid">
            <article className="info-block">
              <h3>命宫</h3>
              <p>{result.overview.mingGong}</p>
            </article>
            <article className="info-block">
              <h3>身宫</h3>
              <p>{result.overview.shenGong}</p>
            </article>
            <article className="info-block">
              <h3>配偶</h3>
              <p>{result.overview.spouse}</p>
            </article>
            <article className="info-block wide-block">
              <h3>大运趋势</h3>
              <p>{result.overview.fortune}</p>
            </article>
          </div>

          <div className="analysis-boxes">
            <div className="analysis-box">
              <h3>优点</h3>
              <ul>
                {result.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="analysis-box">
              <h3>注意</h3>
              <ul>
                {result.cautions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
