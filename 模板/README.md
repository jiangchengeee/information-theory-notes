# LaTeX 讲义模板

这套 PDF（零基础讲义 86 页、复习笔记 46 页、五份作业详解）都是 **XeLaTeX + ctex** 排的。
这里把导言区抽成了一个独立可编译的文件，拿去改内容就能用。

## 文件

| 文件 | 说明 |
|---|---|
| `讲义模板.tex` | **自包含模板**：导言区 + 五种彩色提示框 + 数学宏 + 一页示例，单独就能编译出 3 页 PDF |
| `讲义模板.pdf` | 编译结果，先看这个效果 |

## 三步使用

1. 复制 `讲义模板.tex`，改名；
2. 全文搜索 `★ 改成你的内容`，把示例换掉；
3. 编译两遍（第一遍生成 `.aux`，第二遍才把目录页码补对）：

```bash
xelatex 我的讲义.tex && xelatex 我的讲义.tex
```

**Overleaf 用户**：新建项目上传这个 `.tex`，把 `Menu → Compiler` 设成 **XeLaTeX** 即可。

## 字体：换机器编译时唯一要动的设置

模板默认 `fontset=fandol`——fandol 是 TeX Live 自带的字体，**Windows / macOS / Linux 都能直接编**。
想要更好看的中文字体就改第 21 行：

```latex
\documentclass[11pt,a4paper,fontset=mac]{ctexart}      % macOS（宋体/黑体）
\documentclass[11pt,a4paper,fontset=windows]{ctexart}  % Windows（宋体/黑体）
\documentclass[11pt,a4paper,fontset=ubuntu]{ctexart}   % Ubuntu（需装文泉驿）
```

仓库里现有的讲义/作业用的就是 `fontset=mac`（默认），所以在本机编译无需改动。

## 五种提示框

| 环境 | 颜色 | 用来放什么 |
|---|---|---|
| `defbox` | 红 | 定义、定理、题目原文 |
| `idea` | 绿 | 直觉、生活类比、"为什么是这样" |
| `qa` | 紫 | 自问自答、常见疑问、易错点 |
| `calc` | 黄 | 手把手数值计算（算术不跳步） |
| `exam` | 蓝 | "考试怎么考"、答题格式、得分清单 |

用法都一样：

```latex
\begin{idea}{直觉 / 类比}
砍掉一半可能性就记 1 个信息量，砍 3 刀（$8=2^3$）就是 3 bit。
\end{idea}
```

## 数学宏

| 宏 | 输出 | 说明 |
|---|---|---|
| `\Hx{X}` / `\Hx{X,Y}` | $H(X)$ / $H(X,Y)$ | 熵、联合熵 |
| `\Hx{X\|Y}` | $H(X\|Y)$ | 条件熵（`\|` 要在数学模式里写 `\mid` 更规范） |
| `\I{X;Y}` | $I(X;Y)$ | 互信息 |
| `\Hc{X}` | $H_c(X)$ | 连续熵（微分熵） |
| `\lb n` | $\log_2 n$ | 以 2 为底的对数 |
| `\p{x\|y}` | $p(x\|y)$ | 条件概率 |
| `\E[X]` | $\mathbb{E}[X]$ | 期望 |
| `\bit` | bit | 单位，写成 `3.26\bit` |

## 常见问题

**编译报 "Overfull \hbox"**：某行超出了版心。长公式用 `align*` 手动换行，或者在行内断开：

```latex
\begin{align*}
\Hx{X,Y}-\Hx{X}-\Hx{Y}
&=-\sum_{x,y}p(x,y)\lb p(x,y)+\cdots\\
&=\sum_{x,y}p(x,y)\lb\frac{p(x)p(y)}{p(x,y)} \le 0 .
\end{align*}
```

**想改配色**：只改导言区那六行 `\definecolor`。

**想要和仓库里 PDF 一模一样的导言区**：直接用 `../notes2/_preamble.tex`
（讲义与作业用的）或 `../notes/_preamble.tex`（复习笔记用的），然后在自己文件开头写

```latex
\documentclass[11pt,a4paper]{ctexart}
\input{notes2/_preamble}
\begin{document}
...
\end{document}
```

**不需要目录**：删掉 `\tableofcontents` 那两行即可。

**要不要加 PDF 书签**：在导言区加 `\usepackage{hyperref}`（放在最后加载），
PDF 阅读器左侧就会出现可点击的章节树。
