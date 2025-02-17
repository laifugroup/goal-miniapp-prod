# 技术上下文

## 使用的技术

1. **前端框架**：
   - **微信小程序框架**：用于开发移动应用。

2. **编程语言**：
   - **JavaScript/TypeScript**：用于编写业务逻辑和事件处理。

3. **样式语言**：
   - **WXSS**：用于编写样式表，类似于CSS。

4. **构建工具**：
   - **微信开发者工具**：用于编译和预览小程序。

## 开发环境

- **操作系统**：Windows 10
- **默认Shell**：C:\WINDOWS\system32\cmd.exe
- **项目路径**：c:/Users/leyuan/Documents/GitHub/goal-miniapp-prod

## 依赖项

- **项目依赖**：
  - **微信小程序基础库**：版本号需根据项目需求确定。
  - **其他第三方库**：根据项目需求引入，如 `lodash` 等。

## 工具和命令

1. **文件操作**：
   - `read_file`：读取文件内容。
   - `write_to_file`：写入文件内容。
   - `apply_diff`：替换现有代码。
   - `list_files`：列出文件和目录。
   - `list_code_definition_names`：列出源代码定义。
   - `search_files`：在文件中搜索正则表达式。
   - `execute_command`：执行CLI命令。

2. **其他工具**：
   - `ask_followup_question`：向用户提问以获取更多信息。
   - `attempt_completion`：尝试完成任务并展示结果。

## 开发流程

1. **初始化项目**：
   - 创建项目目录结构。
   - 初始化 `package.json` 和 `project.config.json`。

2. **设计界面**：
   - 设计打卡界面布局。
   - 编写 `wxml` 文件。

3. **实现功能**：
   - 编写 `ts` 文件，实现事件处理和数据绑定。
   - 编写 `wxss` 文件，添加样式。

4. **测试和调试**：
   - 在微信开发者工具中预览和测试。
   - 解决发现的问题。

5. **文档记录**：
   - 更新记忆库文件，记录项目进展和决策。
   - 创建功能清单文件 `checkin-feature-list.md`。

## 示例代码

### `checkin.wxml`

```xml
<view class="container">
  <view class="goal-description">
    <text>目标描述：{{goalDescription}}</text>
  </view>
  <view class="task-description">
    <text>任务描述：{{taskDescription}}</text>
  </view>
  <view class="input-section">
    <textarea placeholder="请输入打卡内容..." bindinput="onInputChange" value="{{inputContent}}"></textarea>
  </view>
  <view class="media-section">
    <button bindtap="addMedia">添加图片/视频/GIF</button>
    <view wx:for="{{media}}" wx:key="index" class="media-item">
      <image src="{{item}}" mode="aspectFit" wx:if="{{item.includes('.jpg') || item.includes('.png') || item.includes('.gif')}}"></image>
      <video src="{{item}}" controls wx:else-if="{{item.includes('.mp4')}}"></video>
    </view>
  </view>
  <button class="submit-button" bindtap="submitCheckin">提交打卡</button>
</view>
```

### `checkin.ts`

```typescript
Page({
  data: {
    goalDescription: '目标：坚持每天学习编程',
    taskDescription: '任务：完成今天的编程练习',
    inputContent: '',
    media: []
  },

  /**
   * 页面加载时初始化数据
   */
  onLoad() {
    // 这里可以从服务器获取目标描述和任务描述
    // 例如：
    // wx.request({
    //   url: 'https://example.com/api/get-goal-task',
    //   success: (res) => {
    //     this.setData({
    //       goalDescription: res.data.goalDescription,
    //       taskDescription: res.data.taskDescription
    //     });
    //   }
    // });
  },

  /**
   * 处理文字输入框的输入事件
   * @param event 输入事件对象
   */
  onInputChange(event: any) {
    this.setData({
      inputContent: event.detail.value
    });
  },

  /**
   * 添加媒体文件（图片、视频、GIF）
   */
  addMedia() {
    const that = this;
    wx.chooseMedia({
      count: 9,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res: any) {
        const tempFiles = res.tempFiles.map((item: any) => item.tempFilePath);
        that.setData({
          media: that.data.media.concat(tempFiles)
        });
      }
    });
  },

  /**
   * 提交打卡信息
   */
  submitCheckin() {
    const { inputContent, media } = this.data;
    if (!inputContent && media.length === 0) {
      wx.showToast({
        title: '请填写打卡内容或选择媒体文件',
        icon: 'none'
      });
      return;
    }

    // 这里可以添加提交逻辑，比如上传到服务器等
    wx.showToast({
      title: '打卡成功',
      icon: 'success'
    });

    this.setData({
      inputContent: '',
      media: []
    });
  }
});
```

### `checkin.wxss`

```css
.container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.goal-description, .task-description {
  margin-bottom: 20px;
}

.goal-description text, .task-description text {
  font-size: 16px;
  color: #333;
}

.input-section {
  margin-bottom: 20px;
}

.input-section textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
}

.media-section {
  margin-bottom: 20px;
}

.media-section button {
  margin-bottom: 10px;
  padding: 10px 20px;
  background-color: #1aad19;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.media-section button:active {
  background-color: #168817;
}

.media-item {
  margin-bottom: 10px;
}

.media-item image {
  width: 100%;
  border-radius: 5px;
}

.media-item video {
  width: 100%;
  border-radius: 5px;
}

.submit-button {
  padding: 10px 20px;
  background-color: #1aad19;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:active {
  background-color: #168817;
}
```

### `checkin-feature-list.md`

```markdown
# 打卡界面功能清单

## 功能列表

1. **目标描述**
   - 显示谁发起了什么目标。

2. **任务描述**
   - 显示当前打卡的是什么任务。

3. **文字输入框**
   - 用户可以输入打卡内容。

4. **媒体文件上传**
   - 用户可以上传图片、视频和GIF。
   - 上传的文件可以在预览区域正确显示。

5. **提交打卡按钮**
   - 用户可以提交打卡信息。
   - 提交后显示成功提示。

## 示例界面

![示例界面](assets/images/checkin-example.png) <!-- 如果有示例图片 -->

## 注意事项

- 确保所有功能在微信小程序环境中都能正常运行。
- 考虑用户上传的大文件情况，确保性能和稳定性。
## 使用的技术

1. **前端框架**：
   - **微信小程序框架**：用于开发移动应用。

2. **编程语言**：
   - **JavaScript/TypeScript**：用于编写业务逻辑和事件处理。

3. **样式语言**：
   - **WXSS**：用于编写样式表，类似于CSS。

4. **构建工具**：
   - **微信开发者工具**：用于编译和预览小程序。

## 开发环境

- **操作系统**：Windows 10
- **默认Shell**：C:\WINDOWS\system32\cmd.exe
- **项目路径**：c:/Users/leyuan/Documents/GitHub/goal-miniapp-prod

## 依赖项

- **项目依赖**：
  - **微信小程序基础库**：版本号需根据项目需求确定。
  - **其他第三方库**：根据项目需求引入，如 `lodash` 等。

## 工具和命令

1. **文件操作**：
   - `read_file`：读取文件内容。
   - `write_to_file`：写入文件内容。
   - `apply_diff`：替换现有代码。
   - `list_files`：列出文件和目录。
   - `list_code_definition_names`：列出源代码定义。
   - `search_files`：在文件中搜索正则表达式。
   - `execute_command`：执行CLI命令。

2. **其他工具**：
   - `ask_followup_question`：向用户提问以获取更多信息。
   - `attempt_completion`：尝试完成任务并展示结果。

## 开发流程

1. **初始化项目**：
   - 创建项目目录结构。
   - 初始化 `package.json` 和 `project.config.json`。

2. **设计界面**：
   - 设计打卡界面布局。
   - 编写 `wxml` 文件。

3. **实现功能**：
   - 编写 `ts` 文件，实现事件处理和数据绑定。
   - 编写 `wxss` 文件，添加样式。

4. **测试和调试**：
   - 在微信开发者工具中预览和测试。
   - 解决发现的问题。

5. **文档记录**：
   - 更新记忆库文件，记录项目进展和决策。
   - 创建功能清单文件 `checkin-feature-list.md`。

## 示例代码

### `checkin.wxml`

```xml
<view class="container">
  <view class="goal-description">
    <text>目标描述：{{goalDescription}}</text>
  </view>
  <view class="task-description">
    <text>任务描述：{{taskDescription}}</text>
  </view>
  <view class="input-section">
    <textarea placeholder="请输入打卡内容..." bindinput="onInputChange" value="{{inputContent}}"></textarea>
  </view>
  <view class="media-section">
    <button bindtap="addMedia">添加图片/视频/GIF</button>
    <view wx:for="{{media}}" wx:key="index" class="media-item">
      <image src="{{item}}" mode="aspectFit" wx:if="{{item.includes('.jpg') || item.includes('.png') || item.includes('.gif')}}"></image>
      <video src="{{item}}" controls wx:else-if="{{item.includes('.mp4')}}"></video>
    </view>
  </view>
  <button class="submit-button" bindtap="submitCheckin">提交打卡</button>
</view>
```

### `checkin.ts`

```typescript
Page({
  data: {
    goalDescription: '目标：坚持每天学习编程',
    taskDescription: '任务：完成今天的编程练习',
    inputContent: '',
    media: []
  },

  /**
   * 页面加载时初始化数据
   */
  onLoad() {
    // 这里可以从服务器获取目标描述和任务描述
    // 例如：
    // wx.request({
    //   url: 'https://example.com/api/get-goal-task',
    //   success: (res) => {
    //     this.setData({
    //       goalDescription: res.data.goalDescription,
    //       taskDescription: res.data.taskDescription
    //     });
    //   }
    // });
  },

  /**
   * 处理文字输入框的输入事件
   * @param event 输入事件对象
   */
  onInputChange(event: any) {
    this.setData({
      inputContent: event.detail.value
    });
  },

  /**
   * 添加媒体文件（图片、视频、GIF）
   */
  addMedia() {
    const that = this;
    wx.chooseMedia({
      count: 9,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res: any) {
        const tempFiles = res.tempFiles.map((item: any) => item.tempFilePath);
        that.setData({
          media: that.data.media.concat(tempFiles)
        });
      }
    });
  },

  /**
   * 提交打卡信息
   */
  submitCheckin() {
    const { inputContent, media } = this.data;
    if (!inputContent && media.length === 0) {
      wx.showToast({
        title: '请填写打卡内容或选择媒体文件',
        icon: 'none'
      });
      return;
    }

    // 这里可以添加提交逻辑，比如上传到服务器等
    wx.showToast({
      title: '打卡成功',
      icon: 'success'
    });

    this.setData({
      inputContent: '',
      media: []
    });
  }
});
```

### `checkin.wxss`

```css
.container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.goal-description, .task-description {
  margin-bottom: 20px;
}

.goal-description text, .task-description text {
  font-size: 16px;
  color: #333;
}

.input-section {
  margin-bottom: 20px;
}

.input-section textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
}

.media-section {
  margin-bottom: 20px;
}

.media-section button {
  margin-bottom: 10px;
  padding: 10px 20px;
  background-color: #1aad19;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.media-section button:active {
  background-color: #168817;
}

.media-item {
  margin-bottom: 10px;
}

.media-item image {
  width: 100%;
  border-radius: 5px;
}

.media-item video {
  width: 100%;
  border-radius: 5px;
}

.submit-button {
  padding: 10px 20px;
  background-color: #1aad19;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:active {
  background-color: #168817;
}
```

### `checkin-feature-list.md`

```markdown
# 打卡界面功能清单

## 功能列表

1. **目标描述**
   - 显示谁发起了什么目标。

2. **任务描述**
   - 显示当前打卡的是什么任务。

3. **文字输入框**
   - 用户可以输入打卡内容。

4. **媒体文件上传**
   - 用户可以上传图片、视频和GIF。
   - 上传的文件可以在预览区域正确显示。

5. **提交打卡按钮**
   - 用户可以提交打卡信息。
   - 提交后显示成功提示。

## 示例界面

![示例界面](assets/images/checkin-example.png) <!-- 如果有示例图片 -->

## 注意事项

- 确保所有功能在微信小程序环境中都能正常运行。
- 考虑用户上传的大文件情况，确保性能和稳定性。
