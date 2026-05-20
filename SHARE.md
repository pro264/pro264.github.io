# 分享说明

## 方式一：发完整网页包

适合需要交互地图、日期切换、导航按钮的朋友。

1. 把整个 `xinjiang-ili-duku-trip` 文件夹压缩。
2. 发给朋友。
3. 朋友解压后，在文件夹里打开 PowerShell 或 cmd。
4. 运行：

```powershell
python -m http.server 8002
```

5. 打开：

```text
http://localhost:8002/index.html
```

## 方式二：发 Gitee 链接

适合长期维护和多人查看。

朋友可以：

```powershell
git clone https://gitee.com/你的用户名/xinjiang-ili-duku-trip.git
cd xinjiang-ili-duku-trip
python -m http.server 8002
```

然后打开：

```text
http://localhost:8002/index.html
```

## 方式三：发 PDF

适合不需要交互地图、只想看行程的人。

启动本地服务器后打开：

```text
http://localhost:8002/share/itinerary-print.html
```

按 `Ctrl + P`，选择“另存为 PDF”。
