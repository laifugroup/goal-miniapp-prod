# 技术上下文

## 技术栈

1. **前端框架**
   - **微信小程序原生框架**：用于开发微信小程序应用。
   - **TypeScript**：作为主要编程语言，提高代码质量和可维护性。

2. **样式**
   - **WXSS**：用于编写微信小程序的样式表，类似于 CSS。

3. **状态管理**
   - **自定义状态管理**：简化实现并保持轻量级，适用于小型项目。

4. **数据持久化**
   - **微信本地存储 API**：用于存储简单的用户数据。
   - **微信云开发**：对于复杂的数据结构，考虑使用云数据库进行存储和同步。

5. **构建工具**
   - **TSC (TypeScript Compiler)**：用于编译 TypeScript 代码。
   - **ESLint**：用于代码质量检查和格式化。

## 开发环境

1. **开发工具**
   - **Visual Studio Code**：用于代码编辑和调试。
   - **微信开发者工具**：用于预览和调试微信小程序。

2. **依赖管理**
   - **npm**：用于管理项目的依赖包。
   - **yarn**：作为 npm 的替代品，也可以用于依赖管理。

## 项目结构

1. **根目录**
   - `.clinerules`：项目智能文档，记录关键实现路径和项目决策。
   - `eslintrc.js`：ESLint 配置文件。
   - `package.json`：项目依赖和脚本配置。
   - `project.config.json`：微信小程序项目配置文件。
   - `project.private.config.json`：私有配置文件。
   - `readme.md`：项目说明文档。
   - `tsconfig.json`：TypeScript 编译配置文件。
   - `ai/`：存放项目文档和内存库文件。
   - `assets/`：存放项目资源文件，如图片等。
   - `docs/`：存放额外的文档文件。
   - `miniprogram/`：存放微信小程序源码文件。
   - `typings/`：存放类型定义文件。

2. **miniprogram 目录**
   - `app.json`：小程序的全局配置文件。
   - `app.scss`：全局样式文件。
   - `app.ts`：小程序的入口文件。
   - `sitemap.json`：小程序的 sitemap 配置文件。
   - `assets/`：存放小程序内的资源文件。
   - `components/`：存放自定义组件。
   - `pages/`：存放各个页面组件。
   - `utils/`：存放工具函数和 API 请求逻辑。

## 技术约束

1. **兼容性**
   - 确保代码在不同版本的微信客户端上都能正常运行。
   - 遵循微信小程序的开发规范和限制。

2. **性能优化**
   - 优化代码性能，确保应用流畅度。
   - 减少不必要的渲染和计算。

3. **安全性**
   - 确保用户数据的安全性，避免敏感信息泄露。
   - 对用户输入进行验证和过滤，防止 XSS 攻击。

## 依赖

1. **核心依赖**
   - **@types/wx-miniprogram**：微信小程序的 TypeScript 类型定义。
   - **axios**：用于 HTTP 请求的库。
   - **lodash**：用于常用工具函数的库。

2. **开发依赖**
   - **typescript**：TypeScript 编译器。
   - **eslint**：代码质量检查工具。
   - **@vue/eslint-config-standard**：ESLint 标准配置。
   - **@vue/cli-plugin-babel**：Babel 插件。
   - **@vue/cli-plugin-eslint**：ESLint 插件。
   - **@vue/cli-service**：Vue CLI 服务。