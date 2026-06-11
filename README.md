# 新疆伊犁-独库公路自驾旅行地图

这是一个可离线携带、可本地预览、可分享给朋友的旅行地图项目。

## 内容

- `index.html`：交互式地图主页，包含 D1-D14 行程、住宿、路线、餐厅候选、导航按钮。
- `itinerary.md`：Markdown 文字版行程摘要。
- `share/itinerary-print.html`：适合打印或导出 PDF 的版本。
- `share/xinjiang-ili-duku-itinerary.md`：分享用 Markdown 行程。
- `assets/vendor/leaflet`：Leaflet 本地资源，避免 Leaflet JS/CSS 依赖外网 CDN。

地图底图仍依赖在线瓦片服务。如果朋友电脑不能访问底图，页面仍会显示行程、点位、按钮和错误提示。

## 本地预览

推荐用本地服务器打开，不要直接双击 `index.html`。

```powershell
cd E:\trip\xinjiang-ili-duku-trip
python -m http.server 8002
```

浏览器打开：

```text
http://localhost:8002/index.html
```

如果 8002 端口被占用，可以换成 8003：

```powershell
python -m http.server 8003
```

然后打开：

```text
http://localhost:8003/index.html
```

## 用 Node 预览

```powershell
npm run serve
```

或者：

```powershell
npx serve .
```

## 打印 / PDF

启动本地服务器后打开：

```text
http://localhost:8002/share/itinerary-print.html
```

浏览器按 `Ctrl + P`，选择“另存为 PDF”。

## 分享给朋友

完整网页项目可以压缩后发送。朋友解压后进入目录，运行：

```powershell
python -m http.server 8002
```

然后打开：

```text
http://localhost:8002/index.html
```

如果朋友电脑没有 Python，可以安装 Node.js 后运行：

```powershell
npx serve .
```

## 上传到 Gitee

首次上传需要一个 Gitee 空仓库地址，例如：

```text
https://gitee.com/你的用户名/xinjiang-ili-duku-trip.git
```

然后在本目录执行：

```powershell
git init
git add .
git commit -m "Add Xinjiang Ili Duku trip map"
git branch -M master
git remote add origin https://gitee.com/你的用户名/xinjiang-ili-duku-trip.git
git push -u origin master
```

如果 Gitee 要求登录，请按 Git 弹窗输入 Gitee 用户名和密码/私人令牌。

## Gitee Pages

本仓库已经按静态网页方式整理：

- 入口文件：`index.html`
- 分支：`master`
- 发布目录：仓库根目录 `/`
- 本地 Leaflet 资源：`assets/vendor/leaflet`
- `.nojekyll`：已添加，避免静态资源被发布流程改写

如果你的 Gitee 账号页面仍提供 Pages 服务，可以在仓库页面进入：

```text
服务 -> Gitee Pages
```

然后选择：

```text
部署分支：master
部署目录：/
```

部署完成后访问 Gitee 给出的 Pages 地址即可。

如果页面提示 Gitee Pages 功能已下线或不可用，则无法在 Gitee 直接托管网页。可以改用 GitHub Pages、Vercel、Netlify，或继续用本地服务器分享。

## 出发前仍需确认

- C845 乌鲁木齐到伊宁的检票口、候车室和是否晚点。
- 独库公路当天通行、天气、施工、限行。
- 赛里木湖、那拉提、喀拉峻、巴音布鲁克的门票、自驾入园、区间车和停车规则。
- 酒店订单、停车、晚到、退改政策。
- 餐厅营业状态和近 7-14 天评价。
