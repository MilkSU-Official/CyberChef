# CyberChef 简体中文版 🇨🇳

[![](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/gchq/CyberChef/blob/master/LICENSE)

#### *网络安全瑞士军刀*

> 🔗 **在线体验**: [misc.starneko.com](https://misc.starneko.com)
>
> 🔗 **原版项目**: [gchq/CyberChef](https://github.com/gchq/CyberChef)

---

## 关于本项目

本项目 Fork 自 [gchq/CyberChef](https://github.com/gchq/CyberChef)，进行了**完整的简体中文汉化**，方便中文用户使用。

### 汉化内容

- ✅ **463 个操作**的描述文字全部翻译为中文
- ✅ **主界面 UI** 完整汉化（输入/输出窗格、配方窗格、操作列表）
- ✅ **选项设置对话框**（主题、日志级别、各项设置选项）
- ✅ **保存/加载配方对话框**
- ✅ **收藏夹编辑对话框**
- ✅ **关于/支持对话框**（常见问题、报告问题、快捷键等）
- ✅ **查找标签页对话框**
- ✅ **下载对话框**
- ✅ **所有按钮提示文字**

### 其他修改

- 🌙 默认主题更改为暗色模式 (Dark)
- 🔗 添加自定义域名 CNAME

---

## 什么是 CyberChef？

CyberChef 是一个简单、直观的 Web 应用程序，用于在浏览器中执行各种"网络"操作。这些操作包括：

- 简单编码：XOR、Base64 等
- 复杂加密：AES、DES、Blowfish 等
- 创建二进制和十六进制转储
- 数据压缩和解压缩
- 计算哈希和校验和
- IPv6 和 X.509 解析
- 字符编码转换
- 还有更多...

该工具旨在让技术人员和非技术人员都能以复杂的方式处理数据，而无需处理复杂的工具或算法。

---

## 本地运行

### 使用 Docker

```bash
docker run -it -p 8080:80 ghcr.io/gchq/cyberchef:latest
```

然后在浏览器中访问 http://localhost:8080

### 从源码运行

```bash
npm install
npm start
```

---

## 主要功能

- **拖放操作** - 操作可以拖入/拖出配方列表，支持拖放文件（最大 2GB）
- **自动烘焙** - 修改输入或配方时自动处理并立即产生输出
- **自动编码检测** - 自动检测数据的编码方式并提供解码建议
- **断点调试** - 可在配方中设置断点，逐步查看每个阶段的数据
- **保存/加载配方** - 将常用配方保存到本地存储
- **完全客户端运行** - 所有处理都在浏览器中完成，数据不会发送到服务器

## 浏览器支持

- Google Chrome 50+
- Mozilla Firefox 38+

## 许可证

CyberChef 基于 [Apache 2.0 许可证](https://www.apache.org/licenses/LICENSE-2.0) 发布。

## 致谢

感谢 [GCHQ](https://github.com/gchq) 开发并开源了这个优秀的工具！
